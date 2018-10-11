<template>
	<div>
		
		<el-card class="box-card analysisCardStyle" id="echartsCard" shadow="never">

			<!-- 图内筛选器部分 -->
			<div v-show="picFilterFlag">
				&nbsp;
				<el-dropdown trigger="click" class="dropdowmMenuStyle" v-for="(val,index) in dropdownArray" :key="index"  @command="handleCommand">
				<span class="el-dropdown-link">
					{{val}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown" style="padding:10px">
					<!-- <el-dropdown-item v-for="(item,k) in dropdownItemArray[index]" :key="k" :command="item">
						{{item}}
					</el-dropdown-item> -->

					<!-- 数值筛选器部分 -->
					<div>
						<el-select v-model="numberFilterSelectValue" placeholder="请选择" style="width:50%" class="echart">
							<el-option
							v-for="item in numberFilterItemType"
							:key="item"
							:label="item"
							:value="item">
							</el-option>
						</el-select>
					</div>
					<div>
					<el-input v-model="numberFilterInput" placeholder="请输入数值"  class="echart"></el-input>
					</div>

				</el-dropdown-menu>
				</el-dropdown>
			</div>

			<div id="myChart" :style="{width: '0px', height: '0px'}" ref="myChart">
				<!-- 未显示图表时 -->
				<div class="echarts-font" id="font-position" v-show="!tableVisible" v-loading="loading">当前图表无数据</div>
				<img src="@/assets/chartBg.png" style="width:90%;height:90%;margin:40px;" v-show="!tableVisible">
				
				<!-- 表格部分 -->
				<!-- <p class="echarts-font" id="font-position" v-show="!tableVisible">当前图表无数据</p> -->
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
	  echartAxiosData:[],
	  originAxiosData:[],
	  winHeight:0,
	  winWidth:0,
	  yAxisItemName:[],
      Xdata:[],
	  xAxisItem:[],
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
	  dropdownArray:[],
	  dropdownItemArray:[],//图内筛选器的选项
	  tableVisible:false,
	  chartYAxis:[{
					name : '',
					type : 'value',
					axisLine:{
                        lineStyle:{
                            width:1,
						},
						symbol:['none','arrow']
                    },					
				}],
		chartId:1,
		picFilterFlag:false,
		numberFilterItemType:['等于','大于','小于','不大于','不小于'],	//图内筛选器-数值-可选类型
		numberFilterSelectValue:'等于',  							  //图内筛选器-数值-选择的类型
		numberFilterInput:''	,									  //图内筛选器-数值-填写的数值
		loading:false,
		responseData:[],
		deleteJsonKeyArray:[]
    }
  },
  mounted(){

	this.autoDivSize();//根据浏览器尺寸设置echarts的宽高
//1.页面加载时创建图表或者PATCH图表（得到id,data_set）data_set：任务id，title随机生成
// 2.拖动到框上的时候求和
// 3.每一步PATCH

Bus.$on('leftChange',(e)=>{
	if(e){
		document.getElementById("myChart").style.width= this.winWidth*0.87 + "px";
		document.getElementById("echartsCard").style.width= this.winWidth*0.898 + "px";
		this.myChart.dispose();
		this.drawLine();
	}
	else{
		document.getElementById("myChart").style.width= this.winWidth*0.67 + "px";
		document.getElementById("echartsCard").style.width= this.winWidth*0.692 + "px";
		this.myChart.dispose();
		this.drawLine();
	}

})
		//0.从AxiosDistribute过来的图表ID
		Bus.$on('chartID',(e)=>{
			this.chartId = e
			//alert(e)
		})
		//0.从AxiosDistribute过来的完整图表数据
        Bus.$on('AxiosDataEcharts', (e) => {
			this.originAxiosData = e; //原初的数据
			this.echartAxiosData = e;		//被用来操作（筛选）的数据
			})
	  
	  
		//1.监听X轴传值
		Bus.$on('rowdata', (e) => {
			this.xAxisItem.push(e)
			//this.echartAxiosData[e].length 用来取代下面的15

/////////为了实现可以随时拖X轴，从底下复制过来，否则单独拖动X轴时不触发请求

// //拼y轴字符串
// 			let yAxisString = this.yAxisItemName[0]; 
// 			for (let i = 1; i < this.yAxisItemName.length; i++) {
// 				yAxisString = yAxisString + ',' + this.yAxisItemName[i] 
// 			}
// 			//拼x轴字符串
// 			let xAxisString = this.xAxisItem[0]; 
// 			for (let i = 1; i < this.xAxisItem.length; i++) {
// 				xAxisString = xAxisString + ',' + this.xAxisItem[i] 
// 			}

// 			//发送求和请求
// 			this.$axios
// 			.post(
// 			"http://120.79.146.91:8000/task/chart/sum",
// 				{
// 					chart_id:this.chartId,
// 					data_set:4,//应该是data_set_id?到时换成this.$router.parms
// 					chart_type:1,
// 					x_axis:xAxisString,
// 					y_axis:yAxisString
// 				},
// 				{
// 					headers: {
// 					Authorization: "JWT " + localStorage.getItem("token")
// 					}
// 				}
// 			)
// 			.then(r => {
// 				console.log(r.data.data)
// 				console.log(JSON.parse(r.data.data))
// 				//r.data.data 								完整数据
// 				//Object.values(JSON.parse(r.data.data)) 	表头
// 				//Object.keys(element)						去重的X轴的值
// 				let element = JSON.parse(r.data.data)[e]	//对应的y轴的值
// 				this.Xdata = []//每次循环清空X轴，否则重叠
// 				this.seriesDataItem = [] //清空serIDataItem否则重叠
// 				//给X轴赋值,Xdata为echarts的X轴的值
// 		　　　　for(let i=0;i<Object.keys(element).length;i++){
// 					this.Xdata.push(Object.keys(element)[i])  
// 				}
// 				//给Y轴赋值
// 		　　　　for(let i=0;i<Object.keys(element).length;i++){
// 					this.seriesDataItem.push(element[Object.keys(element)[i]])  
// 				}
				
// 				console.log(this.seriesDataItem)					
// 				this.seriesData.push({
// 					name:this.yAxisItemName[this.yAxisItemName.length-1],
// 					type:'bar',
// 					data:this.seriesDataItem
// 				})

// })

/////////取出key的数据插入换行"["女","北大附校"]"


			//图表展示控制
			if(this.yAxisItemName.length<1){
					this.tableVisible = true
					for(let j =0 ;j < 15;j++){this.tableData[j] = this.echartAxiosData[j];}
					this.fields.push(e)
				}
				else{this.drawLine();}
		})
	   


		//1.监听Y轴传值
		Bus.$on('coldata', (e) => {
			//获得拖到y轴上的节点字段数组
			this.yAxisItemName.push(e)
			
			//拼y轴字符串
			let yAxisString = this.yAxisItemName[0]; 
			for (let i = 1; i < this.yAxisItemName.length; i++) {
				yAxisString = yAxisString + ',' + this.yAxisItemName[i] 
			}
			//拼x轴字符串
			let xAxisString = this.xAxisItem[0]; 
			for (let i = 1; i < this.xAxisItem.length; i++) {
				xAxisString = xAxisString + ',' + this.xAxisItem[i] 
			}

			//发送求和请求
			this.$axios
			.post(
			"http://120.79.146.91:8000/task/chart/sum",
				{
					chart_id:this.chartId,
					data_set:4,//应该是data_set_id?到时换成this.$router.parms
					chart_type:1,
					x_axis:xAxisString,
					y_axis:yAxisString
				},
				{
					headers: {
					Authorization: "JWT " + localStorage.getItem("token")
					}
				}
			)
			.then(r => {
				this.responseData = r.data.data;
				// console.log("y:"+this.echartAxiosData[0])
				// console.log("r:"+r.data.data)
				let str1 = r.data.data
				let str2 = str1.replace(/\["|\"]/g,"")
				let str3 = str2.replace(/\","/g,"·")
				//console.log(str3)
				//r.data.data 								完整数据
				//Object.values(JSON.parse(r.data.data)) 	表头
				//Object.keys(element)						去重的X轴的值
				//element       							去重的X值和Y值
				let element = JSON.parse(str3)[e]	//对应的y轴的值
				this.Xdata = []//每次循环清空X轴，否则重叠
				this.seriesDataItem = [] //清空serIDataItem否则重叠
				//给X轴赋值,Xdata为echarts的X轴的值
		　　　　for(let i=0;i<Object.keys(element).length;i++){
					this.Xdata.push(Object.keys(element)[i])  
				}
				//给Y轴赋值
		　　　　for(let i=0;i<Object.keys(element).length;i++){
					this.seriesDataItem.push(element[Object.keys(element)[i]])  
				}
				
				//console.log(this.seriesDataItem)					
				this.seriesData.push({
					name:this.yAxisItemName[this.yAxisItemName.length-1],
					type:'bar',
					data:this.seriesDataItem,
					itemStyle: {
						normal: {
							barBorderRadius: 10,

							shadowColor: 'rgba(0, 0, 0, 0.4)',
							shadowBlur: 20
						}
					}
				})
				
				//打开dataZoom，X轴大于10时
				if(Object.keys(element).length>10){
					this.dataZoom = {
						type: 'slider',
						show: true,
						xAxisIndex: [0],
						start: 0,
						end: 30
					}
				}
				this.loading = false
				this.drawLine();

			})
			.catch(response => {
				this.loading = false
				this.yAxisItemName.pop()
				Bus.$emit('yAixsFail','fail');
				this.$message({
				message: '操作失败，请重试',
				type: 'warning',
                duration:1000
				});
			});

			//表格显示
			// if(this.Xdata.length<1){
			// 	this.tableVisible = true
			// 		for(let j =0 ;j < 15;j++){
			// 		this.tableData[j] = this.echartAxiosData[j];
			// 		}
			// 		this.fields.push(e)
			// }
			this.drawLine();

		})

		//次轴也要求和…………………………参数为X轴和次轴
	   //2.然后是监听次轴传值
       Bus.$on('dropAxisCol', (e) => {

			this.yAxisItemName.push(e)	//获得拖到y轴上的节点字段数组

    　　　　for(let i=0;i<this.echartAxiosData.length;i++){
                this.seriesDataItem.push(this.echartAxiosData[i][e])  //根据传进来的字段，给X轴赋值
            }

			this.seriesData.push({
				name:e,
				type:'line',
				yAxisIndex: 1,
				data:this.seriesDataItem
			})
			this.seriesDataItem = []
			
		   if(this.Xdata.length<1){
			   this.tableVisible = true
				for(let j =0 ;j < 15;j++){
				this.tableData[j] = this.echartAxiosData[j];
				}
				this.fields.push(e)
		   }
		   else{
			   	this.chartYAxis.push(
				{
					name : e,
		            type : 'value'
				})
				console.log(this.option.yAxis)
				this.myChart.dispose()
				this.drawLine();
		   }
	   	})

	   
	   //2.监听X轴移除事件。这里只移除了一个(还没有PATCH)
       Bus.$on('rowdataRemove', (e) => {
			this.Xdata = [];
			//this.Xdata.splice(e, 1);这种写法是错的，Xdata是18个学校的名字
			this.tableVisible = false
			this.myChart.dispose()
			this.drawLine();
	   })


		//2.监听y轴移除事件(还没有PATCH)
       Bus.$on('coldataRemove', (e) => {
			this.seriesData.splice(e, 1);
			this.yAxisItemName.splice(e, 1);
			
			this.tableVisible = false
			this.myChart.dispose()
			this.drawLine();
	   })
		
		//3.监听图表类型改变(还没有PATCH)
		//大工程，图表之间切换，建议每次都重新生成
		Bus.$on('typeChange',(e)=>{
			if(e=='pie'){
				this.pieDrawLine()
			}
			if(e=='bar'){
				this.drawLine()
			}
			// for(var i = 0;i<this.option.series.length;i++){
			// 	this.option.series[i].type = e; //可以改类型，不能改标题，重新drawLine也没用
			// 	if(e === 'scatter')this.option.series[i].symbolSize = 20
			// }
			
			// this.drawLine();
		})

		//3.监听图表风格(不PATCH)
		Bus.$on('chartStyleType',(e)=>{
			this.chartStyle = e;
			this.myChart.dispose()
			this.drawLine();
		})

		//3.监听标题改变(还没有PATCH)
		Bus.$on('titleChange',(e)=>{
			this.chartTitle = e;
			this.myChart.dispose()
			this.drawLine();
		})

		//监听辅助线设置（不PATCH）
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

		//监听辅助线删除（不PATCH）
		Bus.$on('deleteLine',(e)=>{
			for(var i = 0;i<this.option.series.length;i++){
				if(this.option.series[i].name == e){
					this.option.series[i].markLine = {
					}
				}
			}
			this.drawLine();
		})

		//监听数据标注（不PATCH）
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

		//监听数据标注删除（不PATCH）
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

		//监听数值筛选（还没有PATCH）
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

			//responseDataJSON是原数据
			//jsonFirstKeys 是 Y轴数值 RANK,RANK_H
			//jsonSecKeys是学校名称
			//deleteJsonKeyArray是被删掉的学校名称

			let responseDataJSON = JSON.parse(this.responseData)
			let jsonFirstKeys = Object.keys(responseDataJSON)
			let jsonSecKeys = Object.keys(responseDataJSON[Object.keys(responseDataJSON)[0]])

			console.log("原始数据："+responseDataJSON)

			for(let j=0;j<Object.keys(responseDataJSON[dropName]).length;j++){
				if(responseDataJSON[dropName][Object.keys(responseDataJSON[dropName])[j]]>30000){
					console.log([Object.keys(responseDataJSON[dropName])[j]])
					this.deleteJsonKeyArray.push([Object.keys(responseDataJSON[dropName])[j]])
					delete responseDataJSON[dropName][Object.keys(responseDataJSON[dropName])[j]]
					j--
				}
			}

			for(let arrayItem=0;arrayItem<this.deleteJsonKeyArray.length;arrayItem++){
				for(let k=0;k<jsonFirstKeys.length;k++){
					delete responseDataJSON[Object.keys(responseDataJSON)[k]][this.deleteJsonKeyArray[arrayItem]]
				}
			}

			console.log(responseDataJSON)

			this.Xdata =  Object.keys(responseDataJSON[Object.keys(responseDataJSON)[0]])
			console.log(this.Xdata)
			this.myChart.dispose()
			this.drawLine()
		})

		//监听筛选移除
		Bus.$on('numberFilterRemove',(dropName)=>{
    　　　　for(let i=0;i<this.echartAxiosData.length;i++){
                this.seriesDataItem.push(this.echartAxiosData[i][dropName])  //根据传进来的字段，给X轴赋值
            }
			console.log(this.seriesDataItem)
			for(let j=0;j<this.seriesData.length;j++){
				if(this.seriesData[j].name == dropName){
					this.seriesData[j] = {
						name:dropName,
						type:'bar',
						data:this.seriesDataItem,

					}
				}
			}
	 		this.seriesDataItem = [] //清空serIDataItem否则重叠
			this.myChart.dispose()
			this.drawLine()
		})

		//监听图内筛选器
		Bus.$on('transferChoice',(e)=>{
			this.picFilterFlag = true
			this.dropdownArray = [];
			this.dropdownArray = e //e是选定的字段
			
			// this.dropdownArray.forEach((val)=>{
			// 	let itemArray=[]
			// 	for (let i = 0; i < this.originAxiosData.length; i++) {//this.originAxiosData去重，不用this.originAxiosData
			// 	console.log()
			// 	//console.log(val)
			// 		itemArray.push(this.originAxiosData[i][val])
			// 		if(i>=10)break;
			// 	}
			// 	this.dropdownItemArray.push(itemArray)
			// 	console.log(this.dropdownItemArray)
			// 	itemArray = []
			// })
			
			
		})

		//定义二维数组存，否则会窜数据
		for(var k=0;k<=20;k++){        
			this.markPointArray[k]=new Array();   
		}

  },
  methods: {
    drawLine(){
		let dom = this.$refs.myChart;
      	this.myChart = this.$echarts.init(dom,this.chartStyle);
        this.option = {
		    title : {
		        text: this.chartTitle,
		        subtext: '副标题'
		    },
		    tooltip : {
				trigger: 'axis',
				axisPointer : {type : 'shadow'}
			},
			dataZoom: this.dataZoom,
		    legend: {
				data:this.yAxisItemName,  //拖到y轴的节点来创建图例
				x: 'center' //居右显示
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
					data : this.Xdata,
					axisLine:{
                        lineStyle:{
                            width:1,//X轴宽度
						},
						symbol:['none','arrow']
                    },
					axisLabel :{
					interval:0 
				}
				}
		    ],
		    yAxis : this.chartYAxis,
		    series : this.seriesData	
		};

        this.myChart.setOption(this.option,true);
		Bus.$emit('chartsOption',this.option)
		console.log(this.seriesData)
	},
	pieDrawLine(pieType){
		if(pieType='ndge'){
			//填入样式
		}
		let pieData = [];
		let pieValue = this.seriesData[0]['data'];
		// console.log(this.seriesData)
		// console.log(this.seriesData[0])
		// console.log(this.seriesData[0]['data'])
		// console.log(this.Xdata.length)
		for (let i = 0; i < this.Xdata.length; i++) {
			let pieDataItem = {
				value:pieValue[i],
				name:this.Xdata[i]
			}
			pieData.push(pieDataItem)
		}
		console.log(pieData)
		
		let dom = this.$refs.myChart;
      	this.myChart = this.$echarts.init(dom,this.chartStyle);
        this.option ={
		backgroundColor: '#FFF',
		title: {
			text: 'Customized Pie',
			left: 'left',
			top: 20,
			textStyle: {
				color: '#E5E5E5'
			}
		},

		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			x : 'center',
			y : 'bottom',
			data:this.Xdata,
			textStyle :{
				color:'#5A616A'
			}
		},
		visualMap: {
			show: false,
			min: 0,//此处配置颜色渐变范围
			max: Math.max.apply(null,pieValue)*1.2,
			inRange: {
				colorLightness: [0, 1]
			}
		},
		series : [
			{
				name:'访问来源',
				type:'pie',
				radius : '75%',
				center: ['50%', '50%'],
				data:pieData.sort(function (a, b) { return a.value - b.value; }),
				roseType: 'radius',
				label: {
					normal: {
						textStyle: {
							color: '#AAAAAA'
						}
					}
				},
				labelLine: {
					normal: {
						lineStyle: {
							color: '#AAAAAA'
						},
						smooth: 0.2,
						length: 10,
						length2: 20
					}
				},
				itemStyle: {
					normal: {
						color: '#c23531',
						shadowBlur: 200,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				},

				animationType: 'scale',
				animationEasing: 'elasticOut',
				animationDelay: function (idx) {
					return Math.random() * 200;
				}
			}
		]
	};
		
        this.myChart.setOption(this.option,true);
		Bus.$emit('chartsOption',this.option)
	},

	//图内筛选器事件
	handleCommand(command) {
		alert(command)
		let sql = "x=>x."+ 'RANK' +">"+ command
		this.echartAxiosData = Enumerable.from(this.echartAxiosData).where(sql).toArray();//this.echartAxiosData没用this，以后可能有问题
		this.myChart.dispose()
		this.drawLine();
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
.analysisCardStyle{
	border: 0px;
	margin: 15px;
	margin-top: 20px;
	
}
.echarts-font {
	font-family: '新宋体';
	font-size: 10px;
	position: absolute;left: 45%; 

}
.dropdowmMenuStyle {
	float: left;
	margin-left: 10px
}

.echart .el-input__inner{
        border: 1px solid #ffffff;
        border-bottom-color: #dcdfe6;
    }

</style>