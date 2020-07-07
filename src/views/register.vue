<template>
    <div class="register">
        <van-nav-bar title="注册" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <van-form validate-first @failed="onFailed" @submit="onSubmit" class="cells">
            <!-- 姓名 -->
            <van-field v-model="formdata.scUserName" name="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名',trigger:'onChange' }]">
                <template #left-icon>
                    <div class="sprite sprite-user" style="margin-right:10px"></div>
                </template>
            </van-field>
            <!-- 证件类型 -->
            <van-field 
                v-model="idTypeChange" 
                readonly
                right-icon="arrow"
                name="证件号码" 
                placeholder="请选择证件类型" 
                @click="showPicker = true"
                :rules="[{ required: true, message: '请选择证件类型',trigger:'onChange'}]">
                <template #left-icon>
                    <div class="sprite sprite-card" style="margin-right:10px"></div>
                </template>
            </van-field>
            <van-popup v-model="showPicker" position="bottom">
                <van-picker show-toolbar :columns="columns" :default-index="columns.indexOf(columns[0])" @confirm="onConfirm" @cancel="showPicker = false"/>
            </van-popup>
            <!-- 证件号码 -->
            <van-field v-model="formdata.idNumber" name="证件号码" placeholder="请填写证件号码"
                :rules="[{ required: true, message: '请填写证件号码',trigger:'onChange' }]">
                <template #left-icon>
                    <div class="sprite sprite-card" style="margin-right:10px"></div>
                </template>
            </van-field>
            <!-- 登录密码 -->
            <van-field v-model="formdata.password" name="登录密码" placeholder="登录密码"
                :rules="[{ required: true, message: '请设置登录密码',trigger:'onChange' }]">
                <template #left-icon>
                    <div class="sprite sprite-password" style="margin-right:10px"></div>
                </template>
            </van-field>
            <van-field v-model="formdata.repassword" name="登录密码" placeholder="再次确认密码"
                :rules="[{ required: true,  message: '请再次确认密码',trigger:'onChange' }]">
                <template #left-icon>
                    <div class="sprite sprite-password" style="margin-right:10px"></div>
                </template>
            </van-field>
            <van-field class="input-oneline" v-model="formdata.scPhonenumber" name="pattern" placeholder="请输入常用手机号码"
                :rules="[{ required: true,pattern:/1\d{10}/, message: '请输入常用手机号码',trigger:'onChange' }]">
                <template #left-icon>
                    <div class="sprite sprite-phone" style="margin-right:10px"></div>
                </template>
            </van-field>
            <div class="l_check">
                <div class="l_checkbox">
                    <van-checkbox v-model="checked">我同意并遵守</van-checkbox>
                </div>
                <div class="l_read">
                    <span class="text" @click="lregister">《注册协议》</span>和<span class="text"
                        @click="lprivacy">《隐私政策》</span>
                </div>
            </div>
            <!-- 按钮 -->
            <div class="btn">
                <van-button color="#498ef5" size="large" native-type="submit">注 册</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formdata: {
                    scUserName: '',
                    idNumber: '',
                    idType: '',
                    value: '',
                    password: '',
                    repassword: '',
                    scPhonenumber: ''
                },
                columns: ['居民身份证', '护照', '士官证', '出生证'],
                checked: false,
                showPicker: false
            };
        },
        computed: {
            idTypeChange() {
                let val = '';
                switch (this.formdata.idType) {
                    case 1:
                        val = '居民身份证'
                        break;
                    case 2:
                        val = '护照'
                        break;  
                    case 3:
                        val = '士官证'
                        break; 
                    case 4:
                        val = '出生证'
                        break;             
                }
                return val;
            }
        },
        methods: {
            onConfirm(value,index) {
                this.formdata.idType = index + 1;
                this.showPicker = false;
            },
            lregister() {
                this.$dialog
                .confirm({
                    title: "注册协议",
                    message: "本协议为您与「海南教育发布公众号」版权所有者之间所订立的契约，具有合同的法律效力，请您仔细阅读。一、本协议内容、生效、变更。本协议内容包括协议正文及所有本公众号已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。如您对协议有任何疑问，应向本海南教育发布公众号咨询。只要您使用本海南教育发布公众号平台服务，则本协议即对您产生约束，届时您不应以未阅读本协议的内容或者未获得本 海南教育发布公众号对您问询的解答等理由，主张本协议无效，或要求撤销本协议。您确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。您承诺接受并遵守本协议的约定。如果您不同意本协议的约定，您应立即停止注册程序或停止使用本海南教育发布公众号平台服务。本海南教育发布公众号有权根据需要不定期地制订、修改本协议及/或各类规则，并在本海南教育发布公众号平台公示，不再另行单独通知用户。变更后的协议和规则一经在海南教育发布公众号公布，立即生效。如您不同意相关变更，应当立即停止使用本海南教育发布公众号平台服务。您继续使用本海南教育发布公众号平台服务的，即表明您接受修订后的协议和规则。"
                })
                .then(() => {
               
                })
                .catch(() => {
                 //console.log("点击取消");
                });
            },
            lprivacy() {
                this.$dialog
                .confirm({
                    title: "隐私政策",
                    message: "如用户完成注册程序，即表示用户与海南教育发布公众号（包括且不限于网站、手机应用等多平台）就其所提供的服务达成协议，自愿接受本服务协议的所有内容。此后，用户不得以未阅读本服务协议内容为由进行任何形式的抗辩。用户注册成功后，虎嗅将给予每个用户一个用户账号及对应的密码，该用户账号和密码由用户自己负责保管；用户应当对以其用户账号进行的所有活动和发表的全部内容承担法律责任。用户须对其在海南教育发布公众号的注册信息的真实性、合法性、有效性承担责任。"
                })
                .then(() => {
               
                })
                .catch(() => {
                 //console.log("点击取消");
                });
            },
            // async onRegister() {
            //     const postData = {
            //         "idNumber": "120101199003073134",
            //         "idType": "1",
            //         "password": "54321",
            //         "repassword": "54321",
            //         "scPhonenumber": "18819205518",
            //         "scUserName": "吴亿"
            //     }
            //     const res = await this.$http.post('/mobile/user/register', postData);
            //     console.log(res)
            // },
            async onSubmit() {
                if(!this.checked){
                    this.$toast({
                        duration: 1000,
                        message: "未点击我已阅读",
                        forbidClick: true
                    })
                }else if(this.formdata.password != this.formdata.repassword){
                    this.$toast({
                        duration: 1000,
                        message: "两次输入密码不一致,请重新填写",
                        forbidClick: true
                    })
                }else{
                    const res = await this.$http.post('/mobile/user/register', this.formdata);
                    const _this = this;
                    if(res.data.code === 0){
                        this.$toast.success({
                            duration: 1000,
                            message: "注册成功",
                            forbidClick: true,
                            onClose() {
                                _this.$router.push({
                                    path: '/login'
                                })
                            }
                        })
                        
                    }else{
                         this.$toast.fail(res.data.msg)
                    }
                } 
            },
            // ------表单校验错误
            onFailed() {
                this.$toast.fail("输入有误！")
            }
        }
    };
</script>

<style lang="scss" scoped>
    .register {
        background: #fff;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 50px;
        padding-bottom: 50px;

        .l_check {
            margin-top: 25px;
            padding-left: 20px;
            display: flex;
            font-size: 28px;
            .l_read {
                flex: 1;

                .text {
                    color: #1989fa;
                    cursor: pointer;
                }
            }
        }

        .btn {
            width: 100%;
            position: absolute;
            bottom: 40px;
            left: 0;
            padding: 0 30px;
        }
    }
</style>