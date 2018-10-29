<template>
<div>
<el-input class="TitleStyle" v-model="input" placeholder="请输入标题" suffix-icon="el-icon-edit"></el-input>
</div>
</template>

<script>
    export default {
    data() {
        return {
        input: ''
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .TitleStyle {
        margin-left: 5px;
    }
</style>
