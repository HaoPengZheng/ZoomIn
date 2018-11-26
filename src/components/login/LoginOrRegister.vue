<template>
  <div style="width: 80%;position: relative">

    <!--<div>-->
      <!--<router-link to="/" class="login-link" :class="{'highlight':flag==0}" @click.native="flag=0">登录</router-link>-->
      <!--<router-link to="/register" class="login-link" :class="{'highlight':flag==1}" @click.native="flag=1">注册</router-link>-->
    <!--</div>-->
    <div>
      <router-view></router-view>
    </div>
  </div>
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
