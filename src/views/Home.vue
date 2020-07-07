<template>
    <div class="home">
        <van-nav-bar title="首页" fixed class="navBar" />
        <div class="home-wrapper">
            <div class="header">
                <div class="header-logo">
                    <img class="img" src="../assets/images/banner_02.png" width="100%" height="100%" alt="">
                </div>
                <div class="items">
                    <div class="items-wapper">
                        <!-- 服务指南 -->
                        <div class="service" @click="service">
                            <div class="service-left ">
                                <div class="licon sprite sprite-service"></div>
                            </div>
                            <div class="service-right">
                                <div class="ricon sprite sprite-service-font"></div>
                            </div>
                        </div>
                        <!-- 学校查询 -->
                        <div class="school" @click="school">
                            <div class="service-left ">
                                <div class="licon sprite sprite-school"></div>
                            </div>
                            <div class="service-right">
                                <div class="ricon sprite sprite-school-font"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list_content">
                <div class="item-list" @click="kindergarten">
                    <div class="item-card">
                        <div class="item-card-list">
                            <div class="Llist-left">
                                <div class="sprite sprite-home-checkIn"></div>
                            </div>
                            <div class="Llist-ctr">
                                <p class="top-text">学前教育入学申请登记</p>
                                <p class="midtext">海口市户籍与非海口市户籍适龄幼儿入学申请</p>
                                <p class="midtext">登记入口</p>
                            </div>
                            <div class="Llist-right">
                                <i class="sprite sprite-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item-list" @click="primary">
                    <div class="item-card">
                        <div class="item-card-list">
                            <div class="Llist-left">
                                <div class="sprite sprite-home-checkIn"></div>
                            </div>
                            <div class="Llist-ctr">
                                <p class="top-text">小学一年级入学申请登记</p>
                                <p class="midtext">海口市户籍与非海口市户籍适龄幼儿入学申请</p>
                                <p class="midtext">登记入口</p>
                            </div>
                            <div class="Llist-right">
                                <i class="sprite sprite-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item-list" @click="junior">
                    <div class="item-card">
                        <div class="item-card-list">
                            <div class="Llist-left">
                                <div class="sprite sprite-home-checkIn"></div>
                            </div>
                            <div class="Llist-ctr">
                                <p class="top-text">初中一年级入学申请登记</p>
                                <p class="midtext">海口市户籍与非海口市户籍适龄幼儿入学申请</p>
                                <p class="midtext">登记入口</p>
                            </div>
                            <div class="Llist-right">
                                <i class="sprite sprite-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="item-list" @click="secondarySchool">
                    <div class="item-card">
                        <div class="item-card-list">
                            <div class="Llist-left">
                                <div class="sprite sprite-home-checkIn"></div>
                            </div>
                            <div class="Llist-ctr">
                                <p class="top-text">中等职业学校入学介绍</p>
                                <p class="midtext">中等职业学校报名须知各大中等院校招生简介</p>
                                <p class="midtext">招生简介</p>
                            </div>
                            <div class="Llist-right">
                                <i class="sprite sprite-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        components: {

        },
        data() {
            return {

            }
        },
        methods: {
            service() {
                this.$router.push({
                    path: '/home/serviceGuide'
                })
            },
            school() {
                this.$router.push({
                    path: '/home/school'
                })
            },
            kindergarten() { // 幼儿园入学登记
                this.$router.push({
                    path: '/home/kindergarten'
                })
            },
            primary() {// 小学入学登记
                this.$toast('开发中')
            },
            junior() {// 初中入学登记
                this.$toast('开发中')
            },
            secondarySchool(){ //中职招生入口
                this.$router.push({
                    path: '/home/secondarySchool'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .home {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #F4F6FA;
        .home-wrapper {
            height: 100%;
            .header {
                position: relative;
                margin-bottom: 150px;
                height: 33%;
                .img {
                    display: block;
                }

                .items {
                    box-sizing: border-box;
                    padding: 25px;
                    width: 100%;
                    position: absolute;
                    top: 80%;
                    left: 0;

                    .items-wapper {
                        display: flex;
                        background: #fff;
                        padding: 20px;
                        border-radius: 20px;

                        .service {
                            flex: 1;
                            border-right: 1px solid #ccc;

                            .service-left {
                                display: inline-block;
                                width: 40%;

                                .licon {
                                    margin-left: 15px;
                                    margin-bottom: 15px;
                                }
                            }

                            .service-right {
                                display: inline-block;
                                width: 50%;
                                height: 100%;

                                .ricon {
                                    display: block;
                                    // height: 100%;
                                    margin: 50px auto 0;
                                }
                            }
                        }

                        .school {
                            flex: 1;
                            .service-left {
                                display: inline-block;
                                width: 48%;
                                .licon {
                                    margin-left: 15px;
                                }
                            }
                            .service-right {
                                display: inline-block;
                                width: 50%;
                                height: 100%;
                                .ricon {
                                    display: block;
                                    // height: 100%;
                                    margin: 50px auto 0;
                                }
                            }
                        }
                    }
                }
            }
            .list_content {
                padding-bottom: 120px;
                .item-list {
                    padding-left: 25px;
                    padding-right: 25px;
                    margin-top: 25px;

                    .item-card {
                        //   height: 160px;
                        border-radius: 12px;
                        background: #fff;

                        .item-card-list {
                            display: flex;
                            box-sizing: border-box;
                            width: 100%;
                            padding: 15px;

                            .Llist-left {
                                width: 10%;
                            }
                            .Llist-ctr {
                                flex: 1;
                                padding-left: 25px;
                                font-size: 28px;
                                .midtext {
                                    font-size: 24px;
                                    color: #999;
                                    width: 95%;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                }
                            }

                            .Llist-right {
                                width: 10%;
                                padding-top: 25px;
                            }
                        }
                    }
                }
            }

        }
    }
</style>