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
            <el-menu mode="horizontal" :default-active="activeIndex" background-color="#516464" text-color="#fff" active-text-color="#ffd04b" v-bind:router="true">
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
            <div class="login-setting">
              <a class="el-dropdown-link">
                <svg class="icon login-icon" aria-hiddewen="true">
                  <use xlink:href="#icon-denglu1"></use>
                </svg>
              </a>
              <ul class="login-drown">
                <li>
                  <a>个人中心</a>
                </li>
                <li>
                  <a>会员中心</a>
                </li>
                <li>
                  <a @click="logout()">退出登录</a>
                </li>
              </ul>
            </div>
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
    return {};
  },
  computed: {
    activeIndex: function() {
      return this.$store.getters.activeIndex;
    }
  },
  methods: {
    logout: function() {
      localStorage.setItem("token", "");
      localStorage.setItem("username", "");
      this.$router.push({ path: "/" });
    }
  }
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
  background-color: #516464;
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
html {
  overflow-x: hidden;
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
.login-icon {
  width: 40px;
  height: 40px;
  color: #262c30;
  margin-top: 10px;
  padding: 0 10px;
  text-align: center;
}

.login-setting {
  position: relative;
}
.login-setting:hover {
  background-color: rgb(65, 80, 80);
}
.login-setting:hover .login-icon {
  color: #fdfdfd;
}
.login-setting:hover .login-drown {
  display: block;
}
.login-drown {
  display: none;
  list-style: none;
  position: absolute;
  top: 60px;
  right: 0px;
  background-color: #262c30;
  z-index: 9999;
}
.login-drown li {
  text-align: center;
  color: #fff;
  height: 20px;
  line-height: 20px;
  padding: 0 16px;
  margin: 12px 0;
  font-size: 12px;
  width: 80px;
  cursor: pointer;
}
.login-drown li:hover {
  color: #ffd04b;
}
</style>