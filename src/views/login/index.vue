<template>
    <div class="login">
        <div class="login-box">
            <div class="login-left">
                <header>后台管理系统</header>
            </div>
            <div class="login-main">
                <div class="main_header">
                    <div class="icon"></div>
                    <div class="text">欢迎回来!</div>
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
                            <el-button type="primary" @click="submitForm()">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <!-- <div class="login-box-header">后台管理系统</div> -->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        var nameRg = /^[a-zA-Z0-9-_]{4,16}$/
        var passRg = /^[a-zA-Z0-9-_]{6,16}$/
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('用户名不能为空'));
            } else if (!nameRg.test(value)) {
                callback(new Error('用户名格式不正确，输入4-16位字符'));
            } else {
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
                userName: [
                    { validator: validateName, trigger: 'blur' }
                ],
                userPass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
            }
        };

    },
    methods: {

        submitForm() {
            if (/^[a-zA-Z0-9-_]{4,16}$/.test(this.ruleForm.userName) && /^[a-zA-Z0-9-_]{6,16}$/.test(this.ruleForm.userPass)) {
                this.$router.push({
                    path: '/home'
                });
            } else {
                this.$message.error({
                    message: '用户名或密码格式不正确',
                    center: true,
                    duration:2000
                });
            }

        }
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
                    background-color: rgb(21, 19, 19);
                }

                .text {
                    flex: 1;
                    font-size: 30px;
                    font-weight: 900;
                    text-align: right;
                    color: #1080b7;
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

// .login{
//     width: 100%;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     // background-color: #e8d26b;
//     background-color:rgba(220, 254, 255, 0.3);
//     .login-box{
//         width: 90%;
//         height: 75%;
//         box-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
//         .login-left{
//             width: 35%;
//             height: 100%;
//         }
//         .login-main{
//             width: 65%;
//             height: 100%;
//         }
//     }
// }
</style>