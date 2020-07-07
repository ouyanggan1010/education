
<template>
    <div class="registry">
        <van-nav-bar title="幼儿园入学申请登记" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="registry_list">
            <h2 class="block_title">选择学区</h2>
            <!-- 单元格 -->
            <div class="cells">
                <van-radio-group v-model="radio">
                    <van-cell title-class="d-flex ai-center" is-link clickable  v-for="(item,index) in scAreaList" :key="item.scAreaValue">
                        <template #title>
                            <van-radio :name="index + 1" class="text_size">{{item.scArea}}</van-radio>
                        </template>
                    </van-cell>
                    <!-- <van-cell  title-class="d-flex ai-center">
                        <template #title>
                            <div class="pl-10 text_size">龙华区直属</div>
                        </template>
                    </van-cell>
                    <van-cell title-class="d-flex ai-center" >
                        <template #title>
                            <div class="pl-10 text_size">琼山区直属</div>
                        </template>
                    </van-cell> -->
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
            radio:0,
            scAreaList:[]
        }
    },
    created(){
        this.$toast.loading({
            message:'加载中...',
            duration:0,
            closeOnClick:false
        });
        this.getDistrict()
    },
    methods: {
        nextStep() {
            // console.log(this.radio)
            if(this.radio === 0){
                 this.$toast({ 
                    duration: 1000,
                    message: "还未选择",
                    forbidClick: true
                })
            }else{
                let scArea = ''; 
                switch (this.radio) {
                    case 1 : scArea = "1" //市直属
                    break;
                    case 2: scArea = "2" //龙华区直属
                    break;
                    case 3 : scArea = "3" //美兰区直属
                    break;
                    case 4 : scArea = "4" //秀英区直属
                    break;
                    case 5: scArea = "5" //琼山区直属
                    break;
                } 
                if(localStorage.getItem('scArea')){
                    localStorage.removeItem("scArea");
                    localStorage.setItem('scArea',scArea)
                }else{
                    localStorage.setItem('scArea',scArea)
                }
                this.$router.push({
                    path: '/home/kindergarten/selectSchool',
                    name: 'SelectSchool',
                    params: { "scArea": scArea }
                })
            }
           
           
        },
        async getDistrict() {
            const res = await this.$http.get('/mobile/school/kindergarten/area');
            if(res.data.code == 0 ){
                this.$toast.clear()
                this.scAreaList = res.data.data
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .block_title{
        padding: 32px;
        font-weight: normal;
        font-size: 40px;
        line-height: 28px;
        text-align: center;
    }
    .text_size{
        font-size: 35px;
        width: 90%;
    }
    .btn {
        width: 100%;
        position: absolute;
        bottom: 40px;
        left: 0;
        padding: 0 30px;
    }
</style>