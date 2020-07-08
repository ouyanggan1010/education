
<template>
    <div class="service-detail">
        <van-nav-bar title="服务指南" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="title">
            <p class="title-top">{{detail.guideTitle}}</p>
            <p class="title-right">{{detail.publishDate}}</p>
        </div>
        <div class="content " v-html="detail.publisContent"></div>
        <!-- 按钮 -->
        <!-- <div class="btn"  style="margin: 40px 20px 20px 20px;" @click="sign">
            <van-button color="#498ef5" size="large" native-type="button">我要申请登记</van-button>
        </div> -->
    </div>
</template>

<script>
export default {
     data() {
            return {
                active: 0,
                detail:{}
            };
        },
        created() {
            const guideId =  this.$route.params.guideId;
            this.getSchoolDetail(guideId)
        },
        methods:{
            async getSchoolDetail(guideId){
                const res = await this.$http.get(`/mobile/service/${guideId}`);
                console.log(res)
                if(res.data.code === 0){
                    this.detail = res.data.data
                }
            },
            sign() {
                this.$router.push({
                    path: '/home/kindergarten'
                })
            },
        }
}
</script>

<style lang="scss" scoped>
    .service-detail{
       padding-right: 25px;
       padding-left: 25px;
       padding-bottom: 25px;
       background: #fff; 
       font-size: 25px;
       .title{
           position: relative;
           padding-top: 25px;
           padding-bottom: 25px;
           &::after {
                position: absolute;
                box-sizing: border-box;
                content: ' ';
                pointer-events: none;
                right: 0;
                bottom: 0;
                left: 0;
                border-bottom: 1px solid #ebedf0;
                transform: scaleY(.5);
            }
           .title-top{
               font-size: 30px;
           }
           .title-right{
               margin-top: 15px;
               text-align: right;
               color: #999;
           }
       }
       .content{
           line-height: 50px;
           padding-top: 30px;
       }
    }
</style>