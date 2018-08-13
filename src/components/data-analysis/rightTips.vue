<template>
<div>
<div>&nbsp;</div>
<el-input class="TipStyle" v-model="input" type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="请输入备注" suffix-icon="el-icon-edit"></el-input>
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
.TipStyle{
    margin-left: 3px
}
</style>