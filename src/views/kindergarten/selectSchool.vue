
<template>
    <div class="select_school">
        <van-nav-bar title="幼儿园入学申请登记" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="content_list">
            <h2 class="block_title">{{title}}幼儿园</h2>
            <div class="school_card">
                <van-radio-group v-model="radio">
                    <div class="card_item" @click="getKindergarten(item.scName)" v-for="(item,index) in list" :key="index">
                        <ul class="item_list">
                            <li class="li_pdr">{{item.scName}}</li>
                            <li class="li_style">{{item.scAddress}}</li>
                            <li class="li_style">{{item.scPlan}}</li>
                        </ul>
                        <div class="lposition">
                            <van-radio :name="index + 1" class="text_size"></van-radio>
                        </div>
                    </div>
                </van-radio-group>    
            </div>
            <!-- 按钮 -->
            <div class="btn" @click="nextStep">
                <van-button color="#498ef5" size="large">下一步</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            actived: false,
            radio: 0,
            list:[],
            title:''
        }
    },
     created() {
        // console.log(this.$route.params.scArea)
        // this.title = this.$route.params.scArea;
        switch (this.$route.params.scArea) {
            case '1' : this.title = "市直属" //1
            break;
            case '2': this.title = "龙华区直属" //2
            break;
            case '3' : this.title = "美兰区直属" //3
            break;
            case '4' : this.title = "秀英区直属" //4
            break;
            case '5': this.title = "琼山区直属" //5
            break;
        } 
        const scArea =  this.$route.params.scArea;
        this.getSchool(scArea);
    },
    methods: {
        nextStep() {
            // kindergarten
            if(this.radio === 0){
                this.$toast({ 
                    duration: 1000,
                    message: "还未选择",
                    forbidClick: true
                })
            }else{
                this.$router.push({
                    path: '/home/kindergarten/admissionInformation',
                    name:'AdmissionInformation'
                })
            }
            
        },
        async getSchool(scArea){
            const res = await this.$http.get(`/mobile/school/kindergarten/list/${scArea}`);
            // console.log(res.data)
            if(res.data.code === 0){
                this.list = res.data.data
            }
        },
        getKindergarten(params) {
            // console.log(params)
            if(localStorage.getItem('kindergarten')){
                // 先删除
                localStorage.removeItem("kindergarten");
                // 重新存值
                localStorage.setItem('kindergarten',params);
            }else{
                localStorage.setItem('kindergarten',params);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .select_school{
        .content_list{
            padding-right: 20px;
            padding-left: 20px;
            .block_title{
                padding: 32px;
                // color: #999;
                font-weight: normal;
                font-size: 35px;
                line-height: 28px;
                text-align: center;
            }
            .school_card{
                .card_item{
                    border-radius: 20px;
                    background: #fff;
                    padding: 10px;
                    margin-bottom: 25px;
                    position: relative;
                    .lposition{
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        width:100%;
                        height: 100%;
                        .text_size{ // 扩大radio点击范围
                            width: 100%;
                            height: 100%;
                            padding-left: 90%;
                            padding-bottom: 15%;
                        }
                    }
                    .item_list{
                        li{
                            position: relative;
                            font-size: 30px;
                            line-height: 50px;
                            padding: 5px 0 5px 25px;
                        }
                        .li_style{
                            color: #999;
                        }
                        .li_pdr{
                            padding-right: 20px;
                        }
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
    }
</style>