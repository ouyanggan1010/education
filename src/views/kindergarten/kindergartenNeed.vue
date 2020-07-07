<template>
    <div class="need_kown">
        <van-nav-bar title="幼儿园入学申请登记" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="title">
            <p class="title-top">查阅须知</p>
            <!-- <p class="title-right">2020-06-30</p> -->
        </div>
        <div class="content">
            <ul style="margin-top:10px">
                <li>1、符合本市入学条件的学生，可选择市直属幼儿园或区直属幼儿园就读，两者只能选其一。</li>
                <li>2、参加学校组织的网上报名获取学位之后，幼儿园在官网公布名单，家长查看名单，之后按照名单以及公布的摇号时间和地点去参与摇号。</li>
                <li>3、摇号结束，学校在官网或在摇号现场向家长公布拟录取名单以及补录名单。</li>
                <li>4、幼儿园将通知审核通过的监护人，携带幼儿前往指定医院做入园体检。</li>
                <li>5、幼儿园向体检合格的幼儿发放录取通知。</li>
            </ul>
            <div class="lcheckbox">
                <van-checkbox v-model="checked" icon-size="16px">我已阅读上文</van-checkbox>
            </div>
        </div>
        <!-- 按钮 -->
        <div class="btn" @click="nextDown">
            <van-button color="#498ef5" size="large">{{content}}</van-button>
        </div>
    </div>
</template>

<script>
import {
        Toast
    } from 'vant';
    export default {
        data() {
            return {
                checked: false,
                totalTime: 60,
                content: '',
                canClick: true
            }
        },
        created() {
            if (!this.canClick) return
            this.canClick = false
            this.content = this.totalTime + 's'
            let clock = window.setInterval(() => {
                this.totalTime--
                this.content = this.totalTime + 's'
                if (this.totalTime < 0) {
                    window.clearInterval(clock)
                    this.content = '下一步'
                    this.totalTime = 10
                    this.canClick = true //这里重新开启
                }
            }, 1000)
        },
        methods: {
            nextDown() {
               if (!this.canClick) return 
               if(!this.checked){
                   Toast('您未点击我已阅读');
               }else{
                    this.$router.push({
                        path: '/home/registry'
                    })
               }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .need_kown {
        padding-right: 25px;
        padding-left: 25px;
        padding-bottom: 25px;
        background: #fff;
        .title {
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
            .title-top {
                font-size: 40px;
                text-align: center;
            }
            .title-right {
                text-align: right;
                color: #999;
            }
        }
        .content {
            line-height: 50px;
            font-size: 30px;
            .lcheckbox {
                margin-top: 25px;
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
</style>