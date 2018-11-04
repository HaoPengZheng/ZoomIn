<template>
	<div>
		
		<el-card class="analysisCardStyle" id="echartsCard"   v-loading="loading">
			<!-- 图内筛选器部分 -->
			<div v-show="picFilterFlag" style="margin-left:16px">&nbsp;

				<!-- 字段筛选器部分 -->
				<el-dropdown trigger="click" class="dropdowmMenuStyle" v-for="(val,index) in dropdownArray_text" :key="index"  @command="picFilterTextClick">
				<span class="el-dropdown-link">
					{{val}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown" style="padding:10px">
					<el-dropdown-item v-for="(item,k) in dropdownTextItemArray[index]" :key="k" :command="item,val">
						{{item}}
					</el-dropdown-item>
				</el-dropdown-menu>
				</el-dropdown>

				<!-- 数值筛选器部分 -->
				<el-dropdown trigger="click" class="dropdowmMenuStyle" v-for="val in dropdownArray_number" :key="val"  @command="picFilterNumberClick">
				<span class="el-dropdown-link">
					{{val}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown" style="padding:10px">
					<number-filter-item :choiceVal="val"></number-filter-item>

				</el-dropdown-menu>
				</el-dropdown>
			</div>
			
				<el-table
				:data="tableData"
				stripe border
				style="width: 100%"
				v-if="tableSecVisible">
				<el-table-column
				v-for="(item,index) in fields"
					:key="index"
					:prop= item
					:label= item
					align="center"
					>
				</el-table-column>
				</el-table>

			<!-- Echarts部分 -->
			<div id="myChart" :style="{width: '0px', height: '0px'}" ref="myChart">

				<!-- 未显示图表时 -->
				<div class="echarts-font" id="font-position" v-show="!tableVisible">当前图表无数据</div>
				<img src="@/assets/chartBg.png" style="width:90%;height:90%;margin:40px;" v-show="!tableVisible">
				
				<!-- 表格部分 -->
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
import numberFilterItem from './numberFilterItem.vue'
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
		dropdownTextItemArray:[],//图内筛选器的选项
		tableVisible:false,
		chartYAxis:[{  	
			type : 'value',
			name: this.YAxisTitle,
			// nameLocation: 'start',
			axisLine:{
				lineStyle:{
					width:1,
				},
				symbol:['none','arrow']
			},
			axisLabel: {
				interval:0,
				formatter:this.YAxisFormatter
			}					
		}], //
	  	chartXAxis:[],
		chartId:1,
		dataSetId:2,
		picFilterFlag:false,
		loading:false,
		responseData:[],
		deleteJsonKeyArray:[],
		responseOriginData:[],
		dropdownArray_text:[],
		dropdownArray_number:[],
		picSeries:[],
		chartMethod:[],
		xAxisString:[],
		yAxisString:[],
		sortFlag:1,
		selectItem:'',
		echartsFinishedFlag:0,
		XAxisTitle:[],
		YAxisTitle:[],
		filter:[],
		YAxisFormatter:'{value}',
		XAxisFormatter:function (value, index) {
					return value 
				},
		tableSecVisible:false,
		secondaryAxis:"",
		secondaryString:[],
		chartMethod2nd:'',
		filterPast:[]			//图内筛选器字段参数

    }
  },

	components:{
		numberFilterItem
	},
	mounted(){
		this.autoDivSize();//根据浏览器尺寸设置echarts的宽高

		//0.获得data_set_id
		Bus.$on('getDataSetId',(dataSetId)=>{
			this.dataSetId = dataSetId
			//alert(this.dataSetId)
		})
		
		//左侧伸缩按钮导致的echarts重绘
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
			this.echartAxiosData = e; //被用来操作（筛选）的数据
		})
	  
	  
		//1.监听X轴传值
		Bus.$on('rowdata', (e) => {
			this.xAxisItem.push(e)
			this.XAxisTitle.push(e)
			Bus.$emit('firstXAixs',e)
			
			//表格
			if(this.yAxisItemName.length<1){
					this.tableVisible = true
					for(let j =0 ;j < 15;j++){this.tableData[j] = this.echartAxiosData[j];}
					this.fields.push(e)
				}
				else{
					//在新增拖动x轴，且y轴已经有值的时候，发送请求，重写数据
					//拼x轴字符串
					this.xAxisString = []
					this.xAxisString = this.xAxisItem[0]; 
					for (let i = 1; i < this.xAxisItem.length; i++) {
						this.xAxisString = this.xAxisString + ',' + this.xAxisItem[i] 
					}


					this.chartMethod = this.chartMethod.join(',')
					//发送求和请求

					this.$axios
					.post(
					"http://120.79.146.91:8000/task/chart/result",
						{
							chart_id:this.chartId,
							data_set:this.dataSetId,//这是data_set_id 
							chart_method:this.chartMethod,
							chart_type:1,
							x_axis:this.xAxisString,
							y_axis:this.yAxisString,
							sort:-1,
							sort_value:'',
							filter:[{
								field_type:0,
								field_name:this.yAxisItemName[0],
								filter_method:">",
								filter_obj:"-100000"
							}],
							filter_past:this.filterPast,
							secondary_axis:"",
							chart_method_2nd:"2",
							chart_type_2nd:2,
						},
						{
							headers: {
							Authorization: "JWT " + localStorage.getItem("token")
							}
						}
					)
					.then(r => {
						
						for(let i = 0;i<this.yAxisItemName.length;i++){
							this.setData(r,this.yAxisItemName[i])
						}

						this.chartMethod = this.chartMethod.split(',');

					})
					.catch(response => {
						console.log(response)
						this.$message({
						message: '操作失败，请重试',
						type: 'warning',
						duration:1000
						});
					});
					Bus.$emit('picFilterItem',this.xAxisItem.concat(this.yAxisItemName))
					this.drawLine();
				}
		})
	   


		//1.监听Y轴传值
		Bus.$on('coldata', (e) => {
			//alert(this.dataSetId)
			//获得拖到y轴上的节点字段数组
			this.yAxisItemName.push(e)
			this.YAxisTitle.push(e)
			this.selectItem = this.yAxisItemName[0]
			Bus.$emit('chartsType',this.yAxisItemName)//让右边图表类型改颜色
			//拼y轴字符串
			this.yAxisString = []
			this.yAxisString = this.yAxisItemName[0]; 
			for (let i = 1; i < this.yAxisItemName.length; i++) {
				this.yAxisString = this.yAxisString + ',' + this.yAxisItemName[i] 
			}
			//拼x轴字符串
			this.xAxisString = []
			this.xAxisString = this.xAxisItem[0]; 
			for (let i = 1; i < this.xAxisItem.length; i++) {
				this.xAxisString = this.xAxisString + ',' + this.xAxisItem[i] 
			}

			//给"平均求和计数"等chartMethod赋初始值
			this.chartMethod = []
			for(let i =0;i<this.yAxisItemName.length;i++){
				this.chartMethod.push("2")
			}
			this.chartMethod = this.chartMethod.join(',')
			//发送求和请求
			this.$axios
			.post(
			"http://120.79.146.91:8000/task/chart/result",
				{
						chart_id:this.chartId,
							data_set:this.dataSetId,//这是data_set_id 
							chart_method:this.chartMethod,
							chart_type:1,
							x_axis:this.xAxisString,
							y_axis:this.yAxisString,
							sort:-1,
							sort_value:'',
							filter:[{
								field_type:0,
								field_name:this.yAxisItemName[0],
								filter_method:">",
								filter_obj:"-100000"
							}],
							filter_past:this.filterPast,
							secondary_axis:"",
							chart_method_2nd:"2",
							chart_type_2nd:2,
				},
				{
					headers: {
					Authorization: "JWT " + localStorage.getItem("token")
					}
				}
			)
			.then(r => {
				this.setData(r,e)
				this.chartMethod = this.chartMethod.split(',');
				
			})
			.catch(response => {
				console.log(response)
				this.loading = false
				this.yAxisItemName.pop()
				this.YAxisTitle.pop()
				Bus.$emit('yAixsFail','fail');
				this.$message({
				message: '操作失败，请重试',
				type: 'warning',
                duration:1000
				});
			});
			//给图内筛选器提供选项
			Bus.$emit('picFilterItem',this.xAxisItem.concat(this.yAxisItemName))
			this.drawLine();
			document.getElementById('myChart').style.display = 'block'
			this.tableSecVisible = false
		})
		

	    //2.然后是监听次轴传值
        Bus.$on('dropAxisCol', (e) => {
		    this.secondaryString.push(e)
			this.secondaryAxis = ''
			this.secondaryAxis = this.secondaryString[0]; 
			for (let i = 1; i < this.secondaryString.length; i++) {
				this.secondaryAxis = this.secondaryAxis + ',' + this.secondaryString[i] 
			}
		    //this.secondaryAxis = 'RANK,RANK_H' //点击减号的时候把这个数组清空，把tag数组清空，重新请求绘图
			//this.chartMethod2nd = "2"
			//alert(this.secondaryAxis)


			this.chartMethod2nd = []
			for(let i =0;i<this.secondaryAxis.length;i++){
				this.chartMethod2nd.push("2")
			}
			this.chartMethod2nd = this.chartMethod2nd.join(',')



			this.chartMethod = this.chartMethod.join(',')
			//发送求和请求
			this.$axios
					.post(
					"http://120.79.146.91:8000/task/chart/result",
						{
							chart_id:this.chartId,
							data_set:this.dataSetId,
							chart_method:this.chartMethod,
							sort:-1,
							secondary_axis:this.secondaryAxis,
							chart_method_2nd:this.chartMethod2nd,
							chart_type_2nd:2,
							sort_value:"",
							filter:[
								{
									field_type:0,
									field_name:this.yAxisItemName[0],
									filter_method:">",
									filter_obj:"-100500"
								}
							],
							filter_past:this.filterPast,
							chart_type:1,
							x_axis:this.xAxisString,
							y_axis:this.yAxisString,
						},
						{
							headers: {
							Authorization: "JWT " + localStorage.getItem("token")
							}
						}
					)
					.then(r => {
					
						
						this.chartYAxis = [{  	
							type : 'value',
							name: this.YAxisTitle,
							// nameLocation: 'start',
							axisLine:{
								lineStyle:{
									width:1,
								},
								symbol:['none','arrow']
							},
							axisLabel: {
								interval:0,
								formatter:this.YAxisFormatter
							}					
						},{  	
							type : 'value',
							name: '次轴',
							// nameLocation: 'start',
							axisLine:{
								lineStyle:{
									width:1,
								},
								symbol:['none','arrow']
							},
							axisLabel: {
								interval:0,
								formatter:this.YAxisFormatter
							}					
						}]

						
						for(let i = 0;i<this.secondaryString.length;i++){
							this.setData(r,e + '_2nd')
							this.seriesData[this.seriesData.length-1].yAxisIndex = 1
							this.seriesData[this.seriesData.length-1].type = 'line'
						}

						for(let i = 0;i<this.seriesData.length;i++){
							if(this.seriesData[i].name.indexOf('_2nd')> -1)this.seriesData[i].type = 'line'
						}


						//this.myChart.dispose()
						this.drawLine()
						this.chartMethod = this.chartMethod.split(',');
						this.chartMethod2nd = this.chartMethod2nd.split(',');

					})
					.catch(response => {
						console.log(response)
						this.$message({
						message: '操作失败，请重试',
						type: 'warning',
						duration:1000
						});
					});

			//给图内筛选器提供选项
			Bus.$emit('picFilterItem',this.xAxisItem.concat(this.yAxisItemName))
			this.drawLine();
		   
	   	})

		//次轴删除
		Bus.$on('secondRemove',(e)=>{
			this.secondaryAxis=""
			this.secondaryString=[]
			this.chartMethod2nd=''

			this.chartMethod = this.chartMethod.join(',')
			//发送求和请求
			this.$axios
					.post(
					"http://120.79.146.91:8000/task/chart/result",
						{
							chart_id:this.chartId,
							data_set:this.dataSetId,
							chart_method:this.chartMethod,
							sort:-1,
							secondary_axis:"",
							chart_method_2nd:"2",
							chart_type_2nd:2,
							sort_value:"",
							filter:[
								{
									field_type:0,
									field_name:this.yAxisItemName[0],
									filter_method:">",
									filter_obj:"-100500"
								}
							],
							filter_past:this.filterPast,
							chart_type:1,
							x_axis:this.xAxisString,
							y_axis:this.yAxisString,
						},
						{
							headers: {
							Authorization: "JWT " + localStorage.getItem("token")
							}
						}
					)
					.then(r => {
						
						this.chartYAxis = [{  	
							type : 'value',
							name: this.YAxisTitle,
							// nameLocation: 'start',
							axisLine:{
								lineStyle:{
									width:1,
								},
								symbol:['none','arrow']
							},
							axisLabel: {
								interval:0,
								formatter:this.YAxisFormatter
							}					
						}]

						for(let i = 0;i<this.yAxisItemName.length;i++){
							this.setData(r,this.yAxisItemName[i])
						}

						//this.myChart.dispose()
						this.drawLine()
						this.chartMethod = this.chartMethod.split(',');

					})
					.catch(response => {
						console.log(response)
						this.$message({
						message: '操作失败，请重试',
						type: 'warning',
						duration:1000
						});
					});
		})


		//监听图表计算方法的变化（求和、平均、计数） type是求和、平均、计数，dropName是选中的tag名字
		Bus.$on('chartMethod',(type,dropName)=>{		
			switch (type) {
				case '计数':
					this.chartMethod[this.yAxisItemName.indexOf(dropName)] = 1
					break;
				case '求和':
					this.chartMethod[this.yAxisItemName.indexOf(dropName)] = 2
					break;
				case '平均':
					this.chartMethod[this.yAxisItemName.indexOf(dropName)] = 3
					break;
				default:
					break;
			}
			this.chartMethod = this.chartMethod.join(',')
			//发送求和请求
			this.$axios
			.post(
			"http://120.79.146.91:8000/task/chart/result",
				{
					chart_id:this.chartId,
					data_set:this.dataSetId,
					chart_method:this.chartMethod,
					sort:-1,
					secondary_axis:this.secondaryAxis,
					chart_method_2nd:this.chartMethod2nd,
					chart_type_2nd:2,
					sort_value:"",
					filter:[
						{
							field_type:0,
							field_name:this.yAxisItemName[0],
							filter_method:">",
							filter_obj:"-100500"
						}
					],
					filter_past:this.filterPast,
					chart_type:1,
					x_axis:this.xAxisString,
					y_axis:this.yAxisString,
				},
				{
					headers: {
					Authorization: "JWT " + localStorage.getItem("token")
					}
				}
			)
			.then(r => {
				let str1 = r.data.data	
				let str2 = str1.replace(/\["|\"]/g,"")
				let str3 = str2.replace(/\","/g,"·")

				this.responseData = r.data.data;
				this.responseOriginData = r.data.data;

				for(let i =0 ;i<Object.keys(JSON.parse(str3)).length;i++){
					let seriesItem = []
					let element = JSON.parse(str3)[Object.keys(JSON.parse(str3))[i]]
					for(let j = 0;j<Object.keys(element).length;j++){
						seriesItem.push(element[Object.keys(element)[j]])  
						}

						this.seriesData[i].data = seriesItem
				}

				this.drawLine();
				this.chartMethod = this.chartMethod.split(',');

			})
			.catch(response => {
				this.$message({
				message: '操作失败，请重试',
				type: 'warning',
                duration:1000
				});
			});

			//Bus.$emit('picFilterItem',this.xAxisItem.concat(this.yAxisItemName))
			this.drawLine();
			
		})

		//监听图表排序
		Bus.$on('sortValue',(SortRadio,selectItem)=>{
			// alert(SortRadio)
			// alert(selectItem)
			this.sortClick(SortRadio,selectItem)
		})

	 
	   
	   //2.监听X轴移除事件。这里只移除了一个(还没有PATCH)
       Bus.$on('rowdataRemove', (e) => {
			this.xAxisItem.splice(e, 1);//这里删完之后要重新请求，所以要把请求写成方法
			this.XAxisTitle.splice(e, 1)
			//this.tableVisible = false
			//表格
			if(this.yAxisItemName.length<1){
					this.tableVisible = true
					for(let j =0 ;j < 15;j++){this.tableData[j] = this.echartAxiosData[j];}
					this.fields.splice(e, 1)
				}
				else{
					//在新增拖动x轴，且y轴已经有值的时候，发送请求，重写数据
					//拼x轴字符串
					this.xAxisString = []
					this.xAxisString = this.xAxisItem[0]; 
					for (let i = 1; i < this.xAxisItem.length; i++) {
						this.xAxisString = this.xAxisString + ',' + this.xAxisItem[i] 
					}

					this.chartMethod = this.chartMethod.join(',')
					//发送求和请求

					this.$axios
					.post(
					"http://120.79.146.91:8000/task/chart/result",
						{
							chart_id:this.chartId,
							data_set:this.dataSetId,
							chart_method:this.chartMethod,
							sort:-1,
							secondary_axis:this.secondaryAxis,
							chart_method_2nd:"2",
							chart_type_2nd:2,
							sort_value:"",
							filter:[
								{
									field_type:0,
									field_name:this.yAxisItemName[0],
									filter_method:">",
									filter_obj:"-100500"
								}
							],
							filter_past:this.filterPast,
							chart_type:1,
							x_axis:this.xAxisString,
							y_axis:this.yAxisString,
						},
						{
							headers: {
							Authorization: "JWT " + localStorage.getItem("token")
							}
						}
					)
					.then(r => {
					
						for(let i = 0;i<this.yAxisItemName.length;i++){
							this.setData(r,this.yAxisItemName[i])
						}

						this.chartMethod = this.chartMethod.split(',');

					})
					.catch(response => {
						console.log(response)
						this.$message({
						message: '操作失败，请重试',
						type: 'warning',
						duration:1000
						});
					});
					Bus.$emit('picFilterItem',this.xAxisItem.concat(this.yAxisItemName))
					this.drawLine();
				}
			this.myChart.dispose()
			this.drawLine();
			Bus.$emit('picFilterItem',this.xAxisItem.concat(this.yAxisItemName))
	   })

		//2.监听y轴移除事件(还没有PATCH)
       Bus.$on('coldataRemove', (e) => {
		//    alert(e)
		//    alert(this.yAxisItemName)
			this.seriesData.splice(e, 1);
			this.yAxisItemName.splice(e, 1);
			this.YAxisTitle.splice(e, 1);
			if(this.yAxisItemName.length == 0){
				this.tableSecVisible = true
				this.tableVisible = true
				document.getElementById('myChart').style.display = 'none'
			}
			Bus.$emit('chartsType',this.yAxisItemName)//让右边图表类型改颜色
			this.tableVisible = false
			this.myChart.dispose()
			this.drawLine();
			Bus.$emit('picFilterItem',this.xAxisItem.concat(this.yAxisItemName))
	   })
		
		//3.监听图表类型改变(还没有PATCH)
		Bus.$on('barChange',(type)=>{
            this.drawLine(type)
		})
		Bus.$on('lineChange',(type)=>{

						
		})
		Bus.$on('scatterChange',(type)=>{
            switch (type) {
                case '普通散点图':
                    this.scatterDrawLine('普通散点图') //此处传参
                    break;
                case '气泡图':
                    this.scatterDrawLine('气泡图')
                    break;
                default:
                    break;
            }			
		})
		Bus.$on('pieChange',(type)=>{
            switch (type) {
                case '普通饼图':
                    this.pieDrawLine('普通饼图') //此处传参
                    break;
                case '半径饼图':
                    this.pieDrawLine('半径饼图')
                    break;
                case '面积饼图':
                    this.pieDrawLine('面积饼图')
                    break;
                case '南丁格尔图':
                    this.pieDrawLine('南丁格尔图')
                    break;
                default:
                    break;
            }			
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
											 return params.data.pointText;
										}  
								  	}
								}
		                },
					};

			this.markPointArray[seriesIndex].push({coord:[dataIndex,data],pointText:pointInput})
			this.option.series[seriesIndex].markPoint.data = this.markPointArray[seriesIndex]
			//this.option.series[seriesIndex].markPoint.itemStyle.normal.label.formatter = this.option.series[seriesIndex].markPoint.data.cnm
			this.drawLine();
		})

		//监听数据标注删除（不PATCH）
		Bus.$on('deletePoint',(val,pointSeriesIndex)=>{   //尝试传(pointSeries,pointY,pointX)失败，pointSeries被覆盖，用回名字

			for(let j = 0;j<this.option.series[pointSeriesIndex].markPoint.data.length;j++){
				this.option.series[pointSeriesIndex].markPoint.data.splice(j,1)
			}
			
			this.drawLine();

		})
		
		//监听筛选移除，这是个神奇的东西，删除了之后导致y轴少一列数据
		Bus.$on('filterCancel',(e)=>{
			this.responseData = this.responseOriginData
				let str1 = this.responseData
				let str2 = str1.replace(/\["|\"]/g,"")
				let str3 = str2.replace(/\","/g,"·")
			let responseDataJSON = JSON.parse(str3)
			let jsonFirstKeys = Object.keys(responseDataJSON)
			let jsonSecKeys = Object.keys(responseDataJSON[Object.keys(responseDataJSON)[0]])
			this.seriesDataItem = []  //相当于清空echarts的数据 
			this.seriesData = []  

			//let yAixsData = JSON.parse(this.responseData)[dropName]
			this.yAxisItemName = Object.keys(responseDataJSON)

			for(let index=0;index<jsonFirstKeys.length;index++){
				this.seriesDataItem = []
				this.Xdata =  Object.keys(responseDataJSON[Object.keys(responseDataJSON)[index]])
			　　　　 for(let i=0;i<this.Xdata.length;i++){
						this.seriesDataItem.push(JSON.parse(str3)[jsonFirstKeys[index]][this.Xdata[i]])  
					}			
				this.seriesData.push({
					name:jsonFirstKeys[index],
					type:'bar',
					data:this.seriesDataItem,
					itemStyle: {}
					})
				}
				 
			this.myChart.dispose()
			this.drawLine()
		})


		//监听字段筛选（还没有PATCH）
		Bus.$on('textFilter',(textInput,textTypeSelect,dropName)=>{
			
			this.seriesDataItem = []  //相当于清空echarts的数据 
			this.seriesData = []  

			for(let filterIndex=0;filterIndex<textTypeSelect.length;filterIndex++){
			switch (textTypeSelect[filterIndex]) {
				case '包含':
					this.filterPast.push({
						field_type:1,
						field_name:dropName,
						filter_method:"equal",
						filter_obj:textInput[filterIndex]
					})
					break;
				case '大于':
					this.filterPast.push({
						field_type:1,
						field_name:dropName,
						filter_method:">",
						filter_obj:textInput[filterIndex]
					})
					break;
				case '小于':
					this.filterPast.push({
						field_type:1,
						field_name:dropName,
						filter_method:"<",
						filter_obj:textInput[filterIndex]
					})
					break;
				case '大于等于':
					this.filterPast.push({
						field_type:1,
						field_name:dropName,
						filter_method:">=",
						filter_obj:textInput[filterIndex]
					})
					break;
				case '小于等于':
					this.filterPast.push({
						field_type:1,
						field_name:dropName,
						filter_method:"<=",
						filter_obj:textInput[filterIndex]
					})
					break;
				default:
					break;
				}

			}//条件循环的结尾

			//发送求和请求
			this.chartMethod = this.chartMethod.join(',')
			this.$axios
			.post(
			"http://120.79.146.91:8000/task/chart/result",
				{
					chart_id:this.chartId,
					data_set:this.dataSetId,//这是data_set_id 
					chart_method:this.chartMethod,
					chart_type:1,
					x_axis:this.xAxisString,
					y_axis:this.yAxisString,
					sort:-1,
					sort_value:'',
					filter:[{
						field_type:0,
						field_name:this.yAxisItemName[0],
						filter_method:">",
						filter_obj:"-100000"
					}],
					filter_past:this.filterPast,
					secondary_axis:"",
					chart_method_2nd:"2",
					chart_type_2nd:2,
				},
				{
					headers: {
					Authorization: "JWT " + localStorage.getItem("token")
					}
				}
			)
			.then(r => {

				for(let i = 0;i<this.yAxisItemName.length;i++){
					this.setData(r,this.yAxisItemName[i])
				}
				this.chartMethod = this.chartMethod.split(',');
				
			})
			.catch(response => {
				this.$message({
				message: '操作失败，请重试',
				type: 'warning',
                duration:1000
				});
			});

			// //通知字段筛选的穿梭框改数值,估计已经失效
			// //Bus.$emit('textFilterData',Object.keys(responseDataJSON[Object.keys(responseDataJSON)[0]]))
			
			this.myChart.dispose()
			this.drawLine()
		})

		//监听字段筛选的精确筛选
		Bus.$on('textFilterAccuracy',(e)=>{
			//responseDataJSON是原数据
			//jsonFirstKeys 是 Y轴数值 RANK,RANK_H
			//jsonSecKeys是学校名称
			//deleteJsonKeyArray是被删掉的学校名称
			let str1 = this.responseData
			let str2 = str1.replace(/\["|\"]/g,"")
			let str3 = str2.replace(/\","/g,"·")
			let responseDataJSON = JSON.parse(str3)
			let jsonFirstKeys = Object.keys(responseDataJSON)
			let jsonSecKeys = Object.keys(responseDataJSON[Object.keys(responseDataJSON)[0]])
			this.seriesDataItem = []  //相当于清空echarts的数据 
			this.seriesData = []  
			
			for(let i=0;i<Object.keys(responseDataJSON).length;i++){
			//e是穿梭框选中的值的数组
			let jsonArray = ''
			if(e.length<2){
				jsonArray = "{" + '"' + e[0] + '"' + ":" + responseDataJSON[Object.keys(responseDataJSON)[0]][e[0]] + "}"
				responseDataJSON[e[0]] = JSON.parse(jsonArray)
				}
			else{
				jsonArray = "{" + '"' + e[0] + '"' + ":" + responseDataJSON[Object.keys(responseDataJSON)[0]][e[0]] 
					for(let k=1;k<e.length;k++){
						jsonArray = jsonArray + "," + '"' + e[k] + '"' + ":" + responseDataJSON[Object.keys(responseDataJSON)[i]][e[k]]
					}
				jsonArray = jsonArray + "}"
				}
			responseDataJSON[Object.keys(responseDataJSON)[i]] = JSON.parse(jsonArray)
			}
			
			//let yAixsData = JSON.parse(this.responseData)[dropName]
			this.yAxisItemName = Object.keys(responseDataJSON)

			for(let index=0;index<jsonFirstKeys.length;index++){
				this.seriesDataItem = []
				this.Xdata =  Object.keys(responseDataJSON[Object.keys(responseDataJSON)[index]])
			　　　　 for(let i=0;i<this.Xdata.length;i++){
						this.seriesDataItem.push(JSON.parse(str3)[jsonFirstKeys[index]][this.Xdata[i]])  
					}			
				this.seriesData.push({
					name:jsonFirstKeys[index],
					type:'bar',
					data:this.seriesDataItem,
					itemStyle: {}
					})
				}
			this.responseData = JSON.stringify(responseDataJSON)
			this.myChart.dispose()
			this.drawLine()
		})

		
		//监听数值筛选（还没有PATCH）
		Bus.$on('numberFilter',(numberInput,numberTypeSelect,dropName)=>{

			this.seriesDataItem = []  //相当于清空echarts的数据 
			this.seriesData = []  

			for(let filterIndex=0;filterIndex<numberTypeSelect.length;filterIndex++){
			switch (numberTypeSelect[filterIndex]) {
				case '等于':
					this.filterPast.push({
						field_type:0,
						field_name:dropName,
						filter_method:"==",
						filter_obj:numberInput[filterIndex]
					})
					break;
				case '大于':
					this.filterPast.push({
						field_type:0,
						field_name:dropName,
						filter_method:">",
						filter_obj:numberInput[filterIndex]
					})
					break;
				case '小于':
					this.filterPast.push({
						field_type:0,
						field_name:dropName,
						filter_method:"<",
						filter_obj:numberInput[filterIndex]
					})
					break;
				case '大于等于':
					this.filterPast.push({
						field_type:0,
						field_name:dropName,
						filter_method:">=",
						filter_obj:numberInput[filterIndex]
					})
					break;
				case '小于等于':
					this.filterPast.push({
						field_type:0,
						field_name:dropName,
						filter_method:"<=",
						filter_obj:numberInput[filterIndex]
					})
					break;
				default:
					break;
				}

			}//条件循环的结尾

			//发送求和请求
			this.chartMethod = this.chartMethod.join(',')
			this.$axios
			.post(
			"http://120.79.146.91:8000/task/chart/result",
				{
					chart_id:this.chartId,
					data_set:this.dataSetId,//这是data_set_id 
					chart_method:this.chartMethod,
					chart_type:1,
					x_axis:this.xAxisString,
					y_axis:this.yAxisString,
					sort:-1,
					sort_value:'',
					filter:[{
						field_type:0,
						field_name:this.yAxisItemName[0],
						filter_method:">",
						filter_obj:"-100000"
					}],
					filter_past:this.filterPast,
					secondary_axis:"",
					chart_method_2nd:"2",
					chart_type_2nd:2,
				},
				{
					headers: {
					Authorization: "JWT " + localStorage.getItem("token")
					}
				}
			)
			.then(r => {

				for(let i = 0;i<this.yAxisItemName.length;i++){
					this.setData(r,this.yAxisItemName[i])
				}
				this.chartMethod = this.chartMethod.split(',');
				
			})
			.catch(response => {
				this.$message({
				message: '操作失败，请重试',
				type: 'warning',
                duration:1000
				});
			});

			// //通知字段筛选的穿梭框改数值,估计已经失效
			// //Bus.$emit('textFilterData',Object.keys(responseDataJSON[Object.keys(responseDataJSON)[0]]))
			
			this.myChart.dispose()
			this.drawLine()

		})

		//监听【筛选器】移除
		Bus.$on('numberFilterRemove',(index)=>{
			//alert(index)
			//console.log(this.filterPast[index])
			console.log(this.filterPast)
			this.filterPast.splice(index, 1);
			console.log(this.filterPast)

			this.chartMethod = this.chartMethod.join(',')
			//发送求和请求
			this.$axios
			.post(
			"http://120.79.146.91:8000/task/chart/result",
				{
					chart_id:this.chartId,
					data_set:this.dataSetId,//这是data_set_id 
					chart_method:this.chartMethod,
					chart_type:1,
					x_axis:this.xAxisString,
					y_axis:this.yAxisString,
					sort:-1,
					sort_value:'',
					filter:[{
						field_type:0,
						field_name:this.yAxisItemName[0],
						filter_method:">",
						filter_obj:"-100000"
					}],
					filter_past:this.filterPast,
					secondary_axis:"",
					chart_method_2nd:"2",
					chart_type_2nd:2,
				},
				{
					headers: {
					Authorization: "JWT " + localStorage.getItem("token")
					}
				}
			)
			.then(r => {
				
				for(let i = 0;i<this.yAxisItemName.length;i++){
					this.setData(r,this.yAxisItemName[i])
				}


			})
			.catch(response => {
				console.log(response)
				this.$message({
				message: '操作失败，请重试',
				type: 'warning',
				duration:1000
				});
			});
			this.chartMethod = this.chartMethod.split(',');		
			///this.myChart.dispose()
			this.drawLine()
		})

		//监听图内筛选器-创建
		Bus.$on('transferChoice',(e)=>{
			this.picFilterFlag = true
			this.dropdownArray_text = [];
			this.dropdownArray_number = []
			
			let str1 = this.responseData
			let str2 = str1.replace(/\["|\"]/g,"")
			let str3 = str2.replace(/\","/g,"·")
			let responseDataJSON = JSON.parse(str3)
			// this.dropdownTextItemArray = [];
			//e是选定的字段,上面循环dropdownArray来产生筛选器的选项，这里要区分字段和数值
			//
			for(let i=0;i<e.length;i++){
				try {
					if(this.isNumber(responseDataJSON[e[i]][Object.keys(responseDataJSON[e[i]])[0]]))this.dropdownArray_number.push(e[i])
				} catch (error) {
					this.dropdownArray_text.push(e[i])
				}

			}



			//目前只做一个维度的图内筛选，所以直接写死,如果两个维度，要了解返回的JSON，要判断index，通过和dropdownArray_text共用index
			//alert(this.Xdata)
			let dropdownTextItemArrayItem1 = []
			let dropdownTextItemArrayItem2 = []
			
			for(let i=0;i<this.Xdata.length;i++){
				// if(this.Xdata[0].split('·').length>1)i++  //愚蠢的判定
				dropdownTextItemArrayItem1.push(this.Xdata[i].split('·')[0])
				dropdownTextItemArrayItem2.push(this.Xdata[i].split('·')[1])
			}

			try {
				dropdownTextItemArrayItem1.unshift('全部') //这句会报错
				dropdownTextItemArrayItem2.unshift('全部') //这句会报错
			} catch (error) {
				
			}
			dropdownTextItemArrayItem1 = Enumerable.from(dropdownTextItemArrayItem1).distinct().toArray()  //去重
			dropdownTextItemArrayItem2 = Enumerable.from(dropdownTextItemArrayItem2).distinct().toArray()  //去重
			//dropdownTextItemArrayItem1.push('东方外语')
			this.dropdownTextItemArray.push(dropdownTextItemArrayItem1)
			this.dropdownTextItemArray.push(dropdownTextItemArrayItem2)
			//this.dropdownTextItemArray = Object.keys(responseDataJSON[Object.keys(responseDataJSON)[0]]) 
			//alert(Object.keys(responseDataJSON))


			

			
		})

		//图内筛选器--数值筛选
		Bus.$on('numberPicFilter',(numberInput,numberTypeSelect,dropName)=>{

			let str1 = this.responseData
			let str2 = str1.replace(/\["|\"]/g,"")
			let str3 = str2.replace(/\","/g,"·")
			let responseDataJSON = JSON.parse(str3)
			let jsonFirstKeys = Object.keys(responseDataJSON)
			let jsonSecKeys = Object.keys(responseDataJSON[Object.keys(responseDataJSON)[0]])
			this.seriesDataItem = []  //相当于清空echarts的数据 
			this.seriesData = []  
			//this.filter = []
			for(let i =0;i<this.filter.length;i++){
				if(this.filter[i].field_name == dropName)this.filter.splice(i,1)
			}

			for(let filterIndex=0;filterIndex<numberTypeSelect.length;filterIndex++){
			switch (numberTypeSelect[filterIndex]) {
				case '等于':
					this.filter.push({
						field_type:0,
						field_name:dropName,
						filter_method:"=",
						filter_obj:numberInput[filterIndex]
					})
					break;
				case '大于':
					this.filter.push({
						field_type:0,
						field_name:dropName,
						filter_method:">",
						filter_obj:numberInput[filterIndex]
					})
					break;
				case '小于':
					this.filter.push({
						field_type:0,
						field_name:dropName,
						filter_method:"<",
						filter_obj:numberInput[filterIndex]
					})
					break;
				case '大于等于':
					this.filter.push({
						field_type:0,
						field_name:dropName,
						filter_method:">=",
						filter_obj:numberInput[filterIndex]
					})
					break;
				case '小于等于':
					this.filter.push({
						field_type:0,
						field_name:dropName,
						filter_method:"<=",
						filter_obj:numberInput[filterIndex]
					})
					break;
				default:
					break;
				}

			console.log(this.filter)

			this.chartMethod = this.chartMethod.join(',')		
			this.$axios
			.post(
			"http://120.79.146.91:8000/task/chart/result",
				{
					chart_id:this.chartId,
					data_set:this.dataSetId,
					chart_method:this.chartMethod,
					sort:-1,
					secondary_axis:this.secondaryAxis,
					chart_method_2nd:"2",
					chart_type_2nd:2,
					sort_value:"",
					filter:this.filter,
					filter_past:this.filterPast,
					chart_type:1,
					x_axis:this.xAxisString,
					y_axis:this.yAxisString,

					// [{
					// 	field_type:0,
					// 	field_name:'RANK',
					// 	filter_method:">",
					// 	filter_obj:'50000'
					// },
					// {
					// 	field_type:0,
					// 	field_name:'RANK_H',
					// 	filter_method:"<",
					// 	filter_obj:'600000'
					// }]
					
				},
				{
					headers: {
					Authorization: "JWT " + localStorage.getItem("token")
					}
				}
			)
			.then(r => {
				for(let i = 0;i<this.yAxisItemName.length;i++){
					this.setData(r,this.yAxisItemName[i])
				}
				
			})
			.catch(response => {
				console.log(response)
				this.$message({
				message: '操作失败，请重试',
				type: 'warning',
                duration:1000
				});
			});
			this.chartMethod = this.chartMethod.split(',');

			}
			
			//通知字段筛选的穿梭框改数值,可能已经失效
			Bus.$emit('textFilterData',Object.keys(responseDataJSON[Object.keys(responseDataJSON)[0]]))
			this.responseData = JSON.stringify(responseDataJSON)

			this.myChart.dispose()
			this.drawLine()


		})


		//监听修改X轴Y轴的标题和的单位
		Bus.$on('xAxisInputChange',(val)=>{
			this.XAxisTitle = val
			this.drawLine()
		})
		Bus.$on('xAxisUnitChange',(val)=>{
			this.XAxisFormatter = function (value, index) {
					return value + '(' + val + ')'
				}
			this.drawLine()
		})
		Bus.$on('yAxisInputChange',(val)=>{
			this.YAxisTitle = val
			this.drawLine()
		})
		Bus.$on('yAxisUnitChange',(val)=>{
			this.YAxisFormatter = '{value}(' + val + ')'
			this.drawLine()
		})

		
		//定义二维数组存，否则会窜数据
		for(var k=0;k<=20;k++){        
			this.markPointArray[k]=new Array();   
		}

  },
  methods: {

	setData(r,dropName){
		
		this.responseData = r.data.data;
		this.responseOriginData = r.data.data;

		let str1 = r.data.data						//完整数据
		let str2 = str1.replace(/\["|\"]/g,"")
		let str3 = str2.replace(/\","/g,"·")

		
		try {
			Bus.$emit('xAixsData',JSON.parse(str3)) //发一份给字段筛选穿梭框
		} catch (error) {
			//这个地方不抛出异常的话会导致2个维度的时候下面的代码不能执行，目前抛出异常后能正常地拖1或2个维度，但2维度时不能有图内筛选器
		}

		let element = JSON.parse(str3)[dropName]	//对应的y轴的值
		this.Xdata = []//每次循环清空X轴，否则重叠
		this.seriesDataItem = [] //清空serIDataItem否则重叠

		//给X轴赋值,Xdata为echarts的X轴的值
		　　　　 for(let i = 0;i<Object.keys(element).length;i++){
				this.Xdata.push(Object.keys(element)[i])  
			}
			//给Y轴赋值
		　　　　 for(let i = 0;i<Object.keys(element).length;i++){
			this.seriesDataItem.push(element[Object.keys(element)[i]])  
			}
				
		this.seriesData.push({
			name:this.yAxisItemName[this.yAxisItemName.length-1],
			type:'bar',
			data:this.seriesDataItem,
			itemStyle: {},

		})

		//打开dataZoom，X轴大于10时,数据是前10条
		if(Object.keys(element).length>10){
			this.dataZoom = [{
				type: 'slider',
				show: true,
				xAxisIndex: [0],
				start: 0,
				end: 1000/this.Xdata.length
			},{
				type: 'inside',
				start: 0,
				end: 1000/this.Xdata.length
			}]
		}
		Bus.$emit('filterClear','filterClear')//拖动y轴时直接清空筛选
	}, 

    drawLine(type){
		//这里直接让chartYxis这些赋值而没有push会导致次轴失效,拿到外面出来
		

		this.chartXAxis = {
			type : 'category',
			data : this.Xdata,
			name: this.XAxisTitle,
			axisLine:{
				lineStyle:{
					width:1,//X轴宽度
				},
				symbol:['none','arrow']
			},
			axisLabel: {
				interval:0,
				formatter:this.XAxisFormatter
			}

		}

		switch (type) {
			case '普通柱状图':
				this.chartYAxis.type = 'value'
				this.chartXAxis.type = 'category'	
				for(let i =0;i<this.seriesData.length;i++){
						this.seriesData[i].type = 'bar'
						delete this.seriesData[i].stack			//删掉堆叠
						delete this.seriesData[i].label			//删掉横向的label
				}
				this.dataZoom = [{
						type: 'slider',
						show: true,
						xAxisIndex: [0],
						start: 0,
						end: 1000/this.Xdata.length
						},{
						type: 'inside',
						xAxisIndex: [0],
						start: 0,
						end: 1000/this.Xdata.length
					}]				
				break;
			case '横向柱状图':
				let chartAxis = this.chartYAxis;
				this.chartYAxis = this.chartXAxis;
				this.chartXAxis = chartAxis;
				this.dataZoom = [{
					type: 'slider',
					show: true,
					yAxisIndex: [0],
					start: 0,
					end: 1000/this.Xdata.length
					},{
					type: 'inside',
					yAxisIndex: [0],
					start: 0,
					end: 1000/this.Xdata.length
				}]
				for(let i =0;i<this.seriesData.length;i++){
						this.seriesData[i].type = 'bar'
						delete this.seriesData[i].itemStyle.normal
					}
	
				break;
			case '堆叠柱状图':
				for(let i =0;i<this.seriesData.length;i++){
						// this.seriesData[i].label =	{
						// 	normal: {
						// 		show: true,
						// 		position: 'inside'
						// 	}
						// }
						this.seriesData[i].type = 'bar'
						delete this.seriesData[i].itemStyle.normal
						this.seriesData[i].stack = '总量'
					}
					this.dataZoom = [{
						type: 'slider',
						show: true,
						xAxisIndex: [0],
						start: 0,
						end: 1000/this.Xdata.length
						},{
						type: 'inside',
						xAxisIndex: [0],
						start: 0,
						end: 1000/this.Xdata.length
					}]
				break;
			case '对比柱状图':
				
				break;
			case '普通折线图':
				for(let i =0;i<this.seriesData.length;i++){
						this.seriesData[i].type = 'line'
						delete this.seriesData[i].areaStyle
					}
				break;
			case '面积图':
				for(let i =0;i<this.seriesData.length;i++){
						this.seriesData[i].type = 'line'
						this.seriesData[i].areaStyle = {normal: {}}
					}
				break;
			case '对比柱状图':
				
				break;
			default:
				break;
		}

		let dom = this.$refs.myChart;
      	this.myChart = this.$echarts.init(dom,this.chartStyle);
        this.option = {
		    title : {
				text: this.chartTitle,
				left:'center'
		    },
		    tooltip : {
				trigger: 'axis',
				axisPointer : {type : 'shadow'}
			},
			dataZoom: this.dataZoom,
		    legend: {
				data:this.yAxisItemName,  //拖到y轴的节点来创建图例
				y: 'center',    //延Y轴居中
             	x: 'right', //居右显示
				orient:'vertical'
			},
			toolbox: {
				show: true,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					dataView: {readOnly: false},
					saveAsImage: {}
				}
			},
		    calculable : true,
		    xAxis : this.chartXAxis,
		    yAxis : [{  	
				type : 'value',
				name: this.YAxisTitle,
				// nameLocation: 'start',
				axisLine:{
					lineStyle:{
						width:1,
					},
					symbol:['none','arrow']
				},
				axisLabel: {
					interval:0,
					formatter:this.YAxisFormatter
				}					
			}],
		    series : this.seriesData	
		};
		this.myChart.on('finished', function () {

		});

        this.myChart.setOption(this.option,true);
		Bus.$emit('chartsOption',this.option)
	},

	//绘制饼图
	pieDrawLine(pieType){

		let pieData = [];
		let pieValue = this.seriesData[0]['data'];
		for (let i = 0; i < this.Xdata.length; i++) {
			let pieDataItem = {
				value:pieValue[i],
				name:this.Xdata[i]
			}
			pieData.push(pieDataItem)
		}
		
		let dom = this.$refs.myChart;
      	this.myChart = this.$echarts.init(dom,this.chartStyle);
        this.option ={
		backgroundColor: '#FFF',
		title: {
			text: this.chartTitle,
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
			y: 'center',    //延Y轴居中
			x: 'right', //居右显示
			orient:'vertical',
			data:this.Xdata,
			textStyle :{
				color:'#5A616A'
			}
		},
		toolbox: {
			show: true,
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				dataView: {readOnly: false},
				magicType: {type: ['line', 'bar']},
				restore: {},
				saveAsImage: {}
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
				label : {
						normal: {
							textStyle: {
								color: '#AAAAAA'
							}
						}
					},
				labelLine : {
						normal: {
							lineStyle: {
								color: '#AAAAAA'
							},
							smooth: 0.2,
							length: 10,
							length2: 20
						}
					},
				animationTyp : 'scale',
				animationEasing : 'elasticOut',
				animationDelay : function (idx) {return Math.random() * 200;}
			}
		]
		};
		
		switch (pieType) {
			case '普通饼图':

				break;
			case '半径饼图':
				this.option.series[0].radius = ['50%', '70%']
				break;
			case '面积饼图':
				this.option.series[0].roseType = 'radius',
				this.option.series[0].radius = [40, 210]
				break;
			case '南丁格尔图':
				this.option.series[0].roseType = 'radius',
				this.option.series[0].itemStyle = {
					normal: {
						color: '#c23531',
						shadowBlur: 200,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
				break;
			default:
				break;
		}
		

        this.myChart.setOption(this.option,true);
		Bus.$emit('chartsOption',this.option)
	},

	//绘制散点图
	scatterDrawLine(scatterType){

		let scatterData = []
		for(let i =0;i<this.seriesData[0].data.length;i++){
			let scatterDataItem = []
			scatterDataItem.push(this.seriesData[0].data[i])
			scatterDataItem.push(this.seriesData[1].data[i])
			scatterDataItem.push(this.Xdata[i])
			scatterData.push(scatterDataItem)
		}
		switch (scatterType) {
			case '普通散点图':
							
				break;
			case '气泡图':
				
				break;
			default:
				break;
		}

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
			dataZoom: {},
			toolbox: {
				show: true,
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					dataView: {readOnly: false},
					magicType: {type: ['line', 'bar']},
					restore: {},
					saveAsImage: {},
					myTool1: {
						show: true,
						title: '自定义扩展方法1',
						icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
						onclick: function (){
							alert('myToolHandler1')
						}
					},
				}
			},

		    // xAxis : this.chartXAxis,
		    // yAxis : this.chartYAxis,
		    xAxis: {},
			yAxis: {},
			series: [{
				symbolSize: 20,
				data: scatterData,
				type: 'scatter',
				label: {
					emphasis: {
						show: true,
						formatter: function (param) {
							return param.data[2]
						},
						position: 'top'
					}
				}
			}]	
		};
		
        this.myChart.setOption(this.option,true);
		Bus.$emit('chartsOption',this.option)
	},


	//图内筛选器-数值筛选-点击事件
	picFilterNumberClick(val){
		//这里填入数值筛选时的筛选
		this.myChart.dispose()
		this.drawLine();
	},

	//图内筛选器-字段筛选-点击事件
	picFilterTextClick(val,item){
		// alert(val)	val是传进来的学校名称
		//alert(item.$attrs['val'])  //item.$attrs['val']是传进来的'学校名称'、'姓名_x'
		this.seriesDataItem = []  //相当于清空echarts的数据 
		this.seriesData = []  
		console.log(this.filterPast)
		if(this.filterPast == false){
			this.filterPast[0] = {
					field_type:1,
					field_name:item.$attrs['val'],
					filter_method:"equal",
					filter_obj:val		
				}
		}

		for(let i =0;i<this.filterPast.length;i++){
			//alert(i)
			if(this.filterPast[i].field_name == item.$attrs['val']){
				this.filterPast[i] = {
					field_type:1,
					field_name:item.$attrs['val'],
					filter_method:"equal",
					filter_obj:val		
				}
				// if(val=='全部'){
				// 	this.filterPast.pop()
				// 	this.filterPast[i] = {
				// 		field_type:1,
				// 		field_name:item.$attrs['val'],
				// 		filter_method:"",
				// 		filter_obj:'女'		
				// }
				// break;
				// }
			}
			if(this.filterPast[i].field_name != item.$attrs['val']){
				// alert('cnm')
				// alert(this.filterPast[i].field_name)
				// alert(item.$attrs['val'])
				this.filterPast.push({
					field_type:1,
					field_name:item.$attrs['val'],
					filter_method:"equal",
					filter_obj:val		
				})
				//filterPast条件是错的
				// alert(this.filterPast[i+1].filter_obj)
				// if(this.filterPast[i+1].filter_obj=='全部'){
				// 	alert('312123')
				// this.filterPast.pop()

				// }
			}
		}
		
		if(val=='全部'){
			for(let i =0;i<this.filterPast.length;i++){
				if(this.filterPast[i].field_name == item.$attrs['val']){
					this.filterPast[i] = {
						field_type:1,
						field_name:item.$attrs['val'],
						filter_method:"",
						filter_obj:'女'		
					}
					break;
				}
			}
		}

			this.chartMethod = this.chartMethod.join(',')		
			this.$axios
			.post(
			"http://120.79.146.91:8000/task/chart/result",
				{
					chart_id:this.chartId,
					data_set:this.dataSetId,
					chart_method:this.chartMethod,
					sort:-1,
					secondary_axis:this.secondaryAxis,
					chart_method_2nd:"2",
					chart_type_2nd:2,
					sort_value:"",
					filter:this.filter,
					filter_past:this.filterPast,
					chart_type:1,
					x_axis:this.xAxisString,
					y_axis:this.yAxisString,
				},
				{
					headers: {
					Authorization: "JWT " + localStorage.getItem("token")
					}
				}
			)
			.then(r => {

				for(let i = 0;i<this.yAxisItemName.length;i++){
					this.setData(r,this.yAxisItemName[i])
				}
			})
			.catch(response => {
				console.log(response)
				this.$message({
				message: '操作失败，请重试',
				type: 'warning',
                duration:1000
				});
			});
			this.chartMethod = this.chartMethod.split(',');

		this.myChart.dispose()
		this.drawLine();
	},

	sortClick(SortRadio,selectItem){
		switch (SortRadio) {
			case '原序':
				this.sortFlag = -1
				break;
			case '升序':
				this.sortFlag = 1
				break;
			case '降序':
				this.sortFlag = 0
				break;
			default:
				break;
		}
		this.selectItem = selectItem
		//selectItem = selectItem.join('')
		this.$axios
			.post(
			"http://120.79.146.91:8000/task/chart/result",
				{
					chart_id:this.chartId,
					data_set:this.dataSetId,
					chart_method:this.chartMethod,
					sort:this.sortFlag,
					secondary_axis:this.secondaryAxis,
					chart_method_2nd:this.chartMethod2nd,
					chart_type_2nd:2,
					sort_value:this.selectItem,
					filter:[
						{
							field_type:0,
							field_name:this.yAxisItemName[0],
							filter_method:">",
							filter_obj:"-100500"
						}
					],
					filter_past:this.filterPast,
					chart_type:1,
					x_axis:this.xAxisString,
					y_axis:this.yAxisString,
				},
				{
					headers: {
					Authorization: "JWT " + localStorage.getItem("token")
					}
				}
			)
			.then(r => {
				let str1 = r.data.data	
				let str2 = str1.replace(/\["|\"]/g,"")
				let str3 = str2.replace(/\","/g,"·")
				this.responseData = r.data.data 		//使得所有的数据都是排序的

				for(let i =0 ;i<Object.keys(JSON.parse(str3)).length;i++){
					let seriesItem = []
					this.Xdata = []
					let element = JSON.parse(str3)[Object.keys(JSON.parse(str3))[i]]

					//给X轴赋值,Xdata为echarts的X轴的值
			　　　　 for(let j = 0;j<Object.keys(element).length;j++){
						this.Xdata.push(Object.keys(element)[j])  
					}

					for(let j = 0;j<Object.keys(element).length;j++){
						seriesItem.push(element[Object.keys(element)[j]])  
						}

						this.seriesData[i].data = seriesItem
				}

				this.drawLine();
				//this.chartMethod = this.chartMethod.split(',');
			})
			.catch(response => {
				this.$message({
				message: '操作失败，请重试',
				type: 'warning',
                duration:1000
				});
			});

			//Bus.$emit('picFilterItem',this.xAxisItem.concat(this.yAxisItemName))
			//this.myChart.dispose()
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

	isNumber(val) {
		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if(regPos.test(val) || regNeg.test(val)) {
			return true;
			} else {
				return false;
			}
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
	margin: 21px;
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