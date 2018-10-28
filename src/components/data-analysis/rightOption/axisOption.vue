<template>
    <div><!-- default-active="1" -->
        <el-menu
        class="el-menu-vertical-demo axisOptionStyle2"
        style="text-align: left;">
        <el-submenu index="1">

            <template slot="title">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-shuxingtubiao_xzhou"></use></svg>
            <span>X轴</span>
            </template>

                <div class="el-input el-input-group el-input-group--prepend">
                <div class="el-input-group__prepend">标题</div>
                <el-input v-model="xAxisInput" @blur="xAxisInputChange" class="axisOptionStyle" placeholder="请输入X轴" suffix-icon="el-icon-edit"></el-input>
                </div>

                <div class="el-input el-input-group el-input-group--prepend">
                <div class="el-input-group__prepend">单位</div>
                <el-input v-model="xAxisUnit" @blur="xAxisUnitChange" class="axisOptionStyle" placeholder="请输入X轴" suffix-icon="el-icon-edit"></el-input>
                </div>

        </el-submenu>

        <el-submenu index="2">

            <template slot="title">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-shuxingtubiao_yzhou"></use></svg>
            <span>Y轴</span>
            </template>

            
                <div class="el-input el-input-group el-input-group--prepend ">
                <div class="el-input-group__prepend">标题</div>
                <el-input class="axisOptionStyle" v-model="yAxisInput" @blur="yAxisInputChange" placeholder="请输入Y轴" suffix-icon="el-icon-edit"></el-input>
                </div>

                <div class="el-input el-input-group el-input-group--prepend">
                <div class="el-input-group__prepend">单位</div>
                <el-input  class="axisOptionStyle" v-model="yAxisUnit" @blur="yAxisUnitChange" placeholder="请输入Y轴" suffix-icon="el-icon-edit"></el-input>
                </div>
            

        </el-submenu>

        </el-menu>
    </div>
</template>

<script>
import Bus from '../Bus.js'
export default {
      data(){
          return{
              radio: '1',
              xAxisInput:'',
              xAxisUnit:'',
              yAxisInput:'',
              yAxisUnit:''
          }
        },
        methods: {
            xAxisInputChange(){
                Bus.$emit('xAxisInputChange',this.xAxisInput)
            },
            xAxisUnitChange(){
                Bus.$emit('xAxisUnitChange',this.xAxisUnit)
            },
            yAxisInputChange(){
                Bus.$emit('yAxisInputChange',this.yAxisInput)
            },
            yAxisUnitChange(){
                Bus.$emit('yAxisUnitChange',this.yAxisUnit)
            }
        }
}
</script>

<style>
.el-input-group__prepend{
    background-color: #ffffff;
    border: 0px solid #ffffff;

}

/* .axisOptionStyle{
    margin-right: 5px
} */


.axisOptionStyle .el-input__inner{
        border: 1px solid #ffffff;
        border-bottom-color: #dcdfe6;
    }

.axisOptionStyle .el-collapse-item__arrow{
  float: left;
}

.axisOptionStyle2{
padding-left:40px
}

.axisOptionStyle2 .el-submenu__icon-arrow{
    right: 280px;
    /* left: 0px; */
}
</style>
