<template>
	<div>
		<el-card class="box-card cardStyle" id="echartsCard">
			<div id="myChart" :style="{width: '0px', height: '0px'}" ref="myChart">
			
			<p class="echarts-font" id="font-position" v-show="!tableVisible">当前图表无数据</p>
		

            <el-table
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
            </el-table>
		
		</div>
		</el-card>
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
var Enumerable = require('linq');
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
	  chartTitle:'图表标题',
	  markPointArray:new Array(),
	  //表格数据
	  tableData: [],
	  fields:[],
	  tableVisible:false
    }
  },
  mounted(){
	  this.autoDivSize();//先根据浏览器尺寸设置echarts的宽高
		var myAioxObj;
		var originAioxObj;
        Bus.$on('AxiosDataEcharts', (e) => {
			originAioxObj = e; //原初的数据
			myAioxObj = e;		//被用来操作（筛选）的数据
			})
      
      
       Bus.$on('rowdata', (e) => {

	　　　　for(let i=0;i<myAioxObj.length;i++){
				this.Xdata.push(myAioxObj[i][e])  //根据传进来的字段，给X轴赋值
			}

		   if(this.yAxisItemName.length<1){
			   this.tableVisible = true
				for(let j =0 ;j < 15;j++){
				this.tableData[j] = myAioxObj[j];
				}
				this.fields.push(e)
		   }
		   else{
				this.drawLine();
		   }
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
			
		   if(this.Xdata.length<1){
			   this.tableVisible = true
				for(let j =0 ;j < 15;j++){
				this.tableData[j] = myAioxObj[j];
				}
				this.fields.push(e)
		   }
		   else{
				this.drawLine();
		   }

			
	   })
	   
	   //监听移除事件
       Bus.$on('rowdataRemove', (e) => {
			this.Xdata = [];
			this.tableVisible = false
			if(this.myChart)this.myChart.dispose()
			this.drawLine();
	   })
		//监听移除事件
       Bus.$on('coldataRemove', (e) => {
			this.seriesData.splice(e, 1);
			this.tableVisible = false
			if(this.myChart)this.myChart.dispose()
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
		//监听辅助线删除
		Bus.$on('deleteLine',(e)=>{
			for(var i = 0;i<this.option.series.length;i++){
				if(this.option.series[i].name == e){
					this.option.series[i].markLine = {
					}
				}
			}
			this.drawLine();
		})
		//监听数据标注
		Bus.$on('echartsMarkPoint',(seriesIndex,data,dataIndex,pointInput)=>{
			//其实markPoint应该写到series里面，但是我不想改series了
			this.option.series[seriesIndex].markPoint = {
		                symbol:'roundRect',
						symbolSize:[10, 10],// 容器大小
						symbolOffset:[0,-20],//位置偏移
						data:[],
						itemStyle:{
							normal:{
								label:{
						            show: true,
						            position: 'top',
									formatter: function (params,ticket,callback) {//格式化展现（标签+值）
											 //console.log(params,ticket,callback)
											 return params.data.pointText;
										}  
								  	}
								}
		                },
					};

			this.markPointArray[seriesIndex].push({coord:[dataIndex,data],pointText:pointInput})
			this.option.series[seriesIndex].markPoint.data = this.markPointArray[seriesIndex]
			//this.option.series[seriesIndex].markPoint.itemStyle.normal.label.formatter = this.option.series[seriesIndex].markPoint.data.cnm
			console.log(seriesIndex)
			this.drawLine();
		})

		//监听数据标注删除
		Bus.$on('deletePoint',(val,pointSeriesIndex)=>{   //尝试传(pointSeries,pointY,pointX)失败，pointSeries被覆盖，用回名字
			console.log(val,pointSeriesIndex)
			// for(var i = 0;i<this.option.series.length;i++){
			// 	if(this.option.series[i].name == e){
			// 		this.option.series[i].markLine = {
			// 		}
			// 	}
			// }
			for(let j = 0;j<this.option.series[pointSeriesIndex].markPoint.data.length;j++){
				console.log()
				this.option.series[pointSeriesIndex].markPoint.data.splice(j,1)
			}
			
			this.drawLine();

		})
		//监听筛选
		Bus.$on('numberFilter',(numberInput,numberTypeSelect,dropName)=>{
			let sql = ''
			switch (numberTypeSelect) {
				case '等于':
					sql = "x=>x."+ dropName +"="+ numberInput
					break;
				case '大于':
					sql = "x=>x."+ dropName +">"+ numberInput
					break;
				case '小于':
					sql = "x=>x."+ dropName +"<"+ numberInput
					break;
				case '大于等于':
					sql = "x=>x."+ dropName +">="+ numberInput
					break;
				case '小于等于':
					sql = "x=>x."+ dropName +"<="+ numberInput
					break;
				default:
					break;
			}
			
			myAioxObj = Enumerable.from(myAioxObj).where(sql).toArray();//myAioxObj没用this，以后可能有问题

    　　　　for(let i=0;i<myAioxObj.length;i++){
                this.seriesDataItem.push(myAioxObj[i][dropName])  //根据传进来的字段，给X轴赋值
            }

			for(let j=0;j<this.seriesData.length;j++){
				if(this.seriesData[j].name == dropName){
					this.seriesData[j] = {
						name:dropName,
						type:'bar',
						data:this.seriesDataItem
					}
				}
			}
	 		this.seriesDataItem = [] //清空serIDataItem否则重叠
			this.myChart.dispose()
			this.drawLine()
		})

		//监听筛选移除
		Bus.$on('numberFilterRemove',(dropName)=>{
    　　　　for(let i=0;i<myAioxObj.length;i++){
                this.seriesDataItem.push(myAioxObj[i][dropName])  //根据传进来的字段，给X轴赋值
            }
			console.log(this.seriesDataItem)
			for(let j=0;j<this.seriesData.length;j++){
				if(this.seriesData[j].name == dropName){
					this.seriesData[j] = {
						name:dropName,
						type:'bar',
						data:this.seriesDataItem
					}
				}
			}
	 		this.seriesDataItem = [] //清空serIDataItem否则重叠
			this.myChart.dispose()
			this.drawLine()
		})

		//定义二维数组存，否则会窜数据，先写死吧…呵呵
		for(var k=0;k<=20;k++){        
			this.markPointArray[k]=new Array();   
		}

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
					start: 0,
					end: 2
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
		Bus.$emit('chartsOption',this.option)
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
		document.getElementById("myChart").style.height= this.winHeight*0.8	 + "px";
		document.getElementById("myChart").style.width= this.winWidth*0.67 + "px";
		document.getElementById("echartsCard").style.height= this.winHeight*0.84 + "px";
		document.getElementById("echartsCard").style.width= this.winWidth*0.692 + "px";
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
