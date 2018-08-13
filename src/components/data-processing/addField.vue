<template>
  <div class="condition-warp" >
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
  <el-form-item label="活动名称">
    <el-input v-model="sizeForm.name" style="width:40%"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
    <!-- <el-form-item label="活动形式" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item> -->
  <el-form-item size="large">
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>


export default {
  components:{
    
  },
  props:{
    keys:Array,
    item:Object
  },
  data(){
    return {
      sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          
        },
      name:null,
      funcvalue:null,
      options: [{
        value: '0',
        label: '请选择字段类型'
      },{
        value: '1',
        label: '日期'
      }, {
        value: '2',
        label: '数值'
      }, {
        value: '3',
        label: '文本'
      }],
      value: '',
      inputValue:"",
      modeName: 'first',
      funcOption:[{
        value:'0',
        label:'求和'
      },
      {
        value:'1',
        label:'方差'
      }],
      val:''
    }
    
  },
  methods:{
    // fieldliClick:function(event){
    //   this.inputValue = this.inputValue+"["+event.target.id+"]";
    // },
    // funcliClick:function(event){
    //   this.inputValue = this.inputValue+event.target.label+"(";
      
    // },
    // submit:function(){
    //   if(this.name == ""){
    //       this.$message({
    //           message:'请选择数据源！',
    //           type:"warning"
    //       })
    //   }else{
    //       if(this.funcvalue == ""){
    //         this.$message({
    //           message:'请输入语句！',
    //           type:"warning"
    //         })
    //       }
    //   } 
    // },
    // submit(){
    //   this.$message({
    //     showClose: true,
    //     message: '字段生成成功',
    //     type: 'success'
    //   });
    // },
  },
};
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

