<template>
  <div class="sentence-warp" >
    <el-row :gutter="20">
  <el-col :span="4">
    <el-tabs v-model="modeName"  @tab-click="handleClick"> 
      <el-tab-pane label="字  段" name="first" >
        <!-- <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
        <select class="filed-select" multiple="true" size="7" style="width:100%">
          <option class="box-card" @click="fieldliClick($event)"
          v-for="item in keys" 
          :key="item" 
          :id="item"
          >{{item}}
          </option>
        </select>
      </el-tab-pane>
      <el-tab-pane label="函  数" name="second">
        <select class="func-select" multiple="true" size="7" style="width:100%">
          <option class="box-card" @click="funcliClick($event)"
          v-for="item in operatorOption" 
          :key="item.value" 
          :label="item.label"
          :value="item.value"
          >{{item}}
          </option>
        </select>
      </el-tab-pane>
    </el-tabs>
  </el-col>
  <el-col :span="19" :offset="0.5">
    <el-input 
      type="textarea"
      :rows="9"
      placeholder="请输入SQL语句筛选数据，如[城市] = '北京' and 部门 = '销售部'。请注意，需要使用英文输入法。字段、符号之间须加空格。"
      v-model="inputValue">
    </el-input>
    <el-row :gutter="10">
      <el-col :span="2" :offset="19">
        <el-button type="primary" size="mini" @click="CheckGrammar">语法检查</el-button>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" size="mini">确认</el-button>
      </el-col>
    </el-row>
  </el-col>
</el-row>
  </div>
</template>

<script>
export default {
  components: {
    
  },
  props: {
    keys:Array,
    item:Object,
    count:Number,
    end:Boolean
  },
  data() {
    return {
      inputValue:'',
      modeName: 'first',
      operatorOption:[{
        value:'add',
        label:'求和'
      },
      {
        value:'>',
        label:'大于'
      },
      {
        value:'>=',
        label:'大于等于'
      },
      {
        value:'<',
        label:'小于'
      },
      {
        value:'<=',
        label:'小于等于'
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
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    fieldliClick:function(event){
      this.inputValue = this.inputValue+"["+event.target.id+"]";
    },
    funcliClick:function(event){
      this.inputValue = this.inputValue+event.target.label+"()";
    },
    CheckGrammar() {
      this.$message({
        showClose: true,
        message: '语法正确！',
        type: 'success'
      });
    },
  },
    
};
</script>

<style>
.sentence-warp {
  margin-top: 10px;
  padding: 20px 22px 0px 19px;
  background-color: #f3f3f3;
  width: 100%;
  min-height: 100px;
}


</style>

