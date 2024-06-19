<template>
    <div class="news">
        <el-form label-width="80px" :model="formData" >
            <el-form-item label="主标题" hide-required-asterisk>
                <el-input class="inpotW" v-model="formData.Maintitle"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input class="inpotW" v-model="formData.Subtitle"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input class="inpotW" v-model="formData.author"></el-input>
            </el-form-item>
            <el-form-item label="正文">
                <quill-editor class="inpotW" v-model="content"></quill-editor>
            </el-form-item>
        </el-form>

       

        <el-form label-width="80px" :model="formData">
            <el-form-item label="选择栏目">
                <el-select v-model="formData.region" placeholder="请选择栏目">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="button">
            <div class="box">
                <el-button type="primary" @click="saveHtml">保存草稿</el-button>
                <el-button type="primary">发布上线 </el-button>
            </div>
        </div>

    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
export default {
    components: {
        quillEditor
    },
    data() {
        return {
            content: '',
            formData: {
                Maintitle: '',
                Subtitle: '',
                author: '',
                region: ''
            }
        }
    },
    methods: {
        saveHtml() {
            console.log(this.content)
        }
    }
}
</script >

<style lang="scss" scoped>
.inpotW{
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