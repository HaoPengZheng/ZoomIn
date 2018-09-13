<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="账号">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" placeholder="密码">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')">注册账号</el-button>
                        <el-button @click="resetForm('loginForm')">重置</el-button>
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
          let query = this.$post("http://120.79.146.91:8000/users/", this.$qs.stringify(this.loginForm));
          query.then(response => {
            alert(response);
            console.log(response);
            this.$router.push({ path: "/" });
          });
        } else {
          alert("请按提示正确提交表单");
        }
      });
    },
    resetForm(formName) {
      this.loginForm.username = "";
      this.loginForm.password = "";
    }
  }
};
</script>
