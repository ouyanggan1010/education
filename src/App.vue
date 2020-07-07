
<template>
  <div id="app" v-cloak>
    <router-view v-wechat-title="$route.meta.title"></router-view>
    <van-tabbar route v-model="active" active-color="#0099FF" inactive-color="#000" v-if="$route.meta.footShow">
        <van-tabbar-item name="home" replace to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="personal" replace to="/personal" icon="friends-o">个人中心</van-tabbar-item>
    </van-tabbar>
    
  </div>
</template>

<script>
/* eslint-disable */
    export default {
      data() {
            return {
            tabbarShow:false,  
            active: "home",
            icon: {
                active: 'https://img.yzcdn.cn/vant/user-active.png',
                inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
            },
          }
      },
      methods: {
            
      },
      watch:{
        // $route(to, from){
        //   //判断是否显示tabbar
        //   if(to.path == '/home' || to.path == '/personal'){
        //     this.tabbarShow = true;
        //   }else{
        //     this.tabbarShow = false;
        //   }
        // }
      }
    }
</script>

<style lang="scss">
  #app{
    // 默认的字体大小
    font-size: 20px;
    height: 100%;
    width: 100%;
    position: relative;
    padding-top: 92px;
  }
  [v-cloak] {
  display: none !important;
}
</style>
