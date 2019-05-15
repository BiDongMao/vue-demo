<template>
  <div class="mod-child-props">
    <h1>1.props(单向接受来自父组件的参数)</h1>

    <p>子组件：{{content01}}</p>
    <p>子组件：{{content02}}</p>

    <div>说明：英式发音：[prɒp]。这个在我们日常开发当中用到的非常多。
      简单来说，我们可以通过 Prop 向子组件传递数据。用一个形象的比喻来说，
      父子组件之间的数据传递相当于自上而下的下水管子，
      只能从上往下流，
      不能逆流。这也正是 Vue 的设计理念之单向数据流。
      而 Prop 正是管道与管道之间的一个衔接口，这样水（数据）才能往下流</div>

  </div>
</template>

<script>
  export default {
    props:{
      content01:[String],
      content02:[String],

    },
    data () {
      return {

      }
    },
    components:{

    },
    mounted () {

    },
    methods: {

    }
  }
</script>

<style lang="scss">

</style>
