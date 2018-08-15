<template>
<div id="rightBoard">
  <GeminiScrollbar style="height:600px" class="my-scroll-bar">
    <div style="margin:10px;">
    <el-collapse  v-model="activeNames" >
      <el-collapse-item title="图表标题" name="1">
        <right-title/>
      </el-collapse-item>
      <el-collapse-item title="图表类型" name="2">
        <rightChartSetting/>
      </el-collapse-item>
      <el-collapse-item title="图表备注" name="3">
        <rightTips/>
      </el-collapse-item>
      <el-collapse-item title="功能配置" name="4" v-show="featureConfigurationFlag">
        <featureConfiguration/>
      </el-collapse-item>
      <el-collapse-item title="图表样式" name="5"  v-show="featureConfigurationFlag">
        <chartStyle/>
      </el-collapse-item>
    </el-collapse>
    </div>
  </GeminiScrollbar>
</div>
</template>

<script>
import Bus from './Bus.js'
import rightTips from './rightOption/rightTips'
import rightTitle from './rightOption/rightTitle'
import rightChartSetting from './rightOption/rightChartSetting'
import featureConfiguration from './rightOption/featureConfiguration'
import chartStyle from './rightOption/chartStyle'

    export default {
    components:{
        rightTips,
        rightTitle,
        rightChartSetting,
        featureConfiguration,
        chartStyle
    },
    data() {
        return {
        input: '',
        featureConfigurationFlag:false,
        activeNames: ['1','2','3','4']
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
        //document.getElementById("rightBoardScrollbar").style.height = this.winHeight*0.95	 + "px";
        //console.log(document.getElementById("rightBoardScrollbar").style.height)
      }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

html {
  overflow-x: hidden;

}
/* body {
  width: 100vw;
  overflow: hidden;
  padding-left: calc(100vw - 100%);
} */ 
/* .my-scroll-bar{
    height:200px;
} */
</style>
