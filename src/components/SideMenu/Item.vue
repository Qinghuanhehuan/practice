<template>
<!-- hidden 为true不显示 -->
<li v-if="!model.hidden">
  <div @click="toggle">
    <Icon v-if="model.meta && model.meta.icon" :icon-class="model.meta.icon"></Icon>
    <span v-if="isFolder">
      <span v-if="model.meta && model.meta.title">{{model.meta.title}}</span>
      <span>[{{open ? '-':'+'}}]</span>
    </span>
    <!-- 叶子节点 -->
    <template v-else>
      <router-link v-if="model.meta && model.meta.title" :to="resolvePath(model.path)">{{model.meta.title}}</router-link>
    </template>
  </div>
  <!-- 子树 -->
  <ul v-show="open" v-if="isFolder">
    <item class="item" v-for="route in model.children" :model="route" :key="route.path" :base-path="resolvePath(model.path)"></item>
  </ul>
</li>
</template>

<script>
import path from 'path'
export default {
  name: 'Item',
  props: {
    model: Object,
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      open: false // 展开
    }
  },
  computed: {
    isFolder: function () { //是否有子树
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style>

</style>
