<template>
  <el-aside :style="{width:width+'px'}">
    <div class="aside-warp">

      <div style="overflow-y:scroll;width:100%;height:100%;">
        <!-- :remote-method="remoteMethod" :loading="loading" -->
        <el-select v-show="!isShrink" value-key="id" filterable reserve-keyword placeholder="搜索任务" style="padding:5px;" v-model="taskQueryName" @change="change(taskQueryName)">
          <el-option v-for="item in allTaskInfo" :key="item.id" :label="item.task_name" :value="item">
          </el-option>
        </el-select>
        <el-button v-show="!isShrink" @click="newTaskDialogVisable = true" type="text" style="font-size:16px">
          <i class="el-icon-plus"></i>
        </el-button>
        <hr style="height:1px;border:none;border-top:1px solid #ccc">
        <el-menu :default-active="activeIndex==undefined?'':activeIndex+''" :collapse="isShrink">
          <el-menu-item :index="task.id==undefined?'':task.id+''" v-for="(task,index) in allTaskInfo" :key="index">
            <a @click="showTaskDetail(task.id)">
              <i class="el-icon-document" style=""></i>
              <span slot="title" style="padding-right:80px">{{task.task_name}}</span>
            </a>
            <el-dropdown style="position: absolute;right:20px;">
              <span class="el-dropdown-link">
                <i class="el-icon-more pointer"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="margin:-10px 0!important">
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item @click.native="deleteTask(task.id)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
      </div>

      <a @click="shrink" :title="toggleTitle">
        <template v-if="isShrink === false">
          <icon name="angle-left" class="shrink"></icon>
        </template>
        <template v-else>
          <icon name="angle-right" class="shrink"></icon>
        </template>
      </a>
    </div>
    <el-dialog title="上传数据集" :visible.sync="uploadDataSetDialogVisible" width="30%">
      <div style="margin:0 auto">
        <el-upload class="upload-demo" style="padding:0 10%" drag multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传excel,csv文件 </div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
  </el-aside>
</template>
<script>
import XLSX from "xlsx";
import PreviewTable from "../data-import/PrviewTable.vue";
let wb; //读取完成的数据
let rABS = false; //是否将文件读取为二进制字符串
let filename;
export default {
  components: {
    PreviewTable
  },
  props: {
    task: Array,
    active: Number,
    taskInfo: Array
  },
  data() {
    return {
      width: 275,
      isShrink: false,
      toggleTitle: "隐藏侧边栏",
      uploadDataSetDialogVisible: false,
      activeNumber: Number,
      activeIndex: String,
      allTaskInfo: this.taskInfo,
      taskQueryName: {
        id: "",
        task_name: ""
      },
      // 滚动条配置
      ops: {
        vuescroll: {},
        scrollPanel: {},
        scrollContent: {}, // only for native-mode
        rail: {
          background: "#01a99a",
          opacity: 0,
          /** Rail's size(Height/Width) , default -> 6px */
          size: "6px"
        },
        bar: {
          background: "#90929880"
        }
      },
      value: "",
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
  created: function() {
    this.fetchTask();
    console.log(`taskInfo is ${this.taskInfo}`);
  },
  methods: {
    change: function(task) {
      this.$emit("updateDetail", task.id);
    },
    fetchTask: function() {
      let query = this.$get("/taskinfo");
      query.then(response => {
        this.allTaskInfo = response;
        console.log(this.allTaskInfo[0].id);
        // this.showTaskDetail(this.taskInfo[0].id);
        // this.$emit("updateDetail", this.taskInfo[0].id);
        // console.log(response);
        // 默认第一个
        if (this.activeNumber == undefined) {
          this.activeNumber = this.allTaskInfo[0].id;
          this.showTaskDetail(this.allTaskInfo[0].id);
          this.activeIndex = this.activeNumber.toString();
        }
      });
    },
    shrink: function() {
      if (this.isShrink) {
        this.isShrink = false;
        this.width = 275;
        this.toggleTitle = "隐藏侧边栏";
      } else {
        this.isShrink = true;
        this.width = 81;
        this.toggleTitle = "显示侧边栏";
      }
    },
    taskDetailInfo: function(id) {
      this.$router.push({ name: "task-detail", params: { taskId: id } });
    },
    showTaskDetail: function(id) {
      this.activeNumber = id;
      this.taskQueryName = "";
      this.$emit("updateDetail", id);
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
      if (this.$refs.obj.value == "") {
        this.$message({
          message: "请选择数据源！",
          type: "warning"
        });
      } else {
        this.$axios
          .post(
            "http://120.79.146.91:8000/taskinfo/",
            {
              task_name: this.newTaskModel.name,

              task_desc: this.newTaskModel.describe
            },
            {
              headers: {
                Authorization: "JWT " + localStorage.getItem("token")
              }
            }
          )
          .then(response => {
            this.taskid = response.data.id;
            this.tablePreviewVisable = true;
            this.newTaskDialogVisable = false;
          })
          .catch(response => {
            console.log(response.data);
          });
      }
    },
    importf() {
      //导入
      let obj = this.$refs.obj;
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
        x;
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
      alert(
        "{'title':'" +
          (this.titleIndex - 1) +
          ",'name:'" +
          this.newTaskModel.name +
          ",'json:'" +
          JSON.stringify(this.tablejsons) +
          "}"
      );

      this.$axios
        .post(
          "http://120.79.146.91:8000/dataSet/",
          {
            task: this.taskid,
            title: "数据集名",
            step1: "1",
            step2: "2",
            step3: "3",
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
        .catch(response => {
          alert("出错了");
        });
    },
    deleteTask: function(id) {
      this.$toDelete("/taskinfo/" + id + "/").then(response => {
        if (this.activeNumber == id) {
          this.activeNumber = undefined;
        }
        this.fetchTask();
        this.showTaskDetail(this.activeNumber);
        console.log(response);
      });
    }
  },
  watch: {
    active: {
      immediate: true,
      handler: function(val) {
        this.activeNumber = val;
        this.activeIndex = val;
      }
    },
    taskInfo: {
      immediate: true,
      deep: true,
      handler: function(val) {
        this.allTaskInfo = val;
      }
    }
  }
};
</script>
<style>
.aside-warp {
  position: relative;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}
.shrink {
  position: absolute;
  right: -17px;
  color: #777;
  top: 389px;
  width: 50px;
  height: 30px;
  cursor: pointer;
}
.hide {
  display: none;
}
.no-btn {
  border: 0px;
  background: none;
}
.el-menu-item {
  cursor: default;
}
a,
.pointer {
  cursor: pointer;
}
</style>
