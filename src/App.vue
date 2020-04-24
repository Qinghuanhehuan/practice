<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <!-- <VuexTest></VuexTest> -->
    <WVuexTest></WVuexTest>
    <svg>
      <use xlink:href="#icon-wx"></use>
    </svg>
    <svg>
      <use xlink:href="#icon-qq"></use>
    </svg>
  </div>
</template>
<script>
// import VuexTest from './components/VuexTest'
import WVuexTest from './components/WVuexTest'
export default {
  components:{
    // VuexTest,
    WVuexTest
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
