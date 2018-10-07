<template>
  <div id="home">
    <el-container style="height:100%">
      <el-header>
        <div class="warp">
          <div class="left">
            <span class="logo">
              Zoomin
            </span>
          </div>
          <div class="nav center">
            <el-menu mode="horizontal" :default-active="activeIndex" background-color="#00c587" text-color="#fff" active-text-color="#ffd04b" v-bind:router="true">
              <el-menu-item index="/home/data-import">
                数据导入
              </el-menu-item>
              <el-menu-item index="/home/data-processing">
                数据处理
              </el-menu-item>
              <el-menu-item index="/home/data-analysis">
                数据分析
              </el-menu-item>
              <el-menu-item index="/home/data-mining">
                数据挖掘
              </el-menu-item>
              <el-menu-item index="/home/task-release">
                任务发布
              </el-menu-item>
            </el-menu>
          </div>
          <div class="right">
            <el-button type="info">
              <svg class="icon" aria-hidden="true" style="width:50px;height:30px;">
                <use xlink:href="#icon-kefuyouxian"></use>
              </svg>
            </el-button>
          </div>
        </div>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {

    };
  },
  computed:{
    activeIndex:function(){
      return this.$store.getters.activeIndex;
    }
  },
};
</script>
<style scoped>
.nav {
  min-width: 600px;
}
.warp {
  width: 100%;
  margin: 0 auto;
  display: flex;
  background-color: #00c587;
}
.left {
  flex: 0 1 200px;
}
.right {
  flex: 0 1 200px;
  display: flex;
  justify-content: flex-end;
}
.center {
  flex-grow: 1;
  justify-content: center;
  display: flex;
}
* {
  padding: 0;
  margin: 0;
}
html,
body,
#home {
  height: 100%;
}
.el-menu-item {
  padding: 0 20px;
}
body > .el-container {
  margin-bottom: 40px;
}
.logo {
  line-height: 60px;
  padding-left: 20px;
  font-weight: 500;
  color: #fff;
}
.el-header {
  padding: 0;
}
/* 导航下面有element默认的1px的白线*/
.el-menu--horizontal {
  border-bottom: 0;
}
</style>