<template>
  <div class="mod-child-props">
    <h1>3. .sync 修饰符(实现双向数据绑定)</h1>
    子组件：<el-input v-model="text" ></el-input>

    <div>说明：在 vue@1.x 的时候曾作为双向绑定功能存在，
      即子组件可以修改父组件中的值。
      因为它违反了单向数据流的设计理念，
      所以在 vue@2.0 的时候被干掉了。
      但是在 vue@2.3.0+ 以上版本又重新引入了这个 .sync 修饰符。
      但是这次它只是作为一个编译时的语法糖存在。
      它会被扩展为一个自动更新父组件属性的 v-on 监听器。
      说白了就是让我们手动进行更新父组件中的值了，
      从而使数据改动来源更加的明显。</div>

  </div>
</template>

<script>
  export default {
    props:{
      name:[String]
    },
    watch: {
      text (newVal) {
        this.$emit('update:name', newVal)
      }
    },
    data () {
      return {
        text:''
      }
    },
    components:{

    },
    mounted () {

    },
    methods: {
      // changeName(){
      //   this.$emit("update:name",this.name)
      // },
    }
  }
</script>

<style lang="scss">

</style>
