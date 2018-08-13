<template>
  <div class="condition-warp" >
    <div v-if="save">
      <el-row :gutter="20" style="text-align:right;padding-right:60px; margin-bottom: 0px;">    
        <el-button type="text" @click="changeField">
          <i class="el-icon-edit"></i>
          修改
        </el-button>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="0.5"><div style="border-bottom:1px solid #000;text-align:center;">原字段名</div></el-col>
        <el-col :span="4"><div style="border-bottom:1px solid #000;text-align:center;">新字段名</div></el-col>
        <el-col :span="4"><div style="border-bottom:1px solid #000;text-align:center;">字段类型</div></el-col>
        <el-col :span="11"><div style="border-bottom:1px solid #000;text-align:center;">字段描述</div></el-col>
      </el-row>
      <el-row v-for="(item,index) in keys" :key="index">
        <el-col :span="4" :offset="0.5">
          <div style="border-bottom:1px solid #000;text-align:center;">{{item}}
          </div>
        </el-col>
        <el-col :span="4">
          <div style="border-bottom:1px solid #000;text-align:center;">{{newName[index]}}
          </div>
        </el-col>
        <el-col :span="4">
          <div  style="border-bottom:1px solid #000;text-align:center;">类型
          </div>
        </el-col>
        <el-col :span="11">
          <div style="border-bottom:1px solid #000;text-align:center;">备注
          </div>
        </el-col>
      </el-row>
      
    </div>
    <div v-if="change">
      <el-row :gutter="20" style="text-align:right;padding-right:60px; margin-bottom: 0px;"> 
        <el-button type="text" @click="changekeys('saveField')">
          <i class="el-icon-download"></i>
          保存
        </el-button>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="0.5"><div style="border-bottom:1px solid #000;text-align:center;">原字段名</div></el-col><el-col :span="4"><div style="border-bottom:1px solid #000;text-align:center;">新字段名</div></el-col>
        <el-col :span="4"><div style="border-bottom:1px solid #000;text-align:center;">字段类型</div></el-col>
        <el-col :span="11"><div style="border-bottom:1px solid #000;text-align:center;">字段描述</div></el-col>
      </el-row>
      <el-row v-for="(item,index) in keys" :key="item">
        <el-col :span="4" :offset="0.5">
          <div style="border-bottom:1px solid #000;text-align:center;" >{{item}}
          </div>
        </el-col>
        <el-col :span="4" :offset="0.5">
          <el-input v-model="newName[index]" size="mini" :placeholder="item" style="border-bottom:1px solid #000;text-align:center;">
          </el-input>
        </el-col>  
        <el-col :span="4" :offset="0.5">
          <el-select v-model="fieldType[index]" :key="item" placeholder="请选择字段类型" size="mini" style="border-bottom:1px solid #000;text-align:center;" >
            <el-option
            v-for="item in fieldTypeOption"
            :key="item.index"
            :label="item.label"
            :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="11" :offset="0.5">
          <el-input v-model="newRemark[index]" size="mini" style="border-bottom:1px solid #000;text-align:center;">
          </el-input>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import bus from '../bus.js';

export default {
  components:{
    
  },
  props:{
    keys:Array,
    
  },
  mounted(){
    //bus有问题
        bus.$on('changeFields',(e) =>{
          this.oldName = []
          for(var i=0;i<e.length;i++){
            this.oldName.push(e[i])
          }
          // this.oldName = e
          alert(this.oldName)
        })
    for(var i=0;i<this.keys.length;i++){
      this.newName.push(this.keys[i])
    }
    for(var i=0;i<this.keys.length;i++){
      this.newRemark.push(this.keys[i])
    }
    for(var i=0;i<e.length;i++){
      this.newName.push(this.newName[i])
    }
  },
  data(){
    return {
      save:true,
      change:false,
      newName:[],
      newRemark:'',
      oldName:'',
      fieldType:[],
      fieldTypeOption: [{
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

    }
    
  },
  methods:{
      changekeys:function(){
        if(this.oldName != this.newName){


        }
        this.$axios
        .post("http://120.79.146.91:8000/task/dataProcessing/resetColumn",
        {
          data_set_id: 5,
          reset:[
            {
              
              original_col: this.oldName,
              new_col: this.newName
            }
          ]
        },
        {
          headers: {
            Authorization: "JWT " + localStorage.getItem("token") 
          }
        }
      )
      .then(response => {
        alert("成功了")
        
      })
      .catch((response)=>{
        alert("出错了")
      })
    
      if(this.save === true){
        this.change = true;
        this.save = false;
      }else{
        this.change = false;
        this.save = true;
      }
      
    },
    changeField:function(){
      if(this.change === false){
        this.change = true;
        this.save = false;
      }else{
        this.change = false;
        this.save = false;
      }
    },
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
.el-button--text {
    color: #409EFF;
    background: 0 0;
    padding-left: 0;
    padding-right: -1px;
}
.el-input--mini {
    font-size: 16px;
}
.el-row {
    margin-bottom: 0px;
}
</style>

