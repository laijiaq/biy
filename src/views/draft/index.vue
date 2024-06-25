<template>
  <div id="app">
    <el-table :data="draftData" border stripe style="width: 100%" empty-text>
      <el-table-column prop="id" label="ID" width="50" align="center">
      </el-table-column>
      <el-table-column prop="newsData.column_name=='栏目查询准备失败'?'':column_name" label="分类" width="150" align="center">
      </el-table-column>
      <el-table-column prop="title" label="主标题" width="180" align="center">
      </el-table-column>
      <el-table-column prop="sc_title" label="副标题" width="180" align="center">
      </el-table-column>
      <el-table-column prop="content" label="内容" align="center">
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { searchNews, delNews } from "../../assets/api/login";

export default {
  data() {
    return {
      draftData: [
      ]
    }
  },

  created() {
    this.getList()
  },

  mounted() {

  },

  methods: {
    getList() {
      const count = 2
      const userId = JSON.parse(localStorage.getItem('user')).id
      // console.log(userId);
      searchNews({
        userid: userId,
        count: count
      }).then(res => {
        this.draftData = res.data.data;
        console.log(res);
      })
    },
    handleDelete(scope, row) {
      delNews({
        id: row.id,
        count: 2
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