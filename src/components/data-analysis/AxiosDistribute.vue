<template>
    <div></div>
</template>

<script>
import axios from 'axios'
import Bus from './Bus.js'
export default {
    data(){
        return{
            dataSetId:1
        }
    },
    created() {
      this.dataSetId = this.$route.params.dataSetId;
      alert(this.dataSetId)
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
            // data_set_id: this.dataSetId
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


    }

}

</script>

