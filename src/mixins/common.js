import Cookies from 'js-cookie'
import qs from 'qs'
export default {
  data () {
    /* eslint-disable */
    return {
      // 设置属性
      mixinViewModuleOptions: {
        activatedIsNeed: true,    // 此页面是否在激活（进入）时，调用查询数据列表接口？
        getDataListURL: '',       // 数据列表接口，API地址
        getDataListIsPage: false, // 数据列表接口，是否需要分页？
        deleteURL: '',            // 删除接口，API地址
        deleteMethod:'post',      // 删除接口方法
        deleteIsBatch: false,     // 删除接口，是否需要批量？
        deleteIsBatchKey: 'id',   // 删除接口，批量状态下由那个key进行标记操作？比如：pid，uid...
        exportURL: ''             // 导出接口，API地址
      },
      // 默认属性
      dataForm: {},               // 查询条件
      dataList: [],               // 数据列表
      order: '',                  // 排序，asc／desc
      orderField: '',             // 排序，字段
      pageIndex: 1,                    // 当前页码
      pageSize: 10,                  // 每页数
      totalPage: 0,                   // 总条数
      dataListLoading: false,     // 数据列表，loading状态
      dataListSelections: [],     // 数据列表，多选项
      addOrUpdateVisible: false   // 新增／更新，弹窗visible状态
    }
    /* eslint-enable */
  },
  activated () {
    if (this.mixinViewModuleOptions.activatedIsNeed) {
      this.getDataList()
    }
  },
  methods: {
    // 获取数据列表
    getDataList (page) {
      this.dataListLoading = true
      this.pageIndex=page?page:this.pageIndex
      this.$http({
        url: this.$http.adornUrl(this.mixinViewModuleOptions.getDataListURL,),
        method: 'get',
        params: this.$http.adornParams({
          page: this.mixinViewModuleOptions.getDataListIsPage ? this.pageIndex: null,
          limit: this.mixinViewModuleOptions.getDataListIsPage ? this.pageSize : null,
          ...this.dataForm
        })
      }).then(({data}) => {
        this.dataListLoading = false
        if (data.code !== 0) {
          this.dataList = []
          this.totalPage = 0
          return this.$message.error(data.msg)
        }
        this.dataList = this.mixinViewModuleOptions.getDataListIsPage ? data.page.list : data.list
        this.totalPage = this.mixinViewModuleOptions.getDataListIsPage ? data.page.totalCount : 0
      }).catch(() => {
        this.dataListLoading = false
      })
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 排序
    dataListSortChangeHandle (data) {
      if (!data.order || !data.prop) {
        this.order = ''
        this.orderField = ''
        return false
      }
      this.order = data.order.replace(/ending$/, '')
      this.orderField = data.prop.replace(/([A-Z])/g, '_$1').toLowerCase()
      this.getDataList()
    },
    // 分页, 每页条数
    sizeChangeHandle (val) {
      this.pageIndex = 1
      this.pageSize = val
      this.getDataList()
    },
    // 分页, 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.dataForm.id = id
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
      var Ids = id ? [id] : this.dataListSelections.map(item => {
        return item[this.mixinViewModuleOptions.deleteIsBatchKey]
      })
      this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl(this.mixinViewModuleOptions.deleteURL),
          method: this.mixinViewModuleOptions.deleteMethod,
          data: this.$http.adornData(Ids, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.pageIndex = 1
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 导出
    exportHandle () {
      var params = qs.stringify({
        'token': Cookies.get('token'),
        ...this.dataForm
      })
      window.location.href = `${window.SITE_CONFIG['apiURL']}${this.mixinViewModuleOptions.exportURL}?${params}`
    }
  }
}
