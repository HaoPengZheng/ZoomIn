<template>
    <div>
        {{dropName}}：
        <el-select class="selectBox" v-model="selectTypeValue" placeholder="类型">
            <el-option
            v-for="item in selectType"
            :key="item"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
        <el-input class="selectBox" v-model="inputValue" placeholder="字段" v-show="inputVisiable" style="width:20.52%"></el-input>
        
        <svg class="icon" aria-hidden="true" style="margin-left:10px" @click="rowAdd" v-show="iconVisiable"><use xlink:href="#icon-iconjia"></use></svg>
        <svg class="icon" aria-hidden="true" style="margin-left:10px" v-show="!iconVisiable"><use xlink:href="#icon-koba"></use></svg>
        <svg class="icon" aria-hidden="true" style="margin-left:10px" @click="rowDelete"><use xlink:href="#icon-jianhao"></use></svg>        
    </div>
</template>

<script>
import Bus from './Bus.js'
export default {
    props:['dropName','itemIndex','itemMaxIndex'],
    data() {
        return {
        input: '',
        yData:[],
        selectValue:[],
        selectType:['包含','不包含','为空','不为空'],
        selectTypeValue:'',
        selectCalculateType:['平均值','最大值','最小值'],
        selectCalculateTypeValue:'',
        dialogTableVisible:false,
        selectCalculateVisible:false,
        inputVisiable:true,
        iconVisiable:true,
        inputValue:'',
        rowArray:[1]
        }
    },

    mounted(){
        // Bus.$on('deleteSure',(e)=>{
        // if(this.itemIndex == this.itemMaxIndex-1)this.iconVisiable = true
        // })

        Bus.$on('addBtnTextFlag',(e)=>{
              if(e==this.itemIndex)this.iconVisiable = true
             
        })

        Bus.$on('ensure',(e)=>{
            Bus.$emit('markLineOption',this.featureValueObject);
        })
    },
    watch:{
        selectTypeValue(val){
            this.$emit('textFilterChange',this.inputValue,this.selectTypeValue,this.itemIndex)
        },
        inputValue(val){
            this.$emit('textFilterChange',this.inputValue,this.selectTypeValue,this.itemIndex)
        }
    },
    computed:{
        featureValueObject(){
            return {
                "selectValue":this.selectValue,
                "selectTypeValue":this.selectTypeValue,
                "selectCalculateTypeValue":this.selectCalculateTypeValue,
                "inputValue":this.inputValue
            }
        }
    },
    methods:{
        ensure(){
            //拼凑字符串
           Bus.$emit('markLineOption',this.featureValueObject);

        },
        dialogPop(){
            this.dialogTableVisible = true
        },
        rowAdd(){
            this.iconVisiable = false
            this.$emit('dropFilterItemAdd', '加行',this.itemIndex)
            console.log(this.itemIndex)
            console.log(this.itemMaxIndex)
            console.log('.....')
        },
        rowDelete(){
            this.$emit('dropFilterItemAdd', '减行',this.itemIndex)
  

        }
    }
}
</script>

<style>

</style>
