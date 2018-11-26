<template>
  <div>
    <div class="register-form" style="position: relative">
      <h1>Sign Up</h1>
      <div style="position: relative;width: 100%">
        <i class="iconfont icon icon-yonghu"></i>
        <input class="register-input" v-model="loginForm.username" autocomplete="new-password" placeholder="用户名"/>
      </div>
      <div style="position: relative;width: 100%">
        <i class="iconfont icon icon-mima"></i>
        <input class="register-input" v-model="loginForm.password" type="password" autocomplete="new-password"
               placeholder="密码"/>
      </div>
      <div class="register-submit">
        <button class="register-button" @click="submitForm">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>
        <router-link class="login-link" to="/login"><h4>立即登录</h4></router-link>
      </div>
    </div>
    <!--<el-row :gutter="20">-->
    <!--<el-col :span="12" :offset="6">-->
    <!--<el-form :model="loginForm" :rules="rules" ref="loginForm">-->
    <!--<el-form-item prop="username">-->
    <!--<el-input v-model="loginForm.username" placeholder="账号">-->
    <!--</el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item prop="password">-->
    <!--<el-input v-model="loginForm.password" placeholder="密码">-->
    <!--</el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item>-->
    <!--<el-button type="primary" @click="submitForm('loginForm')">注册账号</el-button>-->
    <!--<el-button @click="resetForm('loginForm')">重置</el-button>-->
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
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$post("/users/", this.loginForm)
              .then(response => {
                console.log(response);
                this.$router.push({path: "/"});
              })
              .catch(err => {
                this.$message({
                  message: err.response.data.username[0],
                  type: "error",
                  showClose: true,
                  duration: 1500
                });
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
<style scoped>
  .icon {
    color: #999;
    left: 2%;
    font-size: 24px;
    position: absolute;
    top: 26px;
  }

  .register-form {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .register-form input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
  }

  .register-form h1 {
    letter-spacing: 4px;
    color: #333;
    font-size: 40px;
  }

  .register-input {
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

  .register-input:focus {
    outline: none;
  }

  .register-input::-webkit-input-placeholder {
    color: #d7d7d7;
  }

  .register-submit {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register-button {
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

  .register-button:hover {
    background-color: #AC32E4;
    transition: all .25s ease-in-out;
    color: #fff;
    box-shadow: #d7d7d7 0 4px 10px 0;
  }

  .register-button:focus {
    outline: none;
  }

  .login-link {
    text-decoration: none;
    color: #666;
  }
</style>
