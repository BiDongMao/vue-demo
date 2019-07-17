<template>
  <div class="mod-vue-neditor-wrap">
      <h3>地址：https://github.com/caiya/vue-neditor-wrap</h3>
      <h3>1.cnpm i vue-neditor-wrap</h3>
      <h3>2.下载<a href="https://www.notadd.com/download/neditor/Neditor-next-master.tar.xz" rel="nofollow">官方资源文件</a>下载完成后放在最外层，命名为NEditor的文件夹下</h3>
      <h3>3.引入VueNeditorWrap组件 import VueNeditorWrap from 'vue-neditor-wrap'</h3>
      <p>注：将build/webpack.base.conf.js中的 // ueditor: 'UE'注释掉，index.html中引用ueditor的注释掉</p>
     <vue-neditor-wrap v-model="content" :config="myConfig" :destroy="false" @ready="ready"></vue-neditor-wrap>
  </div>
</template>

<script>
import VueNeditorWrap from 'vue-neditor-wrap'
  export default {
    data () {
        return {
            myConfig: {
                // 如果需要上传功能,找后端小伙伴要服务器接口地址
                serverUrl: this.$http.adornUrl(`/sys/oss/upload`) + '?token=' + this.$cookie.get('token'),
                // 你的UEditor资源存放的路径,相对于打包后的index.html
                UEDITOR_HOME_URL: '/NEditor/',
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 300,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 关闭自动保存
                enableAutoSave: true
            },
            content: '',
        }
    },
    components: {
        VueNeditorWrap
    },
    mounted () {
      
    },
    methods: {
      ready (val) {
          console.log(val)
      }
    }
  }
</script>

<style lang="scss">
 
</style>
