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
            <el-table-column align="center" prop="column" label="分类">
            </el-table-column>
            <el-table-column align="center" prop="name" label="操作人">
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="upData(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增行业分类 -->
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

        <!-- 修改行业分类 -->
        <el-dialog title="修改行业分类" :visible.sync="upDialogVisible" width="40%" center>

            <el-form label-width="80px" :model="upIndustry">
                <el-form-item label="行业名称">
                    <el-input v-model="upIndustry.name"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="upDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="up">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { addcolum, searchColum, upColum, delColum } from "../../assets/api/login.js";
export default {
    data() {
        return {
            // search: '',
            tableData: [],
            centerDialogVisible: false,
            upDialogVisible: false,
            addIndustry: {
                name: ''
            },
            upIndustry: {
                name: ''
            }
        }
    },
    methods: {
        // 删除行业分类
        handDelete(row) {
            console.log(row);
            delColum({ id: row.id }).then(res => {
                console.log(res);
            })
            this.getList()
            this.$message({
                message: '删除成功',
                type:'success',
                duration: '1000'
            });
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
                    this.getList()
                } else {
                    this.$message({
                        message: '添加失败',
                        type: 'error',
                        duration: '1000'
                    });
                }
            })
        },
        // 修改弹窗
        upData(index, row) {
            this.upDialogVisible = true
            // console.log(index, row);
            localStorage.setItem('dataID', row.id)
            this.upIndustry.name = row.column
        },
        // 确定修改分类 
        up() {
            const user = JSON.parse(localStorage.getItem('user'))
            const id = localStorage.getItem('dataID')
            // console.log(id);
            upColum({
                id: id,
                name: user.username,
                column: this.upIndustry.name
            }).then(res => {
                console.log(res);
                this.getList()
            })
            this.upDialogVisible = false
        },
        // 获取列表
        getList() {
            const user = JSON.parse(localStorage.getItem('user'))
            searchColum({ userid: user.id }).then(res => {
                this.tableData = res.data.data;
                console.log(this.tableData);
            })
        }

    },

    created() {
        this.getList()
    }

}
</script>
<style>
/* .searc-BOx {
    width: 250px;
} */
</style>