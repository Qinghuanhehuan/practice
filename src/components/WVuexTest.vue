<template>
  <div>
    <p>{{$store.state.count}}</p>
    <button @click="add">add</button>
  </div>
</template>
<script>
export default {
  methods:{
    add(){
      this.$store.commit('add', 2)
    }
  }
}
</script>
