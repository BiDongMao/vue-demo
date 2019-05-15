<template>
  <button :class="'i-button-size ' + size" :disabled="disabled" @click="handleClick">
    <slot name="icon"></slot>
    <slot>提交</slot>
  </button>
</template>
<script>
  // 判断参数是否是其中之一
  function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  }

  export default {
    props: {
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large', 'default'])
        },
        default: 'default'
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
    },
     methods: {
      handleClick (event) {
        console.log(111)
        this.$emit('on-click', event);
      }
    }
  }
</script>
