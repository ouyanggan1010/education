<template>
    <div class="detail">
        <van-nav-bar title="学校详细" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="list-body">
            <div class="item-list">
                <div class="item-card">
                    <div class="item-card-list">
                        <div class="Llist-ctr">
                            <p class="top-text">{{detail.scName}}</p>
                            <p class="midtext">学校地址：{{detail.scAddress}}</p>
                            <p class="midtext">联系电话：{{detail.telPhone}}</p>
                            <p class="midtext">学校官网：{{detail.scWebUrl}}</p>
                            <p class="midtext" v-if=" detail.scLevel == 0 ">办园等级：省示范幼儿园</p>
                            <p class="midtext" v-if=" detail.scLevel == 1 ">办园等级：省一级幼儿园</p>
                            <p class="midtext" v-if=" detail.scLevel == 2 ">办园等级：市示范幼儿园</p>
                            <p class="midtext" v-if=" detail.scLevel == 3 ">办园等级：市一级幼儿园</p>
                            <p class="midtext" v-if=" detail.scLevel == 4 ">办园等级：市二级幼儿园</p>
                            <p class="midtext" v-if=" detail.scLevel == 5 ">办园等级：市三级幼儿园</p>
                            <p class="midtext">班数：{{detail.scClassCount}}</p>
                            <p class="midtext">学位数：{{detail.scStudentCount}}</p>
                        </div>
                    </div>
                    <div class="Llist-right">
                        <span class="sprite sprite-school-tag" v-if=" detail.scLabel == 0 ">财政拨款公办园</span>
                        <span class="sprite sprite-school-tag" v-if=" detail.scLabel == 1 ">自收自支公办园</span>
                        <span class="sprite sprite-school-tag" v-if=" detail.scLabel == 2 ">企事业办园</span>
                        <span class="sprite sprite-school-tag" v-if=" detail.scLabel == 3 ">高校办园</span>
                        <span class="sprite sprite-school-tag" v-if=" detail.scLabel == 4 ">部队办园</span>
                        <span class="sprite sprite-school-tag" v-if=" detail.scLabel == 5 ">普惠性民办园</span>
                        <span class="sprite sprite-school-tag" v-if=" detail.scLabel == 6 ">非普惠性民办园</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="tab-content">
            <van-tabs v-model="active" color="#498ef5" title-active-color="#66a1fb">
                <van-tab title="学校简介">
                    <div class="content" v-html="detail.scSchoolBrief">
                       海口市机关幼儿园创办于1960年，是一所公立性政府为主导的全日制幼儿园，1997年首批被评为省示范园，2006年以第一名的优异成绩通过省示范园的复查评估。是全国13所贯彻《纲要》试点园之一，全省贯彻落实《指南》省级实验区的骨干实验园。多次被评为省、市幼教先进集体；省、市教学科研先进单位；省、市精神文明单位；省、市卫生先进单位和安全工作先进单位。该园现有15个年龄班，524名幼儿，总占地面积5656.61平方米，总建筑面积10300平方米，绿化覆盖面积960平方米，运动场地面积2800平方米。2016年，园所进行了整体装修，不仅提升了审美的格调，更在环境的细节中透出教育的真谛，是孩子们幸福生活、健康成长的乐园。
                    </div>
                </van-tab>
                <van-tab title="招生说明">
                   <div class="content" v-html="detail.scInstructions"></div>
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
                detail:{}
            };
        },
        created() {
            const scId =  this.$route.params.scId;
            this.getSchoolDetail(scId)
        },
        methods:{
            async getSchoolDetail(scId){
                const res = await this.$http.get(`/mobile/school/info/${scId}`);
                if(res.data.code === 0){
                    this.detail = res.data.data
                    // console.log(this.detail)
                }
            },
        }
    }
</script>

<style lang="scss">
    .detail {
        height: 100%;

        .list-body {
            background: #f4f6fa;
            padding-left: 5px;
            padding-right: 5px;

            .item-list {
                padding: 25px;

                .item-card {
                    //   height: 160px;
                    border-radius: 12px;
                    background: #fff;

                    .item-card-list {
                        display: flex;
                        box-sizing: border-box;
                        width: 100%;
                        padding: 15px;
                        line-height: 35px;

                        .Llist-ctr {
                            flex: 1;
                            padding-left: 20px;
                            font-size: 33px;

                            .top-text {
                                margin: 27px 0 20px 0;
                            }

                            .midtext {
                                font-size: 26px;
                                color: #999;
                                width: 95%;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                        }
                    }

                    .Llist-right {
                        // width: 10%;
                        padding-top: 25px;
                        position: absolute;
                        top: 80px;
                        right: 18px;
                        color: #fff;

                        span {
                            padding: 2px;
                            text-align: center;
                            line-height: 0.62333rem;
                        }
                    }
                }
            }
        }
        .tab-content{
            background: #fff;
            .content{
                font-size: 30px;
                padding: 25px;
                text-indent: 40px;
                line-height: 60px;
            }
        }
    }
</style>