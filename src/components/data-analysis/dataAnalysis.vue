<template>
  <div id="app">
    <el-row>
    <el-col :span="spanParms[0]" class="leftBoardStyle">

      <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix">
          <span style="font-family:微软雅黑;font-size:14px;">工作表信息</span>
          <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-setting"></i></el-button>
        </div>
          <table-info></table-info>
      </el-card>

      <el-button @click="btnClick" class="sizeBtn" id="sizeBtn">
        <icon name="angle-left" v-show="iconFlag"></icon>
        <icon name="angle-right" v-show="!iconFlag"></icon>
      </el-button>

      <el-card id="analysisDrag">
        <div slot="header" class="clearfix">
          <span style="font-family:微软雅黑;font-size:14px;">维度数值</span>
          <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-setting"></i></el-button>
        </div>
        <drag></drag>
      </el-card>


    </el-col>
    
    <el-col :span="spanParms[1]">
      <div class="app-border">
        <!-- 由于导航栏的问题，临时下降1px -->
        <el-row style="margin-top:1px"> 
          <el-col :span="24"><div style="margin-left:15px;margin-right:20px"><drop></drop></div></el-col>
          <el-col :span="24"><div style="margin-left:15px;margin-right:20px"><drop-filter></drop-filter></div></el-col>
        </el-row>

        <el-row>
        <el-col :span="8"><div  style="margin:-6px;width:80%"><echarts></echarts></div></el-col>
        </el-row>

      </div>
    </el-col>

    <el-col :span="spanParms[2]"><vue-scroll><div><rightBoard/></div></vue-scroll></el-col>

    </el-row>

    <axios-distribute></axios-distribute>
    
  </div>
</template>

<script>
import drag from './drag'
import drop from './drop'
import dropFilter from './dropFilter'
import echarts from './echarts'
import rightBoard from './rightBoard'
import AxiosDistribute from './AxiosDistribute'
import tableInfo from './tableInfo'
import Bus from './Bus.js'
export default {
  name: 'App',
  components:{
    drag:drag,
    drop:drop,
    echarts:echarts,
    rightBoard:rightBoard,
    AxiosDistribute,
    dropFilter,
    tableInfo
  },
  data(){
    return{
      isCollapse: true,
      spanParms:[3,17,4],
      hackReset:true,
      leftFlag:true,
      iconFlag:true
    }
  },
  methods:{
    btnClick(){
      Bus.$emit('leftChange',this.leftFlag)
       if(this.leftFlag)this.spanParms=[1,22,1]
       else this.spanParms=[3,17,4]
       this.leftFlag = !this.leftFlag
       this.iconFlag = !this.iconFlag
    }    
  },
  mounted(){
    document.getElementById("sizeBtn").style.marginTop = document.getElementById("app").offsetHeight/4+'px';
    document.getElementById("analysisDrag").style.height = document.getElementById("app").offsetHeight/1.3+'px';
    
  }
}
</script>

<style scoped>

#app {
  font-family: "Microsoft YaHei","微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
    color: #5A616A;
  overflow-y:hidden;

}

.app-border{
  border-left: 0px;
  border-right: 0px;
  border-left-style: solid;
  border-right-style: solid;
  border-color: #888888;
  /* box-shadow:0px -5px 10px 4px #D0D0D0  inset; */
  /* 第三个阴影宽度 */
  /* box-shadow:-2px 0 3px -1px #888888;
  box-shadow:2px 0 3px -1px #888888; #D0D0D0*/

}

/* 顶替dataProcessing冲突的样式 */
.el-row {
  margin-bottom: 0px;
}
.el-col {
  border-radius: 0px;
}
.sizeBtn{
  width: 1px;
  position:absolute;
  right:0px;
  margin-top:30px;
  border: 0px
}
.leftBoardStyle{
  padding:10px;
  background:#fff;
  position: relative;
}
</style>
