<template>
  <div id="app">
    <div class="searc-BOx">
      <el-input placeholder="请输入内容" v-model="search" >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table :data="newsData" border stripe style="width: 100%" empty-text>
      <el-table-column prop="ID" label="ID" width="50" align="center">
      </el-table-column>
      <el-table-column prop="number" label="发布人" width="180" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180" align="center">
      </el-table-column>
      <el-table-column prop="time" label="新闻内容" align="center">
      </el-table-column>
      <el-table-column prop="role" label="发布时间" width="180" align="center">
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
      search:'',
      newsData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
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


<style lang="scss" scoped>
.searc-BOx{
  width: 250px;
}
</style>