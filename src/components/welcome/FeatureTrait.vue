<template>
  <div class="feature-trait">
    <div class="feature-title">
      &nbsp;我们的特点是什么
    </div>
    <div class="feature-title-decoration"></div>
    <div style="display: flex;flex-direction:row;justify-content: space-evenly;flex-wrap: wrap">
      <div v-for="(item,index) in trait" class="trait-card">
        <div class="trait-card-icon" style="box-shadow: none">
        </div>
        <div>
          <h3><img :src="require(`../../assets/welcomePage/icon${index+4}.svg`)" width="60px" height="60px">&nbsp;{{item.title}}
          </h3>
          <h5>{{item.content}}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        trait: [
          {'title': '易用灵活', 'content': '无需编程，拖拽完成数据处理，降低数据分析入门门槛，灵活的多维度分析，多层钻取，帮助用户更全面深入的了解数据'},
          {'title': '实时分析', 'content': '图表数据实时更新，动态监测数据异常，提升数据分析效率，支持接入多种数据源，包括多类型文本数据，数据库数据，第三方平台数据'},
          {'title': '专业高效', 'content': '不同于市面上其他的系统，ZoomIn将数据分析和数据挖掘及可视化集中于一个系统，同时支持5大类机器学习模型数十种挖掘模型，提升效率'},
          {'title': '方便快捷', 'content': '区别于其他PC端的软件，本系统采用了Web端技术，可以随时随地进行使用，解决了安装应用配置环境等不便利性'},
        ]
      }
    }
  }
</script>

<style scoped>
  .feature-trait {
    margin: 0 100px;
  }

  .feature-title {
    margin: 50px auto 0 auto;
    font-size: 42px;
    text-align: center;
    font-weight: bold;
    letter-spacing: 16px;
    color: #333;
  }

  .feature-title-decoration {
    margin: 20px auto 40px auto;
    width: 20%;
    height: 8px;
    border-radius: 16px;
    background-image: linear-gradient(-225deg, #77FFD2 0%, #6297DB 48%, #1EECFF 100%);
  }

  .trait-card {
    margin: 0 0 50px 0;
    height: 150px;
    width: 350px;
    padding: 25px 50px 75px 50px;
    border-radius: 16px;
    transition: all .25s ease-in-out;
  }

  .trait-card:hover {
    transform: scale(1.05, 1.05);
    transition: all .25s ease-in-out;
    box-shadow: rgba(215, 215, 215, 0.51) 0 10px 50px 1px;
  }

  .trait-card h3 {
    display: flex;
    align-items: center;
    margin-top: 30px;
    font-size: 22px;
    letter-spacing: 4px;
    color: #333;
  }

  .trait-card h5 {
    font-size: 18px;
    color: #666;
    font-weight: normal;
  }

  .trait-card-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 60px;
    margin: -80px auto 0 0;
    border-radius: 50%;
  }
</style>
