export default {
  data () {
    return {
      roleInfo: null
    }
  },
  methods: {
    getRoleInfo () {
      // 这里通过 ajax 获取用户信息后，赋值给 this.roleInfo，以下为伪代码
      this.roleInfo = { type: "管理员" }
    }
  },
  mounted () {
    this.getRoleInfo()
  }
}
