<template>
    <div class="login">
        <div class="login-box">
            <div class="login-left">
                <header>后台管理系统</header>
            </div>
            <div class="login-main">
                <div class="main_header">
                    <div class="icon"></div>
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
import axios from 'axios';
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
<<<<<<< HEAD
            if (/^[a-zA-Z0-9-_]{6,16}$/.test(this.ruleForm.userPass)) {
                this.$router.push({
                    path: '/home'
                });
=======
            if ( /^[a-zA-Z0-9-_]{6,16}$/.test(this.ruleForm.userPass)) {
                // login({
                // username: this.ruleForm.userName,
                // password: this.ruleForm.userPass
                // })
                // .then(res => {
                //     // 登录成功处理逻辑
                //     this.$router.push({ path: '/home' });
                // })
                // .catch(error => {
                //     // 捕获并处理请求失败的情况
                //     console.error('Login failed:', error);
                //     // 在界面上显示错误信息或者做其他适当的处理
                // });
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
                        this.$router.push({ path: '/home' });
                    }
                }).catch(error=>{

                })
                // axios.post('/php/index.php', formData)
                // .then(response => {
                //     // 请求成功处理逻辑
                //     console.log('Response from PHP:', response.data);
                //     this.$router.push({ path: '/home' });
                //     // 在这里可以处理 PHP 返回的响应数据，比如登录成功跳转等
                // })

>>>>>>> 5297695b295e41f99d71b635a4de33e5caa221cc
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
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-box {
        width: 60%;
        height: 70%;
        max-width: 1048px;
        max-height: 642px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        border-radius: 20px;
        overflow: hidden;

        .login-left,
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

                .icon {
                    width: 145px;
                    height: 145px;
                    background-image: url('../../assets/images/min-logo.png');
                    /* 背景图片路径 */
                    background-size: cover;
                    /* 背景图片覆盖整个容器 */
                    background-position: center;
                    /* 背景图片居中 */
                    background-repeat: no-repeat;
                }

                .text {
                    flex: 1;
                    height: 145px;

                }

                .text p:nth-child(1) {

                    font-size: 30px;
                    font-weight: 900;
                    text-align: right;
                    color: #1080b7;
                }

                .text p:nth-child(2) {
                    font-size: 14px;
                    text-align: right;
                    color: #4f5152;
                    padding-right: 20px;
                }

            }
        }

        .login-left {
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
            padding: 5% 2%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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