<template>
  <div class="bg">
    <div class="wrap">
      <div class="wrap-left">
        <img src="./login.svg" width="350px" height="300px"/>
      </div>
      <div class="wrap-right">
        <div class="banner-decoration"><span>Z</span></div>
        <LoginOrRegister></LoginOrRegister>
      </div>
    </div>
  </div>
</template>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .bg {
    height: 100%;
    padding: 0 100px;
    background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .wrap {
    border-radius: 16px;
    box-shadow: rgba(215, 215, 215, 0.39) 0 10px 50px 0;
    background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
    width: 950px;
    height: 500px;
    display: flex;
  }

  .wrap-right {
    position: relative;
    width: 450px;
    height: 500px;
    padding: 0 25px;
    border-bottom-right-radius: 16px;
    border-top-right-radius: 16px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wrap-left {
    width: 450px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .banner-decoration {
    width: 140px;
    height: 140px;
    border-radius: 0 16px 0 140px;
    background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .banner-decoration span {
    color: white;
    font-size: 50px;
    font-weight: bold;
    margin: 0 0 20px 20px;
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
