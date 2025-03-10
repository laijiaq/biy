<template>
  <div class="table">

    <el-table :data="userData" border stripe style="width: 1200px" empty-text>
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="user" label="账号" width="260" align="center">
      </el-table-column>
      <el-table-column prop="role" label="角色" width="260" align="center">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="260" align="center">
      </el-table-column>
      <!-- <el-table-column prop="time" label="注册时间" align="center">
      </el-table-column> -->
      <el-table-column label="操作" width="368" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.user !='admin'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增行业分类 -->
    <el-dialog title="新增行业分类" :visible.sync="centerDialogVisible" width="40%" center>

      <el-form label-width="80px" :model="addIndustry">
          <el-form-item label="用户名">
              <el-input v-model="addIndustry.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input v-model="addIndustry.password" @input="checkAccountInput()"></el-input>
          </el-form-item>
          <el-form-item label="角色">
              <el-select v-model="addIndustry.role" placeholder="请选择">
                  <el-option label="管理员" value="1"></el-option>
                  <el-option label="普通用户" value="2"></el-option>
              </el-select>
          </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateuser(addIndustry)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {  selectuser , updateuser , deluser} from "../../assets/api/competion.js";
export default {
  data() {
    return {
      userData: [],
      centerDialogVisible:false,
      
      addIndustry: {
        username: '',
        password: '',
        role: ''
      }
    }
  },

  created() {
    selectuser().then(res => {
      if (res.data.status == '1') {
        this.userData = res.data.data;
      }
    })
    // 格式化数据
    this.addIndustry =  {
      id:'',
      username: '',
      password: '',
      role: ''
    }
   },

  methods: {
    handleEdit(scope, row) {
      console.log('编辑',scope);
      console.log('行',row);
      this.centerDialogVisible = true
      this.addIndustry.id = row.id
      this.addIndustry.username = row.username
      this.addIndustry.password = ''
      if(row.role == '普通用户'){
        this.addIndustry.role = '2'
      }else{
        this.addIndustry.role = '1'
      }
      
    },
    checkAccountInput(value){
        // 正则表达式：匹配中文字符
        const chinesePattern = /[\u4e00-\u9fa5]/g;
        
        // 去除输入中的所有中文字符
        const newValue = value.replace(chinesePattern, "");
        
        // 更新 `medel.account` 为去除中文后的值
        this.medel.account = newValue;
    },
    handleDelete(scope, row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deluser({
          id: row.id
        }).then(res => {
          if (res.data.status == 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getUser()
          }
        })
      })
      console.log('删除');
    },
    getUser(){
      selectuser().then(res => {
        if (res.data.status == '1') {
          this.userData = res.data.data;
        }
      })
    },
    // 修改
    updateuser(data){
      if(data.role == '1'){
        data.role = '管理员'
      }else{ 
        data.role = '普通用户'
      }
      updateuser(data).then(res =>{
        if(res.data.status == '1'){
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.getUser()
          this.centerDialogVisible = false
        }else{
          this.$message({
            type: 'error',
            message: '修改失败!'
          });
        }
      })
    }
  }
}
</script>


<style lang="scss" scoped></style>