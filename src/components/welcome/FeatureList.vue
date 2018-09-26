<template>
    <div class="feature-warp">
      <template v-for="(featureItem,index) in textList" >
        <FeatureItem :featureText="featureItem" :featureOrder="index" :key="index"></FeatureItem>
      </template>
  </div>
</template>
<script>
import FeatureItem from './FeatureItem.vue'
export default {
  components:{
    FeatureItem,
  },
  props:{
    textList:Array
  },
  data(){
    return {

    }
  },

};
</script>
<style scoped>
.feature-warp{
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom:100px;
}

</style>
