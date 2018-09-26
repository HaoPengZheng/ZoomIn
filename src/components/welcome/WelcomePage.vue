<template>
<div>
  <div class="bg">
    <div class="bg-nav">
      <div class="logo">Zoom In</div>
    </div>
    <div class="bg-warp">
        <div class="bg-left"><img src="https://me.bdp.cn/personal/img/banner/banner1_56d9c8b.png" width="600" height="400">  </div>
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
  },  
];
export default {
  components: {
    FeatureList,
    WelcomeFooter
  },
  data() {
    return {
      featureTextLists: featureTextLists
    };
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
  margin: 0；;
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
.bg-nav{
  padding-top: 20px;
  padding-left:50px;
  color: #fff;
}
.bg-nav .logo{
  border: 1px solid #fff;
  font-weight: 600;
  font-family:"微软雅黑","黑体","宋体";
  width: 100px;
  text-align: center;
  padding: 5px;
  border-radius: 6px  ;
}
.bg-warp {
  padding-top:100px;
  max-width: 1346px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.bg-left{
  margin: 0 50px;
  order:1;
}
.bg-right{
  margin: 0 50px;
  order: 2;
}
.small-title{
  padding: 10px 0;
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
