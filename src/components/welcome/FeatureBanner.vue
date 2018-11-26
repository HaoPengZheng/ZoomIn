<template>
  <div class="feature-screen">
    <img class="feature-screen-img" :src="require('../../assets/welcomePage/banner2.svg')" width="600px"
         height="400px">
    <div class="feature-screen-info">
      <div>
        <p>这里有最<span style="font-size: larger;color: white;-webkit-text-stroke: 1px #d7d7d7">贴心</span>的的服务</p>
        <div class="feature-screen-decoration"></div>
        <h3>
          ZoomIn系统在免费提供一整套的软件层面的数据分析功能后，可以根据用户的高级需求，提供更加个性化、定制化的全套数据挖掘的服务，由专人进行对接，背靠强大的专家团队，提供企业的数据解决方案，实现数据向生产力转换的过程。</h3>
      </div>
      <button class="feature-screen-button">免 费 使 用</button>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .feature-screen {
    display: flex;
    align-items: center;
    width: 100%;
    height: 600px;
    background-image: linear-gradient(to right, #00f2fe 0%, #4facfe 100%);
    margin: 50px 0 0 0;
  }

  .feature-screen-img {
    margin: 0 100px;
  }

  .feature-screen-info {
    width: 600px;
    height: 400px;
    color: rgba(255, 255, 255, 0.93);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .feature-screen-info p {
    font-size: 48px;
    font-weight: bold;
  }

  .feature-screen-decoration {
    width: 80%;
    height: 8px;
    border-radius: 16px;
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
    margin: -30px 0 40px 0;
  }

  .feature-screen-info h3 {
    color: rgba(254, 254, 254, 0.9);
  }

  .feature-screen-button {
    outline: none;
    border: none;
    width: 140px;
    height: 60px;
    border-radius: 16px;
    background-image: linear-gradient(-20deg, rgba(183, 33, 255, 0.73) 0%, #21d4fd 100%);
    font-size: 18px;
    font-weight: bold;
    color: white;
    transition: all .25s ease-in-out;
  }

  .feature-screen-button:hover {
    transition: all .25s ease-in-out;
    transform: scale(1.05, 1.05);
  }
</style>
