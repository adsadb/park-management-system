<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
      <img class="login-logo" src="../../assets/images/logo.jpg">
    <div class="login-con">
      <Card icon="log-in" title :bordered="false" shadow class="login-card">
        <div slot="title">
          <span @click="type = 0" :class="type === 0 ? 'login-use-acc' : 'login-use-other'" style="margin:35px">账号登录</span>
          <span @click="type = 1" :class="type === 1 ? 'login-use-acc' : 'login-use-other'">验证码登录</span>
        </div>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" :loginType="type"></login-form>
          <p class="login-tip">{{ type === 0 ? '请输入用户名和密码登录' : '请输入手机号和验证码登录'}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import Cookies from 'js-cookie'
import { mapActions } from "vuex";
import { userService } from '@/api/service'
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      type: 0
    };
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    async handleSubmit({ userName, password }) {
        // const valid = formCheck(this, 'loginForm')
            // if (valid) {
            this.loading = true
            const response = await userService.login({username:userName,password})
            if (response.status === 'success') {
                const data = response.data
                Cookies.set('username',userName);
                Cookies.set('password',password);
                console.log(Cookies.get('username'))
            //   setToken(data)
            //   this.$store.commit('SET_TOKEN', data)
            //debugger
                this.$router.push({path: '/home'})//登录成功跳转的页面
            }
            else {
                alert("请求失败！")
            }
            this.loading = false
        }
    }
};
</script>

<style lang="less" scoped>
.login-card {
  box-shadow: 0 1px 7px 1px #0000001a;
  -webkit-box-shadow: 0 1px 7px 1px #0000001a;
}

.login-use-acc,
.login-use-other {
  color: #5273eb;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  padding: 0 8px;
  transition: all 0.25s ease-in-out;
  -webkit-transition: all 0.25s ease-in-out;
}

.login-use-other {
  color: #a9a9a9;
  font-weight: 500;
}
</style>

