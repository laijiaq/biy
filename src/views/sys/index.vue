<template>
    <div class="sys">

        <el-button @click="addinfo()">新增</el-button>
        <!-- <div class="searc-BOx">
            <el-input placeholder="请输入内容" v-model="search">
                <el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
            </el-input>
        </div> -->
        <el-table :data="tableData" border fit style="width: 100%; margin-top: 10px;">
            <el-table-column align="center" type="index" width="100" label="序号">
            </el-table-column>
            <el-table-column align="center" prop="date" label="分类">
            </el-table-column>
            <el-table-column align="center" prop="name" label="操作人">
            </el-table-column>
            <el-table-column align="center" prop="date" label="日期">
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增行业分类" :visible.sync="centerDialogVisible" width="40%" center>

            <el-form label-width="80px" :model="addIndustry">
                <el-form-item label="行业名称">
                    <el-input v-model="addIndustry.name"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { addcolum, searchColum } from "../../assets/api/login.js";
export default {
    data() {
        return {
            // search: '',
            tableData: [],
            centerDialogVisible: false,
            addIndustry: {
                name: ''
            }
        }
    },
    methods: {
        handDelete() {

        },
        // 点击显示弹窗
        addinfo() {
            this.centerDialogVisible = true
        },
        // 添加行业分类
        add() {
            const user = JSON.parse(localStorage.getItem('user'))
            this.centerDialogVisible = false
            // console.log(user,this.addIndustry.name);

            addcolum({
                userid: user.id,
                username: user.username,
                column: this.addIndustry.name
            }).then(res => {
                console.log(res);
                if (res.data.status == '1') {
                    this.$message({
                        message: '添加成功',
                        type: 'success',
                        duration: '1000'
                    });
                    this.addIndustry.name = ''
                } else {
                    this.$message({
                        message: '添加失败',
                        type: 'error',
                        duration: '1000'
                    });
                }
            })
        },

    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'))
        // console.log(user.id);
        searchColum({ userid:user.id}).then(res => {
            console.log(res);
        })
    }

}
</script>
<style>
/* .searc-BOx {
    width: 250px;
} */
</style>