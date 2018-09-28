<template>
  <div id="app">
    <el-row style="margin-top:1px;">
    <el-col :span="spanParms[0]" style="padding:20px;background:#fff" >
      <div><table-info style="margin-bottom: 30px"></table-info></div>
      <el-button @click="btnClick" style="float:right;margin-right:-20px;">
        <icon name="angle-right" v-show="iconFlag"></icon>
        <icon name="angle-left" v-show="!iconFlag"></icon>
      </el-button>
      <drag></drag>
    </el-col>
    
    <el-col :span="spanParms[1]">
      <div class="app-border" >
        <!-- 由于导航栏的问题，临时下降1px -->
        <el-row style="margin-top:1px;" > 
          <el-col :span="24"><div style="margin-left:15px;margin-right:20px"><drop></drop></div></el-col>
          <el-col :span="24"><div style="margin-top:5px;margin-left:15px"><model-parms></model-parms></div></el-col>
        </el-row>

        <el-row>
        <el-col :span="8"><div><echarts></echarts></div></el-col>
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
import modelParms from './modelParms'
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
    tableInfo,
    modelParms
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
  mounted(){

    
  },
  methods:{
    btnClick(){
      Bus.$emit('leftChange',this.leftFlag)
       if(this.leftFlag)this.spanParms=[1,22,1]
       else this.spanParms=[3,17,4]
       this.leftFlag = !this.leftFlag
       this.iconFlag = !this.iconFlag
    }
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
  border-left: 0px;
  border-right: 0px;
  border-left-style: solid;
  border-right-style: solid;
  border-color: #D0D0D0;
  box-shadow:0px -10px 10px 7px rgb(224, 224, 224)  inset;
  /* #F0F2F3 */
  /* rgb(224, 224, 224) */
}
.dataMing-border-left{
  border-right: 1px;
  border-right-style: solid;
  border-color: #D0D0D0;
  box-shadow:-2px 0 1px -1px #888888;
}
/* 顶替dataProcessing冲突的样式 */
.el-row {
  margin-bottom: 0px;
}
.el-col {
  border-radius: 0px;
}

</style>
