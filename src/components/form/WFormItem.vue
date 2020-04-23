<template>
  <div>
    <label v-if="label"></label>
    <slot></slot>
    <p v-if="errormessage">{{errormessage}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject:['form'],
  props:{
    label:{
      type:String,
      default:''
    },
    prop:String
  },
  data(){
    return{
      errormessage:''
    }
  },
  mounted(){
    this.$on('validate',()=>{
      this.validate()
    })
  },
  methods:{
  validate(){
    const rules = this.form.rules[this.prop]
    const value = this.form.model[this.prop]
    const desc = {
      [this.prop]:rules
    }
    const schema = new Schema(desc)
    return schema.validate({[this.prop]:value},errors=>{
      if(errors){
        this.errormessage = errors[0].message
      }else{
        this.errormessage = ''
      }
    })
  }
  }
}
</script>

<style>

</style>
