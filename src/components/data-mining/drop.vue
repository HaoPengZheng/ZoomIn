<template>
    <div  id="dragCon" >
    <div class='people-content miningDropStyle'>
        <el-row> 
            <el-col :span="12" >
                <!-- 字段框 -->
                <div class="el-input el-input-group el-input-group--prepend"><div class="el-input-group__prepend">自变量字段</div>
                    <div style="border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left;margin-top:2px" @drop='rowDrop($event)' @ondrop="removeDrop($event)" @dragover='allowDrop($event)' @ondragstart="drag(event)">
                        <el-tag v-for="(item,index) in dropRow" :key="index" 
                            closable
                            :disable-transitions="false"
                            @close="rowRemove(index)"
                            style="margin:3px">{{item}}
                        </el-tag>
                        <div>
                            <div class="insert-tag">&nbsp;</div>
                        </div>
                    </div>
                </div>

            </el-col>

            <el-col :span="12">

                <!-- 数值框 -->
                <div class="el-input el-input-group el-input-group--prepend">
                    <div class="el-input-group__prepend" style="border-left: 0px solid #dcdfe6">因变量字段</div>
                    <div style="border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left;margin-top:2px" @drop='colDrop($event)' @ondrop="removeDrop($event)" @dragover='allowDrop($event)' @ondragstart="drag(event)">
                        
                        <el-tag v-for="(item,index) in dropCol" :key="index" 
                            closable
                            :disable-transitions="false"
                            @close="colRemove(index)"
                            style="margin:3px">{{item}}
                        </el-tag>

                        <!-- 添加的按钮 -->
                        <!-- <svg class="icon" aria-hidden="true" style="float:right;margin:10px" @click="addRowClick" v-show="addIconFlag"><use xlink:href="#icon-iconjia"></use></svg> -->
                    </div>
                </div>


            </el-col>
        </el-row>

        <el-row>
                <div class="el-input el-input-group el-input-group--prepend" v-show="axisFlag">
                    <div class="el-input-group__prepend" style="border-left: 1px solid #dcdfe6">次轴<svg class="icon" aria-hidden="true"><use xlink:href="#icon-wellnum"></use></svg></div>
                    <div style="border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left" @drop='colAxisDrop($event)' @ondrop="removeDrop($event)" @dragover='allowDrop($event)' @ondragstart="drag(event)">
                        
                        <el-tag v-for="(item,index) in dropAxisCol" :key="index" 
                            closable
                            :disable-transitions="false"
                            @close="colRemove(index)"
                            style="margin:3px">{{item}}(求和)
                        </el-tag>

                        <!--减的按钮 -->
                        <svg class="icon" aria-hidden="true" style="float:right;margin:10px" @click="removeRowClick"><use xlink:href="#icon-jianhao"></use></svg>
                    </div>
                </div>
        </el-row>
    </div>
    

    </div>

    
</template>

<script>
import Bus from './Bus.js'
    export default {
    name: 'drop',
    components:{
    },
    data () {
        return {
            dropRow:[],
            dropCol:[],
            dropAxisCol:[],
            axisFlag:false,
            addIconFlag:true,
            dataArray:[]
        }
    },
    mounted(){
        Bus.$on('yAixsFail',(e)=>{
            this.dropCol.pop()
        })
        Bus.$on('AxiosDataDragItem', (e) => {
            this.dataArray = e
            console.log(e)
       })
    },
    methods:{
            drag:function(ev){
                ev.dataTransfer.setData("ID", ev.target.innerText);//拖动元素的ID
                //dom = ev.target

            },
            rowDrop:function(ev){
              ev.preventDefault();  
			        var data = ev.dataTransfer.getData("ID");//拖动的元素的ID
                        this.dropRow.push(data)
                        //console.log(this.dropRow.length)
                        //判定是否超过要求的范围
                        if(this.dropRow.length > 1){
                            this.$message({
                                message: '只允许有一个因变量',
                                showClose: true,
                                type: 'warning',
                                duration:1000
                            });
                            this.dropRow.pop()
                            return;
                        }

                        if(!this.isNumber(this.dataArray[data])){
                            this.$message({
                                message: '只允许数值类型',
                                showClose: true,
                                type: 'warning',
                                duration:1000
                            });
                            this.dropRow.pop()
                            return;
                        }
                        if(this.dropRow.length > 1){
                            this.$message({
                                message: '只允许有一个自变量',
                                showClose: true,
                                type: 'warning',
                                duration:1000
                            });
                            this.dropRow.pop()
                            return;
                        } 

                        Bus.$emit('rowdata', data)
                        if(this.dropRow &&this.dropCol)Bus.$emit('featureConfigurationFlag',true)

			        
            },
            colDrop:function(ev){
              ev.preventDefault();
			        var data = ev.dataTransfer.getData("ID");//拖动的元素的ID
                        this.dropCol.push(data)
                        Bus.$emit('coldata', data)//给echarts组件发名字
                        Bus.$emit('featureConfiguration',data)//给功能配置发送消息
                        if(this.dropRow &&this.dropCol)Bus.$emit('featureConfigurationFlag',true)
                        
                        //判定是否超过要求的范围

                        if(!this.isNumber(this.dataArray[data])){
                            this.$message({
                                message: '只允许数值类型',
                                showClose: true,
                                type: 'warning',
                                duration:1000
                            });
                            this.dropCol.pop()
                            return;
                        }
                        if(this.dropCol.length > 1){
                            this.$message({
                                message: '只允许有一个自变量',
                                showClose: true,
                                type: 'warning',
                                duration:1000
                            });
                            this.dropCol.pop()
                            return;
                        }    
			        
            },
            colAxisDrop:function(ev){
              ev.preventDefault();
			        let data = ev.dataTransfer.getData("ID");//拖动的元素的ID
                        this.dropAxisCol.push(data)
                        Bus.$emit('dropAxisCol', data)//给echarts组件发名字
			        
            },
            allowDrop:function(event){
              event.preventDefault();//阻止默认事件
            },
            removeDrop:function(ev) {
			        ev.preventDefault();
			        var data = ev.dataTransfer.getData("ID");
			        console.log(data);
			        console.log(data.indexOf("col-"));

			        var obj = document.getElementById(data);
			        obj.remove();
            },
            rowRemove(tag) {
                Bus.$emit('rowdataRemove', tag);
                this.dropRow.splice(this.dropRow.indexOf(tag), 1);
            },
            colRemove(tag) {
                Bus.$emit('coldataRemove', tag)
                this.dropCol.splice(this.dropCol.indexOf(tag), 1);
            },
            summationType(){//没用等删
                Bus.$emit('summation', 'summationType')
            },
            addRowClick(){
                this.axisFlag = true;
                this.addIconFlag = false
            },
            removeRowClick(){
                this.axisFlag = false;
                this.addIconFlag = true;
                // if(yAxisIndex)
            },
            isNumber(val) {
            var regPos = /^\d+(\.\d+)?$/; //非负浮点数
            var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
            if(regPos.test(val) || regNeg.test(val)) {
                return true;
                } else {
                    return false;
                }
            }
		    
    }
    }
</script>

<style>
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
    color: #fff;
    border: 0px;
    font-size: 13px;
    background: #6495ed;
    background: linear-gradient(-135deg, transparent 8px, #6495ed 0) top right;
}
.box-style {
    background-color: #fff;
    color: #909399;
    height: 100%;
}
.insert-tag {
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
}
.miningDropStyle .el-input-group__prepend{
    background-color: #fff;
    border: 0px solid;
    /* border-bottom: 1px solid #dcdfe6;  */

}
[v-cloak]{
    display:none;
}
</style>