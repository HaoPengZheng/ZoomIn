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
                <div>
                    <ShareTask></ShareTask>
                </div>
                <!-- <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="(task,index) in tasks" :key="index">
                    <h3>{{ task.name }}</h3>
                    <h4>{{task.time}}</h4>
                    </el-carousel-item>
                </el-carousel> -->
                <Myfooter></Myfooter>
            </el-main>

            <!-- <el-footer>
               
            </el-footer> -->
        </el-container>
    </el-container>
</template>
<script>
import Myfooter from "../common/footer.vue";
import NewTask from "./newTask.vue";
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
      tasks: [
        {
          name: "任务1",
          time: "2018年6月2日17:22:23"
        },
        {
          name: "任务1",
          time: "2018年6月2日17:22:23"
        },
        {
          name: "任务1",
          time: "2018年6月2日17:22:23"
        }
      ],
      allTaskList: []
    };
  },
  created: function() {
    this.$axios
      .get("http://120.79.146.91:8000/taskinfo/", {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token")
        }
      })
      .then(response => {
        this.allTaskList = response.data;
      })
      .catch(response => {
        alert("出错了");
      });
  }
};
</script>
<style>
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  height: 80px !important;
}
.el-main {
  padding: 0 10%!important;
  /* 页面左右空白    */
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
</style>
