
<template>
    <div class="home">
        <van-nav-bar title="中职" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="home-wrapper">
            <div class="header">
                <div class="header-logo">
                    <img class="img" src="../../assets/images/banner_02.png" width="100%" height="100%" alt="">
                </div>
                <div class="items">
                    <div class="items-wapper">
                       <van-cell is-link title-class="d-flex ai-center" to="/home/secondarySchoolNotes">
                            <template #title>
                                <div class="sprite sprite-school-volmu"></div>
                                <div class="pl-10">中等职业学校报名须知</div>
                            </template>
                        </van-cell>
                    </div>
                </div>
            </div>
            <div class="list_content">
                <div class="cells">
                    <van-cell is-link title-class="d-flex ai-center" to="/home/schoolList">
                        <template #title>
                            <div class="sprite sprite-school-town"></div>
                            <div class="pl-10">招生学校</div>
                            <div class="pl-10" style="width:67%;text-align:right;color:#999">更多</div>
                        </template>
                    </van-cell>
                    <van-cell is-link title-class="d-flex ai-center" v-for="(item, index) in listData" :key="index" :id="item.scId" @click="schoolDetail(item.scId)">
                        <template #title>
                            <div class="pl-10">{{item.scName}}</div>
                            <van-tag plain  type="danger" style="margin-left:8px;" v-if="item.scLevel == 0">国家级重点</van-tag>
                            <van-tag plain  type="danger" style="margin-left:8px;" v-if="item.scLevel == 1">国家级示范</van-tag>
                            <van-tag plain  type="danger" style="margin-left:8px;" v-if="item.scLevel == 2">省级重点</van-tag>
                            <van-tag plain  type="danger" style="margin-left:8px;" v-if="item.scLevel == 3">省级示范</van-tag>
                            <van-tag plain  type="danger" style="margin-left:8px;" v-if="item.scLevel == 4">普通学校</van-tag>
                            <van-tag plain type="primary" style="margin-left:8px;">{{item.scLabel == 5 ? '公办' : '民办'}}</van-tag>
                        </template>
                    </van-cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                listData:[]
            }
        },
        created() {
            this.getShoolList()
        },
        methods: {
            async getShoolList() {
                let postData = this.$qs.stringify({
                    sc_type:'3',
                    scName:''
                });
                const res = await this.$http.get(`/mobile/school/list?${postData}`);
                // console.log( res.data.rows)
                if(res.data.code === 0){
                    this.listData  = res.data.rows
                }
            },
            schoolDetail(scId) {
                this.$router.push({
                    path: '/home/schoolIntroduce',
                    name: 'SchoolIntroduce',
                    params: { "scId": scId }
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
                margin-bottom: 100px;

                .img {
                    display: block;
                }
                .items {
                    width: 100%;
                    position: absolute;
                    top: 96%;
                    left: 0;
                    .items-wapper {
                        border-radius: 20px;
                    }
                }
            }
            .list_content {
                padding-bottom: 150px;
            }

        }
    }
</style>