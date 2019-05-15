<template>
  <div>
    <i-button size="large" @click.native="handleClick">
      <!-- <i-icon slot="icon" type="checkmark"></i-icon> -->
      按钮1
    </i-button>
    <i-button disabled>按钮2</i-button>
    <i-button size="small"></i-button>
    <div>{{app.userInfo.name}} : {{app.userInfo.age}}  {{app.roleInfo.type}}</div>


    <br>
    <br>
    <component-b></component-b>




    <h3>动态渲染 .vue 文件的组件—— Display</h3>
    <i-display :code="code"></i-display>
  </div>
</template>
<script>
 import IButton from './components/i-button'
 import componentB from './components/comB.vue';
 import { mapState } from 'vuex'

 import iDisplay from './components/display/display.vue';
 import defaultCode from './default-code.js';

 export default {
   name:'componentA',
   components:{
     IButton,
     componentB,
     iDisplay
   },
   inject:['app'],
   data(){
     return{
       name:'index',
       code:defaultCode
     }
   },
   mounted(){
    //  console.log(mapState)

     this.app.userInfo={name:'rose',age:20}
    //  console.log(this.app)
   },
   methods: {
      handleClick () {
        console.log(222)

      },
       sayHello () {
        console.log('Hello, Vue.js');
      }
    }
 }
</script>
