<template>
  <el-aside :style="{width:width+'px'}">
    <div class="aside-warp">
      <div style="overflow-y:scroll;width:100%;height:100%;">
        <el-select v-show="!isShrink" value-key="id" filterable reserve-keyword placeholder="搜索任务" style="padding:5px 3px" v-model="taskQueryName" @change="change(taskQueryName)">
          <el-option v-for="item in allTaskInfo" :key="item.id" :label="item.task_name" :value="item">
          </el-option>
        </el-select>
        <el-button v-show="!isShrink"  type="text" style="font-size:16px">
          <i class="el-icon-plus"></i>
        </el-button>
        <hr style="height:1px;border:none;border-top:1px solid #ccc">
        <el-menu :default-active="`/home/task-detail/`+activeNumber" :collapse="isShrink" v-bind:router="true">
          <el-menu-item :index="`/home/task-detail/${task.id}`" v-for="(task,index) in allTaskInfo" :key="index">
            <a @click="showTaskDetail(task.id)">
              <i class="el-icon-document" style=""></i>
              <span slot="title" style="padding-right:80px">{{task.task_name}}</span>
            </a>
            <el-dropdown style="position: absolute;right:20px;">
              <span class="el-dropdown-link">
                <i class="el-icon-more pointer"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="margin:-10px 0!important">
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
    <!-- 数据预览模态框
    <el-dialog :visible.sync="tablePreviewVisable" width="50%" title="数据预览" top="5vh">
      <previewTable :json="tablejsons" v-on:setTitleIndex="setTitleIndex"></previewTable>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tablePreviewVisable = false">取 消</el-button>
        <el-button type="primary" @click="createTask">创建任务</el-button>
      </span>
    </el-dialog> -->
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
    task: "",
    active:"" ,
    taskInfo:"" 
  },
  data() {
    return {
      width: 275,
      isShrink: false,
      toggleTitle: "隐藏侧边栏",
      uploadDataSetDialogVisible: false,
      activeNumber: Number,
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
        this.activeNumber = this.$route.params.id;
        if (this.activeNumber == undefined) {     
          this.activeNumber = this.allTaskInfo[0].id;
        }
        this.showTaskDetail(this.activeNumber);
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
    setTitleIndex: function(index) {
      this.titleIndex = index;
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
      }
    },
    taskInfo: {
      immediate: true,
      deep: true,
      handler: function(val) {
        this.allTaskInfo = val;
      }
    },
    $route(to, from) {
      // 对路由变化作出响应...
      this.activeNumber = to.params.id;
      this.showTaskDetail(to.params.id);
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
