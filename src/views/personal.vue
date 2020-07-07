<template>
  <div class="personal">
    <van-nav-bar title="个人中心" fixed class="navBar" />
    <!-- 个人信息 -->
    <div class="information">
      <div class="avatar">
        <van-image
          round
          fit="fill"
          width="1.9733rem"
          height="1.9733rem"
          :src="personal.avatar"
          v-if="personal.avatar"
        />
        <!-- <img :src="personal.avatar" v-if="personal.avatar" /> -->
        <div class="sprite sprite-personal-my" v-else></div>
      </div>
      <div class="text">
        <div>{{personal.scUserName}}</div>
        <div class="mt-15">{{personal.scPhonenumber | formatPhone}}</div>
      </div>
    </div>
    <!-- 单元格 -->
    <div class="cells">
      <!-- 个人信息 -->
      <van-cell is-link title-class="d-flex ai-center" to="/personal/information">
        <template #title>
          <div class="sprite sprite-person"></div>
          <div class="pl-10">个人信息</div>
        </template>
      </van-cell>
      <!-- 安全中心 -->
      <van-cell is-link title-class="d-flex ai-center" to="/personal/safe">
        <template #title>
          <div class="sprite sprite-safety"></div>
          <div class="pl-10">安全中心</div>
        </template>
      </van-cell>
      <!-- 家庭成员 -->
      <van-cell is-link title-class="d-flex ai-center" class="mt-25" to="/personal/familyMember">
        <template #title>
          <div class="sprite sprite-family"></div>
          <div class="pl-10">家庭成员</div>
        </template>
      </van-cell>
      <!-- 我的申报 -->
      <van-cell is-link title-class="d-flex ai-center" class="mt-25" to="/personal/myDeclaration">
        <template #title>
          <div class="sprite sprite-report"></div>
          <div class="pl-10">我的申报</div>
        </template>
      </van-cell>
    </div>
    <!-- 按钮 -->
    <div class="btn">
      <van-button color="#FE5A5A" size="large" @click="signOut">退出登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      personal: {
        scUserName: "",
        scPhonenumber: "",
        avatar: ""
      }
    };
  },
  filters: {
    formatPhone(val) {
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
    // ---------------------------请求函数--------------------------- //
    // 退出登录
    signOut() {
      const _this = this;
      this.$dialog
        .confirm({
          title: "退出登录",
          message: "是否确认退出当前登录状态？"
        })
        .then(async () => {
          _this.$toast.loading({
            duration: 0,
            message: "正在退出...",
            forbidClick: true
          });
          const res = await this.$http.get("/mobile/user/exit");
          this.$toast.clear();
          if (res.data.code === 0) {
            // 清空所有缓存
            localStorage.clear();
            this.$toast.success({
              duration: 1000,
              message: "退出成功",
              forbidClick: true,
              onClose() {
                _this.$router.push("/login");
              }
            });
          } else {
            this.$toast.fail(res.data.msg);
          }
        })
        .catch(() => {
          console.log("点击取消");
        });
    },
    // 获取用户信息
    async getUser() {
      try {
        const idNumber = localStorage.idNumber;
        if (idNumber) {
          const res = await this.$http.get(`/mobile/user/userinfo/${idNumber}`);
          if (res.data.code === 0) {
            const { scUserName, scPhonenumber, avatar } = res.data.data;
            this.personal = {
              scUserName,
              scPhonenumber,
              avatar
            };
          } else {
            this.$toast.fail(res.data.msg);
          }
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style lang="scss" scoped>
.personal {
  position: relative;
  width: 100%;
  height: calc(100% - 100px);
  .information {
    width: 100%;
    height: 280px;
    background: url(../assets/images/profilebg_02.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    padding: 0 60px;
    .avatar {
      width: 148px;
      height: 148px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .text {
      font-size: 36px;
      color: #fff;
      margin-left: 30px;
    }
  }
  .btn {
    width: 100%;
    position: absolute;
    bottom: 40px;
    left: 0;
    padding: 0 30px;
  }
}
</style>