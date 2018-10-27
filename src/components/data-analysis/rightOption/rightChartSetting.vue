<template>
<div class="font">

<el-row>
<el-col :span="1">&nbsp;</el-col>
<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="普通柱状图" placement="top" :enterable="false">
      <div @click="barClick('普通柱状图')"><svg  class="icon" aria-hidden="true"><use xlink:href="#icon-zhuzhuangtu"></use></svg></div>
    </el-tooltip>
</el-col>
<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="横向柱状图" placement="top" :enterable="false">
      <div @click="barClick('横向柱状图')"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-tiaoxingtu"></use></svg></div>
    </el-tooltip>
</el-col>
<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="堆叠柱状图" placement="top" :enterable="false">
      <div @click="barClick('堆叠柱状图')"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-duidiezhutu"></use></svg></div>
    </el-tooltip>
</el-col>
<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="对比柱状图" placement="top" :enterable="false"> 
      <div @click="barClick('对比柱状图')"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-duibitiaoxingtu1"></use></svg></div>
    </el-tooltip>
</el-col>
</el-row>


<el-row>&nbsp;</el-row>

<el-row>
<el-col :span="1">&nbsp;</el-col>
<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="普通饼图" placement="top" :enterable="false">
      <div>
          <svg class="icon" aria-hidden="true" v-show="!pieFlag" @click="pieClick('普通饼图')"><use xlink:href="#icon-bingtu1"></use></svg>
          <svg class="icon" aria-hidden="true" v-show="pieFlag"><use xlink:href="#icon-bingtu1-copy"></use></svg>
      </div>
    </el-tooltip>
</el-col>
<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="半径饼图" placement="top" :enterable="false">
      <div>
        <svg class="icon" aria-hidden="true" v-show="!pieFlag"  @click="pieClick('半径饼图')"><use xlink:href="#icon-zujian-cengjibingtu-copy"></use></svg>
        <svg class="icon" aria-hidden="true" v-show="pieFlag"><use xlink:href="#icon-zujian-cengjibingtu"></use></svg>  
      </div>
    </el-tooltip>
</el-col>
<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="面积饼图" placement="top" :enterable="false">
      <div>
          <svg class="icon" aria-hidden="true" v-show="!pieFlag" @click="pieClick('面积饼图')"><use xlink:href="#icon-zujian-meiguitu"></use></svg>
          <svg class="icon" aria-hidden="true" v-show="pieFlag"><use xlink:href="#icon-zujian-meiguitu-copy"></use></svg>
      </div>
    </el-tooltip>
</el-col>
<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="南丁格尔图" placement="top" :enterable="false">
      <div>
          <svg class="icon" aria-hidden="true" v-show="!pieFlag" @click="pieClick('南丁格尔图')"><use xlink:href="#icon-meiguitu1"></use></svg>
          <svg class="icon" aria-hidden="true" v-show="pieFlag"><use xlink:href="#icon-meiguitu1-copy"></use></svg>
      </div>
    </el-tooltip>
</el-col>
</el-row>

<el-row>&nbsp;</el-row>

<el-row>
<el-col :span="1">&nbsp;</el-col>
<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="普通折线图" placement="top" :enterable="false">
      <div @click="lineClick('普通折线图')"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-zhexiantu1"></use></svg></div>
    </el-tooltip>
</el-col>
<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="面积图" placement="top" :enterable="false">
      <div @click="lineClick('面积图')"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-duidiemianji_active"></use></svg></div>
    </el-tooltip>
</el-col>
<el-col :span="5">

</el-col>
<el-col :span="5">

</el-col>
</el-row>

<el-row>&nbsp;</el-row>

<el-row>
<el-col :span="1">&nbsp;</el-col>
<el-col :span="5">
    <el-tooltip class="item" effect="dark" content="散点图" placement="top" :enterable="false">
      <div>
          <svg class="icon" aria-hidden="true" v-show="!scatterFlag" @click="scatterClick('普通散点图')"><use xlink:href="#icon-sandiantu"></use></svg>
          <svg class="icon" aria-hidden="true" v-show="scatterFlag"><use xlink:href="#icon-sandiantu-copy"></use></svg>
      </div>
    </el-tooltip>
</el-col>
</el-row>








</div>
</template>

<script>
import Bus from '../Bus.js'
    export default {
    data() {
        return {
        input: '',
        pieFlag:false,
        scatterFlag:false
        }
    },
    mounted(){
        Bus.$on('chartsType',(val)=>{
            if(val.length==1)this.pieFlag = false
            else this.pieFlag = true
            
            if(val.length==2)this.scatterFlag = false
            else this.scatterFlag = true

        })
    },
    methods:{
        barClick(type){
            switch (type) {
                case '普通柱状图':
                    Bus.$emit('barChange','普通柱状图')
                    break;
                case '横向柱状图':
                    Bus.$emit('barChange','横向柱状图')
                    break;
                case '堆叠柱状图':
                    Bus.$emit('barChange','堆叠柱状图')
                    break;
                case '对比柱状图':
                    Bus.$emit('barChange','对比柱状图')
                    break;
                default:
                    break;
            }
        },
        lineClick(type){
            switch (type) {
                case '普通折线图':
                    Bus.$emit('barChange','普通折线图')
                    break;
                case '面积图':
                    Bus.$emit('barChange','面积图')
                    break;
                case '堆叠柱状图':
                    Bus.$emit('lineChange','line')
                    break;
                case '对比柱状图':
                    Bus.$emit('lineChange','line')
                    break;
                default:
                    break;
            }
        },
        scatterClick(type){
            switch (type) {
                case '普通散点图':
                    Bus.$emit('scatterChange','普通散点图')
                    break;
                case '气泡图':
                    Bus.$emit('scatterChange','气泡图')
                    break;
                case '堆叠柱状图':
                    Bus.$emit('scatterChange','scatter')
                    break;
                case '对比柱状图':
                    Bus.$emit('scatterChange','scatter')
                    break;
                default:
                    break;
            }
        },
        pieClick(type){
            switch (type) {
                case '普通饼图':
                    Bus.$emit('pieChange','普通饼图')
                    break;
                case '半径饼图':
                    Bus.$emit('pieChange','半径饼图')
                    break;
                case '面积饼图':
                    Bus.$emit('pieChange','面积饼图')
                    break;
                case '南丁格尔图':
                    Bus.$emit('pieChange','南丁格尔图')
                    break;
                default:
                    break;
            }
        },
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.font{
    font-family:"Microsoft YaHei";
    font-size:15px;
    list-style: height 10px;
    color:#4bc0de
    }
</style>
