<template>
   <div style="min-width：400px">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="账号" >
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" placeholder="密码">
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
  data(){
      return{
            loginForm:{
                username:'',
                password:'',
            },
            rules:{
                username:[
                    {
                        required:true,
                        message:'请输入用户名',
                        tigger:'blur'
                    }
                ]
            }
      }
  },
  methods:{
      submitForm(formName){
            this.$refs[formName].validate((valid) =>{
                if(valid){
                     this.$axios.post("http://120.79.146.91:8000/login/",
                        this.$qs.stringify(this.loginForm)
                     )
                    .then((response)=>{
                        alert("登录成功");
                        let token = response.data.token
                        localStorage.setItem("token",token)
                        this.$router.push({path:'/data-import'})
                    })
                    .catch(()=>{
                        alert("error");
                    })
                }else{
                    alert("请按提示正确提交表单");
                }
            })       
        }
  }
}
</script>
