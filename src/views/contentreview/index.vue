<template>
    <div class="sys">
        <el-table :data="comData" border fit style="width: 100%; margin-top: 10px;">
            <el-table-column align="center" type="index" width="100" label="序号">
            </el-table-column>
            <el-table-column align="center" prop="title" label="比赛标题">
            </el-table-column>
            <el-table-column align="center" prop="description" label="比赛描述">
            </el-table-column>
            <el-table-column align="center" prop="created_by_username" label="比赛创建者">
            </el-table-column>
            <el-table-column align="center" prop="review_stu" label="当前审批状态">
                <template slot-scope="scope">
                    {{scope.row.review_stu == 'accepted' ? '已通过' : scope.row.review_stu == 'rejected' ? '未通过' : '未审批'}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="status" label="是否启用">
                <template slot-scope="scope">
                    {{scope.row.status == '1' ? '启用' : '禁用'}}
                </template>
            </el-table-column>
            <el-table-column align="center" prop="start_date" label="比赛开始时间"> </el-table-column>
            <el-table-column align="center" prop="end_date" label="比赛结束时间"> </el-table-column>
            <el-table-column align="center" label="操作" width="250">
                <template slot-scope="scope">
                    
                    <el-button size="mini" type="primary" @click="ConPage(scope.row)">审批</el-button>
                    <el-button size="mini" type="primary" @click="upContent(scope.row)">修改</el-button>
                    <el-button size="mini" type="danger" @click="delcompetion(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="审批" :visible.sync="centerDialogVisible" width="30%">
            <el-form  label-width="80px">
                <el-form-item label="审批意见">
                    <el-button size="mini" @click="agree(review_date)">同意</el-button>
                    <el-button size="mini" type="danger" @click="reject(review_date)">不同意</el-button>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false;review_date = ''">取 消</el-button>
                <!-- <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button> -->
            </span>
        </el-dialog>
        <el-dialog title="比赛内容" :visible.sync="upDialogVisible" width="60%">
            <el-form ref="form" :model="upIndustry" label-width="80px" style="max-width: 1200px;">
                <el-form-item label="比赛标题">
                    <el-input v-model="upIndustry.title"></el-input>
                </el-form-item>
                <el-form-item label="比赛时间">
                    <el-date-picker
                        v-model="times"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                
                <el-form-item label="是否启用">
                    <el-switch v-model="upIndustry.status"></el-switch>
                </el-form-item>
                <el-form-item label="比赛描述">
                    <el-input type="textarea" v-model="upIndustry.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <!-- <el-button type="primary" @click="onSubmit">立即创建</el-button> -->
                     <el-button type="primary" @click="updatecontent(upIndustry)">修改</el-button>
                    <el-button @click="Calcontent()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { updatereviewcontent , updatecontent , selectconpetion  , delcompetion  } from "../../assets/api/competion.js";
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
            comData: [],
            review_date:'',
            upIndustry: {
                title: '', // 比赛名称
                start_date:'', // 比赛开始时间
                end_date:'', // 比赛结束时间
                description: '', // 描述
                status:false, // 是否启用
                competition_id: '',
                userid: JSON.parse(localStorage.getItem("user")).id, // 创建人
                username: JSON.parse(localStorage.getItem("user")).username,    // 创建人
            },
            times: ''
            
        }
    },

    created() {

        this.getcontent()
    },
    methods: {
        agree(scope){
            
            updatereviewcontent({
                competition_id: scope.competition_id,
                review_stu: 'accepted'
            }).then(res => {
                if(res.data.status == '1'){
                    this.$message.success({
                        message: '操作成功',
                        center: true,
                        duration: 1000
                    })
                    this.getcontent()
                    this.centerDialogVisible = false
                }else{
                    this.$message.error({
                        message: res.data.message,
                        center: true,
                        duration: 1000
                    })
                }
            }).catch(err => {
            })
        },
        // 查询比赛
        getcontent(){
            selectconpetion().then(res =>{
                if(res.data.status == '1'){
                    this.comData = res.data.data
                    console.log('res',res.data.data);
                    
                }
            })
        },
        delcompetion(row){
            this.$confirm('确定删除当前比赛信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delcompetion({
                    competition_id:row.competition_id
                }).then(res=>{
                    if(res.data.status == 1){
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            duration:'1000'
                        });
                        const index = this.comData.findIndex(item => item.competition_id === row.competition_id);
                        if (index !== -1) {
                            this.comData.splice(index, 1);
                        }
                    }
                }).catch(error => {
                    console.error("删除失败", error);
                    this.$message({
                        message: '删除失败',
                        type: 'error',
                        duration: 1000
                    });
                });
            }).catch(() => {
            });
            

        },
        reject(scope){
            updatereviewcontent({
                competition_id: scope.competition_id,
                review_stu: 'rejected'
            }).then(res => {
                if(res.data.status == '1'){
                    this.$message.success({
                        message: '操作成功',
                        center: true,
                        duration: 1000
                    })
                    this.getcontent()
                    this.centerDialogVisible = false
                }else{
                    this.$message.error({})
                }
            })
        },
        ConPage(row){
            this.centerDialogVisible = true
            
            this.review_date = row
        },
        upContent(scope){
            this.upDialogVisible = true
            this.upIndustry.title = scope.title
            this.upIndustry.start_date = scope.start_date
            this.upIndustry.end_date = scope.end_date
            this.upIndustry.description = scope.description
            this.upIndustry.competition_id = scope.competition_id
            this.upIndustry.status = scope.status == '1' ? true : false
            
            // 假设你获取到的时间字符串
            const startDateString = this.upIndustry.start_date;
            const endDateString = this.upIndustry.end_date;

            // 将字符串转换为日期对象
            const startDate = new Date(startDateString);
            const endDate = new Date(endDateString);
            

            // 将日期对象转换为字符串格式，适应 <el-date-picker> 需要的格式
            const startDateStr = startDate.toISOString().slice(0, 19).replace('T', ' '); // "2025-03-13 00:00:00"
            const endDateStr = endDate.toISOString().slice(0, 19).replace('T', ' '); // "2025-03-13 23:59:59"

            // 在 Vue 的数据模型中将其赋值
            this.times = [startDateStr, endDateStr]; // 格式: ["2025-03-13 00:00:00", "2025-03-13 23:59:59"]
        },
        updatecontent(){
            
            this.upIndustry.start_date = this.convertToDateTimeFormat(this.times[0]);
            this.upIndustry.end_date = this.convertToDateTimeFormat(this.times[1]);
            console.log('this.upIndustry',this.upIndustry);
            if(this.upIndustry.status){
                this.upIndustry.status = 1
            }else{
                this.upIndustry.status = 0
            }
            updatecontent(this.upIndustry).then(res => {
                if(res.data.status == '1'){
                    this.$message.success({
                        message: '修改成功',
                        center: true,
                        duration: 1000
                    })
                    this.getcontent()
                    this.upDialogVisible = false
                }else{
                    this.$message.error({
                        message: res.data.message,
                        center: true,
                    })
                }
            })
        },
        Calcontent(){
            this.upDialogVisible = false
            this.upIndustry = {}
        },
        convertToDateTimeFormat(dateString){
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }

    }

}
</script>
<style>
</style>