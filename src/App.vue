<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
import mixins_role from './mixins/role.js';

  export default {
    mixins: [mixins_role],
    provide(){
      return{
        app:this
      }
    },
    data(){
      return{
        userInfo:null
      }
    },
     methods: {
      getUserInfo () {
        // 这里通过 ajax 获取用户信息后，赋值给 this.userInfo，以下为伪代码
          this.userInfo = {name:'jack',age:10};

      }
    },
    mounted () {
      this.getUserInfo();
    }
  }
</script>
