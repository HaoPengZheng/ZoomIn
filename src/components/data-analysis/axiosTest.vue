<template>
    <div>222222222222222222222</div>
</template>

<script>
import axios from 'axios'
import Bus from './Bus.js'
export default {

    mounted(){
        alert(123)
      this.$axios
        .post(
          "http://120.79.146.91:8000/task/dataProcessing/showDataSet1",
          {
            data_set_id: '20'
          },
          {
            headers: {
              Authorization: "JWT " + localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log(response.data.data);
        })
        .catch(response => {
          alert("获取数据失败");
        });

    }

}

</script>

