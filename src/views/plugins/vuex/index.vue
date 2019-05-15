<template>

 <div class="hello">

   <h1>Hello Vuex</h1>

   <h5>{{count}}</h5>

   <p>
    <button @click="jia">+</button>
    <button @click="jian">-</button>
   </p>

    <p>

    <button @click="jiaplus">+plus</button>

    <button @click="jianplus">-plus</button>

   </p>
   <!-- <div>{{msg}}</div> -->
   <div>
     `The first line
              A second line
              Then a third line`
   </div>
 </div>

</template>

<script>
import {mapState , mapMutations , mapGetters , mapActions} from 'vuex'

export default{

  name:'hello', //写上name的作用是，如果你页面报错了，他会提示你是那个页面报的错，很实用
  data(){
    return{
      msg
    }
  },
  mounted(){
    console.log(this.count)
    console.log(this.$store.getters)
    this.msg=`The first line
              A second line
              Then a third line`
  },
  methods:{

   ...mapMutations('count',[

     'jia',

     'jian'

   ]),
    // 换一中方式触发方法 用对象的方式
   ...mapActions({

    jiaplus: 'count/jiaplus',

    jianplus: 'count/jianplus'

   }),


  },

  // 方法一

  // computed: {

  //  count(){

  //   return this.$store.state.count + 6

  //  }

  // }



  // 方法二 需要引入外部 mapState

  computed:
  // mapState({

  //  count:state => state.count.count + 10

  // }),


   {
     ...mapGetters({
     count:'count/count'
    })
   }



  // ECMA5用法

  // computed:mapState({

  //  count:function(state){

  //   return state.count

  //  }

  // })



  //方法三

  // computed: mapState([

  //  'count'

  // ])

 }
</script>




<!-- 加上scoped是css只在这个组件里面生效，为了不影响全局样式 -->

<style scoped>

  h5{

   font-size: 20px;

   color: red;

  }

</style>
