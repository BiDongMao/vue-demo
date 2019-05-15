<template>

    <div>
      <!-- 1 s -->
      <h4>
        $nextTick是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
      </h4>
      <div class="nextTick">
        <h5>1</h5>
            <div ref="msgDiv">{{msg}}</div>
            <button @click="changeMsg">
                Change the Message
            </button>
            <div>
              点击按钮之后，发现控制台中this.$nextTick()和setTimeout()都发生了改变

              可以发现this.$nextTick和setTimeout的效果是一样的，都是将回调方法放入异步队列中

              this.$nextTick是当dom发生变化更新后执行的回调。setTimeout只是一个异步延迟执行
            </div>
      </div>
      <!-- 1 e -->

      <!-- 2 s -->
      <h5>2</h5>
      <div>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
            <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column label="日期" width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip>
                </el-table-column>
            </el-table>

        </el-dialog>

        <div style="margin-top: 20px">
            <el-button @click="openDialog">打开弹框</el-button>
        </div>

      </div>
      <!-- 2 e -->

      <!-- 3 s -->
      <h5>3</h5>

        <ul>
            <li class="example" v-for="item in list1">{{item}}</li>
        </ul>
        <ul>
            <li class="example" v-for="item in list2">{{item}}</li>
        </ul>
        <ol>
            <li class="example" v-for="item in list3">{{item}}</li>
        </ol>
        <ol>
            <li class="example" v-for="item in list4">{{item}}</li>
        </ol>
        <ol>
            <li class="example" v-for="item in list5">{{item}}</li>
        </ol>
      <!-- 3 e -->



    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            list1: [],
            list2: [],
            list3: [],
            list4: [],
            list5: [],
             msg: "Hello Vue.",
             dialogVisible: false,
            tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
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
                multipleSelection: []
        }
    },
    created() {
        this.composeList12()
        this.composeList34()
        this.composeList5()
        this.$nextTick(function() {
            // DOM 更新了
            console.log('finished test ' + new Date().toString(),document.querySelectorAll('.example').length)
        })
    },
    methods: {
      changeMsg() {
            this.msg = "Hello World.";
            setTimeout(() => {
                console.log('setTimeout',this.$refs.msgDiv.innerHTML); // Hello World.
            }, 0);
            this.$nextTick(() => {
                console.log('nextTick',this.$refs.msgDiv.innerHTML); // Hello World.
            });
            console.log(this.$refs.msgDiv.innerHTML); // Hello Vue.(没有改变)
        },
      openDialog() {
                this.dialogVisible = true;
                // this.toggleSelection([this.tableData3[2],this.tableData3[3]])//报错
                this.$nextTick(()=>{
                  this.toggleSelection([this.tableData3[2],this.tableData3[3]])
                })

      },
      toggleSelection(rows) {
                this.$refs.multipleTable.clearSelection();
                if(rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                }
      },
        composeList12() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
                this.$set(me.list1, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list1 ' + new Date().toString(),document.querySelectorAll('.example').length)

            for (let i = 0; i < count; i++) {
                this.$set(me.list2, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list2 ' + new Date().toString(),document.querySelectorAll('.example').length)


            this.$nextTick(function() {
                // DOM 更新了
                console.log('finished tick1&2 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })
        },
        composeList34() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
                this.$set(me.list3, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list3 ' + new Date().toString(),document.querySelectorAll('.example').length)

            this.$nextTick(function() {
                // DOM 更新了
                console.log('finished tick3 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })

            setTimeout(me.setTimeout1, 0)
        },
        setTimeout1() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
                this.$set(me.list4, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list4 ' + new Date().toString(),document.querySelectorAll('.example').length)

            me.$nextTick(function() {
                // DOM 更新了
                console.log('finished tick4 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })
        },
        composeList5() {
            let me = this
            let count = 10000

            this.$nextTick(function() {
                // DOM 更新了
                console.log('finished tick5-1 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })

            setTimeout(me.setTimeout2, 0)
        },
        setTimeout2() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
                this.$set(me.list5, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list5 ' + new Date().toString(),document.querySelectorAll('.example').length)

            me.$nextTick(function() {
                // DOM 更新了
                console.log('finished tick5 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })
        },

    }
}
</script>
