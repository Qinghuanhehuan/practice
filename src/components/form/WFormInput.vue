<template>
  <div>
    <input :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
import emmiter from '@/mixins/emmiter'
export default {
  inheritAttrs:false,
  mixins:[emmiter],
  props:{
    value:{
      type:String,
      default:''
    }
  },
  methods: {
    onInput(e){
      this.$emit('input',e.target.value)

      // this.$parent.$emit('validate')
      this.dispatch('validate')
    }
  }
}
</script>

<style>

</style>

