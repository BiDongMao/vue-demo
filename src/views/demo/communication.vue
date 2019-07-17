<template>
  <div class="mod-demo-communication">

    父组件：<el-button @click="changeMessage">改变message值</el-button>
    <child-props  :content01="message" content02="form parent 静态值"/>

    <child-emit @listenChildData='getData' />
    <div>父组件：{{childMessage}}</div>

    <child-sync  :name.sync="userName"/>
    <h3>父组件：{{userName}}</h3>

    <child-attrs  :content03="message"  @one.native="triggerOne" @two="triggerTwo"/>



  </div>
</template>

<script>
import ChildProps from './components/child-props'
import ChildEmit from './components/child-emit'
import ChildSync from './components/child-sync'
import ChildAttrs from './components/child-attrs'



  export default {
    data () {
      return {
        message:'from parent 动态值',
        childMessage:'',
        userName:'3333'

      }
    },
    components:{
      ChildProps,
      ChildEmit,
      ChildSync,
      ChildAttrs
    },
    created(){

    },
    mounted () {

    },
    methods: {
      changeMessage(){
        this.message+="改变"
      },
      // 监听子组件传过来的参数
      getData(val){
        this.childMessage=val

      },

      triggerOne () {
        alert('父组件的方法--one在子组件中调用')
      },
      triggerTwo () {
        alert('父组件的方法--two在子组件中调用')
      }
    }
  }
</script>

<style lang="scss">

</style>
