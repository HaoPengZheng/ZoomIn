<template>
  <div id="app">
    <el-row>
    
    <el-col :span="3" style="padding:30px;"><div> 
      <table-info style="margin-bottom: 30px"></table-info></div>
      <drag ></drag>
    </el-col>
    
    <el-col :span="17">
      <div class="app-border">
        <!-- 由于导航栏的问题，临时下降1px -->
        <el-row style="margin-top:1px"> 
          <el-col :span="24"><div><drop></drop></div></el-col>
          <el-col :span="24"><div style="margin-left:-1px"><drop-filter></drop-filter></div></el-col>
        </el-row>

        <el-row>
        <el-col :span="8"><div><echarts></echarts></div></el-col>
        </el-row>

      </div>
    </el-col>

    <el-col :span="4"><vue-scroll><div><rightBoard/></div></vue-scroll></el-col>

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
export default {
  name: 'App',
  components:{
    drag:drag,
    drop:drop,
    echarts:echarts,
    navigator:navigator,
    rightBoard:rightBoard,
    AxiosDistribute,
    dropFilter,
    tableInfo,
    spanParms:3

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
  

}

.app-border{
  border-left: 1px;
  border-right: 1px;
  border-left-style: solid;
  border-right-style: solid;
  border-color: #D0D0D0;

  /* box-shadow:-2px 0 3px -1px #888888;
  box-shadow:2px 0 3px -1px #888888; */

}

/* 顶替dataProcessing冲突的样式 */
.el-row {
  margin-bottom: 0px;
}
.el-col {
  border-radius: 0px;
}
</style>
