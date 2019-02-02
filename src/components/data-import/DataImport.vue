<template>
  <el-container>
    <el-container>
      <el-main>
        <!-- 新建任务部分 -->
        <div>
          <new-task></new-task>
        </div>
        <!-- 历史任务部分 -->
        <div>
          <old-task></old-task>
        </div>
        <!-- 分享任务部分 -->
        <!-- <div>
          <ShareTask></ShareTask>
        </div> -->
        <my-footer style="margin-top:150px"></my-footer>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import MyFooter from "../common/footer.vue";
import NewTask from "./NewTask.vue";
import OldTask from "./oldTask.vue";
import ShareTask from "./shareTask.vue";
// import Left from '../common/left.vue'

export default {
  components: {
    MyFooter,
    NewTask,
    OldTask,
    ShareTask
  },
  data() {
    return {
      allTaskList: []
    };
  },
  created: function() {
    this.$store.commit("changeIndex", { index: "dataImport" });
    // this.$axios
    //   .get("http://120.79.146.91:8000/taskinfo/", {
    //     headers: {
    //       Authorization: "JWT " + localStorage.getItem("token")
    //     }
    //   })
    //   .then(response => {
    //     this.allTaskList = response.data;
    //   })
    //   .catch(response => {
    //     this.$message({
    //       message: "出错了",
    //       type: "warning",
    //       duration: 1500
    //     });
    //   });
  }
};
</script>
<style scoped>
html,
body {
  min-width: 600px;
}
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  height: 80px !important;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-main {
  padding: 0 10%;
}
</style>
