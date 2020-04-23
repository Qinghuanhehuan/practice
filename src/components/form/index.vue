<template>
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
</template>

<script>
import WForm from './WForm'
import WFormItem from './WFormItem'
import WFormInput from './WFormInput'
import Notice from '../Notice'
import create from '@/utils/create'

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
      // 创建弹窗实例
      let notice;
      this.$refs.loginForm.validate((isValid)=>{
        if(isValid){
          // alert('登录成功！')
          notice = create(Notice,{
            title:'登录提示',
            message:'登录成功！',
            duration:10000
          })
        }else{
          // alert('登录失败！')
          notice = create(Notice,{
            title:'登录提示',
            message:'登录失败！',
            duration:10000
          })
        }
        notice.show();
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

<style>

</style>
