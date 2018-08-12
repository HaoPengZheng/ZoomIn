<template>
  <div style="min-width: 400px;">
    <el-row :gutter="20" class="login-warp">
      <el-col :span="12" :offset="6">
        <div>
          <router-link to="/" class="login-link" :class="{'highlight':flag==0}" @click.native="flag=0">登录</router-link>
          <b style="   font-weight: 700;color: #969696; padding: 10px;">.</b>
          <router-link to="/register" class="login-link" :class="{'highlight':flag==1}" @click.native="flag=1">注册</router-link>
        </div>
        <div style="margin-top:20px">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<style>
.login-warp {
  margin-top: 150px;
  text-align: center;
}
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
