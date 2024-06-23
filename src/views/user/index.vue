<template>
  <div class="table">

    <el-table :data="userData" border stripe style="width: 100%" empty-text>
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="number" label="账号" width="180" align="center">
      </el-table-column>
      <el-table-column prop="role" label="角色" width="180" align="center">
      </el-table-column>
      <el-table-column prop="time" label="注册时间" align="center">
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: []
    }
  },

  created() { },

  mounted() { },

  methods: {
    handleEdit(scope, row) {
      console.log('编辑');
    },
    handleDelete(scope, row) {
      console.log('删除');
    }
  }
}
</script>


<style lang="scss" scoped></style>