<template>
  <div id="rightBoard" style="height:500px;position:relaitve;">
    <el-scrollbar>
      <div style="margin:10px;">
        <el-button  type="success" plain style="width:100%;" @click="nextClick">下一步</el-button>
        
<draggable>			
				
   

        <el-card style="margin-top:10px;margin-bottom:10px">
          <div slot="header" class="clearfix">
            <span style="font-family:微软雅黑;font-size:14px;">图表标题</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-setting"></i></el-button>
          </div>
          <right-title/>
        </el-card>

        <el-card style="margin-top:10px;margin-bottom:10px">
          <div slot="header" class="clearfix">
            <span style="font-family:微软雅黑;font-size:14px;">图表类型</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-setting"></i></el-button>
          </div>
          <rightChartSetting/>
        </el-card>

        <el-card style="margin-top:10px;margin-bottom:10px">
          <div slot="header" class="clearfix">
            <span style="font-family:微软雅黑;font-size:14px;">图表样式</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-setting"></i></el-button>
          </div>
          <chartStyle/>
        </el-card>

        <el-card style="margin-top:10px;margin-bottom:10px">
          <div slot="header" class="clearfix">
            <span style="font-family:微软雅黑;font-size:14px;">功能配置</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-setting"></i></el-button>
          </div>
          <featureConfiguration/>
        </el-card>

        <el-card style="margin-top:10px;margin-bottom:10px">
          <div slot="header" class="clearfix">
            <span style="font-family:微软雅黑;font-size:14px;">图内筛选器</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-setting"></i></el-button>
          </div>
          <picFilter/>
        </el-card>

        <el-card style="margin-top:10px;margin-bottom:10px">
          <div slot="header" class="clearfix">
            <span style="font-family:微软雅黑;font-size:14px;">图表备注</span>
            <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-setting"></i></el-button>
          </div>
          <rightTips/>
        </el-card>
			

</draggable>



      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import Bus from "./Bus.js";
import rightTips from "./rightOption/rightTips";
import rightTitle from "./rightOption/rightTitle";
import rightChartSetting from "./rightOption/rightChartSetting";
import featureConfiguration from "./rightOption/featureConfiguration";
import chartStyle from "./rightOption/chartStyle";
import draggable from 'vuedraggable' 
import picFilter from './rightOption/picFilter'

export default {
  components: {
    rightTips,
    rightTitle,
    rightChartSetting,
    picFilter,
    featureConfiguration,
    chartStyle,
    draggable
  },
  data() {
    return {
      input: "",
      featureConfigurationFlag: false,
    };
  },
  mounted() {
    Bus.$on("featureConfigurationFlag", e => {
      this.featureConfigurationFlag = e;
    });
    this.autoDivSize();
  },
  methods: {
    autoDivSize() {
      if (window.innerHeight) this.winHeight = window.innerHeight;
      else if (document.body && document.body.clientHeight)
        //通过深入Document内部对body进行检测，获取浏览器窗口高度
        this.winHeight = document.body.clientHeight;
      if (document.documentElement && document.documentElement.clientHeight)
        this.winHeight = document.documentElement.clientHeight;

      if (window.innerWidth) this.winWidth = window.innerWidth;
      else if (document.body && document.body.clientWidth)
        //通过深入Document内部对body进行检测，获取浏览器窗口高度
        this.winWidth = document.body.clientWidth;
      if (document.documentElement && document.documentElement.clientWidth)
        this.winWidth = document.documentElement.clientWidth;

      //DIV高度为浏览器窗口的高度
      document.getElementById("rightBoard").style.height = this.winHeight*0.95	 + "px";
      //console.log(document.getElementById("rightBoardScrollbar").style.height)
    },
    nextClick() {
      this.$router.push({
        name: "task-release",
        params: {}
      });
    }
  }
};
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
