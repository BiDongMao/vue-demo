<template>
    <div>
        <h3>其实问题关键就在于如何给el-form-item动态绑定prop :prop="'tableData.' + scope.$index + '.字段名'"</h3>
        <el-form :model="dataForm" :inline="true" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
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
                            <el-input v-model="scope.row.address" placeholder="请输入地址"   style="width:400px;"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            dataForm:{
                dataList:[]
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
     

    }
}
</script>
