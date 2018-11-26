<template>
  <div>
    <div class="login-form" style="position: relative">
      <h1>Sign In</h1>
      <div style="position: relative;width: 100%">
        <i class="iconfont icon icon-yonghu"></i>
        <input class="login-input" v-model="loginForm.username" autocomplete="false" placeholder="用户名"/>
      </div>
      <div style="position: relative;width: 100%">
        <i class="iconfont icon icon-mima"></i>
        <input class="login-input" v-model="loginForm.password" type="password" autocomplete="false" placeholder="密码"/>
      </div>
      <div class="login-submit">
        <button class="login-button" @click="submitForm">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
        <router-link class="register-link" to="/register"><h4>立即注册</h4></router-link>
      </div>
    </div>

    <!--<el-row>-->
    <!--<el-col>-->
    <!--<el-form :model="loginForm" :rules="rules" ref="loginForm">-->
    <!--<el-form-item label="用户名" prop="username">-->
    <!--<el-input v-model="loginForm.username" placeholder="账号">-->
    <!--</el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item prop="password">-->
    <!--<el-input type="password" v-model="loginForm.password" placeholder="密码">-->
    <!--</el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item>-->
    <!--<el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--</el-col>-->
    <!--</el-row>-->
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
        // this.$refs[formName].validate(valid => {
        //   if (valid) {
        //     let promise = this.$post("/login/", this.loginForm);
        //     promise.then(response => {
        //       this.$message({
        //         message: "登录成功！",
        //         type: "success",
        //         showClose: true,
        //         duration: 1500
        //       });
        //       let token = response.token;
        //       localStorage.setItem("token", token);
        //       localStorage.setItem("username", this.loginForm.username);
        //       this.$router.push({path: "/home/data-import"});
        //     });
        //   } else {
        //     alert("请按提示正确提交表单");
        //   }
        // });
        let promise = this.$post("/login/", this.loginForm);
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
          this.$router.push({path: "/home/data-import"});
        });
      }
    }
  };
</script>
<style scoped>
  .icon {
    color: #999;
    left: 2%;
    font-size: 24px;
    position: absolute;
    top: 26px;
  }

  .login-form {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .login-form input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }

  .login-form h1 {
    letter-spacing: 4px;
    color: #333;
    font-size: 40px;
  }

  .login-input {
    width: 80%;
    padding: 0 10%;
    margin: 20px 0;
    border: none;
    border-bottom: #999 2px solid;
    height: 40px;
    border-radius: 6px;
    color: #999;
    font-size: 20px;
    font-weight: bold;
    background-color: transparent;
  }

  .login-input:focus {
    outline: none;
  }

  .login-input::-webkit-input-placeholder {
    color: #d7d7d7;
  }

  .login-submit {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login-button {
    height: 40px;
    width: 60%;
    border: none;
    border-radius: 16px;
    margin: 20px 0;
    background-color: #0068ec;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    transition: all .25s ease-in-out;
  }

  .login-button:hover {
    background-color: #AC32E4;
    transition: all .25s ease-in-out;
    color: #fff;
    box-shadow: #d7d7d7 0 4px 10px 0;
  }

  .login-button:focus {
    outline: none;
  }

  .register-link {
    text-decoration: none;
    color: #666;
  }
</style>
