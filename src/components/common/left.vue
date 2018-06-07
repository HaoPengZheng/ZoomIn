<template>
  <el-aside :style="{width:width+'px'}" class="warp">
    abc
    <a class="shrink" @click="shrink">收缩</a>
  </el-aside>
</template>
<script>
export default {
  data(){
    return {
      width:300
    }
  },
  methods:{
    shrink:function(){
      this.width=100
    }
  }
}
</script>
<style>
.warp{
  position: relative;
}
.shrink{
  position: absolute;
}
</style>
