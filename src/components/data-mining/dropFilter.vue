<template>
    <div  id="dragCon" >
    <div class='people-content'>
        <el-row>
            <el-col :span="24" >
                <!-- 字段框 -->
                <div class="el-input el-input-group el-input-group--prepend" style="margin-left:1px;">
                    <div class="el-input-group__prepend" style="border: 1px solid #dcdfe6" >筛选<svg class="icon" aria-hidden="true"><use xlink:href="#icon-shaixuan"></use></svg></div>
                    <div style="border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left" @drop='filterDrop($event)' @ondrop="removeDrop($event)" @dragover='allowDrop($event)' @ondragstart="drag(event)">
                        <el-tag v-for="(item,index) in dropFilter" :key="index" 
                            closable
                            :disable-transitions="false"
                            @close="filterRemove(item)"
                            style="margin:4px">{{item}}
                        </el-tag>
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
                    <drop-filter-item :dropName="dropName" @dropFilterItemAdd = "itemAdd" style="margin:50px" @numberFilterChange = "numberFilterChange"></drop-filter-item>
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
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="numberFilter">确2 2定</el-button>
            </span>
        </el-dialog>


     <el-dialog :visible.sync="textDialogVisible">
            <el-radio v-model="textRadio" label="label1">精准过滤</el-radio>
            <el-radio v-model="textRadio" label="label2">条件过滤</el-radio>
            <el-radio v-model="textRadio" label="label3">表达式过滤</el-radio>

            <el-card style="margin:50px"  shadow="hover" v-if="textRadio === 'label1'">
            <div v-for="(item,index) in rowArray" :key="index">
                <drop-filter-item :dropName="dropName" @dropFilterItemAdd = "itemAdd" style="margin-top:3px"></drop-filter-item>
            </div>
            </el-card>

            <el-card style="margin:50px"  shadow="hover" v-else-if="textRadio === 'label2'">
            321
            </el-card>

            <el-card style="margin:50px"  shadow="hover" v-else-if="textRadio === 'label3'">
            123
            </el-card>

            <span slot="footer" class="dialog-footer">
                <el-button @click="textDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="textDialogVisible = false">确 定</el-button>
            </span>
    </el-dialog>

    </div>

    
</template>

<script>
import Bus from './Bus.js'
import dropFilterItem from './dropFilterItem'
    export default {
    data () {
        return {
            dropFilter:[],
            dialogVisible:false,
            textDialogVisible:false,
            isNumberArray:[],
            //筛选器弹框数据
            rowArray:[1],
            dropName:'',
            radio:true,
            textRadio:'label1',
            textarea:'',
            numberTypeSelect:'',
            numberInput:'' 
        }
    },
    components:{
        dropFilterItem
    },
    mounted(){
        Bus.$on('AxiosDataDragItem',(e)=>{
            this.isNumberArray = e
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
                        if(!this.isNumber(this.isNumberArray[data]))this.textDialogVisible = true
                        this.dropName = data
                        Bus.$emit('filterdata', data)
            },
            allowDrop:function(event){
              event.preventDefault();
            },
            filterRemove(tag) {
                Bus.$emit('numberFilterRemove', tag);
                this.dropFilter.splice(this.dropFilter.indexOf(tag), 1);
            },
            itemAdd(e){
                if(e=='加行')this.rowArray.push(1)
                if(e=='减行')this.rowArray.pop()
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
            },
            numberFilterChange(numberInput,numberTypeSelect){
                this.numberInput = numberInput
                this.numberTypeSelect = numberTypeSelect
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
[v-cloak]{
    display:none;
}
</style>





