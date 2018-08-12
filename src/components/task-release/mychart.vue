<template>
  <!-- 一个用来展示图表的组件 -->
  <div style="margin-bottom:20px">
    <el-card class="box-card" :body-style="{padding:'20px'}" >
      <div :id="domId" style="width:100%;height:400px;">111 </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props:{
    domId:String,
    option:Object
    
  },
  mounted:function(){
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById(this.domId));
      // 绘制图表
      myChart.setOption(this.option);
    }
  }
};
</script>


 <style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

</style>