<template>
  <div id="app">
    <el-row>
    
    <el-col :span="4"><div style="margin:25px;margin-left:-5px;">
      <img src="@/assets/logo.png"><table-info></table-info></div><drag></drag>
    </el-col>
    
    <el-col :span="16">
      <div class="app-border">

        <el-row>
          <el-col :span="24"><div><drop></drop></div></el-col>
          <el-col :span="24"><div><drop-filter></drop-filter></div></el-col>
        </el-row>

        <el-row>
        <el-col :span="8"><div><echarts></echarts></div></el-col>
        </el-row>

      </div>
    </el-col>

    <el-col :span="4"><div><rightBoard/></div></el-col>

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
    tableInfo

  }
}
</script>

<style scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  
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
