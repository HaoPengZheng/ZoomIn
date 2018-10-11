<template>
  <div style="min-width：400px">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="账号">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<style>
</style>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            tigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let promise = this.$post(
            "/login/",
            this.loginForm
          );
          promise.then(response => {
            this.$message({
              message: "登录成功！",
              type: "success",
              showClose: true,
              duration: 1500
            });
            let token = response.token;
            localStorage.setItem("token", token);
            localStorage.setItem("username", this.loginForm.username);
            this.$router.push({ path: "/home/data-import" });
          });
        } else {
          alert("请按提示正确提交表单");
        }
      });
    }
  }
};
</script>
