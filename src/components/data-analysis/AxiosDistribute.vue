<template>
    <div></div>
</template>

<script>
import axios from 'axios'
import Bus from './Bus.js'
export default {

    mounted(){
        axios.get('http://120.79.146.91:8000/task/scoreAnalysis')
            .then(function (response) {
                //console.log(response.data.data);
                Bus.$emit('AxiosDataDragItem', response.data.data[0]);
                Bus.$emit('AxiosDataEcharts', response.data.data);
            })
            .catch(function (response) {
               // console.log(response);
            });

    }

}

</script>

