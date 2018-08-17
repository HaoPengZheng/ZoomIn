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
        <el-input class="selectBox" v-model="inputValue" placeholder="请输入数值" v-show="inputVisiable" style="width:20.52%"></el-input>
        
        <svg class="icon" aria-hidden="true" style="margin-left:10px" @click="rowAdd" v-show="iconVisiable"><use xlink:href="#icon-iconjia"></use></svg>
        <svg class="icon" aria-hidden="true" style="margin-left:10px" @click="rowDelete" v-show="!iconVisiable"><use xlink:href="#icon-koba"></use></svg>
        <svg class="icon" aria-hidden="true" style="margin-left:10px" @click="rowDelete"><use xlink:href="#icon-jianhao"></use></svg>        
    </div>
</template>

<script>
import Bus from './Bus.js'
export default {
    props:['dropName'],
    data() {
        return {
        input: '',
        yData:[],
        selectValue:[],
        selectType:['等于','大于','小于','大于等于','小于等于'],
        selectTypeValue:'等于',
        selectCalculateType:['平均值','最大值','最小值'],
        selectCalculateTypeValue:'平均值',
        dialogTableVisible:false,
        selectCalculateVisible:false,
        inputVisiable:true,
        iconVisiable:true,
        inputValue:0,
        rowArray:[1]
        }
    },

    mounted(){

        Bus.$on('ensure',(e)=>{
            Bus.$emit('markLineOption',this.featureValueObject);
        })
    },
    watch:{
        selectTypeValue(val){
            this.$emit('numberFilterChange',this.inputValue,this.selectTypeValue)
        },
        inputValue(val){
            this.$emit('numberFilterChange',this.inputValue,this.selectTypeValue)
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
            this.$emit('dropFilterItemAdd', '加行')
        },
        rowDelete(){
            this.$emit('dropFilterItemAdd', '减行')
        }
    }
}
</script>

<style>

</style>
