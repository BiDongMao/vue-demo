<template>
    <div id="printContent">
        <h3>1.安装print-js插件 cnpm install --save print-js</h3>
        <el-form :model="dataForm" :inline="true" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px" style="width: 100%">
             <el-form-item>
                <el-button type="primary" @click="printHandle()">打印</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="exportExcel()">导出</el-button>
              </el-form-item>
             <el-table ref="multipleTable" :data="dataForm.dataList" border  style="width: 100%">
                <el-table-column label="日期" width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" >
                    <template slot-scope="scope">
                        <el-form-item :prop="'dataList.' + scope.$index + '.name'" :rules='dataRule.name'>
                        <el-input v-model="scope.row.name" placeholder="请输入姓名"  style="width:200px;" ></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址" >
                     <template slot-scope="scope">
                        <el-form-item :prop="'dataList.' + scope.$index + '.address'" :rules='dataRule.address' >
                            <el-input v-model="scope.row.address" placeholder="请输入地址"   style="width:300px;"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </div>
</template>
<script type="text/javascript">
import Print from 'print-js'

export default {
    data() {
        return {
            dataForm:{
                dataList:[]
            },
            searchForm:{//搜索条件

            },
            tableData: [{
                    date: '2016-05-03',
                    name: '',
                    address: ''
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
            dataRule: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ]
            }
        }
    },
    created() {
        
    },
    mounted(){
        this.dataForm.dataList=this.tableData
    },
    methods: {
         // 打印
    printHandle () {
      setTimeout(function () {
        Print({
          printable: 'printContent',
          type: 'html',
        // 继承原来的所有样式
          targetStyles: ['*'],
          documentTitle: `打印标题`,
          maxWidth: 780, // 695:A4有边距 //780：A4无边距
          font_size: 12
        })
      }, 500)
    },
    // 导出
    exportExcel(){
     let params = {}
      for (let key in this.searchForm) {
        // if (
        //   key === 'createDate' &&
        //   this.searchForm[key] &&
        //   this.searchForm[key].length > 0
        // ) {
        //   params.startDate = this.searchForm[key][0]
        //   params.endDate = this.searchForm[key][1]
        // } else {
        //   params[key] = this.searchForm[key]
        // }
      }
      this.downLoadExcel('/contract/export', params)
    },

    }
}
</script>
<style>
#printContent{
    width: 780px;
}
</style>

