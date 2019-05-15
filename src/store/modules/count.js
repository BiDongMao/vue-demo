
export default {
  namespaced: true,
  state: {
    count: 1
  },
  mutations: {
    jia (state) {
      state.count ++
    },
    jian (state) {
      state.count --
    }
  },
  getters: {
    count (state) {
      return state.count + 66
    }
  },
  // 异步状态

  actions: {
    jiaplus (context) {
      context.commit('jia')  //调用mutations下面的方法
      setTimeout( () => {
        context.commit('jian')
      }, 2000)
      alert('我先被执行了，然后两秒后调用jian的方法')
    },
    jianplus (context) {
      context.commit('jian')
    }
 }
}
