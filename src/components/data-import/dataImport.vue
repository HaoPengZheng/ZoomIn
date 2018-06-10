<template>
    <el-container>
        
        <Left></Left>  
        <el-container>  
            <el-main>
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="(task,index) in tasks" :key="index">
                    <h3>{{ task.name }}</h3>
                    <h4>{{task.time}}</h4>
                    </el-carousel-item>
                </el-carousel>
                <div>
                    <NewTask></NewTask> 
                </div>
            </el-main>
  
            <el-footer>
                <Myfooter></Myfooter>
            </el-footer>
            </el-container>
    </el-container>    
</template>
<script>
import Myfooter from '../common/footer.vue'
import NewTask from './newTask.vue'
import Left from '../common/left.vue'

export default {
    components:{
        Myfooter,NewTask,Left
    },
    data(){
        return {
            tasks:[{
                name:"任务1",
                time:"2018年6月2日17:22:23"
            },{
                name:"任务1",
                time:"2018年6月2日17:22:23"
            },{
                name:"任务1",
                time:"2018年6月2日17:22:23"
            }]
        }
    }
}
</script>
<style>
  .el-footer {
    background-color: #FFF;
    color: #333;
    text-align: center;
    height: 80px!important;
  }
</style>
