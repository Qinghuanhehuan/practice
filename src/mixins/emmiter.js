export default{
  methods: {
    dispatch(eventName, data) {
      let parent = this.$parent
      while (parent) {
        parent.$emit(eventName, data)
        // 递归查找父元素
        parent = parent.$parent
      }
    },

    boardcast(eventName, data) {
      boardcast.call(this, eventName, data)
    }
  }
}
function boardcast(eventName, data) {
  this.$children.forEach(child => {
    child.$emit(eventName, data)
    if (this.$children.length) {
      // 递归调用，通过call修改this指向child
      boardcast.call(this, eventName, data)
    }
  })
}
