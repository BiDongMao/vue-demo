<template>
  <div class="mod-child-props">
    <h1>4.$attrs 和 $listeners</h1>
    子组件：<span>{{message}}</span>

    <div>
      $attrs:
      包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。
      当一个组件没有声明任何 prop 时，
      这里会包含所有父作用域的绑定 (class 和 style 除外)，
      并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。
    </div>

    <div>
      $listeners:包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。
      它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        message:''
      }
    },
    components:{

    },
    created(){
      console.log(this.$attrs, this.$listeners)
      this.message=this.$attrs.content03
      this.$listeners.two()
    },
    mounted () {

    },
    methods: {

    }
  }
</script>

<style lang="scss">

</style>
