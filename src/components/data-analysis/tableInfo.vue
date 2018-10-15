<template>
    <div>
        <span>
             <img src="@/assets/data-import/excel.png" style="height:30%;width:30%" @click="dialogTableVisible = true">
             <div @click="dialogTableVisible = true">{{taskTitle}}</div>
        </span>
       
        <el-dialog title="工作表信息" :visible.sync="dialogTableVisible">

            <el-table
            :data="tableData"
            stripe border
            style="width: 100%"
            max-height="450">
            <el-table-column
            v-for="(item,index) in fields"
                :key="index"
                :prop= item
                :label= item
                align="center"
                >
            </el-table-column>
            </el-table>

        </el-dialog>

    </div>
</template>

<script>
import Bus from './Bus.js'
  export default {
    data() {
      return {
        dialogTableVisible: false,
        tableData: [],
        fields:[],
        dateString:'',
        taskTitle:''
      };
    },
    mounted(){

        Bus.$on('AxiosDataEcharts', (e) => {
          let jsonObj = e
          for(var i =0 ;i < 30;i++){this.tableData[i] = jsonObj[i];}
          this.fields = Object.keys(jsonObj[0])
        })

        Bus.$on('taskTitle',(e)=>{
          this.taskTitle = e
        })        
        
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
        myAiox(){
        return JSON.parse('[{	"RANK": "1111",	"RANK_H": "1291",	"姓名_x": "赵一钦1",	"学校名称": "市三中1",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区1",	"考生号": "170010508"}, {	"RANK": "2222",	"RANK_H": "1292",	"姓名_x": "赵一钦2",	"学校名称": "市三中2",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区2",	"考生号": "170010508"}, {	"RANK": "3333",	"RANK_H": "1293",	"姓名_x": "赵一钦3",	"学校名称": "市三中3",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区3",	"考生号": "170010508"}]')
    }
    }
  };
</script>
<style>

</style>
