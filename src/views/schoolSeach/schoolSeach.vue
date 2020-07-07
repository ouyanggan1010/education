
<template>
    <div class="school">
        <van-nav-bar title="学校查询" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <van-tabs v-model="active" sticky  color="#498ef5" title-active-color="#66a1fb" @click="onClick">
            <van-tab title="幼儿园">
                <SearchList :index = "active" @showSchoolDetail = "schoolDetail" ref="downFresh"></SearchList>
            </van-tab>
            <van-tab title="小学">
                <!-- <van-empty description="开发中" /> -->
                <SearchList :index = "active" @showSchoolDetail = "schoolDetail" ref="downFresh"></SearchList>
            </van-tab>
            <van-tab title="初中">
                <!-- <van-empty description="开发中" /> -->
                <SearchList :index = "active" @showSchoolDetail = "schoolDetail" ref="downFresh"></SearchList>
            </van-tab>
            <van-tab title="中职">
                <SearchList :index = "active" @showSchoolDetail = "schoolDetail" ref="downFresh"></SearchList>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import SearchList from '../../components/tabContent/searchList'
export default {
  components:{
      SearchList
  },
  data() {
    return {
        active: 0
    };
  },
  created() {
  },
  methods:{
    onClick() {
    //   console.log(this.$refs.downFresh)
    },  
    schoolDetail(scId){
        console.log(scId)
        if(scId.index == 3){
            this.$router.push({
               path: '/home/schoolIntroduce',
                name: 'SchoolIntroduce',
                params: { "scId": scId.scId }
            })
        }else{
           this.$router.push({
                path: '/schoolSeachDetail',
                name: 'SchoolDetail',
                params: { "scId": scId.scId }
            }) 
        }
    }
  }
};
</script>

<style lang="scss" scoped>
    .school{
        position: relative;
        background: #f4f6fa;
        height: 100%;
    }
</style>