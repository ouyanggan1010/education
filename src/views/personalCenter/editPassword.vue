
<template>
  <div class="editPassword">
    <van-nav-bar title="修改密码" fixed @click-left="$router.back()" class="navBar">
      <template #left>
        <van-icon name="arrow-left" color="#498ef5" size="26" />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <van-form validate-first @failed="onFailed" @submit="onSubmit" class="cnt">
      <div class="inputDiv">
        <div class="sprite sprite-password"></div>
        <van-field
          v-model="password"
          name="password"
          placeholder="请填写原密码"
          :rules="[{ required: true, message:'原密码输入有误' }]"
        />
      </div>
      <div class="inputDiv">
        <div class="sprite sprite-password"></div>
        <van-field
          type="password"
          v-model="newpassword"
          name="newpassword"
          placeholder="包含字母和数字，8~20位"
          :rules="[{ required: true, message:'新密码输入有误' }]"
        />
      </div>
      <div class="inputDiv">
        <div class="sprite sprite-password"></div>
        <van-field
          type="password"
          v-model="confirmpassword"
          name="confirmpassword"
          placeholder="请再次输入密码"
          :rules="[{ required: true,validator, message:'确认新密码输入有误' }]"
        />
      </div>
      <div class="mx-20" style="margin-top: 100px">
        <van-button color="#498ef5" block type="info" native-type="submit">保存</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      password: "", //老密码
      newpassword: "", //新密码
      confirmpassword: "" //确认密码
    };
  },
  computed: {},
  filters: {},
  methods: {
    // 校验两次密码是否相等
    validator(val) {
      const { newpassword, confirmpassword } = this;
      return /\S{6,}/.test(val) && newpassword === confirmpassword;
    },
    // ------提交表单数据
    async onSubmit(values) {
      try {
        // 得到数据，并发送请求；这里仅模拟
        this.$toast.loading({
          duration: 0,
          message: "提交中...",
          forbidClick: true
        });
        const _this = this;
        const scUserId = localStorage.scUserId;
        if (scUserId) {
          const res = await this.$http.put("/mobile/user/updatePassword", {
            scUserId,
            ...values
          });
          this.$toast.clear();
          if (res.data.code === 0) {
            this.$toast.success({
              duration: 1000,
              message: "保存成功",
              forbidClick: true,
              onClose() {
                _this.$router.back();
              }
            });
          } else {
            this.$toast.fail(res.data.msg);
          }
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    },
    // ------表单校验错误
    onFailed() {
      this.$toast.fail("输入有误！");
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.editPassword {
  .cnt {
    padding-top: 20px;
    .inputDiv {
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 54px;
      margin-top: 20px;
    }
  }
}
</style>