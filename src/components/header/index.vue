<template>
    <div class="header">
        <div class="left">
            
        </div>
        <div class="right">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    {{ loginname }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <router-link to="/" v-if="loginname != '请先登录'">
                        <el-dropdown-item style="margin-right: 5px;">个人中心</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided @click.native="logout" v-if="loginname != '请先登录'">
                        <span style="display: block">退出登录</span>
                    </el-dropdown-item>
                    <el-dropdown-item divided @click.native="login" v-else>
                        <span style="display: block">登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                loginname:''
            }
        },
        created(){
            this.loginname = localStorage.getItem('loginName')
            console.log("loginName",this.loginname);
            if(this.loginname == null){
                this.loginname = "请先登录"
            }
        },
        methods:{
            logout(){

            },
            login(){

            }
        }
    }
</script>
<style scoped>
.header{
    height: 8%;
    background-color:#1f2d3d ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
}
.el-dropdown{
    width: 100px;
}
.el-dropdown-link {

    cursor: pointer;
    color: #fff;
    padding: 15% 0;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.right{
    margin-right: 30px;
}
</style>