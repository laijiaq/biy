<template>
    <div class="header">
        <div class="left">
            <img src="../../assets/images/logo.png" alt="">
            <span class="title">后台管理系统</span>
        </div>
        <div class="right">
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    {{ loginname }}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <router-link to="/" >
                        <el-dropdown-item style="margin-right: 5px;" @click.native="target_main()">返回首页</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display: block">退出登录</span>
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
            // console.log("loginName",this.loginname);
            if(this.loginname == null){
                this.loginname = "请先登录"
            }
        },
        methods:{
            logout(){
                localStorage.removeItem('user')
                localStorage.removeItem('loginName')
                this.$router.push('/login')
            },
            login(){

            },
            target_main(){
                const user = JSON.parse(localStorage.getItem('user'))
                user.activeIndex = '2-1'
                localStorage.setItem('user', JSON.stringify(user))
                window.location.href = "http://192.168.1.6:8081/";

            }
        }
    }
</script>
<style scoped lang="scss">
.header{ 
    height: 8%;
    background-color:#fff ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.el-dropdown{
    width: 100px;
}
.el-dropdown-link {

    cursor: pointer;
    color: #000;
    padding: 15% 0;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.right{
    margin-right: 30px;
}
.left{
    width: 30%;
    height: 100%;
    margin-left: 30px;
    display: flex;
    align-items: center;
    img{
        width: 20%;
        // height: 80%;
    }
    .title{
        margin-left: 20px;
        font-size: 30px;
        color: #617794;
        font-weight: 900;

    }
}
</style>