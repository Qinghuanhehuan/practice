class Bus {
  constructor() { 
    this.callbacks={}
  }
  $emit(name,args) { 
    if (this.callbacks[name]) { 
      this.callbacks[name].forEach(cb => cb(args)) 
    }
  }
  $on(name,fn) {
    this.callbacks[name] = this.callbacks[name] || [] 
    this.callbacks[name].push(fn)
   }
}

Bus.install = function (Vue) {
  Vue.prototype.$bus = new Bus();
}

export default Bus
