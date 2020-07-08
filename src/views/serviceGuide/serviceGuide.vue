<template>
    <div class="service-list">
        <van-nav-bar title="服务指南" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="header">
            <van-sticky>
                <form action="/">
                    <van-search v-model="search" placeholder="请输入搜索关键词" @search="onSearch" @input="onInput" @cancel="onCancel">
                        <!-- <template #action>
                            <div @click="onSearch">搜索</div>
                        </template> -->
                    </van-search>    
                </form>
            </van-sticky>
        </div>
        <van-empty description="暂无数据" v-if="isEmpty" />
        <div class="list-body" v-if="!isEmpty" style="height:100%">
            <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
                <van-list 
                    v-model="isUploading" 
                    :finished="upFinished" 
                    :offset="offset"
                    finished-text="没有更多了" 
                    @load="onLoad"
                >
                    <van-cell class="cell_title"
                        v-for="(item, index) in listData" 
                        :key="index" 
                        :title="item.guideTitle" 
                        :label="item.publishDate"
                        @click="changed(item.guideId)" 
                    />
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                listData:[],//用于存放加载的数据
                totalPage: 0,
                pageNumber: 0, //页码
                isUploading: false,//控制上拉加载的加载动画
                upFinished: false,//控制在页面往下移动到底部时是否调用接口获取数据
                isDownLoading: false,//控制下拉刷新的加载动画
                offset: 300, //滚动条与底部距离小于 offset 时触发load事件
                isEmpty: false,
                search: '', // 搜索
                textColor: true
            };
        },
        created() {
        },
        computed:{
            // publishDate() {
            //     return this.$dayjs().format("YYYY-MM-DD");
            // }
            
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
                this.getList(this.search)
            },
            /**
            *  下拉刷新方法
            */
            onDownRefresh() {
                // this.pageNumber = 1;
                // 重新加载数据
                // 将 loading 设置为 true，表示处于加载状态
                this.isDownLoading = true;
                // 调用请求数据方法
                this.getList(this.search)
            },
            async getList(guideTitle) {
                let postData = this.$qs.stringify({
                    guideTitle:guideTitle ||  ''
                });
                const res = await this.$http.get(`/mobile/service/list?${postData}`);
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
                        if(this.isUpLoading || guideTitle=='' || guideTitle !=''){// 上拉加载
                            this.listData = this.listData.concat(res.data.rows); // 刷新追加新数据添加到数组中
                            // console.log(this.listData)
                            this.$nextTick(()=>{ //在下次 DOM 更新循环结束之后执行延迟回调
                                this.isUpLoading  = false  //关闭上拉加载中
                            })
                            // 数据全部加载完成 concat数据大于总条数
                            if (this.listData.length >= res.data.total) {
                                this.upFinished  = true;
                            }else {
                                this.upFinished  = false;
                            }
                        }

                        if(this.isDownLoading || guideTitle=='' || guideTitle !=''){//关闭下拉刷新

                            this.isDownLoading = false //关闭下拉刷新中

                            this.listData = res.data.rows  //重新给数据赋值

                            // if(this.upFinished){ //如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题

                            //     this.upFinished = false

                            // }

                        }
                         
                    }else{//当请求没有数据时 第一次请求
                        this.isDownLoading = false
                        this.upFinished = true;
                        this.isUpLoading = false;
                        this.isEmpty = true
                    }
                }
            },
            onSearch(val) {
                // this.$toast(val);
                console.log(val)
            },
            changed(guideId) {
                this.$router.push({
                    path: '/home/serviceGuide/serviceGuideDetail',
                    name: 'ServiceDetail',
                    params: { "guideId": guideId }
                })
            },
            onInput(value) {
                this.getList(value)
            },
            onCancel() {
                this.getList('')
            },
        }
    };
</script>

<style lang="scss" scoped>
.service-list{
    .header {
        position: relative;
        background: #fdfdfd;

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
    }

    .list-body {
        background: #fff;
        padding-left: 5px;
        padding-right: 5px;
    }
}
.cell_title{
    .van-cell__title{
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
}    
</style>