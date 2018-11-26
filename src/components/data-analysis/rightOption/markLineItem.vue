<template>
    <div>
        <el-select class="selectBox" v-model="selectValue" placeholder="数值">
            <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select class="selectBox" v-model="selectTypeValue" placeholder="类型">
            <el-option
            v-for="item in selectType"
            :key="item.value"
            :label="item"
            :value="item">
            </el-option>
        </el-select>
        <el-select class="selectBox" v-model="selectCalculateTypeValue" placeholder="计算值类型" v-if="selectCalculateVisible">
            <el-option
            v-for="item in selectCalculateType"
            :key="item.value"
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
import Bus from '../Bus.js'
export default {
    props:['selectOptions'],
    data() {
        return {
        input: '',
        yData:[],

        selectValue:[],
        selectType:['固定值','计算值'],
        selectTypeValue:'固定值',
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
            Bus.$emit('markLine',this.featureValueObject);
        })
    },
    watch:{
        selectTypeValue(val){
            if(val == '计算值'){this.selectCalculateVisible = true;this.inputVisiable = false}
            else if(val == '固定值'){this.inputVisiable = true;this.selectCalculateVisible = false}
            else {}
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
           Bus.$emit('markLine',this.featureValueObject);

        },
        dialogPop(){
            this.dialogTableVisible = true
        },
        rowAdd(){
            this.iconVisiable = false
            this.$emit('changeMsg', '加行')
        },
        rowDelete(){
            this.$emit('changeMsg', '减行')
        }
    }
}
</script>

<style>
.el-tag {
    color: #fff;
    border: 0px;
    font-size: 13px;
    background: #6495ed;
    background: linear-gradient(-135deg, transparent 8px, #6495ed 0) top right;
}
</style>
