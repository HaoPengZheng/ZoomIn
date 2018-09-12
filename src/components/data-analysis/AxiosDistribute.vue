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
            dataSetId:1
        }
    },
    created() {
      this.dataSetId = this.$route.params.dataSetId;
      //alert(this.dataSetId)
      //此处拿到id
    },
    mounted(){
        // axios.get('http://120.79.146.91:8000/task/scoreAnalysis')
        //     .then(function (response) {
        //         //console.log(response.data.data);
        //         Bus.$emit('AxiosDataDragItem', response.data.data[0]);
        //         Bus.$emit('AxiosDataEcharts', response.data.data);
        //     })
        //     .catch(function (response) {
        //        // console.log(response);
        //     });


        //alert(this.dataSetId)
      this.$axios
        .post(
          "http://120.79.146.91:8000/task/dataProcessing/showDataSet1",
          {
            //data_set_id: this.dataSetId
            data_set_id: 4
          },
          {
            headers: {
              Authorization: "JWT " + localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          //console.log(response.data.data);
            Bus.$emit('AxiosDataDragItem', response.data.data[0]);
            Bus.$emit('AxiosDataEcharts', response.data.data);

        })
        .catch(response => {
          //alert("获取数据失败");
        });


      this.$axios
        .post(
          "http://120.79.146.91:8000/chart/",
          {
              data_set : 22,
              title : "柱状图2122",
              desc: "zzzzz",
              chart_type: 1,
              x_axis: "性别_x，考生号",
              y_axis: "RANK，RANK_H",
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

        })
        .catch(response => {
          //alert("获取数据失败");
        });





      // this.$axios
      //   .delete(
      //     "http://120.79.146.91:8000/chart/" + id + "/",  //id输入

      //     {
      //       headers: {
      //         Authorization: "JWT " + localStorage.getItem("token")
      //       }
      //     }
      //   )
      //   .then(response => {
      //       alert(response)
            
      //   })
      //   .catch(response => {
      //     //alert("获取数据失败");
      //   });


      // this.$axios
      //   .patch(
      //     "http://120.79.146.91:8000/chart/" + 4 +"/",
      //     {
      //             id:6,
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

      //   })
      //   .catch(response => {
      //     //alert("获取数据失败");
      //   });








      this.$axios
        .get(
        "http://120.79.146.91:8000/chart/",
          {
            headers: {
              Authorization: "JWT " + localStorage.getItem("token")
            }
          }
        )
      .then(response => {
        console.log(response)
      })
      .catch(response => {
      //alert("获取数据失败");
      });

    }

}

</script>

