<template>
  <div class="mod-child-props">
    <h1>2.$emit(子组件传参数到父组件)</h1>
    子组件：<el-button @click="changeData" type="info">改变childMessage值</el-button>

    <div>说明：英式发音：[iˈmɪt]。官方说法是触发当前实例上的事件。附加参数都会传给监听器回调</div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        message:'from Child '
      }
    },
    components:{

    },
    mounted () {

    },
    methods: {
      changeData(){
        this.message+="改变"
        // this.$emit("listenChildData",this.message)
        // this.$listeners.listenChildData()
        console.log(this.$parent)
        this.$parent.getData(this.message)

      },
    }
  }
</script>

<style lang="scss">

</style>
