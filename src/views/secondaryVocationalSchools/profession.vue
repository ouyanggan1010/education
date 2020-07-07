
<template>
    <div class="write_information">
        <van-nav-bar title="专业介绍" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="main">
            <h3 class="header_notice">
                {{title}}专业说明
            </h3>
            <div class="cells">
                {{detail.professionBrief}}
            </div>
        </div>
    </div>
</template>

<script>
	export default {
        data() {
            return {
                detail:{},
                title:''   
            }
        },
        created() {
            const midId =  this.$route.params.midId;
            this.title = this.$route.params.professionName
            this.getProfession(midId)
        },
        methods: {
            async  getProfession(midId){
                const res = await this.$http.get(`/mobile/school/mid/profession/${midId}`);
                if(res.data.code === 0){
                    this.detail = res.data.data
                    // console.log(this.detail)
                }
            }
        }
	}
</script>

<style lang="scss" scoped>
    .write_information {
        height: 100%;
        .main{
            height: 90%; 
            .header_notice{
                padding: 25px;
                font-size: 30px;
                font-weight: normal;
                text-align: center;
            }
          .cells {
                background: #fff; 
                line-height: 60px;
                padding: 25px;
                min-height: 100%;    
          }
        }
    }
</style>