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
    // this.$axios
    //     .post(
    //       "http://120.79.146.91:8000/task/dataProcessing/filters",
    //       {
    //         data_set_id: "26",
    //         logical_type: this.conditionType,
    //         filter: this.filterData
    //       },
    //       {
    //         headers: {
    //           Authorization: "JWT " + localStorage.getItem("token")
    //         }
    //       }
    //     )
    //     .then(response => {
    //       alert("成功");
    //       console.log(response);
    //     })
    //     .catch(response => {
    //       alert("error");
    //     });
  },
  methods: {
    fetchTask: function() {
      this.$axios
        .get("http://120.79.146.91:8000/taskinfo/", {
          headers: {
            Authorization: "JWT " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.taskInfo = response.data;
        })
        .catch(response => {
          alert("error");
        });
    },
    fetchTaskById: function() {
      this.$axios.post("");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    updateDetail: function(id) {
      this.taskId = id;
      this.activeIndex = id;
      if (id == undefined || id == null) {
        return;
      }
      this.$axios
        .get("http://120.79.146.91:8000/taskinfo/" + id + "/", {
          headers: {
            Authorization: "JWT " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.form.taskname = response.data.task_name;
          this.form.createTime = response.data.add_time;
          this.form.remarks = response.data.task_desc;
          this.form.author = response.data.user;
        })
        .catch(response => {
          // alert("error");
        });
    },
    updateTask: function() {
      this.$axios
        .put(
          "http://120.79.146.91:8000/taskinfo/" + this.taskId + "/",

          {
            task_name: this.form.taskname,

            task_desc: this.form.remarks
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
            message:'保存成功',
            showClose:true,
            duration:1000
          });
          this.fetchTask();
        })
        .catch(err => {
          this.$message.error({
            message:err.response.data.non_field_errors[0],
            showClose:true,
            duration:1000
          });
          console.log(err.response)
        });
    }
  }
};
</script>

<style>
</style>

