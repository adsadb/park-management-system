<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <section v-if="loginType === 0">
      <FormItem prop="userName">
        <Input v-model="form.userName" placeholder="请输入用户名">
          <span slot="prepend">
            <Icon :size="16" type="ios-person"></Icon>
          </span>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="form.password" placeholder="请输入密码">
          <span slot="prepend">
            <Icon :size="14" type="md-lock"></Icon>
          </span>
        </Input>
      </FormItem>
    </section>
     <section v-else>
      <FormItem prop="userPhone">
        <Input v-model="form.userPhone" placeholder="请输入手机号">
          <span slot="prepend">
            <Icon :size="16" type="md-phone-portrait"></Icon>
          </span>
        </Input>
      </FormItem>
      <FormItem prop="validateNum">
        <Input v-model="form.validateNum" placeholder="请输入验证码">
          <span slot="prepend">
            <Icon :size="14" type="md-paper-plane"></Icon>
          </span>
        </Input>
      </FormItem>
    </section>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
      <Button @click="routerRegister"  long>注册</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    loginType: {
      type: Number,
      default: 0
    },
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    userPhoneRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ]
      }
    },
    validateNumRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    },
  },
  data () {
    return {
      form: {
        userName: '',
        password: '',
        userPhone: '',
        validateNum: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        userPhone: this.userPhoneRules,
        validateNum: this.validateNumRules
      }
    }
  },
  watch:{
    loginType(newval, oldval){
      this.$refs.loginForm.resetFields();
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
            userPhone: this.form.userPhone,
            validateNum: this.form.validateNum
          })
        }
      })
    },
    routerRegister(){
      this.$router.push({path: '/register'})
    }
  }
}
</script>
