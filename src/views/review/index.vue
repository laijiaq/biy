<template>
    <div class="sys">
        <el-table :data="comData" border fit style="width: 100%; margin-top: 10px;">
            <el-table-column align="center" type="index" width="100" label="序号">
            </el-table-column>
            <el-table-column align="center" prop="title" label="比赛标题">
            </el-table-column>
            <el-table-column align="center" prop="description" label="比赛描述">
            </el-table-column>
            <el-table-column align="center" prop="username" label="参赛者">
            </el-table-column>
            <el-table-column align="center" prop="status" label="当前状态">
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="agree(scope.row)">同意</el-button>
                    <el-button size="mini" type="danger" @click="reject(scope.row)">不同意</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>
<script>
import { updateparticipants , selectparticipants , selectconpetion , selectuser } from "../../assets/api/competion.js";
export default {
    data() {
        return {
            // search: '',
            tableData: [],
            // centerDialogVisible: false,
            // upDialogVisible: false,
            addIndustry: {
                name: ''
            },
            comData: []
            // upIndustry: {
            //     name: ''
            // }
        }
    },
    methods: {
        agree(scope){
            
            updateparticipants({
                id: scope.participant_id,
                status: 'accepted'
            }).then(res => {
                if(res.data.status == '1'){
                    this.$message.success({
                        message: '操作成功',
                        center: true,
                        duration: 1000
                    })
                    this.getComData()
                }else{
                    this.$message.error({
                        message: '操作失败',
                        center: true,
                        duration: 1000
                    })
                }
            }).catch(err => {
            })
        },
        reject(scope){
            updateparticipants({
                id: scope.participant_id,
                status: 'rejected'
            }).then(res => {
                if(res.data.status == '1'){
                    this.$message.success({
                        message: '操作成功',
                        center: true,
                        duration: 1000
                    })
                    this.getComData()
                }else{
                    this.$message.error({})
                }
            })
        },
        getComData() {
            selectparticipants().then(res => {
                const that = this;
                if (res.data.status == '1') {
                    const data = res.data.data;

                    // 使用 Promise.all 来处理多个异步请求
                    const promises = data.map(item => {
                        return Promise.all([
                            selectconpetion(item.competition_id),
                            selectuser({ user_id: item.user_id })
                        ])
                        .then(([competitionResponse, userResponse]) => {
                            if (competitionResponse.data.status == '1') {
                                const page = competitionResponse.data.data[0];
                                item.title = page.title;
                                item.description = page.description;
                                item.start_time = page.start_time;
                            }

                            if (userResponse.data.status == '1') {
                                const user = userResponse.data.data[0];
                                item.username = user.username;
                            }

                            // 使用 Vue.set() 来确保更新的响应式
                            that.$set(that.comData, data.indexOf(item), item);
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                    });

                    // 等待所有请求完成后再更新 comData
                    Promise.all(promises).then(() => {
                        that.comData = data;  // 赋值给 comData，确保渲染时数据已经更新
                    });
                }
            });
        }

    },

    created() {
        this.getComData()
    }

}
</script>
<style>
</style>