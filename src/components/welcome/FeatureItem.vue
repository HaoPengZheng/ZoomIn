<template>
  <div class="feature-item">
    <div class="feature-list-box" :class="{fistOrder:isOdd,secoundOrder:!isOdd}">
      <h1>{{featureText.title}}</h1>
      <ul class="class-list">
        <li v-for="(item,index) in featureText.content" :key="index">{{item}}</li>
      </ul>
    </div>
    <div :class="{fistOrder:!isOdd,secoundOrder:isOdd}">
      <img :src="featureText.pictureUrl" width="400" height="300">
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      featureText: Object,
      featureOrder: Number
    },
    data() {
      return {
        isOdd: false
      };
    },
    created: function () {
      this.isOdd = this.featureOrder % 2 != 0;
    }
  };
</script>
<style scoped>
  .feature-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .feature-list-box {
    width: 530px;
    max-width: 50%;
    text-align: left;
  }

  .class-list {
    list-style: none;
    padding: 0;
  }

  .class-list li {
    padding-left: 18px;
    line-height: 28px;
    font-size: 15px;
    text-align: justify;
    color: rgba(10, 18, 32, 0.64);
    position: relative;
  }

  .class-list li::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 0;
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    border: 2px solid #6895FA;
  }

  .fistOrder {
    order: 1;
    margin-right: 100px;
  }

  .secoundOrder {
    order: 2;
  }

  @media (max-width: 1100px) {
    .feature-list-box {
      width: 530px;
      max-width: 100%;
      margin-top: 20px;
    }

    .fistOrder {
      order: 1;
      margin: 0;
    }

    .secoundOrder {
      order: 1;
    }
  }
</style>
