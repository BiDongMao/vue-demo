<template>
<!-- https://github.com/GavinZhuLei/vue-form-making -->
  <div class="mod-formMaking">
   <!-- <fm-making-form  preview generate-code generate-json>
    <template slot="action">
    </template>
  </fm-making-form> -->
  <fm-making-form
    :data="jsonData"
    :remote="remoteFuncs"
    :value="values"
    preview
    generate-code
    generate-json
    ref="generateForm">
</fm-making-form>
<el-button @click="getJson">获取</el-button>
  </div>
</template>

<script>
import {MakingForm} from 'form-making'
// Vue.component(MakingForm.name, MakingForm)
  export default {
    components:{
      MakingForm
    },
    data () {
        return {
            jsonData: {}, // 表单配置中生成的json数据
            values: {}, // 表单需要显示的表单数据

        }
    },
    methods: {
      remoteFuncs: {
                // 组件配置时配置的远端方法,保持和配置时输入的名称一致
                func_test (resolve) {
                  console.log(resolve)
                  // 模拟接口请求
                  // setTimeout(() => {
                  //   const options = [
                  //     {id: '1', name: '1111'},
                  //     {id: '2', name: '2222'},
                  //     {id: '3', name: '3333'}
                  //   ]

                  //   // 获取到的值和标签可以通过配置页远端配置
                  //   // 值:id  标签：name

                  //   resolve(options) // 将后端获取的数据放入回调函数中
                  // }, 2000)
                },
            },
       getJson() {
         console.log(this.jsonData)
         console.log(this.$refs.generateForm.getJSON())

            // // 调用此方法验证表单数据和获取表单数据
            // this.$refs.generateForm.getData().then(data => {
            //     // 数据校验成功
            //     console.log(data)
            //     // data 为获取的表单数据
            // }).catch(e => {
            //     // 数据校验失败
            // })
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
</style>

