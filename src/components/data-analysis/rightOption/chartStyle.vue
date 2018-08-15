<template>
    <div style="padding:20px">
    <!-- <el-radio v-model="chartStyle" label="dark" border @change="changeEvent(chartStyle)">dark</el-radio>
    <el-radio v-model="chartStyle" label="macarons" border  @change="changeEvent(chartStyle)">macarons</el-radio>
    <el-radio v-model="chartStyle" label="vintage" border @change="changeEvent(chartStyle)">vintage</el-radio>
    <el-radio v-model="chartStyle" label="infographic" border @change="changeEvent(chartStyle)">infographic</el-radio>
    <el-radio v-model="chartStyle" label="shine" border @change="changeEvent(chartStyle)">shine</el-radio>
    <el-radio v-model="chartStyle" label="roma" border @change="changeEvent(chartStyle)">roma</el-radio> -->
    
  <el-carousel :interval="4000" type="card" height="100px" :autoplay="false" indicator-position="none">
    <el-carousel-item v-for="(item,index) in chartStyle" :key="index">
      <img :src="getUrl(item)" style="height:100%;width:100%" @click="changeEvent(item)">
    </el-carousel-item>
  </el-carousel>

  
  </div>
</template>
<script>
import Bus from '../Bus.js'
export default {
    data(){
        return {
            chartStyle:['dark','macarons','vintage','infographic','shine','roma']
        }
    },
    methods:{
        changeEvent(e){
            Bus.$emit('chartStyleType',e)
        },
         getUrl(item){
             switch (item) {
                 case 'dark':
                     return require('../../../assets/dark.jpg');
                     break;
                 case 'infographic':
                     return require('../../../assets/infographic.jpg');
                     break;
                 case 'macarons':
                     return require('../../../assets/macarons.jpg');
                     break;
                 case 'roma':
                     return require('../../../assets/roma.jpg');
                     break;
                 case 'shine':
                     return require('../../../assets/shine.jpg');
                     break;                     
                 case 'vintage':
                     return require('../../../assets/vintage.jpg');
                     break;                     
                 default:
                     break;
             }
        }

    }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
