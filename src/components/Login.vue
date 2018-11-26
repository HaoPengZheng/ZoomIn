<template>
  <div class="warp full-height">
    <el-row :gutter="20" class="full-height">
      <el-col :span="6" class="left-picture-col full-height hidden-sm-and-down">
        <div class="left-picture">

        </div>
      </el-col>
      <el-col :span="18" class="login-right">
        <div>
          <LoginTitle></LoginTitle>
          <LoginOrRegister></LoginOrRegister>
          
        </div>
       
      </el-col>
    </el-row>
  </div>

</template>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
html {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
body {
  height: 100%;
}
.full-height {
  height: 100%;
}
.warp {
  min-width: 400px;
}
.title {
  font-size: 44px;
}
.left-picture-col {
  padding: 0 !important;
}
.left-picture {
  background-image: url('../assets/Login/login.jpg');
  height: 100%;
  background-repeat: round;
}
.left-picture img {
  height: 100%;
  overflow: hidden;
}
.login-warp {
  margin-top: 150px;
  text-align: center;
}

.login-right {
  margin-top: 100px;
}
.el-row {
  margin: 0 !important;
}
</style>
<script>
import "element-ui/lib/theme-chalk/display.css";
import LoginTitle from "./login/LoginTitle.vue";
import LoginOrRegister from "./login/LoginOrRegister.vue";
// import 'element-ui/lib/theme-chalk/display.css';
// 包含的类名及其含义为：
// hidden-xs-only - 当视口在 xs 尺寸时隐藏
// hidden-sm-only - 当视口在 sm 尺寸时隐藏
// hidden-sm-and-down - 当视口在 sm 及以下尺寸时隐藏
// hidden-sm-and-up - 当视口在 sm 及以上尺寸时隐藏
// hidden-md-only - 当视口在 md 尺寸时隐藏
// hidden-md-and-down - 当视口在 md 及以下尺寸时隐藏
// hidden-md-and-up - 当视口在 md 及以上尺寸时隐藏
// hidden-lg-only - 当视口在 lg 尺寸时隐藏
// hidden-lg-and-down - 当视口在 lg 及以下尺寸时隐藏
// hidden-lg-and-up - 当视口在 lg 及以上尺寸时隐藏
// hidden-xl-only - 当视口在 xl 尺寸时隐藏

export default {
  components: {
    LoginTitle,
    LoginOrRegister
  },

};
</script>
