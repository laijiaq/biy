<template>
    <div class="sys">
        <el-table :data="comData" border fit style="width: 100%; margin-top: 10px;">
            <el-table-column align="center" type="index" width="100" label="序号">
            </el-table-column>
            <el-table-column align="center" prop="title" label="比赛标题">
            </el-table-column>
            <el-table-column align="center" prop="description" label="比赛描述">
            </el-table-column>
            <el-table-column align="center" prop="created_by_username" label="创建者">
            </el-table-column>
            
            <el-table-column align="center" label="操作" width="250">
                <template slot-scope="scope">
                    
                    <el-button size="mini" type="primary" @click="ConPage(scope.row)">审批</el-button>
                    <!-- <el-button size="mini" type="primary" @click="upContent(scope.row)">修改</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="审批" :visible.sync="centerDialogVisible" width="80%">
            
            <el-table :data="entryDate" border fit style="width: 100%; margin-top: 10px;">
                <el-table-column prop="image.title" label="图片标题" align="center"></el-table-column>
                <el-table-column prop="image.description" label="图片详情" align="center"></el-table-column>
                <el-table-column prop="username" label="上传人" align="center"></el-table-column>
                <el-table-column label="图片地址" align="center">
                    <template slot-scope="scope">
                        <img :src="` ${ url }${ scope.row.image.image_url }`" alt="" style="width: 100px; object-fit: contain;">
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="当前作品状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="success" v-if="scope.row.status == 'submitted'">审核中</el-tag>
                        <el-tag :type="scope.row.status == 'approved' ? 'success' : 'danger'" v-if="scope.row.status == 'approved'">审核通过</el-tag>
                        <el-tag :type="scope.row.status == 'approved' ? 'success' : 'danger'" v-if="scope.row.status == 'rejected'">审核不通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="250">
                    <template slot-scope="scope">
                        
                        <el-button size="mini" type="primary" @click="agree(scope.row)">通过</el-button>
                        <el-button size="mini" type="danger" @click="reject(scope.row)">不通过</el-button>
                        <!-- <el-button size="mini" type="primary" @click="ConPage(scope.row)">审批</el-button> -->
                        <!-- <el-button size="mini" type="primary" @click="upContent(scope.row)">修改</el-button> -->
                    </template>
            </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false;review_date = ''">取 消</el-button>
                <!-- <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button> -->
            </span>
        </el-dialog>
        
    </div>
</template>
<script>
import { updatereviewcontent , updatecontent , selectconpetion   , selectentry , updateentry } from "../../assets/api/competion.js";
import  baseURL  from '../../assets/api/index.js'
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
            url: baseURL,
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
            times: '',
            entryDate:[]
            
        }
    },

    created() {

        this.getcontent()
    },
    methods: {
        agree(scope){
            
            updateentry({
                entry_id: scope.entry_id,
                status: 'approved'
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
                    
                }
            })
        },
        reject(scope){
            updateentry({
                entry_id: scope.entry_id,
                status: 'rejected'
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
            selectentry({
                competition_id:row.competition_id
            }).then(res =>{
                if(res.data.status == 1){
                    // this.content = res.data.data
                    this.entryDate = res.data.entries
                    console.log('baseURL',this.url + this.entryDate[0].image.image_url);
                    
                    // console.log('获取成功',res.data.entries);
                    
                }else{
                    this.$message.error({
                        message: '获取失败',
                        type: 'error',
                        duration: 1000
                    })
                }
            })
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
<style >
</style>