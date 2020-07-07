
<template>
  <div class="editPassword">
    <van-nav-bar title="修改手机号码" fixed @click-left="$router.back()" class="navBar">
      <template #left>
        <van-icon name="arrow-left" color="#498ef5" size="26" />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <van-form validate-first @failed="onFailed" @submit="onSubmit" class="cnt">
      <div class="inputDiv">
        <div class="sprite sprite-phone"></div>
        <van-field
          type="number"
          v-model="scPhonenumber"
          name="scPhonenumber"
          placeholder="请输入手机号"
          :rules="[{ required: true,pattern:/^1[34578]\d{9}$/, message:'手机号输入有误' }]"
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
      scPhonenumber: ""
    };
  },
  computed: {},
  filters: {},
  methods: {
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
          const res = await this.$http.put("/mobile/user/updatePhone", {
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