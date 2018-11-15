<template>
  <div>
    <div class="bg">
      <div :class="['bg-nav',{'changeNav':isOverScroll}]">
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
        <!--<button class="login" @click="toLogin">登录</button>-->
      </div>
      <div class="bg-warp">
        <!--<div class="bg-left">-->
        <!--<img src="https://me.bdp.cn/personal/img/banner/banner1_56d9c8b.png" width="600" height="400">-->
        <!--</div>-->
        <!--<div style="width: 400px"></div>-->
        <div class="bg-right">
          <div class="bg-right-title">
            <img src="http://cdn.algbb.fun/ImageMessages/BB_1541900613936" width="250px"/>
            <br>
            <div>———— 一个更懂你的数据分析网站</div>
          </div>
          <div style="position: relative;width: 100%">
            <i class="iconfont icon icon-yonghu"></i>
            <input class="bg-right-input" placeholder="用户名"/>
          </div>
          <div style="position: relative;width: 100%">
            <i class="iconfont icon icon-mima"></i>
            <input class="bg-right-input" placeholder="密码"/>
          </div>
          <!--<div>-->
          <!--&lt;!&ndash;<p>用户名：</p>&ndash;&gt;-->
          <!--<el-input class="bg-right-input" placeholder="请输入用户名"><span style="display: flex" slot="prefix"-->
          <!--class="iconfont bg-right-icon">&#xe67c;</span>-->
          <!--</el-input>-->
          <!--</div>-->
          <!--<div>-->
          <!--&lt;!&ndash;<p>密码：</p>&ndash;&gt;-->
          <!--<el-input class="bg-right-input" placeholder="请输入密码"><span style="display: flex" slot="prefix"-->
          <!--class="iconfont bg-right-icon">&#xe601;</span>-->
          <!--</el-input>-->
          <!--</div>-->
          <button class="bg-right-button">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>

          <!--<h3 class="title">Zoomin 学业分析系统</h3>-->
          <!--<h3 class="small-title">分析成绩、教研成果不再求人</h3>-->
          <!--<el-button type="primary" round>立即使用</el-button>-->
        </div>
      </div>

    </div>
    <!--<canvas id="canvas" style="transform:rotate(180deg);position:absolute;top:0px;left:0px;z-index:-1;opacity: 0.8"></canvas>-->
    <FeatureList :textList="featureTextLists"></FeatureList>
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
  import FeatureList from "./FeatureList.vue";
  import WelcomeFooter from "./WelcomeFooter.vue";

  const featureTextLists = [
    {
      title: "整合各类数据",
      content: [
        "支持接入多种数据源，包括本地数据，网站统计、广告推广等各种第三方平台数据，同时还能连接各类数据库和同步工具。",
        "Zoomin 学业分析系统分析成绩、教研成果不再求人"
      ],
      pictureUrl: "https://me.bdp.cn/personal/img/propaganda/computer_aa462ef.png"
    },
    {
      title: "全面分析业务",
      content: [
        "支持接入多种数据源，包括本地数据，网站统计、广告推广等各种第三方平台数据，同时还能连接各类数据库和同步工具。",
        "Zoomin 学业分析系统分析成绩、教研成果不再求人"
      ],
      pictureUrl: "https://me.bdp.cn/personal/img/propaganda/computer_aa462ef.png"
    },
    {
      title: "整合各类数据，全面分析业务",
      content: [
        "支持接入多种数据源，包括本地数据，网站统计、广告推广等各种第三方平台数据，同时还能连接各类数据库和同步工具。",
        "Zoomin 学业分析系统分析成绩、教研成果不再求人"
      ],
      pictureUrl: "https://me.bdp.cn/personal/img/propaganda/computer_aa462ef.png"
    },
    {
      title: "全面分析业务",
      content: [
        "支持接入多种数据源，包括本地数据，网站统计、广告推广等各种第三方平台数据，同时还能连接各类数据库和同步工具。",
        "Zoomin 学业分析系统分析成绩、教研成果不再求人"
      ],
      pictureUrl: "https://me.bdp.cn/personal/img/propaganda/computer_aa462ef.png"
    }
  ];
  const overScrollHeight = 527;
  export default {
    components: {
      FeatureList,
      WelcomeFooter
    },
    data() {
      return {
        featureTextLists: featureTextLists,
        scrollY: 0
      };
    },
    mounted: function () {
      window.addEventListener("scroll", this.handleScroll);
      // var canvas = document.getElementById('canvas');
      // var ctx = canvas.getContext('2d');
      // canvas.width = canvas.parentNode.offsetWidth;
      // canvas.height = canvas.parentNode.offsetHeight;
      // var boHeight = canvas.height / 10;
      // var posHeight = canvas.height / 1.2;
      // var step = 0;
      // var j = 0;
      // ctx.fillStyle = "#409eff";
      // var angle = (step + j * 50) * Math.PI / 180;
      // var deltaHeight = Math.sin(angle) * boHeight;
      // var deltaHeightRight = Math.cos(angle) * boHeight;
      // ctx.beginPath();
      // ctx.moveTo(0, posHeight + deltaHeight);
      // ctx.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight - boHeight, canvas.width / 2, posHeight + deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight);
      // ctx.lineTo(canvas.width, canvas.height);
      // ctx.lineTo(0, canvas.height);
      // ctx.lineTo(0, posHeight + deltaHeight);
      // ctx.closePath();
      // ctx.fill();

    },
    computed: {
      isOverScroll: function () {
        return this.scrollY > overScrollHeight;
      }
    },
    methods: {
      handleScroll: function () {
        this.scrollY = window.scrollY;
      },
      toLogin: function () {
        this.$router.push('/');
      }
    }
  };
</script>

<style scoped>
  .icon {
    color: #fff;
    left: 2%;
    font-size: 24px;
    position: absolute;
    top: 8px;
  }

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

  .title {
    line-height: 56px;
    font-size: 40px;
    font-weight: 200;
    color: #fff;
    margin: 0;
  }

  .bg {
    margin: 0;
    padding: 0;
    padding-bottom: 20px;
    /*background: linear-gradient(to top, #7ededeed 0, #66cccc 100%);*/

    /*background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);*/
    /*background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);*/
    /*background-image: linear-gradient(to right, #0acffe 0%, rgba(73, 90, 255, 0.7) 100%);*/

    background-image: url(//cdn.suisuijiang.com/ImageMessage/5b4ee8321b53ec11c8505de5_1541903492986.jpeg?width=1920&height=1080);
    background-size: 100% 100%;

  }

  .bg-nav {
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    font-size: 20px;
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
    margin: 0 22px;
    font-weight: 700;
    position: relative;
    transition: all .25s ease-in-out;
  }

  .bg-nav-menu div:hover {
    cursor: pointer;
    /*color: #333;*/
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

  .changeNav {
    position: fixed;
    background-color: #fff;
    z-index: 999;
    color: #888;
    border-bottom: 1px solid #dcdfe6;
    transition: all .3s ease-in-out;
  }

  .changeNav li {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  }

  .bg-warp {
    padding: 100px 0 100px 0;
    /*max-width: 1346px;*/
    /*margin: 0 auto;*/
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    /*align-items: center;*/
    flex-wrap: wrap;
  }

  .bg-left {
    margin: 0 0px 0 0;
    order: 1;
    transition: all .25s ease-in-out;
  }

  .bg-left:hover {
    transform: scale(1.05, 1.05);
    transition: all .25s ease-in-out;
  }

  .bg-right {
    opacity: 0.9;
    margin-right: 150px;
    height: 450px;
    width: 400px;
    padding: 0 50px;
    border: rgba(255, 255, 255, 0.5) 3px solid;
    border-radius: 16px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    transition: all .25s ease-in-out;
    /*background-color: #666;*/
    /*background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;*/
    /*background-blend-mode: multiply,multiply;*/
    background-image: linear-gradient(to right, #434343 0%, black 100%);
  }

  .bg-right:hover {
    transform: scale(1.05, 1.05);
    transition: all .25s ease-in-out;
    box-shadow: rgba(255, 255, 255, 0.51) 0 5px 30px;
  }

  .bg-right:active {
    transform: scale(1.05, 1.05);
    transition: all .25s ease-in-out;
    box-shadow: rgba(255, 255, 255, 0.51) 0 5px 30px;
  }

  .bg-right-title {
    width: 100%;
  }

  .bg-right-title div {
    padding-top: 10px;
    text-align: right;
    color: #d7d7d7;
    font-family: 宋体;
    font-style: italic;
    font-weight: bold;
  }

  .bg-right-input {
    width: 80%;
    padding: 0 10%;
    border: none;
    border-bottom: #fff 2px solid;
    height: 40px;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    background-color: transparent;
  }

  .bg-right-input:focus {
    outline: none;
    /*border: transparent 1px solid;*/
  }

  .bg-right-input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  .bg-right p {
    margin: 0 0 15px 0;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
  }

  .bg-right-button {
    height: 40px;
    width: 100%;
    border: none;
    border-radius: 16px;
    margin: 20px 0;
    background-color: #fff;
    font-size: 20px;
    color: #666;
    font-weight: bold;
    transition: all .25s ease-in-out;
  }

  .bg-right-button:hover {
    background-color: #666;
    transition: all .25s ease-in-out;
    color: #fff;
  }

  .bg-right-button:focus {
    outline: none;
  }

  .login {
    line-height: 28px;
    padding: 0 14px;
    font-weight: 700;
    font-size: 14px;
    background: transparent;
    color: #fff;
    border-radius: 8px;
    border: 2px solid #fff;
    margin-left: 200px;
    outline: none;
    font-size: 20px;
    transition: all .25s ease-in-out;
  }

  .login:hover {
    cursor: pointer;
    background: #fff;
    color: #333;
    border: 2px solid #666;
    transition: all .25s ease-in-out;
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
