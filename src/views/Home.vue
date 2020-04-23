<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <formTest></formTest>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import formTest from '@/components/form/index'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    formTest
  }
}
</script>
