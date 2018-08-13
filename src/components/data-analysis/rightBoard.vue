<template>
<div>

<el-collapse  v-model="activeNames" >
  <el-collapse-item title="图表标题" name="1">
    <right-title/>
  </el-collapse-item>
  <el-collapse-item title="图表类型" name="2">
    <rightChartSetting/>
  </el-collapse-item>
  <el-collapse-item title="图表备注" name="3">
    <rightTips/>
  </el-collapse-item>
  <el-collapse-item title="功能配置" name="4" v-show="featureConfigurationFlag">
    <featureConfiguration/>
  </el-collapse-item>
</el-collapse>

</div>
</template>

<script>
import rightTips from './rightTips'
import rightTitle from './rightTitle'
import rightChartSetting from './rightChartSetting'
import featureConfiguration from './featureConfiguration'
    export default {
    components:{
        rightTips,
        rightTitle,
        rightChartSetting,
        featureConfiguration
    },
    data() {
        return {
        input: '',
        featureConfigurationFlag:true,
        activeNames: ['1','2','3','4']
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
