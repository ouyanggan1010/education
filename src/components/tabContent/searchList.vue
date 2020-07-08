<template>
    <div class="search-list-wrapper">
        <div class="header">
            <van-sticky>
                <form action="/">
                    <van-search v-model="search" shape="round" placeholder="请输入搜索关键词" @search="onSearch"
                        @input="onInput" @cancel="onCancel" />
                </form>
            </van-sticky>
        </div>
        <van-empty description="暂无数据" v-if="isEmpty" />
        <div class="list-body" v-if="!isEmpty">
            <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
                <van-list v-model="isUploading" :finished="upFinished" :offset="offset" finished-text="没有更多了"
                    @load="onLoad">
                    <div class="item-list" v-for="(item, idx) in listData" :key="idx" :id="item.scId"
                        @click="schoolDetail(item.scId)">
                        <div class="item-card">
                            <div class="item-card-list">
                                <div class="Llist-ctr">
                                    <p class="top-text">{{item.scName}}</p>
                                    <p class="midtext">学校地址：{{item.scAddress}}</p>
                                    <p class="midtext">联系电话：{{item.telPhone}}</p>
                                </div>
                            </div>
                            <div class="Llist-right">
                               <span class="sprite sprite-school-tag" v-if=" item.scLabel == 0 && index == 0">财政拨款公办园</span>
                                <span class="sprite sprite-school-tag" v-if=" item.scLabel == 1 && index == 0">自收自支公办园</span>
                                <span class="sprite sprite-school-tag" v-if=" item.scLabel == 2 && index == 0">企事业办园</span>
                                <span class="sprite sprite-school-tag" v-if=" item.scLabel == 3 && index == 0">高校办园</span>
                                <span class="sprite sprite-school-tag" v-if=" item.scLabel == 4 && index == 0">部队办园</span>
                                <span class="sprite sprite-school-tag" v-if=" item.scLabel == 5 && index == 0">普惠性民办园</span>
                                <span class="sprite sprite-school-tag" v-if=" item.scLabel == 6 && index == 0">非普惠性民办园</span>
                                <span class="sprite sprite-school-tag" v-if=" item.scLabel == 5 && index == 3">公办</span>
                                <span class="sprite sprite-school-tag" v-if=" item.scLabel == 6 && index == 3">民办</span>
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            index: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
                totalPage: 0,
                pageNumber: 0, //页码
                isEmpty: false,
                isUploading: false, //控制上拉加载的加载动画
                upFinished: false, //控制在页面往下移动到底部时是否调用接口获取数据
                isDownLoading: false, //控制下拉刷新的加载动画
                offset: 300, //滚动条与底部距离小于 offset 时触发load事件
                search: '',
                listData: [], //用于存放加载的数据
            }
        },
        created() {
        },
        methods: {
            /**
             *  上拉加载方法
             *  页面打开时初始化会调用onLoad方法 如果想去掉初始化调用使用,给List添加属性immediate-check=false
             */
            onLoad() {
                // this.pageNumber ++ ;
                this.isUpLoading = true
                // 调用请求数据方法
                this.getList(this.index)
            },
            /**
             *  下拉刷新方法
             */
            onDownRefresh() {
                // this.pageNumber = 1;
                // 重新加载数据
                // this.listData = [];
                // 将 loading 设置为 true，表示处于加载状态
                this.isDownLoading = true;
                // 调用请求数据方法
                this.getList(this.index)
            },
            async getList(sc_type,scName) {
            let postData = this.$qs.stringify({
                    sc_type:sc_type,
                    scName:scName
                });
                const res = await this.$http.get(`/mobile/school/list?${postData}`);
                // console.log(res)
                // 分页
                // let postData = this.$qs.stringify({
                //     guideTitle: '2020',
                //     pageNumber: this.pageIndex,页码自增
                //     count : 10  每页条数固定 
                // });
                if(res.data.code === 0){
                    // 当请求有数据时
                    if(res.data.rows.length){
                        this.isEmpty = false;
                        if(this.isUpLoading || scName=='' || scName !=''){// 上拉加载
                            // 合并数组
                            this.listData = this.listData.concat(res.data.rows); // 刷新追加新数据添加到数组中
                            this.$nextTick(()=>{ //在下次 DOM 更新循环结束之后执行延迟回调
                                this.isUpLoading  = false  //关闭上拉加载中

                            })
                            // 数据全部加载完成 concat数据大于总条数
                            if (this.listData.length >= res.data.total) {
                                this.upFinished  = true;
                            }
                        }

                        if(this.isDownLoading || scName=='' || scName !=''){//关闭下拉刷新
                            this.listData = res.data.rows;
                            this.isDownLoading = false //关闭下拉刷新中
                            //重新给数据赋值
                            // if(this.upFinished){ //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
                            //     this.upFinished = false
                            // }
                        }
                            
                    }else{//当请求没有数据时 第一次请求
                        this.isDownLoading = false
                        this.upFinished = true;
                        this.isUpLoading = false;
                        this.isEmpty = true;
                        this.listData = res.data.rows;
                    }
                }
            },
            onSearch(val) {
                this.getList(this.index,val)
            }, 
            onInput(value) {
                this.getList(this.index,value)
            },
            onCancel() {
                this.getList(this.index,'')
            },
            schoolDetail(scId) {
                this.$emit('showSchoolDetail',{'scId':scId,index: this.index})
            }
        }
    }
</script>

<style lang="scss">
    .search-list-wrapper {
        background: #f4f6fa;
        height: 100%;

        .list-body {
            background: #f4f6fa;
            padding-left: 5px;
            padding-right: 5px;

            .item-list {
                padding-left: 25px;
                padding-right: 25px;
                margin-top: 25px;

                .item-card {
                    position: relative;
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
                            padding-bottom: 34px;
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
                        top: -34px;
                        right: -10px;
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
    }
</style>