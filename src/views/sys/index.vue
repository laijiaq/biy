<template>
    <div class="sys">
        <el-button @click="addinfo()">新增</el-button>
        <el-table :data="tableData" border fit style="width: 100%; margin-top: 10px;">
            <el-table-column align="center" type="index" width="100" label="序号">
            </el-table-column>
            <el-table-column align="center" prop="date" label="行业" >
            </el-table-column>
            <el-table-column align="center" prop="name" label="日期" >
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="新增行业分类" :visible.sync="centerDialogVisible" width="40%" center>

            <el-form :label-position="right" label-width="80px" :model="addIndustry">
                <el-form-item label="行业名称">
                    <el-input v-model="addIndustry.name"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData:[],
            centerDialogVisible:false,
            addIndustry:{
                name:''
            }
        }
    },
    methods:{
        handDelete(){

        },
        addinfo(){
            this.centerDialogVisible = true
        }
    }
}
</script>
<style>
    
</style>