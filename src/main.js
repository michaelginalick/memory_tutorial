((() => {
  const Vue = window.Vue

  // extend event bus instance onto the Vue prototype
  Vue.prototype.$bus = new Vue()

  new Vue({
    el: '#app',
    store: window.store
  })
}))()
