<template>
  <div>
    <div class="bg">
      <div :class="['bg-nav',{'changeNav':isOverScroll}]" id="bg-nav">
        <div><img src="../../assets/image/Logo.png"></div>
        <div class="bg-nav-menu">
          <div>
            首页
          </div>
          <div>
            概览
          </div>
          <div>
            使用教程
          </div>
          <div>
            项目合作
          </div>
          <div>
            帮助
          </div>
        </div>
        <button class="bg-nav-login" @click="toLogin">登录</button>
      </div>
      <div class="bg-warp" id="bg-warp">
        <div class="banner-decoration"></div>
        <div class="bg-left">
          <img src="../../assets/welcomePage/banner.svg" width="600px" height="400px"/>
        </div>
        <div class="bg-right">
          <div class="bg-right-title">
            ZoomIn
          </div>
          <div class="bg-right-content">
            Make Fun Every Day<br/>用心创造快乐，用爱感动世界<br/>打造一个最适合你的数据分析网站
          </div>
          <button class="bg-right-button">Learn More</button>
        </div>
      </div>
    </div>
    <FeatureList></FeatureList>
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
  import FeatureList from "./FeatureList.vue";
  import WelcomeFooter from "./WelcomeFooter.vue";
  export default {
    components: {
      FeatureList,
      WelcomeFooter
    },
    data() {
      return {
        scrollY: 0,
        wrapHeight: 0,
      };
    },
    mounted: function () {
      window.addEventListener("scroll", this.handleScroll);
      this.wrapHeight = document.getElementById('bg-warp').offsetHeight;
    },
    computed: {
      isOverScroll: function () {
        return this.scrollY > 0;
      }
    },
    methods: {
      handleScroll: function () {
        this.scrollY = window.scrollY;
      },
      toLogin: function () {
        this.$router.push('/login');
      }
    }
  };
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  body {
    padding: 0;
    margin: 0;
    max-width: 100%;
    overflow: auto;
  }

  .bg {
    margin: 0;
    padding: 0 0 200px 0;
    background-image: linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 48%, #625EB1 100%);
    background-size: 100% 100%;
    filter: alpha(opacity=50);
  }

  .bg-nav {
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    font-size: 20px;
    padding: 5px 0;
  }

  .bg-nav-menu {
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
  }

  .bg-nav-menu div {
    float: left;
    padding: 10px;
    margin: 0 20px;
    font-weight: 700;
    position: relative;
    transition: all .25s ease-in-out;
  }

  .bg-nav-menu div:hover {
    cursor: pointer;
    transform: translateY(-5px);
    transition: all .25s ease-in-out;
  }

  .bg-nav-menu div.active::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    height: 4px;
    background: #000;
    transition: all 0.3s ease-in-out;
    left: calc(50% - 10px);
    width: 20px;
  }

  .bg-nav .logo {
    /*margin-right: 200px;*/
    border: 1px solid #fff;
    font-weight: 600;
    font-family: "微软雅黑", "黑体", "宋体";
    width: 100px;
    text-align: center;
    padding: 5px;
    border-radius: 6px;
  }

  .bg-nav-login {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 4px;
    height: 40px;
    padding: 0 20px;
    outline: none;
    border-radius: 12px;
    border: #fff 1px solid;
    background: transparent;
    box-shadow: #fff 0 0 10px 0;
    transition: all .25s ease-in-out;
  }

  .bg-nav-login:hover {
    box-shadow: #d7d7d7 0 0 20px 2px;
    transition: all .25s ease-in-out;
  }

  .changeNav {
    position: fixed;
    background-color: #fff;
    z-index: 999;
    color: #888;
    /*border-bottom: 1px solid #dcdfe6;*/
    box-shadow: rgba(0,0,0,0.2) 0 40px 50px -30px;
    transition: all .25s ease-in-out;
  }

  .changeNav button{
    opacity: 0.8;
    color: #666;
    box-shadow: #999 0 0 10px 0;
  }
  .changeNav button:hover{
    opacity: 1.0;
    color: #333;
    box-shadow: #666 0 0 10px 0;
  }

  .changeNav li {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  }

  .bg-warp {
    padding: 100px 0 200px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    position: relative;
  }

  .banner-decoration {
    opacity: 0.6;
    width: 360px;
    height: 360px;
    border-radius: 50%;
    background-image: linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);
    position: absolute;
    left: 30px;
    bottom: -200px;
    box-shadow: rgba(215, 215, 215, 0.51) 0 2px 40px 5px;
  }

  .bg-left {
    margin: 0;
  }

  .bg-right {
    width: 600px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .bg-right-title {
    font-size: 80px;
    color: white;
    font-weight: bold;
    letter-spacing: 20px;
    text-shadow: 4px 8px 20px #d7d7d7;
    -webkit-text-stroke: 1px #999;
    background-image: linear-gradient(to top, #eef4fb 0%, white 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .bg-right-content {
    font-size: 40px;
    color: white;
    font-weight: bold;
    margin-bottom: 20px;
    opacity: 0.8;
  }

  .bg-right-button {
    height: 56px;
    border: none;
    outline: none;
    border-radius: 16px;
    color: #fff;
    width: 40%;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-image: linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%);
    opacity: 0.7;
    transition: all .25s ease-in-out;
  }

  .bg-right-button:hover {
    opacity: 1.0;
    transition: all .25s ease-in-out;
    box-shadow: rgba(0,0,0,0.3) 0 20px 50px -20px;
  }

  .changeNav .login {
    color: rgb(30, 153, 235) !important;
    border: 1px solid rgb(30, 153, 235);
  }

  @media (max-width: 1100px) {
    .title {
      padding-top: 20px;
    }

    .bg-right {
      float: none;
    }

    .bg-left {
      padding: 0;
      float: none;
    }
  }
</style>
