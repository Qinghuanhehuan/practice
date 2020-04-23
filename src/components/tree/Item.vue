<template>
  <li>
    <div @click="toggle">
      {{model.title}}
      <span v-if="isFolder">[{{open ? '-':'+'}}]</span>
    </div>
    <!-- 子树 -->
    <ul v-show="open" v-if="isFolder">
      <item class="item" v-for="model in model.children" :model="model" :key="model.title"></item>
    </ul>
  </li>
</template>

<script>
export default {
  name:'Item',
  props:{
    model:Object
  },
  data(){
    return{
      open: false // 展开
    }
  },
  computed:{
    isFolder:function(){ //是否有子树
      return this.model.children && this.model.children.length
    }
  },
  methods:{
    toggle(){
      if(this.isFolder){
        this.open = !this.open
      }
    }
  }
}
</script>

<style>

</style>
