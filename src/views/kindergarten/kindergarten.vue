
<template>
    <div class="user-instruction"> 
        <van-nav-bar title="幼儿园入学申请登记" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="instruction">
            <div class="guideBg">
                <img src="../../assets/images/guide.png" width="80%" height="100%" alt="">
            </div>
            <!-- 按钮 -->
            <div class="btn" @click="nextStep" style="margin: 40px 20px 0 20px;">
                <van-button color="#498ef5" size="large">下一步</van-button>
            </div>
        </div>
    </div> 
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        nextStep () {
           this.$router.push({
                path: '/home/kindergartenNeed'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.user-instruction{
    height: 100%;
    .instruction{
        height: 80%;
        padding: 25px;
        .guideBg{
            height: 100%;
            img{
                display: block;
                margin: 0 auto;
            }
        }
    }
}
    
</style>