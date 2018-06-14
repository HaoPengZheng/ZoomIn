<template>
  <el-row :gutter="10" >
    <el-col :span="3">
      <el-select v-model="conditionType" placeholder="请选择"  size="mini">
        <el-option 
          v-for="item in keys" 
          :key="item" 
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="2">
      <el-select v-model="operator" placeholder="运算符"  size="mini">
        <el-option 
          v-for="item in operatorOption" 
          :key="item.value" 
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="4"> 
      <el-input
        size="mini"
        placeholder="请输入内容"
        width="10px"
        v-model="val">
      </el-input>
    </el-col>
    <el-col :span="4"> 
      <el-button type="text" class="icon-btn" @click="$emit('addItem')" v-if="end">
        <i class="el-icon-plus"></i>
      </el-button>
      <el-button type="text" class="icon-btn" @click="$emit('removeItem',item)" :class="{'noEndItem':!end}">
        <i class="el-icon-minus"></i>
      </el-button>
      <el-button size="mini"  v-if="end">确定</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props:{
    keys:Array,
    item:Object,
    count:Number,
    end:Boolean
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
      operator:'',
      operatorOption:[{
        value:'=',
        label:'等于'
      },
      {
        value:'>',
        label:'大于'
      },
      {
        value:'<',
        label:'小于'
      },
      {
        value:'contain',
        label:'包含'
      },
      {
        value:'noContain',
        label:'不包含'
      }],
      val:''
    }
  },
  methods:{
  
  },
  
  
}
</script>

<style>
.noEndItem{
  margin-left: 33px!important;
}

</style>
