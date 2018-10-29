<template>
<div>


<el-button @click="dialogVisible = true" class="btn-style"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-bi1"></use></svg>新建筛选</el-button>
<el-tag
  v-for="(tag,index) in picFilterTags"
  :key="index"
  closable
  type="warning"
  style="margin:5px"
  @close="picFilterTagClose(tag.value,index)">
  {{tag.label}}
</el-tag>

    <el-dialog
    title="图内筛选器"
    :visible.sync="dialogVisible"
    width="50%"
    >
    
      <el-transfer v-model="transferValue" :data="transferData" :titles="['Source', 'Target']" style="text-align:left;display:inline-block"></el-transfer>   



    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="transferEnsure">确 定</el-button>
    </span>
    </el-dialog>

</div>
</template>

<script>
import Bus from '../Bus.js'
    export default {
    data() {
        return {
         dialogVisible: false,
         transferData:[],
         transferValue: [],
         transArray:[],
         traArrayValue:[],
         picFilterTags:[]
        }
    },
    mounted(){
        Bus.$on('picFilterItem',(e) => {
            this.transferData = []
            this.transArray = []
            for(let i = 0;i<e.length;i++){
                this.transferData.push({
                     key:i,
                     label:e[i]
                 })
                 this.transArray.push(e[i])
            }
       })
    //原本显现全部字段数值的事件
    //      Bus.$on('AxiosDataDragItem', (e) => {
    //          Object.keys(e).forEach((arrayItem,index)=>{
    //              this.transferData.push({
    //                  key:index,
    //                  label:arrayItem
    //              })
    //              this.transArray.push(arrayItem)
    //         })
    //    })

    },
    methods:{
        transferEnsure(){
            this.dialogVisible = false
            this.traArrayValue = []
            this.picFilterTags = []
            this.transferValue.forEach((val)=>{
                this.traArrayValue.push(this.transArray[val])
            })
            Bus.$emit('transferChoice',this.traArrayValue)
            this.transferValue.forEach((val)=>{
                this.picFilterTags.push({
                    label:'筛选:' + this.transArray[val],
                    value:this.transArray[val]
                })
            })
        },
        //筛选器tag标签删除的事件
        picFilterTagClose(value,index){
            this.picFilterTags.splice(index,1)            //不知道干什么  
            this.traArrayValue.splice(index,1)            //删掉
            Bus.$emit('transferChoice',this.traArrayValue)//更新Echarts上的筛选器的选项
            Bus.$emit('deletePicFilter',value);
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .btn-style{
        width:100%;
        text-align: left;
        border: 0px
    }
    .el-tag {
    color: #fff;
    border: 0px;
    font-size: 13px;
    background: #6495ed;
    background: linear-gradient(-135deg, transparent 8px, #6495ed 0) top right;
}
</style>