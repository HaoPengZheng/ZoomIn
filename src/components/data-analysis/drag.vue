<template>
    <div class='drag-content' id="dragCon" >
    <div class='project-content'>
        <div style="margin-top:130px" v-if="loadingUsergroupList"><div v-loading="loadingUsergroupList" element-loading-text="数据加载中…"></div></div>
        <div class='select-ul' v-if="dragFlag">
            <ul  style="display:table;text-align: left;" v-for="(textField,index) in textFields" :key="index">
                <li  class='select-item' :id=textField :name=textField draggable='true' @dragstart='drag($event)' style="margin-top: 5px;list-style-type:none; "><svg class="icon" aria-hidden="true"><use xlink:href="#icon-left-text"></use></svg>{{textField}}</li>
            </ul>
            <ul  style="display:table;text-align: left;" v-for="(numberField) in numberFields" :key="numberField">
                <li  class='select-item' :id=numberField :name=numberField draggable='true' @dragstart='drag($event)' style="margin-top: 5px;list-style-type:none; "><svg class="icon" aria-hidden="true"><use xlink:href="#icon-shuzi"></use></svg>{{numberField}}</li>
            </ul>
        </div> <!-- 拖动的标签 -->
    </div>
    <!-- <svg class="icon" aria-hidden="true"><use xlink:href="#icon-shuzi"></use></svg> -->
    </div>
</template>

<script>
import Bus from './Bus.js'
    export default {
    name: 'drag',
    data () {
        return {
        keyArray:[],
        numberFields:[],
        textFields:[],
        loadingUsergroupList:true,
        dragFlag:false
        }
    },

    mounted(){
        Bus.$on('AxiosDataDragItem', (e) => {
    　　　　//console.log(e)
            this.keyArray = e
            this.loadingUsergroupList = false
            this.dragFlag = true

       })
        this.typeClassify();
    }, 
    watch:{
        keyArray(val){
            Object.keys(val).forEach((arrayItem,index)=>{
                if(this.isNumber(val[Object.keys(val)[index]])){
                    this.numberFields.push(Object.keys(val)[index])
                }else{
                    this.textFields.push(Object.keys(val)[index])
                }
            })
            
        }
    },
    methods:{
            drag:function(ev){
                ev.dataTransfer.setData("ID", ev.target.innerText);//拖动元素的ID
                //dom = ev.target

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
            
            typeClassify(){
                
            }
		    
    }
    }
</script>

<style>
.select-ul {
  /* 自己写的，有冗余 */
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  margin-right: 10px;
  cursor:pointer;
  padding: 6px 20px;
  color: #5bc0de;
}
.select-item {
  border:1px solid #5bc0de;
  display: inline-block;
  text-align: left;
  border-radius: 3px;
  margin-right: 15px;
  cursor:pointer;
  padding: 6px 20px;
  color: #5bc0de;
  width: 120px;
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