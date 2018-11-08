<template>
  <div class="warp">
    <div class="application-header-box">
      <div class="application-header ">新建任务</div>
    </div>
    <el-row :gutter="50">
      <el-col :xs="8" :sm="8" :md="8" :lg="5" :offset="2" style="padding-left:45px;margin-right:10px;">
        <img src="../../assets/data-import/excel.png" @click="showNewTaskDialog('excel')" class="input-img" ondragstart="return false;">
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="5">
        <img src="../../assets/data-import/csv.png" @click="showNewTaskDialog('csv')" class="input-img" ondragstart="return false;">
      </el-col>

    </el-row>
    <!-- 新建任务的模态框 -->
    <el-dialog :visible.sync="newTaskDialogVisable" width="30%" title="新建任务" center>
      <el-form :model="newTaskModel" ref="newTask" status-icon :rules="rules2" label-width="80px" class="demo-ruleForm" label-position="left" @keyup.native="submitTask($event)">
        <el-form-item label="任务名称" prop="name">
          <el-input type="text" v-model="newTaskModel.name"></el-input>
        </el-form-item>
        <el-form-item label="数据集名" prop="title">
          <el-input type="text" v-model="newTaskModel.title"></el-input>
        </el-form-item>
        <el-form-item label="数据源">
          <input type="file" ref="obj" @change="importfile()" id="excel-input" :accept="accept" />
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="newTaskModel.describe">
          </el-input>
          <i class="el-icon-info tip-text"> 快捷键Ctrl+Enter进入下一步</i>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newTaskDialogVisable = false">取 消</el-button>
        <el-button type="primary" @click="newTask">下一步</el-button>
      </span>
    </el-dialog>
    <!-- 数据预览模态框 -->
    <el-dialog :visible.sync="tablePreviewVisable" width="50%" title="数据预览" top="5vh">
      <previewTable :json="tablejsons" v-on:setTitleIndex="setTitleIndex"></previewTable>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tablePreviewVisable = false">取 消</el-button>
        <el-button type="primary" @click="createTask">创建任务</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import PreviewTable from "./PrviewTable.vue";
import { converterTwoDimArrayToObjectArray,converterFileToJson, importf } from "@/utils/fileToJson.js";
import validateObj from "@/utils/validate.js";
import Papa from 'papaparse';
export default {
  components: {
    PreviewTable
  },
  data() {
    return {
      newTaskDialogVisable: false,
      tablePreviewVisable: false,
      newTaskModel: {
        name: "",
        describe: "",
        file: "",
        title: "" //数据集名，与新建任务无关
      },

      tablejsons: null,
      titleIndex: 1,
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
      taskid: 0,
      newTaskRules: {},
      rules2: {
        name: [{ validator: validateObj.validateName, trigger: "blur" }],
        title: [{ validator: validateObj.validateTitle, trigger: "blur" }]
      }
    };
  },
  methods: {
    
    importfile: function() {
      let obj = this.$refs.obj;
      let filetype = obj.value.substring(
        obj.value.lastIndexOf("."),
        obj.value.length
      );
      let _this = this;
      if (filetype == ".csv") {
        var file = obj.files[0];
        Papa.parse(file, {
          complete: function(results) {
            _this.tablejsons = converterTwoDimArrayToObjectArray(results.data);
            console.log(_this.tablejsons);
          }
        });
      } else {
        let jsonPromise = converterFileToJson(obj);
        jsonPromise.then(data => {
          this.tablejsons = data;
        });
      }
    },
    submitTask: function(e) {
      // key.Code === 13表示回车键
      if (e.keyCode === 13 && e.ctrlKey) {
        this.newTask();
      }
    },
    showNewTaskDialog(fileType) {
      if (fileType == "csv") {
        this.accept = ".csv";
      } else {
        this.accept =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel";
      }
      this.newTaskDialogVisable = true;
    },
    newTask: function() {
      this.$refs.newTask.validate(vaild => {
        if (vaild) {
          if (this.$refs.obj.value == "") {
            this.$message({
              message: "请选择数据源！",
              type: "warning",
              duration: 1500
            });
          } else {
            // 新建任务
            const loading = this.$loading({
              lock: true,
              text: "新建任务中...",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)"
            });
            let query = this.$post(
              "/taskinfo/",
              {
                task_name: this.newTaskModel.name,
                task_desc: this.newTaskModel.describe
              },
              false
            );
            query
              .then(response => {
                console.log(response);
                this.taskid = response.data.id;
                this.tablePreviewVisable = true;
                this.newTaskDialogVisable = false;
                loading.close();
              })
              .catch(err => {
                loading.close();
                this.$message({
                  message: err.response.data.non_field_errors[0],
                  type: "warning",
                  duration: 1500
                });
              });
          }
        }
      });
    },
    setTitleIndex: function(index) {
      this.titleIndex = index;
    },
    createTask: function() {
      this.tablePreviewVisable = false;
      const loading = this.$loading({
        lock: true,
        text: "任务数据上传中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$post("/dataSet/", {
        task: this.taskid,
        step1: "1",
        step2: "2",
        step3: "3",
        stepX1: "x1",
        title: this.newTaskModel.title,
        row_num: (this.titleIndex - 1).toString(),
        data_set: this.tablejsons
      })
        .then(response => {
          var dataSetId = response.data.id;
          //创建完成之后，跳转到数据处理页面，传任务ID
          loading.close();
          this.$router.push(`/home/data-processing/${dataSetId}`);
        })
        .catch(err => {
          console.log(err);
          loading.close();
        });
    }
  }
};
</script>

<style scoped>
.tip-text {
  color: #999;
  font-size: 15px;
}
.warp {
  min-width: 800px;
}
</style>
<style>
.el-main {
  line-height: 40px;
}

.application-header-box {
  border-bottom: 1px solid #979797;
  padding-top: 0;
  display: block;
  height: 40px;
  margin: 20px 100px;
  position: relative;
}

.application-header {
  border-bottom: 2px solid #00c587;
  line-height: 38px;
  font-size: 24px;
  margin-left: 60px;
  text-align: left;
  float: left;
}
.input-img:hover {
  cursor: pointer;
  opacity: 0.8;
  border: 1px solid #eee;
}
</style>