
<template>
  <div class="personalSafe">
    <van-nav-bar title="安全中心" fixed @click-left="$router.back()" class="navBar">
      <template #left>
        <van-icon name="arrow-left" color="#498ef5" size="26" />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <div class="safeCnt">
      <!-- 用户信息 -->
      <div class="personalMesg">
        <div class="avatar">
          <van-image
            round
            fit="fill"
            width="1.9733rem"
            height="1.9733rem"
            :src="personal.avatar"
            v-if="personal.avatar"
          />
          <div class="sprite sprite-personal-my" v-else></div>
        </div>
        <div class="name">{{personal.scUserName}}</div>
      </div>
      <!-- 单元格 -->
      <div class="cells">
        <!-- 填写手机号码 -->
        <van-cell title="修改手机号码" is-link to="/personal/safe/addPhone" />
        <!-- 修改登录密码 -->
        <van-cell title="修改登录密码" is-link to="/personal/safe/editPassword" />
      </div>
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
        avatar: ""
      }
    };
  },
  computed: {},
  filters: {},
  methods: {
    // 获取用户信息
    async getUser() {
      try {
        const idNumber = localStorage.idNumber;
        if (idNumber) {
          const res = await this.$http.get(`/mobile/user/userinfo/${idNumber}`);
          if (res.data.code === 0) {
            const { scUserName, avatar } = res.data.data;
            this.personal = {
              scUserName,
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
.personalSafe {
  .safeCnt {
    .personalMesg {
      padding-top: 82px;
      text-align: center;
      color: #363636;
      .name {
        font-size: 36px;
        padding-top: 22px;
      }
      .avatar {
        img {
          width: 148px;
          height: 148px;
          border-radius: 50%;
        }
      }
    }
    .cells {
      margin-top: 60px;
    }
  }
}
</style>