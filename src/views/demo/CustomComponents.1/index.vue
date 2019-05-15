<template>
  <div>
    <i-button size="large" @click.native="handleClick">
      <!-- <i-icon slot="icon" type="checkmark"></i-icon> -->
      按钮1
    </i-button>
    <i-button disabled>按钮2</i-button>
    <i-button size="small"></i-button>

  </div>
</template>
<script>
 import IButton from './components/i-button'
 import { mapState } from 'vuex'
 export default {
   components:{
     IButton
   },
   mounted(){
     console.log(mapState)
   },
   methods: {
      handleClick () {
        console.log(222)

      }
    }
 }
</script>
