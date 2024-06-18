<template>
    <div class="login">
        <div class="login-box">
            <div class="login-left">
                <header>后台管理系统</header>
            </div>
            <div class="login-main">
                <div class="main_header"></div>
                <div class="login-form">
                    
                </div>
            </div>
            <!-- <div class="login-box-header">后台管理系统</div> -->
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                
            }
        },
    }
</script>
<style lang="scss" scoped>
    .login{
        width: 100%;
        height: 100%;
        background-color: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-box{
            width: 60%;
            height: 70%;
            max-width: 1048px;
            max-height: 642px;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            border-radius: 20px;
            overflow: hidden;
            .login-left,.login-main{
                align-self: stretch;
                flex: 1;
            }
            .login-left{
                box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
                padding: 5% 2%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                header{
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