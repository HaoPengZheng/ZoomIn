<template>
  <div class="feature-choose">
    <div class="feature-title">
      &nbsp;为什么要选择我们
    </div>
    <div class="feature-title-decoration"></div>
    <div style="display: flex;flex-direction:row;justify-content: space-evenly">
      <div v-for="(item,index) in reason" class="choose-card">
        <div class="choose-card-icon">
          <img :src="require(`../../assets/welcomePage/icon${index+1}.svg`)" width="80px" height="60px">
        </div>

        <div>
          <h3>{{item.title}}</h3>
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
        reason: [
          {'title': '高度智能 + 易用性', 'content': '系统采用简单易懂的操作界面、Web应用的方式呈现给用户，将复杂的数据可视化功能和专业的数据挖掘模型科学整合'},
          {'title': '探索数据 + 自定义', 'content': '引导用户去对自己的数据进行清洗、统计分析、和训练相应的机器学习模型后深度挖掘隐藏在数据中的潜在价值'},
          {'title': '深度分析 + 可视化', 'content': '可导出可视化分析报告，辅助决策等，另外本产品可以根据用户的分析结果，提供进一步更加专业的技术支持。'}
        ],
      }
    }
  }
</script>

<style scoped>
  .feature-choose {
    border-radius: 16px;
    box-shadow: #d7d7d7 0 8px 10px 0px;
    padding: 50px 50px 200px 50px;
    background-color: white;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: -200px auto 0 auto;
    width: 80%;
    height: 400px;
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

  .choose-card {
    margin-top: 50px;
    height: 150px;
    width: 250px;
    padding: 50px;
    border-radius: 16px;
    box-shadow: #d9d9d9 0 4px 8px 0;
    transition: all .25s ease-in-out;
  }

  .choose-card:hover {
    transform: translateY(-15px);
    transition: all .25s ease-in-out;
    box-shadow: #d6d6d6 0 6px 8px 2px;
  }

  .choose-card h3 {
    margin-top: 30px;
    font-size: 22px;
    letter-spacing: 4px;
    color: #333;
  }

  .choose-card h5 {
    font-size: 16px;
    color: #666;
    font-weight: normal;
  }

  .choose-card-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    width: 60px;
    margin: -80px auto 0 0;
    border-radius: 50%;
  }
</style>
