<template>
  <div>
    <div class="application-header-box">
      <div class="application-header ">历史任务</div>
      <!-- 搜索框 -->
      <div style="position: absolute; left: 250px;bottom: 5px;">
        <!-- element的远程搜索示例 -->
        <!-- remote-method="remoteMethod" :loading="loading" -->
        <el-input v-model="queryName" @change="filterTask" placeholder="请输入关键词">
        </el-input>
      </div>
    </div>
    <div style="padding:0 40px;">
      <el-carousel indicator-position="none">
        <el-carousel-item v-for="(tasks,index) in newTaskList" :key="index" interval=5000>
          <el-col :span="4" v-for="(task,index) in tasks" :key="index" :offset="index==0?2:1">
            <Task index :taskName="task.task_name" :createTime="task.add_time.substring(0,10)" :taskid="task.id" v-on:deleteTask="deleteTask" v-on:editTask="editTask">
            </Task>
          </el-col>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 编辑任务名的模态框 -->
    <el-dialog title="编辑任务名" :visible.sync="editDialogVisible" width="30%">
      <el-form ref="form" label-width="80px" label-position="left">
        <el-form-item label="任务名称">
          <el-input type="text" v-model="taskModel.name"></el-input>
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="taskModel.describe">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTask()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分享任务的模态框 -->
    <el-dialog title="分享任务" :visible.sync="shareDialogVisible" width="30%">
      <!-- 上面有个 before-close：handleClose -->
      <span>编辑任务名</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shareDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import Task from "./task.vue";
export default {
  components: {
    Task
  },
  data() {
    return {
      newTaskList: [],
      originList: [],
      taskList: [],
      editDialogVisible: false,
      shareDialogVisible: false,
      taskModel: {
        name: "",
        describe: ""
      },
      editTaskId: "", //
      queryName: ""
    };
  },
  created: function() {
    this.featchTask();
  },
  methods: {
    featchTask: function() {
      this.$axios
        .get("http://120.79.146.91:8000/taskinfo/", {
          headers: {
            Authorization: "JWT " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.originList = response.data;
          this.taskList = response.data;
          this.dealTask();
          console.log(response);
        })
        .catch(response => {
          alert("error");
        });
    },
    dealTask: function() {
      var tasks = [];
      this.newTaskList = [];
      for (var i = 0; i < this.taskList.length; i++) {
        tasks.push(this.taskList[i]);
        if ((i + 1) % 4 == 0) {
          this.newTaskList.push(tasks);
          tasks = [];
        }
      }
      if (tasks.length > 0) {
        this.newTaskList.push(tasks);
      }
    },
    deleteTask: function(id) {
      this.$axios
        .delete("http://120.79.146.91:8000/taskinfo/" + id + "/", {
          headers: {
            Authorization: "JWT " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.$message({
            message: "删除成功",
            type: "success",
            showClose:true,
            duration: 1500
          });
          this.featchTask();
        })
        .catch(response => {
          this.$message({
            message: "删除失败",
            type: "warning",
            showClose:true,
            duration: 1500
          });
        });
    },
    editTask: function(taskid) {
      this.editTaskId = taskid;
      this.$axios
        .get("http://120.79.146.91:8000/taskinfo/" + taskid + "/", {
          headers: {
            Authorization: "JWT " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.taskModel.name = response.data.task_name;
          this.taskModel.describe = response.data.task_desc;
        })
        .catch(response => {
          // alert("error");
        });
      this.editDialogVisible = true;
    },
    updateTask: function() {
      this.editDialogVisible = false;
      //更新接口
      this.$axios
        .put(
          "http://120.79.146.91:8000/taskinfo/" + this.editTaskId + "/",

          {
            task_name: this.taskModel.name,

            task_desc: this.taskModel.describes
          },
          {
            headers: {
              Authorization: "JWT " + localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log(response);
          this.$message.success({
            message: "保存成功",
            showClose: true,
            duration: 2000
          });
          this.fetchTask();
        })
        .catch(err => {
          this.$message.error({
            message: err.response.data.non_field_errors[0],
            showClose: true,
            duration: 1000
          });
          console.log(err.response);
        });
    },
    filterTask: function() {
      let query = this.queryName;
      let taskList = [];
      this.taskList = this.originList;
      for (var i = 0; i < this.taskList.length; i++) {
        if (this.taskList[i].task_name.indexOf(query) != -1) {
          taskList.push(this.taskList[i]);
        }
      }
      this.taskList = taskList;
      this.$set(this.taskList, taskList);
      this.dealTask();
    }
  },
  watch: {
    queryName: {
      handler: function(value, oldValue) {
        this.filterTask();
      }
    }
  }
};
</script>

<style>
.el-main {
  line-height: 40px;
}
.pointer {
  cursor: pointer;
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
.task-class {
  float: left;
  margin: 0 20px;
}
</style>


