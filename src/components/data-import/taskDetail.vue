<template>
  <el-container>
    <Left :active="activeIndex" v-on:updateDetail="updateDetail" :taskInfo="taskInfo">
    </Left>
    <el-container>
      <el-main style="margin-top:20px;padding:0 10%;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="任务详情" name="first">
            <el-form ref="task-form" :model="form" label-width="100px">
              <el-form-item label="任务名称:">
                <el-col :span="12 ">
                  <el-input v-model="form.taskname"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="创建时间:">
                <el-col :span="12">
                  <el-input v-model="form.createTime" disabled></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="属性:">
                <el-col :span="12">
                  <el-input v-model="form.taskType" disabled></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="创建者:">
                <el-col :span="12">
                  <el-input v-model="form.author" disabled></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="编辑者:">
                <el-col :span="12">
                  <el-input v-model="form.editer"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="任务备注:">
                <el-col :span="12">
                  <el-input type="textarea" :rows="5" v-model="form.remarks"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-col :span="12">
                  <el-button>重置</el-button>
                  <el-button type="primary" @click="updateTask">保存</el-button>
                </el-col>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="图表详情" name="second">
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Left from "../common/task_left.vue";
export default {
  components: {
    Left
  },
  data() {
    return {
      taskId: "",
      form: {
        taskname: "",
        createTime: "2018-7-29 只读",
        taskType: "分享任务",
        author: "作者只读",
        editer: "",
        remarks: ""
      },
      activeName: "first",
      activeIndex: "",
      taskInfo: Array
    };
  },
  created: function() {
    this.fetchTask();
    this.updateDetail(this.$route.params.taskId);
  },
  methods: {
    fetchTask: function() {
      let query = this.$get("/taskinfo/");
      query.then(response => {
        this.taskInfo = response;
      });
    },
    fetchTaskById: function() {
      this.$axios.post("");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    updateDetail: function(id) {
      this.taskId = id;
      this.activeIndex = id;
      if (id == undefined || id == null) {
        return;
      }
      this.$get("/taskinfo/" + id + "/").then(response => {
        this.form.taskname = response.task_name;
        this.form.createTime = response.add_time;
        this.form.remarks = response.task_desc;
        this.form.author = response.user;
      });
    },
    updateTask: function() {
      this.$put("/taskinfo/" + this.taskId + "/",this.$qs.stringify({
        task_name: this.form.taskname,
        task_desc: this.form.remarks
      })).then(response => {
        this.$message.success({
          message: "保存成功",
          showClose: true,
          duration: 1000
        });
        this.fetchTask();
      });
    }
  }
};
</script>

<style>
</style>

