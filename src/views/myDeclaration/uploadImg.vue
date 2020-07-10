
<template>
  <div class="uploadImg">
    <van-nav-bar title="上传图片" fixed @click-left="$router.back()" class="navBar">
      <template #left>
        <van-icon name="arrow-left" color="#498ef5" size="26" />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <div class="cells">
      <!-- 红色提示 -->
      <div class="redTips">所上传的资料必须真实，如提供虚假信息，将导致登记无效。</div>
      <div class="upload">
        <!-- 标题：摇中信息 -->
        <div class="title">
          <div class="line"></div>
          <div>{{item.name}}</div>
        </div>
        <van-uploader :after-read="afterRead" :max-size="10 * 1024 * 1024" class="mt-20">
          <van-button icon="photo" color="#1989fa" block plain size="small" type="primary">上传文件</van-button>
        </van-uploader>
        <div class="images">
          <div class="imgList" v-for="(item,j) in imgList" :key="j" @click.stop="lookImg(j)">
            <van-icon
              name="clear"
              size="0.5rem"
              color="#dd5345"
              class="clearImg"
              @click.stop="imgList.splice(j,1)"
            />
            <van-image width="100%" height="100%" :src="item" />
          </div>
        </div>
      </div>
      <div class="mt-60 mb-50 mx-20">
        <van-button color="#498ef5" block type="info" @click="safeImgs">上传完成</van-button>
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
      // 标识字段
      item: {
        name: "",
        variable: ""
      },
      // 上传成功后返回过来的图片路径数组
      imgList: []
    };
  },
  computed: {},
  filters: {},
  methods: {
    // ---------------------------------事件函数-------------------------- //
    // 预览图片
    lookImg(index) {
      console.log(this.imgList);
      this.$imagePreview({
        images: this.imgList,
        startPosition: index
      });
    },
    // 点击上传完成
    safeImgs() {
      this.$toast.loading({
        duration: 0,
        message: "上传中...",
        forbidClick: true
      });
      const _this = this;
      let dataStr = localStorage.uploadData;
      let dataObj = {};
      if (dataStr) {
        dataObj = JSON.parse(dataStr);
      } else {
        dataObj = {
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
        };
      }
      dataObj[this.item.variable] = this.imgList.join("|");

      localStorage.uploadData = JSON.stringify(dataObj);
      setTimeout(() => {
        // 成功提示
        this.$toast.success({
          duration: 1000,
          message: "上传资料成功",
          forbidClick: true,
          onClose() {
            _this.$router.back();
          }
        });
      }, 500);
    },
    // ---------------------------------请求函数-------------------------- //
    // 图片上传
    async afterRead(imgs) {
      try {
        // 这里写上传函数，获取到后台返回的数据
        var formData = new FormData();
        formData.append("file", imgs.file);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        const res = await this.$http.post(
          "/mobile/user/common/upload",
          formData,
          config
        );
        if (res.data.code === 0) {
          this.imgList.push(res.data.fileName);
        } else {
          this.$toast.fail(res.data.msg);
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    }
  },
  created() {
    this.item = this.$route.query;
    // 判断是否有上传的图片缓存
    const dataStr = localStorage.uploadData;
    if (dataStr) {
      const dataObj = JSON.parse(dataStr);
      if (dataObj[this.item.variable] && dataObj[this.item.variable] != "") {
        this.imgList = dataObj[this.item.variable].split("|");
      } else {
        this.imgList = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.uploadImg {
  .cells {
    .redTips {
      padding: 15px 20px;
      color: #ec7676;
      font-size: 26px;
      line-height: 40px;
    }
    .upload {
      background-color: #fff;
      padding: 0 20px 20px 20px;
      min-height: 400px;
      .title {
        padding: 20px 0;
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
      }
      .images {
        margin-top: 20px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 10px;
        width: 100%;
        .imgList {
          margin: 15px 0;
          position: relative;
          width: 148px;
          height: 148px;
          background: #f5f6fa;
          margin-right: calc((100% - (148px * 4) - 40px) / 2);
          &:nth-child(4n) {
            margin-right: 0;
          }
        }
        .clearImg {
          position: absolute;
          top: -10px;
          right: -10px;
          z-index: 3;
        }
      }
    }
  }
}
</style>