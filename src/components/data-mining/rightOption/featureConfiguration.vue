<template>
<div>
        <el-dialog title="辅助线设置" :visible.sync="dialogTableVisible">
            <div v-for="(item,index) in rowArray" :key="index">
            <mark-line-item :selectOptions="selectOptions" @changeMsg="rowItemEvent" class="markLineStyle"></mark-line-item>
            </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="ensure">确 定</el-button>
                </span>
        </el-dialog>

        <el-dialog title="数据标注" :visible.sync="chartDialogVisible" ref="dialog" @open="open()" id="chartDialog">
            <el-dialog
                width="30%"
                :title="yData[clickSeriesIndex]+'数据标签'"
                :visible.sync="markDialogVisible"
                append-to-body>
            <el-input v-model="pointInput" placeholder="请输入内容"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="markDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="markDialogEnsure">确 定</el-button>
                </span>
            </el-dialog>
            <div id="myChartDiolog" :style="{width: '800px', height: '400px'}" ref="myChartDiolog"></div>
        </el-dialog>

    
<el-button @click="dialogPop" class="btn-style"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-bi1"></use></svg>辅助线设置</el-button>
<el-tag
  v-for="(tag,index) in lineTags"
  :key="index"
  closable
  type="warning"
  style="margin:5px"
  @close="lineTagClose(tag.value,index)">
  {{tag.label}}
</el-tag>


<el-button @click="chartDialogPop" class="btn-style" style="margin-left:-5px"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-bi1"></use></svg>数据标注</el-button>
<el-tag
  v-for="(tag,index) in pointTags"
  :key="index"
  closable
  type="warning"
  style="margin:5px"
  @close="pointTagClose(tag.value,index,tag.pointSeriesIndex)">
  {{tag.label}}
</el-tag>

</div>
</template>

<script>
import Bus from '../Bus.js'
import markLineItem from './markLineItem'
import  'echarts/theme/macarons.js'
    export default {
    data() {
        return {
        input: '',
        yData:[],
        selectOptions: [],
        selectValue:[],
        selectType:['固定值','计算值'],
        selectTypeValue:'固定值',
        selectCalculateType:['平均值','最大值','最小值'],
        selectCalculateTypeValue:'平均值',
        dialogTableVisible:false,
        selectCalculateVisible:false,
        inputVisiable:true,
        iconVisiable:true,
        inputValue:0,
        rowArray:[1],
        lineTags:[],
        pointTags:[],
        myChartDiolog:{},
        option:{},
        chartDialogVisible:false,
        markDialogVisible:false,
        clickData:'123',
        clickDataIndex:'',
        clickSeriesIndex:'',
        markInput:'',
        pointInput:''
        }
    },
    components:{
        markLineItem
    },
    mounted(){

        Bus.$on('featureConfiguration',(e)=>{
            this.yData.push(e);
            this.selectOptions.push({
                value:e,
                label:e
            })
        })
        Bus.$on('markLineOption',(e)=>{
            this.lineTags.push({
                label:'辅助线:' + e.selectValue,
                value:e.selectValue
                })
        })
        Bus.$on('chartsOption',(e)=>{
            this.option = e
 
        })
        Bus.$on('dialogData',(DialogVisible,seriesIndex,data,dataIndex)=>{
            this.markDialogVisible = DialogVisible
            this.clickSeriesIndex = seriesIndex
            this.clickData = data
            this.clickDataIndex = dataIndex
        })


    },

    watch:{
        selectTypeValue(val){
            if(val == '计算值'){this.selectCalculateVisible = true;this.inputVisiable = false}
            else if(val == '固定值'){this.inputVisiable = true;this.selectCalculateVisible = false}
            else {}
        }
    },
    computed:{
        featureValueObject(){
            return {
                "selectValue":'清除辅助线',
                "selectTypeValue":'清除辅助线',
                "selectCalculateTypeValue":'清除辅助线',
                "inputValue":'清除辅助线'
            }
        }
    },
    methods:{
        ensure(){
           Bus.$emit('ensure',true);
           this.dialogTableVisible = false
        },
        dialogPop(){
            this.lineTags = []
            this.dialogTableVisible = true
        },
        rowItemEvent(e){
            if(e=='加行')this.rowArray.push(1)
            if(e=='减行')this.rowArray.pop()
        },
        lineTagClose(value,index){
            this.lineTags.splice(index,1)
            Bus.$emit('deleteLine',value);
        },
        pointTagClose(value,index,pointSeriesIndex){
            this.pointTags.splice(index,1)
            //Bus.$emit('deletePoint',value,this.yData[this.clickSeriesIndex]);
            Bus.$emit('deletePoint',value,pointSeriesIndex);
        },  
        chartDialogPop(){
            this.chartDialogVisible = true
        },
        drawLine(){
      	this.myChartDiolog = this.$echarts.init(document.getElementById('myChartDiolog'),'macarons');
            // 绘制图表
            this.myChartDiolog.setOption(this.option);

        },
        open(){
            this.$nextTick(function(){
                this.drawLine()
                this.myChartDiolog.on('click', function (params) {
                // this.$nextTick(function(){不能直接打开弹窗或者赋值操作emmmm
                // })
                    Bus.$emit('dialogData',true,params.seriesIndex,params.data,params.dataIndex)
            });    
            })
        },
        markDialogEnsure(){
            Bus.$emit('echartsMarkPoint',this.clickSeriesIndex,this.clickData,this.clickDataIndex,this.pointInput)
            this.markDialogVisible = false
            this.chartDialogVisible = false
            if(this.pointInput.length>2){
                this.pointTags.push({
                    label:'标注:' + this.pointInput.slice(0,2)+'…',
                    value:this.pointInput,
                    pointSeriesIndex:this.clickSeriesIndex
                    })
            }
            if(this.pointInput.length<=2){
                this.pointTags.push({
                    label:'标注:' + this.pointInput,
                    value:this.pointInput,
                    pointSeriesIndex:this.clickSeriesIndex
                    })
            }

            this.pointInput = ''
        }

    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .TitleStyle {
        margin-left: 5px;
    }
    .selectBox {
        margin: 2px
    }
    .markLineStyle {
        margin-top: 3px
    }
    .btn-style{
        width:100%;
        text-align: left;
        border: 0px
    }
</style>
