<template>
  <div class="mod-home">
    <h1>vue整理归纳</h1>

    <div class="box">
      <div class="main">
        <div class="child">
          <p v-for="(item,index) in list" :key="index">{{index}}hahhahahahahha</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        list:[1,2,3,6,9,8,5,4,8,9,9,1,2,3,6,9,8,5,4,8,9,9,1,2,3,6,9,8,5,4,8,9,9,1,2,3,6,9,8,5,4,8,9,9]
      }
    }
  }
</script>

<style>
  .mod-home {
    line-height: 1.5;
  }
  .el-main{
    height: 100vh;
  }
  .box{
    height: 500px;
    overflow: hidden;
    background: #f00;
  }
  .main{
    height: 1000px;
    overflow: auto;
    background: #0f0;

  }
  .child{
    height: 2000px;
  }
  p{
    height: 50px;
  }
</style>

