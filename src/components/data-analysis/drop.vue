<template>
    <div  id="dragCon" >
    <div class='people-content'>
        <el-row>
            <el-col :span="12">
                <!-- 字段框 -->
                <div  style="margin-top:5px;border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left" @drop='rowDrop($event)' @ondrop="removeDrop($event)" @dragover='allowDrop($event)' @ondragstart="drag(event)">&nbsp;<img src="@/assets/维度.png"><!-- 框 -->
                    <div class='select-project-item'>
                        <label class='drag-people-label'></label>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <!-- 数值框 -->
                <div  style="margin-top:5px;border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left" @drop='colDrop($event)' @ondrop="removeDrop($event)" @dragover='allowDrop($event)' @ondragstart="drag(event)"><img src="@/assets/数值.png"><!-- 框 -->
                    <div class='select-project-item'>
                        <label class='drag-people-label'></label>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
    
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

        }
    },

    methods:{
            drag:function(ev){
                ev.dataTransfer.setData("ID", ev.target.innerText);//拖动元素的ID
                //dom = ev.target

            },
            rowDrop:function(ev){
              ev.preventDefault();
			        var data = ev.dataTransfer.getData("ID");//拖动的元素的ID
              
			            var element = document.createElement("div");
			            element.setAttribute("id", "row-" + data);
                        element.setAttribute("class","select-item-drop");
                        element.setAttribute("draggable", true);
                        //element.setAttribute("ondragstart", "drag(event)");
                        //element.setAttribute("onclick","liClick")
			            var text = document.createTextNode(data);
                        // alert(data);
			            element.appendChild(text);
			            ev.target.appendChild(element);                                                                
                        //给echarts组件发名字
                        Bus.$emit('rowdata', data)

			        
            },
            colDrop:function(ev){
              ev.preventDefault();
			        var data = ev.dataTransfer.getData("ID");//拖动的元素的ID
              
			            var element = document.createElement("div");
			            element.setAttribute("id", "row-" + data);
                        element.setAttribute("class","select-item-drop");
                        element.setAttribute("draggable", true);
                        //element.setAttribute("ondragstart", "drag(event)");
                        //element.setAttribute("onclick","liClick")
			            var text = document.createTextNode(data);
                        // alert(data); 
			            element.appendChild(text);
			            ev.target.appendChild(element);                                                                
                        //给echarts组件发名字
                        Bus.$emit('coldata', data)

                        //给功能配置发送消息
                        Bus.$emit('featureConfiguration',data)
			        
            },
            liClick:function(event){
                // if(event.target.id==='row-学校')
                // //alert(event.target.id)
                // var obj = document.getElementById(event.target.id);
                // obj.remove();
                //alert(123);
                alert("???")
                 
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