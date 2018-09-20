<template>
<div >
<el-input v-model="input" placeholder="请输入标题" suffix-icon="el-icon-edit" @blur='titleBlur'  class="titleStyle" ></el-input>
</div>
</template>

<script>
import Bus from '../Bus.js'
    export default {
    data() {
        return {
        input: ''
        }
    },
    methods:{
        titleBlur(){
            Bus.$emit('titleChange',this.input)
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.titleStyle .el-input__inner{
        border: 1px solid #ffffff;
        border-bottom-color: #dcdfe6;
    }
</style>
