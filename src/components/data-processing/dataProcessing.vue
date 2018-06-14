<template>
   <el-container>     
      <Left >  
      </Left>
      <el-container>  
        <el-main>
           <el-tabs v-model="activeName" @tab-click="handleClick" style="padding:0 50px">
            <el-tab-pane label="数据预览" name="first">
                <div>
                  <el-row :gutter="20" style="text-align:left;padding-left:20px;    margin-bottom: 0px;">
                  
                      <el-button type="text" @click="showFiltrate">
                        数据筛选
                        <i class="el-icon-arrow-down"></i>
                      </el-button>
                      <el-button type="text" >
                        空值处理
                      </el-button>
              
                  </el-row>
                  <el-row  style="text-align:left;padding-left:10px">     
                    <div v-if="filtrateVisable" >
                      <span style="font-size:14px">筛选方式：</span>
                      <el-radio v-model="filtrateType" label="1">条件筛选</el-radio>
                      <el-radio v-model="filtrateType" label="2">语句筛选</el-radio>
                    </div>
                    <el-row>
                      <div v-if="filtrateType=='1'&&filtrateVisable">
                        <ConditionFilter :keys="tableKeys"></ConditionFilter>
                      </div>
                      <div v-if="filtrateType=='2'&&filtrateVisable">
                        语句筛选内容
                      </div>
                    </el-row>
                  </el-row>
                </div>     
            </el-tab-pane>
            <el-tab-pane label="字段设置" name="second">字段管理</el-tab-pane>
            <el-tab-pane label="xxxx" name="third">xxx</el-tab-pane>
          
          </el-tabs>
          <div style="padding-top:30px;width:80%;margin:0 auto">
              <el-table
            :data="tableData"
            border
            style="width: 100%"
            v-loading="loading"
            >
               <el-table-column
                  :prop="item"
                  :label="item"
                   v-for="(item,index) in tableKeys" :key="index">
                </el-table-column>
            </el-table>   
          </div>  
        </el-main>
        </el-container>       
    </el-container> 
</template>
<script>
import Left from '../common/left.vue'
import ConditionFilter from './conditionFilter.vue'
export default {
  components:{
    Left,ConditionFilter
  },
  data(){
    return{
      taskId:1,
      loading:true,
      tableData:[],
      tableKeys:[],
      show:true,
      filtrateType:'1',
      filtrateVisable:false,
      activeName:'first'
    }
  },
  created:function(){
    this.fetchData();
  },
  methods:{
    fetchData:function(){
      this.$axios.get("http://120.79.146.91:8000/task/scoreAnalysis")
        .then((response)=>{
          this.tableData = response.data.data.slice(0,100);
          console.log(this.tableData);
          this.tableKeys = Object.keys(this.tableData[0]);
          console.log(this.tableKeys)
          this.loading =false
          console.log(this.$refs.th)
        })
        .catch((response)=>{
          alert("error");
        })
        
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    showFiltrate:function(){
      if(this.filtrateVisable === false){
        this.filtrateVisable = true;
      }else{
        this.filtrateVisable = false;
      }
    }
  } 
}
</script>
<style>
thead{
  line-height: 40px;
}
.el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
