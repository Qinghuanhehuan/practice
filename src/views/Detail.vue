<template>
  <div>
    Detail
    <!-- <p>id:{{$route.params.id}}</p> -->
    <p>id:{{id}}</p>
    <p>{{crumbData}}</p>
  </div>
</template>

<script>
export default {
  props:{
    id:{
      type:String,
      default:''
    }
  },
  data(){
    return{
      crumbData:[]
    }
  },
  watch:{
    $route:{
      handler(){
        console.log(this.$route.matched)
        this.crumbData = this.$route.matched.map(m=>m.name||m.redirect)
      },
      immediate:true
    }
  }
}
</script>

<style>

</style>
