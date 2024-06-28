<template>
    <div class="login">
        <div class="login-box">
            <div class="login-left">

                <img src="../../assets/images/min-logo.png" alt="">
                <header>
                    后台管理系统
                </header>

            </div>
            <div class="login-main">
                <div class="main_header">

                    <div class="text">
                        <p> 欢迎回来!</p>
                        <p>Welcome Back</p>
                    </div>

                </div>
                <div class="login-form">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px"
                        class="demo-ruleForm">
                        <el-form-item prop="userName">
                            <el-input type="text" placeholder="请输用户名" v-model="ruleForm.userName" autocomplete="off"
                                prefix-icon="el-icon-user"></el-input>
                        </el-form-item>
                        <el-form-item prop="userPass">
                            <el-input type="password" placeholder="请输入密码" v-model="ruleForm.userPass" autocomplete="off"
                                show-password prefix-icon="el-icon-lock"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="button" type="primary" @click="submitForm()">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <!-- <div class="login-box-header">后台管理系统</div> -->
        </div>
    </div>
</template>
<script>
import { login } from '../../assets/api/login.js'
export default {
    data() {
        var passRg = /^[a-zA-Z0-9-_]{6,16}$/
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('用户名不能为空'));
            }else {
                callback()
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('密码不能为空'));
            } else if (!passRg.test(value)) {
                callback(new Error('密码格式不正确,输入6-16位字符'));
            } else {
                callback()
            }
        };
        return {

            ruleForm: {
                userName: '',
                userPass: '',
            },
            rules: {
                userPass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
            }
        };

    },
    methods: {

        submitForm() {
            if ( /^[a-zA-Z0-9-_]{6,16}$/.test(this.ruleForm.userPass)) {
                console.log(' process.env.VUE_APP_BASE_API', process.env.VUE_APP_BASE_API);
                const formData = new FormData();
                formData.append('username', this.ruleForm.userName);
                formData.append('password', this.ruleForm.userPass);
                login({
                    username: this.ruleForm.userName,
                    password: this.ruleForm.userPass
                }).then(res=>{
                    if(res.data.status == 1){
                        
                        this.$message({
                            message: '登陆成功',
                            type: 'success',
                            duration:'1000'
                        });
                        console.log(res.data);
                        localStorage.setItem('loginName',res.data.user.username)
                        localStorage.setItem('user',JSON.stringify(res.data.user) )
                        this.$router.push({ path: '/home' });
                    }
                }).catch(error=>{

                })

            } else {
                this.$message.error({
                    message: '密码格式不正确',
                    center: true,
                    duration: 2000
                });
            }

        },
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    background-image: url('../../assets/images/new_index.jpg');
    background-size: cover;
    background-repeat:no-repeat ;
    display: flex;
    justify-content: center;
    align-items: center;
    
    // filter: blur(5px);

    .login-box {
        width: 60%;
        height: 70%;
        max-width: 1048px;
        min-width: 800px;
        max-height: 642px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
        display: flex;
        background-color: #fff;
        align-items: center;
        border-radius: 20px;
        overflow: hidden;

        .login-left{
            align-self: stretch;
            flex: 1;
            padding: 40px 20px;
            min-width: 317px;
            img{
                margin-bottom: 20px;
                width: 70%;
                object-fit: contain;
            }
        }
        .login-main {
            align-self: stretch;
            flex: 1;
            min-width: 317px;
            padding: 40px 20px;

            .main_header {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 10px 0;



                .text {
                    flex: 1;
                    height: 145px;

                }

                .text p:nth-child(1) {

                    font-size: 30px;
                    font-weight: 900;
                    text-align: center;
                    color: #1080b7;
                    letter-spacing: 10px;
                }

                .text p:nth-child(2) {
                    font-size: 14px;
                    text-align: center;
                    color: #4f5152;
                    padding-right: 20px;
                    letter-spacing: 5px;
                }

            }
        }

        .login-left {
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
            padding: 5% 2%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            header {
                font-size: 22px;
                font-weight: 900;
            }
        }

    }
}

.button {
    width: 100%;
}</style>