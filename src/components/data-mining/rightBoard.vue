<template>
<div id="rightBoard" style="height:500px">
<el-scrollbar>
    <div style="margin:10px;">
    
    <el-button  type="success" plain style="width:100%" @click="nextClick">下一步</el-button>
      <!-- <el-button  class="nextBtn" @click="nextClick">下一步</el-button> -->
    <el-collapse  v-model="activeNames" class="rightBoard">
      <el-collapse-item title="图表标题" name="1">
        <right-title/>
      </el-collapse-item>
      <el-collapse-item title="模型选择" name="2">
        <modelType/>
      </el-collapse-item>
      <el-collapse-item title="模型2选择" name="3"  v-show="featureConfigurationFlag">
        <modelType/>
      </el-collapse-item>
      <el-collapse-item title="坐标轴设置" name="4">
        <axisOption/>
      </el-collapse-item>
      <el-collapse-item title="图表备注" name="6">
        <rightTips/>
      </el-collapse-item>
    </el-collapse>
    
    </div>
</el-scrollbar>
</div>
</template>

<script>
import Bus from './Bus.js'
import rightTips from './rightOption/rightTips'
import rightTitle from './rightOption/rightTitle'
import rightChartSetting from './rightOption/rightChartSetting'
import featureConfiguration from './rightOption/featureConfiguration'
import chartStyle from './rightOption/chartStyle'
import picFilter from './rightOption/picFilter'
import modelType from './rightOption/modelType'
import axisOption from './rightOption/axisOption'
    export default {
    components:{
        rightTips,
        rightTitle,
        rightChartSetting,
        featureConfiguration,
        chartStyle,
        picFilter,
        modelType,
        axisOption
    },
    data() {
        return {
        input: '',
        featureConfigurationFlag:false,
        activeNames: ['1','2','3','4','5','6']
        }
    },
    mounted(){
      Bus.$on('featureConfigurationFlag',(e)=>{
        this.featureConfigurationFlag = e
      })
      this.autoDivSize()
    },
    methods:{
      autoDivSize(){
        if (window.innerHeight)
                this.winHeight = window.innerHeight;
            else if ((document.body) && (document.body.clientHeight))//通过深入Document内部对body进行检测，获取浏览器窗口高度
                this.winHeight = document.body.clientHeight;
            if (document.documentElement && document.documentElement.clientHeight)
          this.winHeight = document.documentElement.clientHeight;
          
        
        if (window.innerWidth)
                this.winWidth = window.innerWidth;
            else if ((document.body) && (document.body.clientWidth))//通过深入Document内部对body进行检测，获取浏览器窗口高度
                this.winWidth = document.body.clientWidth;
            if (document.documentElement && document.documentElement.clientWidth)
                this.winWidth = document.documentElement.clientWidth;

            //DIV高度为浏览器窗口的高度
        document.getElementById("rightBoard").style.height = this.winHeight*0.95	 + "px";
        //console.log(document.getElementById("rightBoardScrollbar").style.height)
      },
      nextClick(){
        this.$router.push({
          name: "task-release",
          params: {}
        });
      }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

html {
  overflow-x: hidden;
  overflow-y: hidden;

}

/* body {
  width: 100vw;
  overflow: hidden;
  padding-left: calc(100vw - 100%);
} */ 
/* .my-scroll-bar{
    height:200px;
} */
.nextBtn {
  background: #00C587;
  color: #fff;
  border-radius: 7px;
  width : 100%;
  
}
.nextBtn .el-button{
  background: #00C587;
}
.rightBoard{
  text-align: left;
}
.rightBoard .el-collapse-item__arrow{
  float: left;
}
</style>
