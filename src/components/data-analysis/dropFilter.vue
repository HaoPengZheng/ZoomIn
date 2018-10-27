<template>
    <div  id="dragCon" >
    <div class='people-content analysisDropFilterStyle'>
        <el-row>
            <el-col :span="24" >
                <!-- 字段框 -->
                <div class="el-input el-input-group el-input-group--prepend" style="margin-left:1px;">
                    <div class="el-input-group__prepend" style="border: 0px solid #dcdfe6" >筛选<svg class="icon" aria-hidden="true"><use xlink:href="#icon-shaixuan"></use></svg></div>
                    <div style="border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left;margin-top:0px" @drop='filterDrop($event)' @ondrop="removeDrop($event)" @dragover='allowDrop($event)' @ondragstart="drag(event)">
                        <el-tag v-for="(item,index) in dropFilter" :key="index" 
                            closable
                            :disable-transitions="false"
                            @close="filterRemove(item)"
                            style="margin:3px">{{item}}
                        </el-tag>
                        <svg class="icon" aria-hidden="true" style="float:right;margin:10px;margin-top:15px" @click="filterCancel"><use xlink:href="#icon-qingkong"></use></svg>
                        <div>
                            <div class="insert-tag"></div>
                        </div>
                        
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
    
     <el-dialog :visible.sync="dialogVisible" >
            <el-radio v-model="radio" :label="true">条件过滤</el-radio>
            <el-radio v-model="radio" :label="false">表达式过滤</el-radio>
            <el-card style="margin:50px"  shadow="hover" v-show="radio">
                <div v-for="(item,index) in rowArray" :key="index">
                    <drop-filter-item :dropName="dropName" v-if="item" :itemIndex="index" :itemMaxIndex="rowArrayLength" @dropFilterItemAdd = "itemAdd" style="margin:50px" @numberFilterChange = "numberFilterChange"></drop-filter-item>
                </div>
            </el-card>
            <el-card style="margin:50px"  shadow="hover" v-show="!radio" >
                <p style=" text-align: left">筛选条件：</p><br>
                <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入表达式"
                v-model="textarea">
                </el-input>
                <p style="text-align: left"><br>示例: [字段名]='123', 且名称需与筛选器名称相同</p>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="numberFilter">确 定</el-button>
            </span>
        </el-dialog>


     <el-dialog :visible.sync="textDialogVisible">
            <el-radio v-model="textRadio" label="label1">精准过滤</el-radio>
            <el-radio v-model="textRadio" label="label2">条件过滤</el-radio>
            <el-radio v-model="textRadio" label="label3">表达式过滤</el-radio>
            
            <!-- 精准过滤 -->
            <el-card style="margin:50px"  shadow="hover" v-if="textRadio === 'label1'">
              <el-transfer
                filterable
                filter-placeholder="搜索"
                v-model="textTransferValue"
                :data="textTransferData"
                :titles="['字段数据', '显示选项']"
                style="text-align:left;display:inline-block">
                </el-transfer>
            </el-card>

            <!-- 条件过滤 -->
            <el-card style="margin:50px"  shadow="hover" v-else-if="textRadio === 'label2'">
                <div v-for="(item,index) in textRowArray" :key="index">
                    <drop-filter-text-item :dropName="dropName" v-if="item" :itemIndex="index" :itemMaxIndex="textRowArrayLength" @dropFilterItemAdd = "TextItemAdd" style="margin:50px" @textFilterChange = "textFilterChange"></drop-filter-text-item>
                </div>
            </el-card>

            <!-- 表达式过滤 -->
            <el-card style="margin:50px"  shadow="hover" v-else-if="textRadio === 'label3'">
                <p style=" text-align: left">筛选条件：</p><br>
                <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入表达式"
                v-model="textarea">
                </el-input>
                <p style="text-align: left"><br>示例: [字段名]='123', 且名称需与筛选器名称相同</p>
            </el-card>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="textFilter">确 定</el-button>
            </span>
    </el-dialog>

    </div>

    
</template>

<script>
import Bus from './Bus.js'
import dropFilterItem from './dropFilterItem'
import dropFilterTextItem from './dropFilterTextItem'
    export default {
    data () {
        return {
            dropFilter:[],
            dialogVisible:false,
            textDialogVisible:false,
            isNumberArray:[],
            //筛选器弹框数据
            rowArray:[true],
            textRowArray:[true],
            rowArrayLength:1,
            textRowArrayLength:1,
            dropName:'',
            radio:true,
            textRadio:'label1',
            textarea:'',
            numberTypeSelect:[],
            numberInput:[],
            textTypeSelect:[],
            textInput:[],
            textTransferData:[],
            textTransferValue: [],
            textTransArray:[],
            textTraArrayValue:[],
            xAixsValueArray:[],
            firstXAixs:'',
            xAixsData:[]
        }
    },
    components:{
        dropFilterItem,
        dropFilterTextItem
    },
    mounted(){
        Bus.$on('xAixsData',(e)=>{
            console.log(e)
            console.log(e[Object.keys(e)[0]])
            this.textTransferData = []
            this.xAixsData = []
            Object.keys(e[Object.keys(e)[0]]).forEach((arrayItem,index)=>{
                this.textTransferData.push({
                    key:index,
                    label:arrayItem
                })
            })
            this.xAixsData = Object.keys(e[Object.keys(e)[0]])
        })

        Bus.$on('AxiosDataDragItem',(e)=>{
            this.isNumberArray = e
        })
        Bus.$on('textFilterData',(e)=>{
            this.xAixsValueArray = e
        })
        Bus.$on('firstXAixs',(e)=>{
            this.firstXAixs = e
        })
        Bus.$on('filterClear',(e)=>{//等待y轴清空数据
            this.filterCancel()
        })
    },

    methods:{
            drag:function(ev){
                ev.dataTransfer.setData("ID", ev.target.innerText);//拖动元素的ID
                //dom = ev.target

            },
            filterDrop:function(ev){
              ev.preventDefault();  
			        var data = ev.dataTransfer.getData("ID");//拖动的元素的ID
                        this.dropFilter.push(data)
                        if(this.isNumber(this.isNumberArray[data]))this.dialogVisible = true
                        if(!this.isNumber(this.isNumberArray[data])){
                            // Object.keys(this.xAixsData).forEach((arrayItem,index)=>{
                            // this.textTransferData.push
                            // })
                            console.log(this.xAixsValueArray)
                            if(data != this.firstXAixs){
                                alert("别乱拖")
                                this.dropFilter.pop()
                                return;
                            }
                            this.textDialogVisible = true
                        }
                        this.dropName = data
                        Bus.$emit('filterdata', data)
                        //给字段筛选的精确筛选穿梭框赋值
                        
            },
            allowDrop:function(event){
              event.preventDefault();
            },
            filterRemove(tag) {
                Bus.$emit('numberFilterRemove', tag);
                this.dropFilter.splice(this.dropFilter.indexOf(tag), 1);
            },
            itemAdd(e,itemIndex){
                if(e=='加行'){
                    this.rowArrayLength++
                    this.rowArray.push(true)
                }
                else{
                    this.rowArrayLength--
                    this.rowArray.splice(itemIndex,1,false)
                    this.numberInput.splice(itemIndex,1)
                    this.numberTypeSelect.splice(itemIndex,1)

                    let maxIndex=0
                    for(let item=0;item<this.rowArray.length;item++){
                        if(this.rowArray[item]){
                            if(maxIndex<item){
                                maxIndex = item
                            }
                        }
                    }
                    Bus.$emit('addBtnFlag',maxIndex)
                }
            },
            TextItemAdd(e,itemIndex){
                if(e=='加行'){
                    this.textRowArrayLength++
                    this.textRowArray.push(true)
                }
                else{
                    this.textRowArrayLength--
                    this.textRowArray.splice(itemIndex,1,false)
                    this.numberInput.splice(itemIndex,1)
                    this.numberTypeSelect.splice(itemIndex,1)

                    let maxIndex=0
                    for(let item=0;item<this.textRowArray.length;item++){
                        if(this.textRowArray[item]){
                            if(maxIndex<item){
                                maxIndex = item
                            }
                        }
                    }
                    Bus.$emit('addBtnTextFlag',maxIndex)
                }
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
            numberFilter(){
                this.dialogVisible = false
                Bus.$emit('numberFilter',this.numberInput,this.numberTypeSelect,this.dropName)
                for(let i = 0;i<this.rowArray.length;i++){
                    if(this.rowArray[i] == true){
                        this.rowArray[i] = false
                        this.rowArrayLength--
                    }
                }
                this.rowArray.push(true)
                this.rowArrayLength++
            },
            textFilter(){
                this.textDialogVisible = false
                Bus.$emit('textFilter',this.textInput,this.textTypeSelect,this.dropName)
                for(let i = 0;i<this.textRowArray.length;i++){
                    if(this.textRowArray[i] == true){
                        this.textRowArray[i] = false
                        this.textRowArrayLength--
                    }
                }
                this.textRowArray.push(true)
                this.textRowArrayLength++
                let choiceArray = []
                for(let i=0;i<this.textTransferValue.length;i++){
                    choiceArray.push(this.xAixsData[this.textTransferValue[i]])
                }
                Bus.$emit('textFilterAccuracy',choiceArray)
                this.textTransferValue = []
            },
            numberFilterChange(numberInput,numberTypeSelect,itemIndex){
                this.numberInput[itemIndex] = numberInput
                this.numberTypeSelect[itemIndex] = numberTypeSelect
            },
            textFilterChange(textInput,textTypeSelect,itemIndex){
                this.textInput[itemIndex] = textInput
                this.textTypeSelect[itemIndex] = textTypeSelect
            },
            dialogCancel(){
                this.dialogVisible = false;
                this.textDialogVisible = false
                this.dropFilter.pop()
            },
            filterCancel(){
                this.dropFilter = []
                Bus.$emit('filterCancel','filterCancel')
            }

		    
    }
    }
</script>

<style scoped>
.select-item-drop {
  border:1px solid #5bc0de;
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  margin-right: 10px;
  cursor:pointer;
  padding: 6px 20px;
  color: #5bc0de;
  width: 75px;
}
 .cursored{
  cursor: default;
}


.drag-div {
    border: 1px solid #5bc0de;
    padding:10px;
    margin-bottom: 10px;
    width: 800px;
    cursor: pointer;
    text-align: left;
    
}
.select-project-item {
    display: inline-block;
    text-align: center;
    border-radius: 3px;
}
.drag-people-label{
  margin-bottom:0;
  padding-right:10px;
}
.drop-tag {
    background-color: rgba(64,158,255,.1);
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
}
.el-tag {
    font-size: 13px
}
.box-style {
    background-color: #fff;
    color: #909399;
    height: 100%;
}
.insert-tag {
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
}
.analysisDropFilterStyle .el-input-group__prepend{
    background-color: #ffffff;
    border: 0px solid;
    border-bottom: 0px solid #dcdfe6; 
}
[v-cloak]{
    display:none;
}
</style>





