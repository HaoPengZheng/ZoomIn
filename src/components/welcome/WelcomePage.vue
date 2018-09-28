<template>
  <div>
    <div class="bg">
      <div :class="{'bg-nav':true,'changeNav':isOverScroll}">
        <div style="margin-right:200px;"><img src="../../assets/image/Logo.png"></div>
        <ul class="bg-nav-menu">
          <li>
            首页
          </li>
          <li>
            概览
          </li>
          <li>
            使用教程
          </li>
          <li>
            项目合作
          </li>
          <li>
            帮助
          </li>
        </ul>
        <div>
          <button class="login" @click="toLogin">登录</button>
        </div>
      </div>
      <div class="bg-warp">
        <div class="bg-left"><img src="https://me.bdp.cn/personal/img/banner/banner1_56d9c8b.png" width="600" height="400"> </div>
        <div class="bg-right">
          <h3 class="title">Zoomin 学业分析系统</h3>
          <h3 class="small-title">分析成绩、教研成果不再求人</h3>
          <el-button type="primary" round>立即使用</el-button>
        </div>
      </div>
    </div>
    <FeatureList :textList="featureTextLists"></FeatureList>
    <WelcomeFooter></WelcomeFooter>
  </div>
</template>

<script>
import FeatureList from "./FeatureList.vue";
import WelcomeFooter from "./WelcomeFooter.vue";
const featureTextLists = [
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
  mounted: function() {
    window.addEventListener("scroll", this.handleScroll);
  },
  computed: {
    isOverScroll: function() {
      return this.scrollY > overScrollHeight;
    }
  },
  methods: {
    handleScroll: function() {
      this.scrollY = window.scrollY;
    },
    toLogin: function() {
      this.$router.push('/');
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
  background: linear-gradient(to top, #7ededeed 0, #66cccc 100%);
}
.bg-nav {
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.bg-nav-menu {
  list-style: none;
}
.bg-nav-menu li {
  float: left;
  padding: 0 22px;
  font-weight: 700;
  position: relative;
}
.bg-nav-menu li:hover {
  cursor: pointer;
  color: #333;
}
.bg-nav-menu li.active::before {
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
  margin-right: 200px;
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
}
.changeNav li {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}
.bg-warp {
  padding-top: 100px;
  max-width: 1346px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.bg-left {
  margin: 0 50px;
  order: 1;
}
.bg-right {
  margin: 0 50px;
  order: 2;
}
.small-title {
  padding: 10px 0;
}
.login {
  line-height: 28px;
  padding: 0 14px;
  font-weight: 700;
  font-size: 14px;
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  margin-left: 200px;
  outline: none;
}
.login:hover {
  cursor: pointer;
  background: #fff;
  color: #333;
  border: 1px solid #466c6d;
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
