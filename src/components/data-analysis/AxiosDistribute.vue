<template>
    <div></div>
</template>

<script>
import axios from 'axios'
import Bus from './Bus.js'
axios.defaults.timeout = 15000;  //超时响应
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // 配置请求头（推荐）
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'; // 配置请求头

axios.defaults.withCredentials = true;   // axios 默认不发送cookie，需要全局设置true发送cookie

export default {
    data(){
        return{
            dataSetId:1,
            chartTitle:'图表标题',
            chartId:1
        }
    },
    created() {
      this.dataSetId = this.$route.params.dataSetId;

    },
    mounted(){
      //打印TOKEN供测试用
      console.log(localStorage.getItem("token"))

      //1.获取完整数据集数据
      this.$axios
        .post(
          "http://120.79.146.91:8000/task/dataProcessing/showDataSet1",
          {
            //data_set_id: this.dataSetId
            data_set_id: 15
          },
          {
            headers: {
              Authorization: "JWT " + localStorage.getItem("token")
            }
          }
        )
        .then(response => {
            Bus.$emit('AxiosDataDragItem', response.data.data[0]);
            Bus.$emit('AxiosDataEcharts', response.data.data);
            console.log(response)
        })
        .catch(response => {
          //alert("获取数据失败");
        });

      //2.随机生成图表标题
      this.chartTitle = this.chartTitle + Math.floor(Math.random()*(1000000-1+1)+1)//用当前时间(new Date()).valueOf();，创建于2018-9-18-16:32:45
      
      //3.创建图表信息
      this.$axios
        .post(
          "http://120.79.146.91:8000/chart/",
          {
              data_set : 10001,//好像没用
              title : this.chartTitle,
              desc: "",
              chart_type: 1,
              x_axis: "",
              y_axis: "",
              contrast_axis: "",
              secondary_axis: ""
          },
          {
            headers: {
              Authorization: "JWT " + localStorage.getItem("token")
            }
          }
        )
        .then(response => {
      			this.chartId = response.data.data.id
            //alert("创建图表成功")
            Bus.$emit('chartID',this.chartId)
        })
        .catch(response => {
          //alert("获取数据失败");
        });

    this.$get("/dataSet/").then(r=>{
      for (let i = 0; i < r.length; i++) {
        if(r[i].id == 4){
          Bus.$emit('taskTitle',r[i].title)
          break;
        }
      }
    })



      //PATCH暂时没用上，这个属于echarts.vue
      // this.$axios
      //   .patch(
      //     "http://120.79.146.91:8000/chart/" + this.chartId +"/", //这个id是图表的id
      //     {
      //             id:12,
      //             title:"柱x状x图",
      //             desc:"zzzxxxzz",
      //             chart_type:1,
      //             x_axis:"性x别_x，考x生x号",
      //             y_axis:"RANK，RANK_H",
      //             contrast_axis:"",
      //             secondary_axis:""
      //     },
      //     {
      //       headers: {
      //         Authorization: "JWT " + localStorage.getItem("token")
      //       }
      //     }
      //   )
      //   .then(response => {
      //     alert("patch成功")
      //   })
      //   .catch(response => {
      //     //alert("获取数据失败");
      //   });


    }

}

</script>

