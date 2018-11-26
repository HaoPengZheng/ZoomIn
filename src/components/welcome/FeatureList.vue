<template>
  <div class="feature-warp">
    <FeatureChoose></FeatureChoose>
    <div class="feature-banner">
      <img src="../../assets/welcomePage/banner1.svg" width="800px" height="600px"/>
    </div>
    <FeatureTrait></FeatureTrait>
    <FeatureBanner></FeatureBanner>
  </div>
</template>
<script>
  import FeatureChoose from './FeatureChoose';
  import FeatureTrait from './FeatureTrait';
  import FeatureBanner from './FeatureBanner';

  export default {
    components: {
      FeatureChoose,
      FeatureTrait,
      FeatureBanner
    },
  };
</script>
<style scoped>
  .feature-warp {
    padding: 60px 0 0 0;
    background-color: #ffffff;
    position: relative;
  }

  .feature-banner {
    margin-top: 500px;
    text-align: center;
  }
</style>
