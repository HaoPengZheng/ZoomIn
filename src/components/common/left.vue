<template>
  <el-aside :style="{width:width+'px'}" >
    <div class="aside-warp">   
      <div style="overflow:scroll;width:100%;height:100%;">
        <el-menu default-active="1"  :collapse="isShrink">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">任务一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">任务一报表</el-menu-item>
              <el-menu-item index="1-2">任务一分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">任务二</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">任务二报表</el-menu-item>
              <el-menu-item index="2-2">任务二分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">任务二</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">任务二报表</el-menu-item>
              <el-menu-item index="3-2">任务二分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">任务二</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">任务二报表</el-menu-item>
              <el-menu-item index="4-2">任务二分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>  
      </div>   
      <a  @click="shrink" :title="toggleTitle">
        <template v-if="isShrink === false">
          <icon name="angle-left"  class="shrink"></icon>
        </template>
          <template v-else>
          <icon name="angle-right"  class="shrink"></icon>     
        </template>  
      </a>    
    </div>
   
  </el-aside>
</template>
<script>
export default {
  data(){
    return {
      width:275,
      isShrink:false,
      toggleTitle:"隐藏侧边栏"
    }
  },
  methods:{
    shrink:function(){
      if(this.isShrink){
        this.isShrink=false
        this.width=275
        this.toggleTitle="隐藏侧边栏"
      }else{
        this.isShrink=true
        this.width=81
        this.toggleTitle="显示侧边栏"
      }
      
    }
  }
}
</script>
<style>
.aside-warp{
  position: relative;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}
.shrink{
  position: absolute;
  right: -17px;
  color: #777;
  top: 389px;
  width: 50px;
  height: 30px;
  cursor: pointer;
}
.hide{
  display: none
}
</style>
