<template>
  <div class="app-container">
    <div class="logo"></div>
    <div class="title">Sign in to GitHub</div>
    <div class="login">
      <el-form :model="loginForm">
        <el-form-item prop="username">
          <div>Username or email address</div>
          <el-input v-model="loginForm.username" placeholder="Input your username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <div class="login-password">
            <div class="login-password-label">Password</div>
            <div class="login-password-create">Forgot password</div>
          </div>
          <el-input type="password" v-model="loginForm.password" placeholder="Create a password"></el-input>
        </el-form-item>
        <el-button type="success" @click="onSubmit">Sign in</el-button>
      </el-form>
    </div>
    <div>
      <span>New to Ezreal?</span>
      <span class="register">Create an account</span>
    </div>
  </div>
</template>

<script type="text/babel">
import { login } from '../api'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '账号不能为空', trigger: 'blue' },
          { max: 16, message: '用户名最多为16位', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blue' },
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      login(this.loginForm)
        .then((res) => {
          console.log(res)
          if(res.msg === 'ok') {
            const userId = res.data[0].userId
            const learnedTime = res.data[0].learnedTime
            localStorage.setItem('userId',userId)
            localStorage.setItem('learnedTime',learnedTime)
            console.log('存储成功,当前学习时长为',learnedTime)
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'success'
            });
            this.$router.push({
              path: 'home',
              query: {
                userId: userId 
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: 'error'
            });
          }  
        })
        .catch((err) => {
          this.$message.error(err)
        })
    }
  }
}
</script>

<style scoped>
</style>
