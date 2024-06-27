<template>
  <div class="app">
    <div class="searc-BOx">
      <el-input placeholder="请输入内容" v-model="search">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="newsData" border stripe style="width: 100%"  >
      <el-table-column prop="id" label="ID" width="50" align="center">
      </el-table-column>
      <!-- <el-table-column prop="newsData.column_name=='栏目查询准备失败'?'':column_name" label="分类" width="150" align="center">
      </el-table-column> -->
      <el-table-column prop="title" label="主标题" width="180" align="center">
      </el-table-column>
      <el-table-column prop="sc_title" label="副标题" width="180" align="center">
      </el-table-column>
      <el-table-column    label="内容" align="center">
        <template slot-scope="scope">
          <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->

    <div class="elastic">
      <el-dialog title="新增行业分类" :visible.sync="centerDialogVisible" width="60%" center>

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
              <el-option v-for="(item,index) in Ldata" :label="item.column" :value="item.id" :key="'item'+index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="upData">确 定</el-button>
        </span>
      </el-dialog>
    </div>


  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { searchNews, upNews, delNews, searchColum } from "../../assets/api/login";
export default {
  components: {
    quillEditor
  },
  data() {

    return {
      centerDialogVisible: false,
      search: '',
      newsData: [],
      formData: {
        title: '',
        sc_title: '',
        author: '',
        content: '',
        column_id: '',
      },
      Ldata: [],
      id: '',
    }
  },

  created() {
    this.getList()

    const user = JSON.parse(localStorage.getItem('user'))
    searchColum({ userid: user.id }).then(res => {
      // console.log(res.data.data);
      this.Ldata = res.data.data;
    })
  },

  mounted() { },

  methods: {
    // 查询
    getList() {
      const count = 1
      const userId = JSON.parse(localStorage.getItem('user')).id
      console.log(userId);
      searchNews({
        userid: userId,
        count: count
      }).then(res => {
        this.newsData = res.data.data;
        // console.log(this.newsData);
      })
    },
    // 编辑
    handleEdit(index, row) {
      this.centerDialogVisible = true;
      this.formData = row
      this.id = row.id
    },
    // 确定修改
    upData() {

      const userId = JSON.parse(localStorage.getItem('user')).id
      if (this.formData.title != '' && this.formData.author != '' && this.formData.content != '' && this.formData.column_id != '') {
        upNews({
          id: this.id,
          title: this.formData.title,
          sc_title: this.formData.sc_title,
          author: this.formData.author,
          content: this.formData.content,
          column_id: this.formData.column_id,
          count: 1,
          userid: userId
        }).then((res) => {
          // console.log(res);
          if (res.data.status == 1) {
            this.centerDialogVisible = false
            this.getList()
            this.$message.success({
              message: '修改成功',
              center: true,
              duration: 1000
            })
          } else {
            this.$message.error({
              message: '修改失败',
              center: true,
              duration: 1000
            })
          }


        })

      } else {
        this.$message.error({
          message: '请填写完整',
          center: true,
          duration: 1000
        })
      }


    },
    // 删除
    handleDelete(scope, row) {
      // console.log(row);
      delNews({
        id: row.id,
        count: 1
      }).then(res => {
        console.log(res.data);
        if (res.data.status == 1) {
          this.$message.success({
            message: '删除成功',
            center: true,
            duration: 1000
          })
          this.getList()
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped></style>