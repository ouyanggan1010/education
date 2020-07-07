
<template>
  <div class="familyMember">
    <van-nav-bar title="家庭成员" fixed @click-left="$router.back()" class="navBar">
      <template #left>
        <van-icon name="arrow-left" color="#498ef5" size="26" />
      </template>
    </van-nav-bar>
    <!-- 下拉刷新 -->
    <van-pull-refresh class="pull" v-model="isLoading" @refresh="onRefresh">
      <!-- 内容 -->
      <div class="refreshList" v-show="!showCnt && famailys.length>0">
        <div class="list" v-for="(item,index) in famailys" :key="index">
          <div class="name mt-20">{{item.name}}</div>
          <div class="mt-30">我的：{{item.reasionShip}}</div>
          <div class="mt-30">证件号码：{{item.idCard}}</div>
          <!-- <router-link class="edit" to="/personal/familyMember/editFamily">
            <div class="mr-10">编辑</div>
            <div class="sprite sprite-personal-edit"></div>
          </router-link>-->
        </div>
      </div>
      <!-- 没有数据 -->
      <div class="noMessage" v-show="showCnt">
        <div class="sprite sprite-search"></div>
        <div class="tips">暂无数据</div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      // 暂无数据的显示隐藏
      showCnt: false,
      // 下拉刷新的显示隐藏
      isLoading: false,
      // 请求过来的数据
      famailys: [
        // {
        //   id:"",
        //   name: "张小虎",
        //   reasionShip: "妻子",
        //   idCard: "123456"
        // }
      ]
    };
  },
  computed: {
    // 暂无数据的显示隐藏
    // showCnt() {
    //   return this.famailys.length > 0 ? false : true;
    // }
  },
  filters: {
    // 身份证显示
    idNumberChange(val) {
      let newVal = val;
      if (val.length > 4) {
        const str = val.substring(2, val.length - 2);
        let start = "";
        for (let i = 0; i < str.length; i++) {
          start += "*";
        }
        newVal = val.substring(0, 2) + start + val.substring(val.length - 2);
      }
      return newVal;
    }
  },
  methods: {
    // ---------------------------事件函数--------------------------- //
    async onRefresh() {
      try {
        const res = await this.$http.get("/mobile/user/family");
        setTimeout(() => {
          if (res.data.code === 0) {
            this.famailys = res.data.data;
            this.showCnt = this.famailys.length > 0 ? false : true;
          } else {
            this.$toast.fail(res.data.msg);
          }
          this.isLoading = false;
        }, 500);
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    },
    // ---------------------------请求函数--------------------------- //
    async getFamaily() {
      this.$toast.loading({
        duration: 0,
        message: "获取列表中...",
        forbidClick: true
      });
      try {
        const res = await this.$http.get("/mobile/user/family");
        if (res.data.code === 0) {
          this.famailys = [];
          if (
            Object.prototype.toString.call(res.data.data) == "[object Array]"
          ) {
            this.famailys = res.data.data;
          }
          this.showCnt = this.famailys.length > 0 ? false : true;
          this.$toast({
            type: this.showCnt ? "fail" : "success",
            duration: 1000,
            message: this.showCnt ? "暂无数据" : "获取列表成功",
            forbidClick: true
          });
        } else {
          this.$toast.fail(res.data.msg);
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    }
  },
  created() {
    this.getFamaily();
  }
};
</script>

<style lang="scss" scoped>
.familyMember {
  width: 100%;
  height: 100%;
  .pull {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .refreshList {
    width: 100%;
    padding: 0 30px 30px 30px;
    .list {
      border-radius: 2%;
      background-color: #fff;
      width: 100%;
      padding: 20px 20px 60px 20px;
      font-size: 26px;
      color: #888888;
      position: relative;
      margin-top: 25px;
      .name {
        font-size: 34px;
        color: #333333;
      }
      .edit {
        position: absolute;
        right: 20px;
        top: 15px;
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #498ef5;
      }
    }
  }
  .noMessage {
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .tips {
      color: #888888;
      font-size: 34px;
      margin-top: 20px;
    }
  }
}
</style>