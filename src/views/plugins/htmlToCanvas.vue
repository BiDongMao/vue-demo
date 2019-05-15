<template>
  <div class="mod-html2canvas">
    <h1>html转换成图片</h1>
    <div class="imageWrapper" ref="imageWrapper">
     <h2>转换后图片：</h2>
      <img class="real_pic" :src="dataURL" />
      <h2>html内容：</h2>
      <slot>
        <table-html></table-html>
      </slot>
    </div>
    <br>
    <button @click="toImage">转换</button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import TableHtml from '@/views/modules/sys/user'


  export default {
    data() {
      return {
        dataURL: ''
      }
    },
    components:{
      TableHtml
    },
    mounted(){
      console.log(this)
    },
    methods: {

      toImage() {
        html2canvas(this.$refs.imageWrapper,{
          backgroundColor: null
        }).then((canvas) => {
          let dataURL = canvas.toDataURL("image/png");
          this.dataURL = dataURL;
        });
      }
    },
  }
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
  .el-main{
    height: 100vh;
  }
</style>

