<template>
<div>


<el-button @click="dialogVisible = true" class="btn-style"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-bi1"></use></svg>新建筛选</el-button>


    <el-dialog
    title="图内筛选器"
    :visible.sync="dialogVisible"
    width="50%"
    >
    
      <el-transfer v-model="transferValue" :data="transferData" style="text-align:left;display:inline-block"></el-transfer>   



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
         traArrayValue:[]
        }
    },
    mounted(){
         Bus.$on('AxiosDataDragItem', (e) => {
             Object.keys(e).forEach((arrayItem,index)=>{
                 this.transferData.push({
                     key:index,
                     label:arrayItem
                 })
                 this.transArray.push(arrayItem)
            })
       })
    },
    methods:{
        transferEnsure(){
            this.dialogVisible = false
            this.traArrayValue = []
            this.transferValue.forEach((val)=>{
                this.traArrayValue.push(this.transArray[val])
            })
            Bus.$emit('transferChoice',this.traArrayValue)
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn-style{
        width:100%;
        text-align: left;
        border: 0px
    }
</style>