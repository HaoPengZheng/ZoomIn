<template>
    <div>
        <span>
             <!-- <img src="@/assets/data-import/excel.png" style="height:30%;width:30%" @click="dialogTableVisible = true"> -->
             <div class="tableInfoStyle" style="margin-top:20px;margin-bottom:20px;margin-left:-10px">
             <div class="el-input-group__prepend" style="border: 0px solid #dcdfe6" >
                工作表
             </div>
             </div>
             <el-button class="tableInfoBtn" @click="dialogTableVisible = true">
               <svg class="icon"><use xlink:href="#icon-excel1"></use></svg>&nbsp;{{taskTitle}}.xlsx
              </el-button>
        </span>
       
        <el-dialog title="查看数据" :visible.sync="dialogTableVisible">

            <a style="float: left">显示前15条数据，最近更新时间：{{getTime}}</a>
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
                show-overflow-tooltip
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
        taskTitle:'',
        getTime:''
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
        
        this.getTime = this.getNowFormatDate()
        
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getNowFormatDate() {
          let date = new Date();
          let seperator1 = "-";
          let seperator2 = ":";
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          let hours = date.getHours();
          let minute = date.getMinutes()
          let seconds = date.getSeconds()
          if (month >= 1 && month <= 9) {
              month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
          }
          if (hours >= 0 && hours <= 9) {
              hours = "0" + hours;
          }
          if (minute >= 0 && minute <= 9) {
              minute = "0" + minute;
          }
          if (seconds >= 0 && seconds <= 9) {
              seconds = "0" + seconds;
          }
          let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                  + " " + hours + seperator2 + minute
                  + seperator2 + seconds;
          return currentdate;
      },
        myAiox(){
        return JSON.parse('[{	"RANK": "1111",	"RANK_H": "1291",	"姓名_x": "赵一钦1",	"学校名称": "市三中1",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区1",	"考生号": "170010508"}, {	"RANK": "2222",	"RANK_H": "1292",	"姓名_x": "赵一钦2",	"学校名称": "市三中2",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区2",	"考生号": "170010508"}, {	"RANK": "3333",	"RANK_H": "1293",	"姓名_x": "赵一钦3",	"学校名称": "市三中3",	"性别_x": "女",	"毕业学校": "紫荆中学凤凰路校区3",	"考生号": "170010508"}]')
    }
    }
  };
</script>
<style scoped>
.tableInfoBtn{
  width:100%;
  text-align: left
}
.tableInfoStyle .el-input-group__prepend{
    background-color: #ffffff;
    border: 0px solid;
    border-bottom: 0px solid #dcdfe6; 
    font-size: 5
}
</style>
