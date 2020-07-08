
<template>
    <div class="registry">
        <van-nav-bar title="幼儿园入学申请登记" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="registry_list">
            <!-- 单元格 -->
            <div class="cells">
                <van-radio-group v-model="radio">
                    <!-- 海口户籍 -->
                    <van-cell  title-class="d-flex ai-center" clickable  v-for="(item,index) in list" :key="index">
                        <template #title>
                            <van-radio :name="index + 1" class="text_size">{{item.census}}</van-radio>
                        </template>
                    </van-cell>
                    <!-- 非海口户籍 -->
                    <!-- <van-cell is-link title-class="d-flex ai-center">
                        <template #title>
                            <div class="pl-10 text_size">非海口市户籍适龄幼儿</div>
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
            list:[
                {census:'海口市户籍适龄幼儿'},
                {census:'非海口市户籍适龄幼儿'}
            ]
        }
    },
    methods: {
         nextStep() {
             if(this.radio === 0 ){
                 this.$toast({ 
                    duration: 1000,
                    message: "还未选择",
                    forbidClick: true
                })
             }else{
                 this.$router.push({
                    path: '/home/selectSchoolDistrict'
                })
             }
            let census = ''; 
            switch (this.radio) {
                case 1 : census = "海口市户籍" //海口市户籍
                break;
                case 2: census = "非海口市户籍" //非海口市户籍
                break;
            } 
            if(localStorage.getItem('census')){
                localStorage.removeItem("census");
                localStorage.setItem('census',census)
            }else{
                localStorage.setItem('census',census)
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .text_size{
        font-size: 35px;
        width: 95%;
    }
    .btn {
        width: 100%;
        position: absolute;
        bottom: 40px;
        left: 0;
        padding: 0 30px;
    }
</style>