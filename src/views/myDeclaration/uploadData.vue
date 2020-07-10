
<template>
  <div class="uploadData">
    <van-nav-bar title="上传资料" fixed @click-left="$router.back()" class="navBar">
      <template #left>
        <van-icon name="arrow-left" color="#498ef5" size="26" />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <van-form @submit="onSubmit" class="cells">
      <!-- 红色提示 -->
      <div class="redTips">所上传的资料必须真实，如提供虚假信息，将导致登记无效。</div>
      <!-- 标题：摇中信息 -->
      <div class="title">
        <div class="line"></div>
        <div>摇中信息</div>
      </div>
      <!-- 直属 -->
      <van-field v-model="model.applySchool" :label="schoolAreaChange" readonly />
      <!-- 标题：上传申请就学所需的材料 -->
      <div class="title">
        <div class="line"></div>
        <div>上传申请就学所需的材料</div>
      </div>
      <!-- 居住证/房产证/工作证 -->
      <van-cell
        v-for="(item,j) in titleList"
        :key="j"
        :title="item.name"
        is-link
        :to="{path:'/personal/uploadData/uploadImg',query:item}"
      />
      <div class="mt-60 mb-50 mx-20">
        <van-button color="#498ef5" block type="info" native-type="submit">提交</van-button>
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
      pathTo: "",
      // 存储标题
      titleList: [
        {
          name: "监护人与孩子的户口簿",
          variable: "custodianChildAccountImages"
        },
        {
          name: "出生证明",
          variable: "birthCertificateImages"
        },
        {
          name: "监护人身份证",
          variable: "custodianIdCardImages"
        },
        {
          name: "预防接种本",
          variable: "vaccinationImages"
        },
        {
          name: "居住证/房产证/工作证",
          variable: "proveImages"
        }
      ],
      model: {
        applyId: "",
        schoolArea: "",
        applySchool: "",
        imagesReq: {
          // 监护人与孩子的户口簿的图片数组
          custodianChildAccountImages: "",
          // 出生证明的图片数组
          birthCertificateImages: "",
          // 监护人身份证的图片数组
          custodianIdCardImages: "",
          // 预防接种本的图片数组
          vaccinationImages: "",
          // 居住证/房产证/工作证的图片数组
          proveImages: ""
        }
      }
    };
  },
  computed: {
    // 学校区域
    schoolAreaChange() {
      const str = this.model.schoolArea + "";
      let val = "";
      switch (str) {
        case "1":
          val = "市直属";
          break;
        case "2":
          val = "龙华区直属";
          break;
        case "3":
          val = "美兰区直属";
          break;
        case "4":
          val = "秀英区直属";
          break;
        case "5":
          val = "琼山区直属";
          break;
      }
      return val;
    }
  },
  filters: {},
  methods: {
    // -------------------------请求相关的函数-------------------------//
    // ----提交form表单
    async onSubmit() {
      try {
        // 得到数据，并发送请求；这里仅模拟
        this.$toast.loading({
          duration: 0,
          message: "提交中...",
          forbidClick: true
        });
        const _this = this;
        await this.$http.post(
          `/mobile/user/${this.model.applyId}/uploadImage`,
          this.model.imagesReq
        );
        this.$toast.success({
          duration: 1000,
          message: "提交成功",
          forbidClick: true,
          onClose() {
            _this.$router.back();
          }
        });
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    }
  },
  async created() {
    this.model = { ...this.model, ...this.$route.query };
    if (localStorage.pathTo === "/personal/myDeclaration") {
      const res = await this.$http.get(
        `/mobile/user/getApplyFileDetailById/${this.model.applyId}`
      );
      if (res.data.code === 0) {
        const imgsData = res.data.data;
        const imagesReq = {
          // 监护人与孩子的户口簿的图片数组
          custodianChildAccountImages: imgsData.custodianChildAccountImages
            ? imgsData.custodianChildAccountImages
            : "",
          // 出生证明的图片数组
          birthCertificateImages: imgsData.birthCertificateImages
            ? imgsData.birthCertificateImages
            : "",
          // 监护人身份证的图片数组
          custodianIdCardImages: imgsData.custodianIdCardImages
            ? imgsData.custodianIdCardImages
            : "",
          // 预防接种本的图片数组
          vaccinationImages: imgsData.vaccinationImages
            ? imgsData.vaccinationImages
            : "",
          // 居住证/房产证/工作证的图片数组
          proveImages: imgsData.proveImages ? imgsData.proveImages : ""
        };
        localStorage.uploadData = JSON.stringify(imagesReq);
      } else {
        // 清除上传图片的数据
        localStorage.uploadData = "";
      }
    }
    // 判断是否有上传的图片缓存
    const dataStr = localStorage.uploadData;
    if (dataStr) {
      this.model.imagesReq = JSON.parse(dataStr);
    }
  },
  // 进入路由之前执行的函数
  async beforeRouteEnter(to, from, next) {
    localStorage.pathTo = from.path;
    next();
  }
};
</script>

<style lang="scss" scoped>
.uploadData {
  .cells {
    .redTips {
      padding: 15px 20px;
      color: #ec7676;
      font-size: 26px;
      line-height: 40px;
    }
    .title {
      padding: 20px;
      background-color: #fff;
      font-size: 30px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #d7d7d7;
      .line {
        background-color: #498ef5;
        width: 8px;
        height: 40px;
        margin-right: 15px;
      }
      .remarks {
        font-size: 20px;
        color: #ccc9c9;
        margin-left: 15px;
      }
    }
  }
}
</style>