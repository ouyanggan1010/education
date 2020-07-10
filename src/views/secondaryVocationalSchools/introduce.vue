<template>
    <div class="introduce">
        <van-nav-bar title="学校介绍" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="content-wrapper">
            <div class="header_content">
                <div class="header_logo">
                    <div class="avatar">
                        <!-- <img :src="detail.scLogo" width="100%" height="100%" alt="" style="border-radius:150px"> -->
                        <van-image round fit="fill" width="1.9733rem" height="1.9733rem" :src="detail.scLogo" />
                    </div>
                    <div class="content">
                        <div class="title">
                            <h3 class="name">{{detail.scName}}</h3>
                        </div>
                        <div class="description">
                            <van-tag plain  type="danger" v-if="detail.scLevel && detail.scLevel == 0">国家级重点</van-tag>
                            <van-tag plain  type="danger" v-if="detail.scLevel && detail.scLevel == 1">国家级示范</van-tag>
                            <van-tag plain  type="danger" v-if="detail.scLevel && detail.scLevel == 2">省级重点</van-tag>
                            <van-tag plain  type="danger" v-if="detail.scLevel && detail.scLevel == 3">省级示范</van-tag>
                            <van-tag plain  type="danger" v-if="detail.scLevel && detail.scLevel == 4">普通学校</van-tag>
                            <van-tag plain type="primary" style="margin-left:8px;">{{detail.scLabel && detail.scLabel == 5 ? '公办' : '民办'}}</van-tag>
                            <!-- <span class="rl">国家级重点</span>
                            <span class="lf">公办</span> -->
                        </div>
                    </div>
                </div>
                <div class="school_text">
                    <ul>
                        <li>学校代码：{{detail.scCode}}</li>
                        <li>官方网站：{{detail.scWebUrl}}</li>
                        <li>联系电话：{{detail.telPhone}}</li>
                        <li>学校地址：{{detail.scAddress}}</li>
                    </ul>
                </div>
            </div>
            <van-tabs v-model="active" sticky color="#498ef5" title-active-color="#66a1fb">
                <van-tab title="学校介绍">
                    <div class="content_text" v-html="detail.scInstructions"></div>
                </van-tab>
                <van-tab title="专业与招生">
                    <div class="content_text van-hairline--top"><div class="van-hairline--top"></div>
                        <div class="item_cell van-hairline--bottom" v-for="(item, index) in specialty" :key="index" @click="professionDetail(item.midId,item.professionName)">
                            <div class="cell_left" style="color:rgb(102, 161, 251)">{{item.professionName}}</div>
                            <div class="cell_right">
                                <ul>
                                    <li><span style="color:#949494">专业类别：</span> {{item.professionType == 0 ? '中专' : '大专'}}</li>
                                    <li><span style="color:#949494">专业代码：</span> {{item.professionCode}}</li>
                                    <li><span style="color:#949494"> 学制：</span>{{item.studyDate}}年</li>
                                    <li><span style="color:#949494">招生计划：</span> {{item.planNum}}人</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                avatar: 'http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg',
                detail:{},
                specialty:[]
            }
        },
        created() {
            const scId =  this.$route.params.scId;
            this.getSchoolDetail(scId);
            this.getSchoolSpecialty(scId)
        },
        methods:{
            async getSchoolDetail(scId){
                const res = await this.$http.get(`/mobile/school/info/${scId}`);
                if(res.data.code === 0){
                    this.detail = res.data.data
                    // console.log(this.detail)
                }
            },
            // 获取专业与招生接口
            async getSchoolSpecialty(scId){
                const res = await this.$http.get(`/mobile/school/mid/info/${scId}`);
                if(res.data.code === 0){
                    this.specialty = res.data.data
                }
            },
            // 跳转专业介绍
            professionDetail(midId,professionName) {
                this.$router.push({
                    path: '/home/profession',
                    name: 'SchoolProfession',
                    params: { "midId": midId ,"professionName": professionName}
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .introduce {
        position: relative;
        overflow: hidden;

        .content-wrapper {
            position: relative;
            padding: 24px 12px 24px 12px;

            .header_content {
                background: #fff;
                margin-bottom: 25px;
                .header_logo{
                     display: flex;
                     align-items: center;
                    .avatar {
                        width:1.9733rem;
                        height:1.9733rem;
                        margin-left: 10px;
                        margin-top: 10px;
                    }
                    .content {
                        padding: 25px;
                        margin-left: 16px;
                        .title{
                            .name{
                                font-weight: normal;
                                font-size: 34px;
                                color: #000;
                                
                            }
                        }
                        .description{
                            font-size: 28px;
                            margin-top: 10px;
                            .rl{
                                padding: 4px 8px 4px 8px;
                                background: #b2f0ea;
                            }
                            .lf{
                                margin-left: 18px;
                                padding: 4px 8px 4px 8px;
                                background:#fdfdc9;
                            }
                        }
                    }
                }
                .school_text{
                    font-size: 26px;
                    padding:25px;
                    li{
                        padding: 4px;
                        color: #999;
                    }
                }
            }
            .content_text-instruction{
                background: #fff;
            }
            .content_text {
                background: #fff;
                padding: 20px;
                line-height: 50px;
                font-size: 30px;
                overflow: hidden;
                ::v-deep  img{
                    width: 100% !important;
                }
                .van-hairline--bottom{
                    border-bottom: 1px solid #ccc;
                }
                .item_cell{
                    position: relative;
                    padding: 10px;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    text-align: center;
                    .cell_left{
                        flex: 1;
                    }
                    .cell_right{
                        // flex:1;
                        text-align: left;
                    }
                }
            }
        }
    }
</style>