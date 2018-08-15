<template>
	<div>
		<div></div>
		<el-row>
			<el-col :span="1"></el-col>
			<el-col :span="22">
				<el-card class="box-card cardStyle" id="echartsCard">
			    	<div id="myChart" :style="{width: '800px', height: '500px'}" ref="myChart"><p class="echarts-font" id="font-position">当前图表无数据</p></div>
				</el-card>
			</el-col>
			<el-col :span="1"></el-col>
		</el-row>
	</div>
</template>

<script>
import Bus from './Bus.js'
import  'echarts/theme/macarons.js'
import  'echarts/theme/vintage.js'
import  'echarts/theme/dark.js'
import  'echarts/theme/infographic.js'
import  'echarts/theme/shine.js'
import  'echarts/theme/roma.js'
export default {
  name: 'echarts',
  data () {
    return {
	  msg: 'Welcome to Your Vue.js App',
	  winHeight:0,
	  winWidth:0,
	  yAxisItemName:[],
      Xdata:[],
	  seriesData:[],
	  seriesDataItem:[],
	  myChart:{},
	  option:{},
	  chartStyle:'macarons',
	  chartTitle:'图表标题'
    }
  },
  mounted(){
	  this.autoDivSize();//先根据浏览器尺寸设置echarts的宽高
		var myAioxObj;
        Bus.$on('AxiosDataEcharts', (e) => {myAioxObj = e;})
      
      
       Bus.$on('rowdata', (e) => {
    　　　　for(let i=0;i<myAioxObj.length;i++){
                this.Xdata.push(myAioxObj[i][e])  //根据传进来的字段，给X轴赋值
            }
			this.drawLine();
			
	   })
	   


        //然后是监听y轴传值
       Bus.$on('coldata', (e) => {

			this.yAxisItemName.push(e)	//获得拖到y轴上的节点字段数组

    　　　　for(let i=0;i<myAioxObj.length;i++){
                this.seriesDataItem.push(myAioxObj[i][e])  //根据传进来的字段，给X轴赋值
            }

			this.seriesData.push({
				name:e,
				type:'bar',
				data:this.seriesDataItem
			})
			this.seriesDataItem = [] //清空serIDataItem否则重叠
			//console.log(this.seriesData)
            this.drawLine();

			
	   })
	   
	   //监听移除事件
       Bus.$on('rowdataRemove', (e) => {
			this.Xdata = [];
			this.drawLine();
	   })
		//监听移除事件
       Bus.$on('coldataRemove', (e) => {
			this.seriesData.splice(e, 1);
			this.drawLine();
	   })
		
		//监听图表类型改变
		Bus.$on('typeChange',(e)=>{
			for(var i = 0;i<this.option.series.length;i++){
				this.option.series[i].type = e; //可以改类型，不能改标题，重新drawLine也没用
				if(e === 'scatter')this.option.series[i].symbolSize = 20
			}
			
			this.drawLine();
		})

		//监听图表风格
		Bus.$on('chartStyleType',(e)=>{
			this.chartStyle = e;
			this.myChart.dispose()
			this.drawLine();
		})

		//监听标题改变
		Bus.$on('titleChange',(e)=>{
			this.chartTitle = e;
			this.myChart.dispose()
			this.drawLine();
		})

		//监听辅助线设置
		Bus.$on('markLineOption',(e)=>{
			if(e.selectTypeValue == '计算值'){
				for(var i = 0;i<this.option.series.length;i++){
					if(this.option.series[i].name == e.selectValue){
						if(e.selectCalculateTypeValue == '平均值')
						this.option.series[i].markLine = {
								data: [{
									type: 'average',
									name: '平均值'
									}]
						}
						if(e.selectCalculateTypeValue == '最小值')
						this.option.series[i].markLine = {
								data: [{
									type: 'min',
									name: '最小值'
									}]
						}
						if(e.selectCalculateTypeValue == '最大值')
						this.option.series[i].markLine = {
								data: [{
									type: 'max',
									name: '最大值'
									}]
						}
					}
				}
			}
	
			if(e.selectTypeValue == '固定值'){
				for(var i = 0;i<this.option.series.length;i++){
					if(this.option.series[i].name == e.selectValue){
						this.option.series[i].markLine = {
								data: [{
									yAxis: e.inputValue,
									name: '固定值'
									}]
						}
					}
				}
			}	
			this.drawLine();
		})


  },
  methods: {
    drawLine(){
		let dom = this.$refs.myChart;
      	this.myChart = this.$echarts.init(dom,this.chartStyle);
        // 基于准备好的dom，初始化echarts实例
        //let myChart = this.$echarts.init(document.getElementById('myChart'),'macarons')
        // 绘制图表
        this.option = {
		    title : {
		        text: this.chartTitle,
		        subtext: '副标题'
		    },
		    tooltip : {
				trigger: 'axis',
				axisPointer : {type : 'shadow'}
			},
			dataZoom: [
				{
					type: 'slider',
					show: true,
					xAxisIndex: [0],
					start: 1,
					end: 3
				}],
		    legend: {
		        data:this.yAxisItemName  //拖到y轴的节点来创建图例
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : this.Xdata
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : this.seriesData	
		};

        this.myChart.setOption(this.option,true);

	},


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
		document.getElementById("myChart").style.height= this.winHeight*0.7	 + "px";
		document.getElementById("myChart").style.width= this.winWidth*0.65 + "px";
		document.getElementById("echartsCard").style.height= this.winHeight*0.75 + "px";
		document.getElementById("echartsCard").style.width= this.winWidth*0.65 + "px";
		document.getElementById("font-position").style.marginTop= this.winHeight*0.30 + "px";
		
	},
    //Aiox模拟
    myAiox(){
        return JSON.parse('[{	"RANK": "1111",	"RANK_H": "1291",	"姓名_x": "赵一钦1",	"学校名称": "市三中1",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区1",	"考生号": "170010508"}, {	"RANK": "2222",	"RANK_H": "1292",	"姓名_x": "赵一钦2",	"学校名称": "市三中2",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区2",	"考生号": "170010508"}, {	"RANK": "3333",	"RANK_H": "1293",	"姓名_x": "赵一钦3",	"学校名称": "市三中3",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区3",	"考生号": "170010508"}]')
    }
  }
}
</script>
<style>
.cardStyle{
	
	margin: 10px;
	margin-top: 20px;
	
}
.echarts-font {
	font-family: '新宋体';
	margin:auto;

}
</style>
