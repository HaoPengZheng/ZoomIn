<template>
  <div class="condition-warp" >
    <el-row :gutter="20">    
      <el-checkbox :indeterminate="isIndeterminate" v-model="showField" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group :min="3" v-model="checkedField" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="item in items" :label="item" :key="item">{{item}}</el-checkbox>
      </el-checkbox-group>
    </el-row>
    <el-row :gutter="10">
      
      <el-col :span="2" :offset="20">
        <el-button @click="subchange" type="primary" size="mini">确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import bus from '../bus.js';

export default {
  components:{
    
  },
  props:{
    keys:Array,
    item:Object
  },
  data(){
    return {
      showField: true,
      checkedField: this.keys,
      items: this.keys,
      isIndeterminate: true
    }
  },
  methods:{
    handleCheckAllChange(val) {
      this.checkedField = val ? this.items : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.showField = checkedCount === this.items.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length;
    },
    subchange:function(){
      bus.$emit('displayFields',this.checkedField);
    }
  }
}
</script>

<style>
.condition-warp{
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #f3f3f3;
  width: 100%;
  min-height: 100px;
}
</style>

