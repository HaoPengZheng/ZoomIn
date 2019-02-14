<template>
  <div id="app">
    <el-row>
      <el-col :span="spanParms[0]" class="leftBoardStyle" id="leftBoardStyle">
        <el-button @click="btnClick" class="sizeBtn" id="sizeBtn">
          <icon name="angle-left" v-show="iconFlag"></icon>
          <icon name="angle-right" v-show="!iconFlag"></icon>
        </el-button>
        <!-- <transition name="el-zoom-in-center"> -->
        <div v-show="leftVisiable" class="transition-box">
          <table-info style="margin-bottom: 50px" v-show="leftVisiable"></table-info>
          <div class="demo_line_02" id="demo_line_02">
            <span>维度数值</span>
          </div>
          <vue-scroll style="margin-top:30px;">
            <div>
              <drag></drag>
            </div>
          </vue-scroll>
        </div>
        <!-- </transition> -->
      </el-col>

      <el-col :span="spanParms[1]">
        <div class="app-border" id="app-border">
          <!-- 由于导航栏的问题，临时下降1px -->
          <el-row style="margin-top:1px" id="drop">
            <el-card style="margin:15px;margin-bottom:-5px">
              <el-col :span="24">
                <div style="margin-left:15px;margin-right:20px;margin-top:-15px">
                  <drop></drop>
                </div>
              </el-col>
              <el-col :span="24">
                <div style="margin-left:15px;margin-right:20px;margin-bottom:5px">
                  <drop-filter></drop-filter>
                </div>
              </el-col>
            </el-card>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div>
                <echarts></echarts>
              </div>
            </el-col>
          </el-row>

        </div>
      </el-col>

      <el-col :span="spanParms[2]" style="box-shadow: -10px 10px 20px -10px rgba(0,0,0,0.1);">
        <vue-scroll>
          <div>
            <rightBoard/>
          </div>
        </vue-scroll>
      </el-col>

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
    components: {
      drag: drag,
      drop: drop,
      echarts: echarts,
      rightBoard: rightBoard,
      AxiosDistribute,
      dropFilter,
      tableInfo
    },
    data() {
      return {
        isCollapse: true,
        spanParms: [3, 17, 4],
        hackReset: true,
        leftFlag: true,
        iconFlag: true,
        leftVisiable: true
      }
    },
    created() {
      this.$store.commit('changeIndex', {index: "dataAnalysis"})
    },
    methods: {
      btnClick() {
        Bus.$emit('leftChange', this.leftVisiable)
        if (this.leftFlag) this.spanParms = [1, 22, 1]
        else this.spanParms = [3, 17, 4]
        this.leftFlag = !this.leftFlag
        this.iconFlag = !this.iconFlag
        this.leftVisiable = !this.leftVisiable
      }
    },
    mounted() {
      console.log(document.getElementById('demo_line_02').offsetTop)
      console.log(document.getElementById('app-border').offsetHeight)
      // document.getElementById('dragCon').style.height=document.getElementById('app-border').offsetHeight-document.getElementById('demo_line_02').offsetTop-55+'px'
      // document.getElementById('dragCon').style.height = 480 + 'px'
      document.getElementById('dragCon').style.height = document.getElementById('app-border').offsetHeight-document.getElementById('demo_line_02').offsetTop-50 + 'px'


      document.getElementById("sizeBtn").style.marginTop = document.getElementById("app").offsetHeight / 2.5 + 'px';
    }
  }
</script>

<style scoped>

  #app {
    font-family: "Microsoft YaHei", "微软雅黑";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #5A616A;
    overflow: hidden;

  }

  .app-border {
    border-left: 0px;
    border-right: 0px;
    border-left-style: solid;
    border-right-style: solid;
    border-color: #D0D0D0;
    /*box-shadow: 0px 10px 30px 0 rgba(0,0,0,0.1) inset;*/

  }

  /* 顶替dataProcessing冲突的样式 */
  .el-row {
    margin-bottom: 0px;
  }

  .el-col {
    border-radius: 0px;
  }

  .sizeBtn {
    width: 1px;
    position: absolute;
    right: 0px;
    margin-top: 30px;
    border: 0;
    z-index: 999;
  }

  .leftBoardStyle {
    padding: 10px;
    background: #fff;
    position: relative;
    box-shadow: 10px 10px 20px -10px rgba(0, 0, 0, 0.1);
  }

  .demo_line_02 {
    height: 1px;
    border-top: 1px solid rgb(200, 200, 200);
    text-align: center;
  }

  .demo_line_02 span {
    position: relative;
    top: -8px;
    background: #fff;
    padding: 0 20px;

  }
</style>
