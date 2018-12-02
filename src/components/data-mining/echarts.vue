<template>
  <div>
    <div class="box-card miningCardStyle" id="echartsCard">

      <!-- <el-popover  placement="bottom" trigger="hover" style="float:right">
                <a v-if="errorSumFlag">{{errorSumTips}}</a>
                <img :src="errorSumTips" v-if="!errorSumFlag" style="width:105%;height:105%">
            <el-button slot="reference" size="small" ><i class="el-icon-info" style="float:left"></i>&nbsp;误差信息</el-button>
            </el-popover> -->
      <el-tabs type="border-card" id="myChart" v-loading="loading" element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-tab-pane id="chartData">
          <span slot="label"><i class="el-icon-date"></i> 图表数据</span>
          <!-- 未显示图表时 -->
          <div class="echarts-font" id="font-position" v-show="bgFlag"></div>
          <img src="@/assets/chartBg.png" style="width:90%;height:90%;" v-show="bgFlag">
          <!-- 这里单独定义显示变量 -->
          <img :src="picPath" style="width:90%;height:90%;margin:45px;" v-show="regressionFlag">
          <!-- 表格部分 -->
          <el-table
            :data="tableData"
            stripe border
            style="width: 100%"
            v-if="tableVisible">
            <el-table-column
              v-for="(item,index) in fields"
              :key="index"
              :prop=item
              :label=item
              align="center"
            >
            </el-table-column>
          </el-table>

          <img :src="clusterImg[0]" style="width:90%;height:90%;margin:45px;" v-show="axisClusterFlag">
          <el-carousel v-show="carouselFlag" :height="ClusterHeight">
            <el-carousel-item>
              <img :src="clusterImg[0]" style="width:90%;height:90%;margin:45px;">
            </el-carousel-item>
            <el-carousel-item>
              <img :src="clusterImg[1]" style="width:90%;height:90%;margin:45px;">
            </el-carousel-item>
            <el-carousel-item>
              <img :src="clusterImg[2]" style="width:90%;height:90%;margin:45px;">
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>

        <el-tab-pane :label="errorLabel" id="errorInfo">
          <a v-if="errorSumFlag">{{errorSumTips}}</a>
          <img :src="errorSumTips" v-if="!errorSumFlag" style="width:100%;height:100%">

        </el-tab-pane>
      </el-tabs>


      <!-- <div id="myChart" :style="{width: '0px', height: '0px'}" ref="myChart"  v-loading="loading"> -->

      <!-- 未显示图表时 -->
      <!-- <div class="echarts-font" id="font-position"  v-show="bgFlag" v-loading="loading">当前图表无数据</div>
              <img src="@/assets/chartBg.png" style="width:90%;height:90%;margin:45px;margin-top:10px"  v-show="bgFlag"> -->

      <!-- 这里单独定义显示变量 -->
      <!-- <img :src="picPath" style="width:90%;height:90%;margin:45px;"  v-show="regressionFlag"> -->

      <!-- <el-carousel indicator-position="outside" :height="ClusterHeight" v-if="ClusterFlag">
                  <el-carousel-item v-for="item in 3" :key="item">
                  <img :src="picPath" style="width:100%;height:100%;">
                  </el-carousel-item>
              </el-carousel> -->

      <!-- 表格部分 -->
      <!-- <el-table
              :data="tableData"
              stripe border
              style="width: 100%"
              v-if="tableVisible">
              <el-table-column
              v-for="(item,index) in fields"
                  :key="index"
                  :prop= item
                  :label= item
                  align="center"
                  >
              </el-table-column>
              </el-table> -->
      <!-- </div> -->


    </div>
  </div>
</template>

<script>
  import Bus from './Bus.js'
  import 'echarts/theme/macarons.js'
  import 'echarts/theme/vintage.js'
  import 'echarts/theme/dark.js'
  import 'echarts/theme/infographic.js'
  import 'echarts/theme/shine.js'
  import 'echarts/theme/roma.js'
  import bg from '@/assets/chartBg.png'

  export default {
    name: 'echarts',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        echartAxiosData: [],
        originAxiosData: [],
        winHeight: 0,
        winWidth: 0,
        yAxisItemName: [],
        Xdata: [],
        xAxisItem: [],
        seriesData: [],
        seriesDataItem: [],
        myChart: {},
        option: {},
        chartStyle: 'macarons',
        chartTitle: '图表标题',
        markPointArray: new Array(),
        //表格数据
        tableData: [],
        fields: [],
        dropdownArray: [],
        dropdownItemArray: [],//图内筛选器的选项
        tableVisible: false,
        chartYAxis: [{name: '', type: 'value'}],
        chartId: 1,
        picPath: bg,
        clusterImg: [bg, bg, bg],
        xAxisString: '',
        yAxisString: '',
        test_size: 0.7,
        mth_power: 0,
        error_type: 1,
        category: 11,
        clusterCategory: 13,
        errorSumTips: '',
        errorSumFlag: true,
        loading: false,
        regressionFlag: false,
        carouselFlag: false,
        ClusterFlag: false,
        axisClusterFlag: false,			//根据聚类的维度数量，控制图片的数量
        ClusterHeight: '100px',
        bgFlag: true,
        xAxisLabel: '',
        yAxisLabel: '',
        clusterItemName: [],
        clusterString: '',
        k_clustering: 3,
        Datacsv_list: "",
        maxIter: 300,
        randomState: 80,
        nInit: 10,
        batchSize: 100,
        reassignmentRatio: 0.01,
        dataSetId: 2,
        errorLabel: '误差分析'
      }
    },
    mounted() {
      Bus.$on('getMiningDataSetId', (e) => {
        this.dataSetId = e
        //alert(this.dataSetId)
      })
      //this.drawCluster()
      Bus.$on('modelParmsFlag', (modelType) => {
        switch (modelType) {
          case '线性回归':
            this.regressionFlag = true
            this.ClusterFlag = false
            this.carouselFlag = false
            break;
          case '非线性回归':
            this.regressionFlag = true
            this.ClusterFlag = false
            this.carouselFlag = false
            break;
          case 'K-Means聚类':
            this.carouselFlag = true
            this.ClusterFlag = true
            this.regressionFlag = false
            this.bgFlag = false   //关掉背景图
            this.xAxisItem = []			//清空x,y避免切回线性回归时出错
            this.yAxisItemName = []		//清空x,y避免切回线性回归时出错
            break;
          case 'Mini Batch K-Means聚类':
            this.carouselFlag = true
            this.ClusterFlag = true
            this.regressionFlag = false
            this.bgFlag = false   //关掉背景图
            this.xAxisItem = []			//清空x,y避免切回线性回归时出错
            this.yAxisItemName = []		//清空x,y避免切回线性回归时出错
            break;

          default:
            break;
        }
      })


      //0.从AxiosDistribute过来的完整图表数据
      Bus.$on('AxiosDataEcharts', (e) => {
        this.echartAxiosData = e;		//被用来操作（筛选）的数据
      })

      this.autoDivSize();//根据浏览器尺寸设置echarts的宽高

      Bus.$on('wtf', (e) => {
        if (e) {
          document.getElementById("myChart").style.width = this.winWidth * 0.87 + "px";
          document.getElementById("echartsCard").style.width = this.winWidth * 0.898 + "px";
          this.ClusterHeight = this.winWidth * 0.87 + "px";
        }
        else {
          document.getElementById("myChart").style.width = this.winWidth * 0.67 + "px";
          document.getElementById("echartsCard").style.width = this.winWidth * 0.692 + "px";
          this.ClusterHeight = this.winWidth * 0.67 + "px";
        }

      })

      Bus.$on('modelParmsFlag', (type) => {
        switch (type) {
          case '线性回归':
            this.mth_power = 0
            this.category = 11
            this.picPath = ""
            this.errorSumTips = ""
            this.drawModel()
            this.errorLabel = '误差分析'
            break;
          case '非线性回归':
            if (this.mth_power == 0) this.mth_power = 2
            this.category = 12
            this.picPath = ""
            this.errorSumTips = ""
            this.drawModel()
            this.errorLabel = '误差分析'
            break;
          case 'K-Means聚类':
            this.picPath = ""
            this.errorSumTips = ""
            this.xAxisItem = []			//清空x,y避免切回线性回归时出错
            this.yAxisItemName = []		//清空x,y避免切回线性回归时出错
            //if(this.xAxisItem.length != 0)this.drawCluster()	//如果x轴已经有了，就生成图，以实现来回切换
            this.errorLabel = 'k值分析'
            break;
          case 'Mini Batch K-Means聚类':
            this.picPath = ""
            this.errorSumTips = ""
            this.xAxisItem = []			//清空x,y避免切回线性回归时出错
            this.yAxisItemName = []		//清空x,y避免切回线性回归时出错
            //if(this.xAxisItem.length != 0)this.drawCluster()	//如果x轴已经有了，就生成图，以实现来回切换
            this.errorLabel = 'k值分析'
            break;
          default:
            break;
        }


        this.tableVisible = false
      })
      Bus.$on('test_size', (e) => {
        this.test_size = e
        //alert(this.test_size)
        this.drawModel()
      })
      Bus.$on('mth_power', (e) => {
        this.mth_power = e
        //alert(this.mth_power)
        this.drawModel()
      })
      Bus.$on('error_type', (e) => {
        if (e == 'MSE(平均绝对误差)') this.error_type = 1
        if (e == 'MAE(均方误差)') this.error_type = 2
        if (e == 'RMSE(均方根误差)') this.error_type = 3
        //alert(this.error_type)
        this.drawModel()
        //alert(this.test_size+" "+this.mth_power+" "+this.error_type)
      })


      //1.监听X轴传值
      Bus.$on('rowdata', (e) => {
        this.bgFlag = false
        this.xAxisItem.push(e)
        for (let j = 0; j < 15; j++) {
          this.tableData[j] = this.echartAxiosData[j];
        }
        this.fields.push(e)
        if (this.yAxisItemName.length < 1) {
          this.tableVisible = true
        }
        else {
          this.tableVisible = false
          //拼x轴字符串
          this.yAxisString = this.yAxisItemName[0];
          for (let i = 1; i < this.yAxisItemName.length; i++) {
            this.yAxisString = this.yAxisString + ',' + this.yAxisItemName[i]
          }
          //拼Y轴字符串
          this.xAxisString = this.xAxisItem[0];
          for (let i = 1; i < this.xAxisItem.length; i++) {
            this.xAxisString = this.xAxisString + ',' + this.xAxisItem[i]
          }


          this.xAxisLabel = this.xAxisString
          this.yAxisLabel = this.yAxisString
          this.drawModel()
        }

      })


      //1.监听Y轴传值
      Bus.$on('coldata', (e) => {
        this.bgFlag = false
        this.yAxisItemName.push(e)

        for (let j = 0; j < 15; j++) {
          this.tableData[j] = this.echartAxiosData[j];
        }
        this.fields.push(e)
        if (this.yAxisItemName.length < 1) {
          this.tableVisible = true
        }

        if (this.xAxisItem.length > 0) {
          //拼x轴字符串
          this.yAxisString = this.yAxisItemName[0];
          for (let i = 1; i < this.yAxisItemName.length; i++) {
            this.yAxisString = this.yAxisString + ',' + this.yAxisItemName[i]
          }
          //拼Y轴字符串
          this.xAxisString = this.xAxisItem[0];
          for (let i = 1; i < this.xAxisItem.length; i++) {
            this.xAxisString = this.xAxisString + ',' + this.xAxisItem[i]
          }


          this.xAxisLabel = this.xAxisString
          this.yAxisLabel = this.yAxisString
          this.drawModel()
        }


      })

      //1.监听聚类轴
      Bus.$on('getClusterParms', (e) => {
        this.clusterItemName = e["Datacsv_list"]
        console.log(e)
        //拼聚类字符串
        this.clusterString = this.clusterItemName[0];
        for (let i = 1; i < this.clusterItemName.length; i++) {
          this.clusterString = this.clusterString + ',' + this.clusterItemName[i]
        }
        this.clusterCategory = e["category"]			//聚类类型（mini和k-means)
        this.Datacsv_list = this.clusterString			//聚类轴的值
        this.k_clustering = e["k_clustering"]			//聚类数
        this.maxIter = e["max_iter"]					//迭代次数
        this.randomState = e["random_state"]			//随机种子
        this.nInit = e["n_init"]						//初始簇中心迭代次数
        this.batchSize = e["batch_size"]				//采集样大小
        this.reassignmentRatio = e['reassignment_ratio']//reassignment ration

        if (this.clusterItemName.length > 1) {
          this.carouselFlag = false;
          this.axisClusterFlag = true
        }	//根据聚类的维度数量，控制图片的数量
        if (this.clusterItemName.length <= 1) {
          this.carouselFlag = true;
          this.axisClusterFlag = false
        }	//根据聚类的维度数量，控制图片的数量
        this.drawCluster()

      })

      //2.监听X轴移除事件。这里只移除了一个(还没有PATCH)
      Bus.$on('rowMiningRemove', (e) => {
        this.xAxisItem.splice(e, 1);
        if (this.yAxisItemName.length < 1 || this.xAxisItem.length < 1) {
          this.tableVisible = true
          this.regressionFlag = false
          for (let j = 0; j < 15; j++) {
            this.tableData[j] = this.echartAxiosData[j];
          }
          this.fields.splice(e, 1)
          //alert(this.tableVisible)
        }

      })


      //2.监听y轴移除事件(还没有PATCH)
      Bus.$on('colMiningRemove', (e) => {
        this.yAxisItemName.splice(e, 1);
        if (this.yAxisItemName.length == 0) {
          this.tableSecVisible = true
          this.tableVisible = true
          this.regressionFlag = false
          this.fields.splice(e, 1)
          //document.getElementById('myChart').style.display = 'none'
        }

      })

      //3.监听标题改变(还没有PATCH)
      Bus.$on('titleChange', (e) => {
        this.chartTitle = e;

      })

      //x,y轴的标题
      Bus.$on('miningXAxis', (e) => {
        this.xAxisLabel = e
        this.drawModel()
      })
      Bus.$on('miningYAxis', (e) => {
        this.yAxisLabel = e
        this.drawModel()
      })

      //定义二维数组存，否则会窜数据
      for (var k = 0; k <= 20; k++) {
        this.markPointArray[k] = new Array();
      }

    },
    methods: {

      autoDivSize() {
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
        document.getElementById("myChart").style.height = this.winHeight * 0.8 + "px";
        document.getElementById("myChart").style.width = this.winWidth * 0.685 + "px";
        document.getElementById("chartData").style.height = this.winHeight * 0.7 + "px";
        document.getElementById("chartData").style.width = this.winWidth * 0.67 + "px";
        document.getElementById("errorInfo").style.height = this.winHeight * 0.7 + "px";
        document.getElementById("errorInfo").style.width = this.winWidth * 0.67 + "px";
        document.getElementById("echartsCard").style.height = this.winHeight * 0.84 + "px";
        document.getElementById("echartsCard").style.width = this.winWidth * 0.692 + "px";
        this.ClusterHeight = this.winHeight * 0.7 + "px";
        document.getElementById("font-position").style.marginTop = this.winHeight * 0.30 + "px";
      },

      drawModel() {
        this.loading = true//打开加载条动画
        this.tableVisible = false
        //发送请求
        // setTimeout(() => {
          this.$axios
            .post(
              "http://120.79.146.91:8000/dataMining/regression/",
              {
                data_set: this.dataSetId,//是data_set_id,要和Axios.vue的id保持一致
                title: Math.floor(Math.random() * (1000000 - 1 + 1) + 1),
                desc: "zzzzz3",
                category: this.category,
                xlabel: this.xAxisLabel,
                ylabel: this.yAxisLabel,
                x_axis: this.xAxisString,
                y_axis: this.yAxisString,
                test_size: this.test_size,
                mth_power: this.mth_power,
                error_type: this.error_type
              },
              {
                headers: {
                  Authorization: "JWT " + localStorage.getItem("token")
                }
              }
            )
            .then(r => {
              console.log(r)
              this.$message({
                message: r.data.message,
                type: 'success'
              });
              //console.log(r.data.data[0])
              this.picPath = "http://120.79.146.91:8000" + r.data.data[0].slice(15, r.data.data[0].length);
              // this.errorSumTips = "http://120.79.146.91:8000"+r.data.data[1].slice(15,r.data.data[1].length);
              // console.log(r.data.data[1])
              if (r.data.data[1][0] == 'c') {
                this.errorSumTips = "http://120.79.146.91:8000" + r.data.data[1].slice(15, r.data.data[1].length);
                this.errorSumFlag = false
              }
              else {
                if (this.error_type == 1) this.errorSumTips = 'MSE(平均绝对误差):' + r.data.data[1].slice(10, r.data.data[1].length)
                if (this.error_type == 2) this.errorSumTips = 'MAE(均方误差):' + r.data.data[1].slice(10, r.data.data[1].length)
                if (this.error_type == 3) this.errorSumTips = 'RMSE(均方根误差):' + r.data.data[1].slice(10, r.data.data[1].length)
                this.errorSumFlag = true
              }

              console.log(this.errorSumTips)
              this.loading = false
              if (!this.ClusterFlag) this.regressionFlag = true //这句不好
            })
            .catch(response => {
              console.log(response)
              this.$message({
                message: '操作失败，请重试',
                showClose: true,
                type: 'warning',
                duration: 1000
              });
            });
        // }, 500)
      },

      drawCluster() {
        //alert(this.clusterCategory)
        this.loading = true
        this.$axios
          .post(
            "http://120.79.146.91:8000/dataMining/clustering/",
            {
              data_set: this.dataSetId,
              title: Math.floor(Math.random() * (1000000 - 1 + 1) + 1),
              desc: "zzzzz",
              category: this.clusterCategory,
              k_clustering: this.k_clustering,
              Datacsv_list: this.Datacsv_list,
              random_state: this.randomState,
              max_iter: this.maxIter,
              batch_size: this.batchSize,
              n_init: this.nInit,
              reassignment_ratio: this.reassignmentRatio
            },
            {
              headers: {
                Authorization: "JWT " + localStorage.getItem("token")
              }
            }
          )
          .then(r => {
            this.$message({
              message: r.data.message,
              type: 'success'
            });
            console.log(r)
            this.errorSumTips = "http://120.79.146.91:8000" + r.data.data[0].slice(15, r.data.data[0].length);
            this.clusterImg[0] = "http://120.79.146.91:8000" + r.data.data[1].slice(15, r.data.data[1].length);
            this.clusterImg[1] = "http://120.79.146.91:8000" + r.data.data[2].slice(15, r.data.data[2].length);
            this.clusterImg[2] = "http://120.79.146.91:8000" + r.data.data[3].slice(15, r.data.data[3].length);
            this.errorSumFlag = false
            this.loading = false
          })
          .catch(response => {
            this.loading = false
          });
      }


    }
  }
</script>
<style>
  .miningCardStyle {
    border: 0px;
    margin: 15px;
    margin-top: 20px;

  }

  .echarts-font {
    font-family: '新宋体';
    font-size: 20px;
    position: absolute;
    left: 45%;

  }

  .dropdowmMenuStyle {
    float: left;
    margin-left: 10px
  }
</style>
