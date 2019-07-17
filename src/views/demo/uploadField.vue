<template>
    <div>
        <el-form class="dl-form" :model="dataForm" :rules="dataRule" label-position="right" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px" >
            <!-- 图片上传 s -->
            <el-form-item class="label-lg"  label="图片" label-width="500px;" prop="imageList" style="margin-top:20px;"></el-form-item>
            <el-form-item label="">
            <el-upload
                :limit='5'
                :action="uploadUrl"
                list-type="picture-card"
                :file-list="oldImgs"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleOnSuccess"
                :headers="uploadHeaders"
                ref="upload">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            </el-form-item>
            <!-- 图片上传 e -->

            <!-- 文件上传下载 s -->
            <el-form-item label="附件上传：" prop="attachUrl"> 
                <div class="flex-fs">
                <el-upload
                    class="m-p-upload"
                    :action="uploadUrl"
                    :headers="uploadHeaders"
                    :on-remove="handleRemove2"
                    :before-remove="beforeRemove2"
                    :on-success="handleOnSuccess2"
                    :limit="1"
                    :file-list="fileList">
                    <el-button size="small" type="text" class="upload-btn" v-if='!dataForm.attachUrl'>点击上传</el-button>
                    <el-button size="small" type="text" class="upload-btn" v-else @click='reUpload'>重新上传</el-button>
                </el-upload>
                <el-button
                    size="small"
                    type="text"
                    class="download-btn"
                    @click="downloadAccessory"
                    v-if='dataForm.attachUrl'>
                    下载
                </el-button>
                </div>
            </el-form-item>
            <!-- 文件上传下载 e -->


        </el-form>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            dataForm:{
                imageList:[]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            oldImgs: [],
            // 图片上传
            uploadUrl: this.$http.adornUrl('/sys/oss/upload'),//上传地址
            uploadHeaders: {
                token: this.$cookie.get('token')
            },
           fileList:[],
            dataRule: {
                imageList: [
                    { required: true, message: '请上传图片', trigger: 'change' },
                ],
                attachUrl: [
                    { required: true, message: '请上传附件', trigger: 'change' },
                ],
            }
        }
    },
    created() {
        
    },
    mounted(){
       
    },
    methods: {
       // 图片选择上传s
    //    删除图片
        handleRemove (file, fileList) {
            this.dataForm.imageList = []
            fileList.forEach(item => {
                this.dataForm.imageList.push(item.url)
            })
        },
        // 预览图片
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        // 图片上传成功
        handleOnSuccess (response, file, fileList) {
            if (response.code === 0) {
                this.dataForm.imageList.push(response.url)
            }
        },
         // 图片选择上传e

        // 文件上传下载s
        handleRemove2 (file, fileList) {
            this.dataForm.attachUrl = ''
            this.fileList = []
            this.dataForm.checkAttachName = ''
        },
        beforeRemove2 (file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`)
        },
        handleOnSuccess2 (response, file, fileList) {
            if (response.code === 0) {
                this.dataForm.attachUrl = response.url
                this.dataForm.attachUrlName = file.name
                this.fileList = fileList
            }
        },
        // 重新上传
        reUpload () {
            this.dataForm.attachUrl = ''
            this.fileList = []
        },
        // 下载附件
        downloadAccessory () {
            var url = this.dataForm.attachUrl
            var $sz = /^((?!jpg|png|txt).)*$/
            if ($sz.test(url)) {
                window.location.href = this.dataForm.attachUrl//下载附件
            } else {
                window.open(this.dataForm.attachUrl)//新页面打开
            }
        }
        // 文件上传下载e


    }
}
</script>
