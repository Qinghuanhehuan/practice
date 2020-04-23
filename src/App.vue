<template>
  <div id="app">
    <WForm ref="loginForm" :model="model" :rules="rules">
      <WFormItem label="用户名" prop="username">
        <WFormInput v-model="model.username"></WFormInput>
      </WFormItem>
      <WFormItem lable="密码" prop="password">
        <WFormInput v-model="model.password" type="password"></WFormInput>
      </WFormItem>
      <WFormItem>
        <button @click="onlogin">登录</button>
      </WFormItem>
    </WForm>
  </div>
</template>

<script>
import WForm from './components/WForm'
import WFormItem from './components/WFormItem'
import WFormInput from './components/WFormInput'

export default {
  name: 'App',
  data(){
    return{
      model:{
        username:'ww',
        password:''
      },
      rules:{
        username:[{required:true,message:'用户名必填'}],
        password:[{required:true,message:'密码必填'}]
      }
    }
  },
  methods:{
    onlogin(){
      this.$refs.loginForm.validate((isValid)=>{
        if(isValid){
          alert('登录成功！')
        }else{
          alert('登录失败！')
        }
      })
    }
  },
  components: {
    WForm,
    WFormItem,
    WFormInput
  }
}
</script>
