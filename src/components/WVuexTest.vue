<template>
  <div>
    <p>{{$store.state.count}}</p>
    <p>{{$store.getters.score}}</p>
    <button @click="add">add</button>
    <button @click="asyncAdd">asyncAdd</button>
  </div>
</template>
<script>
export default {
  methods:{
    add(){
      this.$store.commit('add', 2)
    },
    asyncAdd(){
      this.$store.dispatch('asyncAdd')
    }
  }
}
</script>
