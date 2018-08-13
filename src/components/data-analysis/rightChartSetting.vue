<template>
<div class="font">
<el-row>
<el-col :span="2">&nbsp;</el-col>

<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="柱状图" placement="top">
	<div @click="barClick"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-tiaoxingtu-xianxing"></use></svg></div>
    </el-tooltip>
</el-col>

<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="折线图" placement="top">
      <div @click="lineClick"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-zhexiantu-xianxing"></use></svg></div>
    </el-tooltip>
</el-col>

<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="饼图" placement="top">
      <div @click="pieClick"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-bingtu-xianxing"></use></svg></div>
    </el-tooltip>
</el-col>

<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="散点图" placement="top">
      <div @click="scatterClick"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-scatterplot_active"></use></svg></div>
    </el-tooltip>
</el-col>

</el-row>
<el-row>&nbsp;</el-row>
<el-row>&nbsp;</el-row>
<el-row>&nbsp;</el-row>

</div>
</template>

<script>
import Bus from './Bus.js'
    export default {
    data() {
        return {
        input: ''
        }
    },
    methods:{
        pieClick(){
            Bus.$emit('typeChange','pie')
        },
        lineClick(){
            Bus.$emit('typeChange','line')
        },
        barClick(){
            Bus.$emit('typeChange','bar')
        },
        scatterClick(){
            Bus.$emit('typeChange','scatter')
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.font{
    font-family:"Microsoft YaHei";
    font-size:15px;
    list-style: height 10px;
    color:#5bc0de
    }
</style>
