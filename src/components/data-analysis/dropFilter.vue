<template>
    <div>
        <div id="wtf" style="display:none"></div>
    <div class='people-content'>
        <el-row>
            <el-col :span="24">
                <!-- 字段框 -->
                <div  style="margin-top:5px;border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left" @drop='filterDrop($event)' @dragover='allowDrop($event)' @ondragstart="drag(event)">&nbsp;<img src="@/assets/筛选器.png"><!-- 框 -->
                    <div class='select-project-item'>
                        <label class='drag-people-label'></label>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
    
        <el-dialog
        id="filterDialog"
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>

    </div>

    
</template>

<script>
import Bus from './Bus.js'
import dropItem from './dropItem'
    export default {
    name: 'drop',
    components:{
        dropItem:dropItem
    },
    data () {
        return {
        dialogVisible: false,
        divList:[]
        }
    },
    updated(){
        
    },
    methods:{
            drag:function(ev){
                ev.dataTransfer.setData("ID", ev.target.innerText);//拖动元素的ID
                //dom = ev.target
            },
            filterDrop:function(ev){
              ev.preventDefault();
			        var data = ev.dataTransfer.getData("ID");//拖动的元素的ID
			            var element = document.createElement("div");
			            element.setAttribute("id", "filter-" + data);
                        element.setAttribute("class","select-item-drop");
                        element.setAttribute("draggable", true);
                        element.setAttribute("contenteditable",false);
                        //element.setAttribute("ondragstart", "drag(event)");
			            var text = document.createTextNode(data);
                        element.appendChild(text);
                        document.getElementById("wtf").appendChild(element);
                        this.divList.push(document.getElementById("filter-" + data));
                        console.log(this.divList);
                        for(var i=0;i<this.divList.length;i++){
                            ev.target.appendChild(this.divList[i]);    //在被ev添加之前，搜索不到子节点
                        }

			            //ev.target.appendChild(element);                                                                
                        //Bus.$emit('rowdata', data)//给echarts组件发名字
                        //this.dialogVisible = true;

			        
            },
            allowDrop:function(event){
              event.preventDefault();
            },
            removeDrop:function(ev) {
			        ev.preventDefault();
			        var data = ev.dataTransfer.getData("ID");
			        console.log(data);
			        console.log(data.indexOf("col-"));

			        var obj = document.getElementById(data);
			        obj.remove();
            },
            handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                done();
                })
                .catch(_ => {});
            },
            getList(flag,n){
                for(var i=0;i<n;i++)
                {
                    divList.push(document.getElementById(flag+(i+1)));
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

.people-content {
    margin-top: 4px;
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
[v-cloak]{
    display:none;
}
</style>