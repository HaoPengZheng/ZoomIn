<template>
  <div class="warp">
    <div class="application-header-box">
      <div class="application-header ">新建任务</div>
    </div>
    <el-row :gutter="30">
      <el-col :xs="8" :sm="8" :md="8" :lg="5" :offset="2">
        <img src="../../assets/data-import/excel.png" @click="showNewTaskDialog('excel')" class="input-img" ondragstart="return false;">
      </el-col>
      <el-col :xs="8" :sm="8" :md="8" :lg="5">
        <img src="../../assets/data-import/csv.png" @click="showNewTaskDialog('csv')" class="input-img" ondragstart="return false;">
      </el-col>

    </el-row>
    <!-- 新建任务的模态框 -->
    <el-dialog :visible.sync="newTaskDialogVisable" width="30%" title="新建任务" center>
      <el-form ref="form" label-width="80px" label-position="left">
        <el-form-item label="任务名称">
          <el-input type="text" v-model="newTaskModel.name"></el-input>
        </el-form-item>
        <el-form-item label="数据源">
          <input type="file" ref="obj" @change="importf()" id="excel-input" :accept="accept" />
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="newTaskModel.describe">
          </el-input>
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
import XLSX from "xlsx";
import PreviewTable from "./PrviewTable.vue";
let wb; //读取完成的数据
let rABS = false; //是否将文件读取为二进制字符串
let filename;
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
        file: ""
      },
      tablejsons: null,
      titleIndex: 1,
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
      taskid: 0
    };
  },
  methods: {
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
      if (this.$refs.obj.value == "") {
        this.$message({
          message: "请选择数据源！",
          type: "warning",
          duration: 1500
        });
      } else {
        // alert(localStorage.getItem("token"));
        let query = this.$post(
          "http://120.79.146.91:8000/taskinfo/",
          this.$qs.stringify({
            task_name: this.newTaskModel.name,
            task_desc: this.newTaskModel.describe
          })
        );
        query.then(response => {
          console.log(response);
          this.taskid = response.data.id;
          this.tablePreviewVisable = true;
          this.newTaskDialogVisable = false;
        });
        // this.$axios
        //   .post(
        //     "http://120.79.146.91:8000/taskinfo/",
        //     {
        //       task_name: this.newTaskModel.name,
        //       task_desc: this.newTaskModel.describe
        //     },
        //     {
        //       headers: {
        //         Authorization: "JWT " + localStorage.getItem("token")
        //       }
        //     }
        //   )
        //   .then(response => {
        //     this.taskid = response.data.data.id;
        //     console.log(response);
        //     this.tablePreviewVisable = true;
        //     this.newTaskDialogVisable = false;
        //   })
        //   .catch(response => {
        //     console.log(response.data);
        //   });
      }
    },
    importf() {
      //导入
      let obj = this.$refs.obj;

      this.filename = obj.value.substring(
        obj.value.lastIndexOf("\\") + 1,
        obj.value.lastIndexOf(".")
      );

      if (!obj.files) {
        return;
      }
      var f = obj.files[0];
      var reader = new FileReader();
      let _this = this;
      reader.onload = function(e) {
        var data = e.target.result;
        if (rABS) {
          wb = XLSX.read(btoa(fixdata(data)), {
            //手动转化
            type: "base64"
          });
        } else {
          wb = XLSX.read(data, {
            type: "binary"
          });
        }
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        var jsons = JSON.stringify(
          XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        );
        console.log(jsons);
        _this.tablejsons = JSON.parse(jsons);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    fixdata(data) {
      //文件流转BinaryString
      var o = "",
        l = 0,
        w = 10240;
      for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(
          null,
          new Uint8Array(data.slice(l * w, l * w + w))
        );
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    },
    setTitleIndex: function(index) {
      this.titleIndex = index;
    },
    createTask: function() {
      this.tablePreviewVisable = false;
      //显示json 信息
      // alert(
      //   "{'title':'" +
      //     (this.titleIndex - 1) +
      //     ",'name:'" +
      //     this.newTaskModel.name +
      //     ",'json:'" +
      //     JSON.stringify(this.tablejsons) +
      //     "}"
      // );
      this.$axios
        .post(
          "http://120.79.146.91:8000/dataSet/",
          {
            task: this.taskid,
            title: "数据集名",
            step1: "1",
            step2: "2",
            step3: "3",
            stepX1: "x1",
            title: this.filename,
            row_num: (this.titleIndex - 2).toString(),
            data_set: this.tablejsons
          },
          {
            headers: {
              Authorization: "JWT " + localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log(response);
          var dataSetId = response.data.data.id;
          //创建完成之后，跳转到数据处理页面，传任务ID
          this.$router.push({
            name: "data-processing",
            params: { taskId: this.taskid, dataSetId: dataSetId }
          });
        })
        .catch(response => {});
    }
  }
};
</script>
<style  >
.warp {
  min-width: 600px;
}
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