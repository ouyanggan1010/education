
<template>
  <div class="uploadImg">
    <van-nav-bar title="资料文件" fixed @click-left="$router.back()" class="navBar">
      <template #left>
        <van-icon name="arrow-left" color="#498ef5" size="26" />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <div class="cells">
      <div class="upload">
        <div class="images">
          <div class="imgList" v-for="(item,j) in imgList" :key="j" @click.stop="lookImg(j)">
            <van-icon
              name="clear"
              size="0.5rem"
              color="#dd5345"
              class="clearImg"
              @click.stop="imgList.splice(j,1)"
            />
            <van-image width="100%" height="100%" :src="item.fileName" />
          </div>
        </div>
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
      // 返回过来的图片路径数组
      imgList: []
    };
  },
  computed: {},
  filters: {},
  methods: {
    // 预览图片
    lookImg(index) {
      console.log(this.imgList);
      this.$imagePreview({
        images: this.imgList,
        startPosition: index
      });
    }
  },
  created() {
    this.item = this.$route.query;
    // 判断是否有图片缓存
    const dataStr = localStorage.applyFileData;
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