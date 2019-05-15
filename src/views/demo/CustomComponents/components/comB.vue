<!-- component-b.vue -->
<template>
  <div>
    组件 B
  </div>
</template>
<script>
  import { findComponentUpward } from '@/utils/assist.js';

  export default {
    name: 'componentB',
    mounted () {
      console.log(1111)
      const comA = findComponentUpward(this, 'componentA');
      console.log(comA)

      if (comA) {
        console.log(comA.name);  // Aresn
        comA.sayHello();  // Hello, Vue.js
      }
    }
  }
</script>
