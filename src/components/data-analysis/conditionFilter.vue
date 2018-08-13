<template>
  <div class="condition-warp" >
    <el-row >
      <span class="condition-text">满足下列:</span>
      <el-select v-model="conditionType" placeholder="请选择"  size="mini">
        <el-option 
          v-for="item in conditionTypeOption" 
          :key="item.value" 
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <el-row :gutter="10" style="    margin-bottom: -10px;">
      <ConditionItem 
      :keys="keys" 
      v-for="(value,index) in itemCount" 
      :key="value.index" 
      :end="index+1==itemCount.length"
      :count="itemCount.length"
      :item="value"
      v-on:addItem="addItem"
      v-on:removeItem="removeItem"
      ></ConditionItem>
    </el-row>
    
  </div>
</template>

<script>
import ConditionItem from './conditionItem.vue'

export default {
  components:{
    ConditionItem,
  },
  props:{
    keys:Array
  },
  data(){
    return {
      conditionType:'',
      conditionTypeOption:[{
        value:'all',
        label:'全部条件',
      },
      {
        value:'or',
        label:'任意条件'
      }],
      itemCount:[{
        value:'',
        index:1,
      }]
    }
  },
  methods:{
    addItem:function(){
      this.itemCount.push({
        value:'',
        index:this.itemCount.length+1,
      })
    },
    removeItem:function(item){
      if(this.itemCount.length>1){
        this.itemCount.splice(this.itemCount.indexOf(item),1);
      }else{
          this.$message({
            message:'再删就没了！',
            type:"warning"
          })
      }
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
.condition-text{
  padding: 0 8px 0 0;
  font-size: 14px;
  color: #777;
}
.icon-btn{
  color: #777;
  font-size: 16px;
  line-height: 26px;
  padding: 0!important;
}
.icon-btn:hover{
  color: red;
}
</style>

