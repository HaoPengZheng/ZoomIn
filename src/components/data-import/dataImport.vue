<template>
  <el-container>
    <el-container>
      <el-main>
        <!-- 新建任务部分 -->
        <div>
          <NewTask></NewTask>
        </div>
        <!-- 历史任务部分 -->
        <div>
          <OldTask></OldTask>
        </div>
        <!-- 分享任务部分 -->
        <!-- <div>
          <ShareTask></ShareTask>
        </div> -->
        <Myfooter style="margin-top:150px"></Myfooter>
      </el-main>

      <!-- <el-footer>
               
            </el-footer> -->
    </el-container>
  </el-container>
</template>
<script>
import Myfooter from "../common/footer.vue";
import NewTask from "./NewTask.vue";
import OldTask from "./oldTask.vue";
import ShareTask from "./shareTask.vue";
// import Left from '../common/left.vue'

export default {
  components: {
    Myfooter,
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
    this.$store.commit('changeIndex',{index:"dataImport"})
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
html,body{
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
.el-main{
  padding: 0 10%;
}
</style>
