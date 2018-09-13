<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <router-link to="/" class="login-link" :class="{'highlight':flag==0}" @click.native="flag=0">登录</router-link>
      <b style="font-weight: 700;color: #969696; padding: 10px;">.</b>
      <router-link to="/register" class="login-link" :class="{'highlight':flag==1}" @click.native="flag=1">注册</router-link>
    </el-col>
    <div style="margin-top:20px">
      <router-view></router-view>
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      flag: 0
    };
  },
  methods: {}
};
</script>
<style scoped>
.login-link {
  padding: 10px;
  color: #969696;
  font-size: 18px;
  text-decoration: none;
}
.highlight {
  color: red;
}
</style>
