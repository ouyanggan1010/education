<template>
    <div class="login">
        <van-nav-bar title="登录" fixed class="navBar" />
        <div class="ScrollContent">
            <div class="login-box">
                <div class="login-logo">
                    <div class="sprite sprite-logo"></div>
                </div>
                <div class="login-box">
                    <van-form validate-first @failed="onFailed" @submit="onSubmit" class="cells">
                        <!-- 证件号码 -->
                        <van-field v-model="loginForm.idNumber"  size="large" name="证件号码" placeholder="证件号码"
                            :rules="[{ required: true, message: '请填写证件号码',trigger:'onChange' }]">
                            <template #left-icon>
                                <div class="sprite sprite-card" style="margin-right:10px"></div>
                            </template>
                        </van-field>
                        <!-- 密码 -->
                        <van-field v-model="loginForm.password" type="password" size="large" name="密码" placeholder="请输入密码"
                            :rules="[{ required: true, message: '请填写密码',trigger:'onChange' }]">
                            <template #left-icon>
                                <div class="sprite sprite-password" style="margin-right:10px"></div>
                            </template>
                        </van-field>
                        <div class="input-outline">
                            <span class="missPassword" @click="forget">忘记密码?</span>
                            <span class="l_middle"></span>
                            <span class="lregister" @click="register">注册</span>
                        </div>
                        <!-- 按钮 native-type="submit"-->
                        <div class="btn" style="margin-top: 40px;">
                            <van-button color="#498ef5" size="large" native-type="submit">登录</van-button>
                        </div>
                    </van-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm:{
                    idNumber: '',
                    password: ''
                }
            };
        },
        created() {
            // idNumber: '120101199003073134',
            // password: '54321'
        //  localStorage.setItem('token','token');
        //  localStorage.getItem('token')
        // localStorage.removeItem("token")
        },
        methods: {
            forget() {
                this.$router.push({
                    path: '/forgetPassword'
                })
            },
            register() {
                this.$router.push({
                    path: '/register'
                })
            },
            async onSubmit() {
                const res =  await this.$http.post('/mobile/user/login',{"idNumber":this.loginForm.idNumber,"password":this.loginForm.password});
                if(res.data.code === 0){
                  localStorage.setItem('scUserId',res.data.data.scUserId);
                  localStorage.setItem('idNumber',res.data.data.idNumber);
                  localStorage.setItem('scPhonenumber',res.data.data.scPhonenumber);
                  this.$router.push({
                        path: '/home'
                    })
                }else{
                    this.$toast.fail(res.data.msg)
                }
            },
            // ------表单校验错误
            onFailed() {
                this.$toast.fail("输入有误！")
            }
        }
    };
</script>

<style lang="scss">
    .login {
        min-height: 100%;
        background: #fff;

        .ScrollContent {
            padding-top: 40px;

            .login-logo {
                width: 252px;
                height: 268px;
                margin: 10px auto 50px;
            }

            .login-box {
                min-height: 100%;
                padding-left: 20px;
                padding-right: 20px;
                padding-top: 20px;

                .input-outline {
                    display: flex;
                    width: 100%;
                    padding-left: 30px;
                    padding-right: 30px;
                    margin-top: 20px;
                    font-size: 28px;
                    line-height: 80px;
                    color: #999;
                    .l_middle{
                        flex: 1;
                    }
                    .lregister {
                        text-align: right;
                        color: #1989fa;
                        width: 120px;
                    }
                }
            }
        }
    }
</style>