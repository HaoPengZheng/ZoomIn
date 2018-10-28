<template>
    <div>
        <div>
            <!-- <el-select v-model="numberFilterSelectValue" placeholder="请选择" style="width:50%" class="echart">
                <el-option
                v-for="item in numberFilterItemType"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select> -->
            <el-radio-group v-model="numberFilterSelectValue" size="mini">
                <el-radio-button label="大于"></el-radio-button>
                <el-radio-button label="小于"></el-radio-button>
                <!-- <el-radio-button label="等于"></el-radio-button>
                <el-radio-button label="不等于"></el-radio-button> -->
                <el-radio-button label="大于等于"></el-radio-button>
                <el-radio-button label="小于等于"></el-radio-button>
            </el-radio-group>
        </div>
        <div>
        <el-input v-model="numberFilterInput" placeholder="请输入数值"  class="echart" @blur="picInputClick"  ref="inputRef"></el-input>
        </div>
    </div>
</template>
<script>
import Bus from './Bus.js'
export default {
    props:['choiceVal'], //此处接收传进来的被选择的y轴数值，然后一并传给echarts.vue等待筛选
    data(){
        return{
		numberFilterItemType:['等于','大于','小于','不大于','不小于'],	//图内筛选器-数值-可选类型
		numberFilterSelectValue:'大于',  							  //图内筛选器-数值-选择的类型
		numberFilterInput:''	,									  //图内筛选器-数值-填写的数值
        }
    },
    methods:{
        picInputClick(val){
            //Bus.$emit('numberPicFilter',this.choiceVal,this.numberFilterSelectValue,this.numberFilterInput)
            let numberFilterSelectValueArray = []
            let numberFilterInputArray = []
            numberFilterSelectValueArray.push(this.numberFilterSelectValue)
            numberFilterInputArray.push(this.numberFilterInput)
            Bus.$emit('numberPicFilter',numberFilterInputArray,numberFilterSelectValueArray,this.choiceVal)
	    }
    },
    mounted(){
        this.$refs.inputRef.$el.children[0].focus();
    }
    
}
</script>
