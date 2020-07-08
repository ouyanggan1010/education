<template>
    <div class="login">
        <van-nav-bar title="忘记密码" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="ScrollContent">
            <div class="login-box">
                <div class="login-box">
                    <van-form validate-first @failed="onFailed" @submit="onSubmit" class="cells">
                        <!-- 姓名 -->
                        <van-field v-model="loginForm.scUserName" name="姓名" placeholder="请输入姓名"
                            :rules="[{ required: true, message: '请输入姓名',trigger:'onChange' }]">
                            <template #left-icon>
                                <div class="sprite sprite-user" style="margin-right:10px"></div>
                            </template>
                        </van-field>
                        <!-- 证件号码 -->
                        <van-field v-model="loginForm.idNumber" name="证件号码" placeholder="证件号码"
                            :rules="[{ required: true, message: '请填写证件号码',trigger:'onChange' }]">
                            <template #left-icon>
                                <div class="sprite sprite-card" style="margin-right:10px"></div>
                            </template>
                        </van-field>
                        <!-- 密码 -->
                        <van-field v-model="loginForm.newpassword" type="password" name="密码" placeholder="请输入密码"
                            :rules="[{ required: true, message: '请填写密码',trigger:'onChange' }]">
                            <template #left-icon>
                                <div class="sprite sprite-password" style="margin-right:10px"></div>
                            </template>
                        </van-field>
                        <!-- 按钮 native-type="submit"-->
                        <div class="btn"  style="margin-top: 140px;">
                            <van-button color="#498ef5" size="large" native-type="submit">确认修改</van-button>
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
                    newpassword: '',
                    scUserName:''
                }
            };
        },
        methods: {
            async onSubmit() {
                const res =  await this.$http.put('/mobile/user/forgetPassword',{"idNumber":this.loginForm.idNumber,"newpassword":this.loginForm.newpassword,"scUserName":this.loginForm.scUserName});
                const _this = this;
                if(res.data.code === 0){
                    _this.$toast.success({
                        duration: 1000,
                        message: "忘记密码修改成功",
                        forbidClick: true,
                        onClose() {
                            _this.$router.push({
                                path: '/login'
                            })
                        }
                    })
                }else{
                    _this.$toast.fail(res.data.msg)
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
            padding-top: 150px;

            .login-logo {
                width: 252px;
                height: 268px;
                margin: 10px auto 50px;
            }

            .login-box {
                min-height: 100%;
                padding-left: 20px;
                padding-right: 20px;
                padding-top: 50px;

                .input-outline {
                    position: relative;
                    min-height: 100%;
                    display: flex;
                    box-sizing: border-box;
                    width: 100%;
                    padding-left: 30px;
                    padding-right: 30px;
                    overflow: hidden;
                    font-size: 28px;
                    line-height: 80px;
                    color: #ccc;
                    .l_middle{
                        flex: 1;
                        
                    }
                    .lregister {
                        text-align: right;
                        color: #1989fa;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>