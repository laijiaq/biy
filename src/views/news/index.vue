<template>
    <div class="news">
        <el-form label-width="80px" ref="formData" :model="formData">
            <el-form-item label="主标题" hide-required-asterisk>
                <el-input class="inpotW" v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input class="inpotW" v-model="formData.sc_title"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input class="inpotW" v-model="formData.author"></el-input>
            </el-form-item>
            <el-form-item label="正文">
                <quill-editor class="inpotW" v-model="formData.content"></quill-editor>
            </el-form-item>
            <el-form-item label="选择栏目">
                <el-select v-model="formData.column_id" placeholder="请选择栏目">
                    <el-option v-for="item in Ldata" :label="item.column" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <div class="button">
            <div class="box">
                <el-button type="primary" @click="saveHtml">保存草稿</el-button>
                <el-button type="primary" @click="release">发布上线 </el-button>
            </div>
        </div>

    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { addNews, searchColum } from "../../assets/api/login";
export default {
    components: {
        quillEditor
    },
    data() {
        return {

            formData: {
                title: '',
                sc_title: '',
                author: '',
                content: '',
                column_id: '',
            },
            Ldata: []
        }
    },
    methods: {
        // 草稿
        saveHtml() {
            const count = 2
            const userId = JSON.parse(localStorage.getItem('user')).id
            // console.log(this.formData)
            if (this.formData.title != '' && this.formData.author != '' && this.formData.content != '' && this.formData.column_id != '') {
                addNews({
                    userid: userId,
                    title: this.formData.title,
                    sc_title: this.formData.sc_title,
                    author: this.formData.author,
                    content: this.formData.content,
                    column_id: this.formData.column_id,
                    count: count
                }).then(res => {
                    if (res.data.status == 1) {
                        this.$message.success({
                            message: '保存成功',
                            center: true,
                            duration: 1000
                        })
                        // console.log(res);
                    }
                    this.formData = {}
                })
            }else{
                this.$message.error({
                    message: '请完善输入',
                    center: true,
                    duration: 1000
                })
            }

        },
        // 发布 
        release() {
            const count = 1
            const userId = JSON.parse(localStorage.getItem('user')).id
            if (this.formData.title != '' && this.formData.author != '' && this.formData.content != '' && this.formData.column_id != '') {
                // console.log(this.formData)
                addNews({
                    userid: userId,
                    title: this.formData.title,
                    sc_title: this.formData.sc_title,
                    author: this.formData.author,
                    content: this.formData.content,
                    column_id: this.formData.column_id,
                    count: count
                }).then(res => {
                    // console.log(res);
                    if (res.data.status == 1) {
                        this.$message.success({
                            message: '发布成功',
                            center: true,
                            duration: 1000
                        })
                    }

                    this.formData = {}
                })
            } else {
                this.$message.error({
                    message: '请完善输入',
                    center: true,
                    duration: 1000
                })
            }

        }
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'))
        searchColum({ userid: user.id }).then(res => {
            // console.log(res.data.data);
            this.Ldata = res.data.data;
        })
    }
}
</script >

<style lang="scss" scoped>
.inpotW {
    width: 800px;
}

.button {
    display: flex;
    justify-content: center;

    .box {
        width: 300px;
        display: flex;
        justify-content: space-around;
        margin-bottom: 50px;
    }

}
</style>