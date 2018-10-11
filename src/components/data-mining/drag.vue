<template>
    <div class='drag-content' id="dragCon" >
        <el-tabs v-model="activeName">
            <el-tab-pane  class="tab-pane-font" label="字段选择" name="first">
                <div>
                    <div style="margin-top:130px" v-if="loadingUsergroupList"><div v-loading="loadingUsergroupList" element-loading-text="数据加载中…"></div></div>
                    <div class='select-ul' v-if="dragFlag">
                        <ul  style="display:table;text-align: left;" v-for="(textField,index) in textFields" :key="index">
                            <li  class='select-item' :id=textField :name=textField draggable='true' @dragstart='drag($event)' style="list-style-type:none; ">
                                <svg class="icon" aria-hidden="true" style="margin-right:15px"><use xlink:href="#icon-wenzi"></use></svg>{{textField}}
                            </li>
                        </ul>
                        <ul  style="display:table;text-align: left;" v-for="(numberField) in numberFields" :key="numberField">
                            <li  class='select-item' :id=numberField :name=numberField draggable='true' @dragstart='drag($event)' style="list-style-type:none; ">
                                <svg class="icon" aria-hidden="true" style="margin-right:15px"><use xlink:href="#icon-wellnum"></use></svg>{{numberField}}
                            </li>
                        </ul>
                    </div> <!-- 拖动的标签 -->
                </div>
            </el-tab-pane>
            <el-tab-pane  class="tab-pane-font" label="参数设置" name="second">

            </el-tab-pane>
        </el-tabs>


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
        dragFlag:false,
        activeName:'first'
        }
    },

    mounted(){
        Bus.$on('AxiosDataDragItem', (e) => {
    　　　　//console.log(e)
            this.keyArray = e
            this.loadingUsergroupList = false
            this.dragFlag = true

       })
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

<style scoped>
.select-ul {
  padding: 5px;
  text-align: center;
  
  cursor:pointer;

  color: #5A616A;
  font-family: "Microsoft YaHei","微软雅黑"
}
.select-item {
  /* border:1px solid #5bc0de;
  display: inline-block;
  text-align: left;
  border-radius: 3px;
  margin-right: 15px;
  cursor:pointer;
  padding: 6px 20px;
  color: #5bc0de;
  width: 120px; */
  border: 0px
}
 .cursored{
  cursor: default;
}

.people-content {
    margin-top: 4px;
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
.tab-pane-font{
    text-align: center;
}
[v-cloak]{
    display:none;
}
</style>