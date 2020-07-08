
<template>
  <div class="myDeclaration">
    <van-nav-bar title="我的申报" fixed @click-left="$router.back()" class="navBar">
      <template #left>
        <van-icon name="arrow-left" color="#498ef5" size="26" />
      </template>
    </van-nav-bar>
    <!-- 下拉刷新 -->
    <van-pull-refresh class="pull" v-model="isLoading" @refresh="onRefresh">
      <!-- 内容 -->
      <div class="refreshList" v-show="!showCnt && list.length>0">
        <!-- 状态(0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交 -->
        <div class="list" v-for="(item,index) in list" :key="index">
          <div class="name mt-20">{{item.name}}</div>
          <!-- 录取学校：已摇中--资料已提交 -->
          <div
            class="mt-30"
            v-if="item.childState==5 && item.uploadImages==0"
          >录取学校：{{item.schoolArea}}{{item.applySchool}}</div>
          <!-- 申请类型：除了已摇中--资料已提交 -->
          <div
            class="mt-30 d-flex ai-center"
            v-if="item.childState!=5 || item.uploadImages!=0"
          >申请类型：{{item.schoolArea | schoolAreaChange}}</div>
          <div class="mt-30 d-flex ai-center">
            当前状态：
            <!-- 不同状态的四个颜色 statusGray statusGreen statusRed statusBlue -->
            <!-- 信息未提交 -->
            <div class="statusGray" v-if="item.childState==8">信息未提交</div>
            <!-- 信息待核实 -->
            <div class="statusGreen" v-if="item.childState==0">信息待核实</div>
            <!-- 信息核实中 -->
            <div class="statusGreen" v-if="item.childState==1">信息核实中</div>
            <!-- 信息已核实 -->
            <div class="statusBlue" v-if="item.childState==2">信息已核实</div>
            <!-- 信息未通过核实 -->
            <div class="statusBlue" v-if="item.childState==3">信息未通过核实</div>
            <!-- 已摇中：资料未上传 -->
            <div class="statusGreen" v-if="item.childState==5 && item.uploadImages==1">已摇中</div>
            <!-- 已摇中---资料已上传 资料核实：0通过 1未通过 2核实中 3待核实 -->
            <!-- 资料待核实 -->
            <div class="statusGreen" v-if="item.childState==5 && item.verifyStatus==3">资料待核实</div>
            <!-- 资料核实中 -->
            <div class="statusGreen" v-if="item.childState==5 && item.verifyStatus==2">资料核实中</div>
            <!-- 资料已核实 -->
            <div class="statusBlue" v-if="item.childState==5 && item.verifyStatus==0">资料已核实</div>
            <!-- 资料未通过核实 -->
            <div class="statusRed" v-if="item.childState==5 && item.verifyStatus==1">资料未通过核实</div>

            <!-- 已摇中：资料未上传 学校某某幼儿园 -->
            <div
              class="tips ml-25"
              v-if="item.childState==5 && item.uploadImages==1"
            >{{item.applySchool}}</div>

            <!-- 摇中后补 -->
            <div class="statusGreen" v-if="item.childState==7">摇中后补（{{item.backLotteryNum}}）号</div>
            <!-- 未摇中 -->
            <div class="statusRed" v-if="item.childState==6">未摇中</div>
          </div>
          <!-- 编辑：未提交，待核实 -->
          <router-link
            class="edit"
            v-if="item.childState==0 || item.childState==8"
            :to="{path:'/home/kindergarten/editInformation',name:'EditInformation',params:{applyId:item.applyId}}"
          >
            <div class="mr-10">编辑</div>
            <div class="sprite sprite-personal-edit"></div>
          </router-link>
          <!-- 修改：未通过核实 -->
          <router-link
            class="edit"
            v-if="item.childState==3"
            :to="{path:'/home/kindergarten/editInformation',name:'EditInformation',params:{applyId:item.applyId}}"
          >
            <div class="mr-10">修改</div>
            <div class="sprite sprite-personal-edit"></div>
          </router-link>
          <!-- 详情：核实中，已核实，已摇中，摇中后补，未摇中 -->
          <router-link
            class="edit"
            v-if="item.childState==1 || item.childState==2 || item.childState==5 || item.childState==7 || item.childState==6"
            :to="{path:'/home/lookInformation',name: 'LookInformation',params:{applyId:item.applyId,type:'1'}}"
          >
            <div class="mr-10">详情</div>
            <div class="sprite sprite-detail"></div>
          </router-link>
          <!-- 查看原因：弹框 未通过核实，已摇中--资料未通过核实 -->
          <div
            class="lookMesg"
            v-if="item.childState==3 || (item.childState==5 && item.verifyStatus==1)"
            @click="lookReason(item)"
          >
            <div class="sprite sprite-personal-check"></div>
            <div class="ml-10">查看原因</div>
          </div>
          <!-- 查看消息（已读、未读）：弹框 已摇中（未上传资料） -->
          <div
            class="lookMesg"
            v-if="item.childState==5 && item.uploadImages==1"
            @click="lookMesg(item.applyId)"
          >
            <!-- 查看消息：1未发送 2未读 3已读 -->
            <div class="sprite sprite-msg-red" v-if="item.msgStatus == 2"></div>
            <div class="ml-10 statusRed" v-if="item.msgStatus == 2">未读消息</div>
            <!-- 已读 -->
            <div class="sprite sprite-msg-blue" v-if="item.msgStatus == 3"></div>
            <div class="ml-10 statusBlue" v-if="item.msgStatus == 3">已读消息</div>
          </div>
          <!-- 上传资料：已摇中（未上传资料），摇中后补，已摇中--资料待核实，已摇中--资料未核实 -->
          <router-link
            class="upload"
            v-if="(item.childState==5 && item.uploadImages==1) || item.childState==7 || (item.childState==5 && item.verifyStatus==3) || (item.childState==5 && item.verifyStatus==1)"
            :to="{path:'/personal/uploadData',query:{applyId:item.applyId,schoolArea:item.schoolArea,applySchool:item.applySchool}}"
          >
            <div class="mr-10">上传资料</div>
            <div class="sprite sprite-upload"></div>
          </router-link>
        </div>
        <!-- 上拉加载（如果需要就将list放入这里） -->
        <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="list" v-for="(item,index) in list" :key="index">
            <div class="name mt-20">{{item.name}}</div>
            <div class="mt-30">申请类型：{{item.type}}</div>
            <div class="mt-30">当前状态：{{item.status}}</div>
            <router-link class="edit" to="/personal/familyMember/editFamily">
              <div class="mr-10">编辑</div>
              <div class="sprite sprite-personal-edit"></div>
            </router-link>
          </div>
        </van-list>-->
        <!-- --------------------------------------查看原因/查看消息---弹框开始---------------------- -->
        <!-- 原因 -->
        <van-overlay :show="showBoxReason" class-name="boxWrapper" @click="showBoxReason = false">
          <div class="block reason" @click.stop>
            <!-- 关闭按钮 -->
            <div class="delete sprite sprite-close" @click="showBoxReason = false"></div>
            <div class="reasonList">{{reasonText}}</div>
          </div>
        </van-overlay>
        <!-- 消息 -->
        <van-overlay :show="showBoxMesg" class-name="boxWrapper" @click="lookMesgClose">
          <div class="block msg" @click.stop>
            <!-- 关闭按钮 -->
            <div class="delete sprite sprite-close" @click="lookMesgClose"></div>
            <div class="text">
              {{mesgText.msgContent}}
              <!-- 您已摇中
              <div class="statusBlue">{{mesgText.school}}</div>学校，请于
              <div class="fontWB">{{mesgText.date}}</div>到学校提交相关入学资料-->
            </div>
          </div>
        </van-overlay>
        <!-- --------------------------------------查看原因/查看消息---弹框结束---------------------- -->
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
      // 上拉加载
      loading: false,
      finished: false,
      // --------------------------弹框数据
      // 查看原因，查看消息弹框
      showBoxReason: false,
      // 单个列表的原因数据
      reasonText: [],
      // 查看消息弹框
      showBoxMesg: false,
      // 单个列表的消息数据
      mesgText: {
        msgId: 26,
        msgContent: "20200706通知", //具体消息
        msgStatus: "",
        createTime: "",
        readTime: ""
      },
      // --------------------------请求过来的数据
      list: [
        // {
        //   applyId: "1",
        //   childName: "待核实",
        //   schoolArea: 5,
        //   childState: 0 //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        // },
        // {
        //   applyId: "12",
        //   childName: "核实中",
        //   schoolArea: "市直属",
        //   childState: 1 //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        // },
        // {
        //   applyId: "2",
        //   childName: "已核实",
        //   schoolArea: "市直属",
        //   childState: 2 //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        // },
        // {
        //   applyId: "3",
        //   childName: "未通过核实",
        //   schoolArea: "市直属",
        //   childState: 3, //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        //   auditResult: "未通过核实的原因" //信息核实未通过原因
        // },
        // {
        //   applyId: "4",
        //   childName: "已摇中-未上传资料-消息未读",
        //   schoolArea: 5,
        //   childState: 5, //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        //   applySchool: "某某幼儿园", //摇中的学校
        //   uploadImages: 1, //资料是否上传（0上传1未上传）
        //   msgStatus: 2 //查看消息：1未发送 2未读 3已读
        // },
        // {
        //   applyId: "5",
        //   childName: "已摇中-未上传资料-消息已读",
        //   schoolArea: "市直属",
        //   childState: 5, //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        //   applySchool: "某某幼儿园", //摇中的学校
        //   uploadImages: 1, //资料是否上传（0上传1未上传）
        //   msgStatus: 3 //1未发送 2未读 3已读
        // },
        // {
        //   applyId: "6",
        //   childName: "已摇中-资料核实通过",
        //   schoolArea: "市直属",
        //   childState: 5, //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        //   applySchool: "某某幼儿园", //摇中的学校
        //   uploadImages: 0, //资料是否上传（0上传1未上传）
        //   verifyStatus: 0 //资料核实0通过1未通过2核实中3待核实
        // },
        // {
        //   applyId: "7",
        //   childName: "已摇中-资料核实未通过",
        //   schoolArea: "市直属",
        //   childState: 5, //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        //   applySchool: "某某幼儿园", //摇中的学校
        //   uploadImages: 0, //资料是否上传（0上传1未上传）
        //   verifyStatus: 1, //资料核实0通过1未通过2核实中3待核实
        //   verifyReason: "资料核实未通过原因" //资料核实未通过原因
        // },
        // {
        //   applyId: "8",
        //   childName: "已摇中-资料核实待核实",
        //   schoolArea: "市直属",
        //   childState: 5, //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        //   applySchool: "某某幼儿园", //摇中的学校
        //   uploadImages: 0, //资料是否上传（0上传1未上传）
        //   verifyStatus: 3 //资料核实0通过1未通过2核实中3待核实
        // },
        // {
        //   applyId: "8",
        //   childName: "已摇中-资料核实待核实",
        //   schoolArea: "市直属",
        //   childState: 5, //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        //   applySchool: "某某幼儿园", //摇中的学校
        //   uploadImages: 0, //资料是否上传（0上传1未上传）
        //   verifyStatus: 2 //资料核实0通过1未通过2核实中3待核实
        // },
        // {
        //   applyId: "9",
        //   childName: "未摇中",
        //   schoolArea: "市直属",
        //   childState: 6 //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        // },
        // {
        //   applyId: "10",
        //   childName: "摇中后补",
        //   schoolArea: "市直属",
        //   childState: 7, //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        //   backLotteryNum: "003" //后补号码
        // },
        // {
        //   applyId: "11",
        //   childName: "信息未提交",
        //   schoolArea: "市直属",
        //   childState: 8 //0待核实 1核实中 2已核实 3未通过核实 4摇号中 5已摇中 6未摇中 7后补 8保存未提交
        // }
      ]
    };
  },
  computed: {},
  filters: {
    // 学校区域
    schoolAreaChange(value) {
      const str = value + "";
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
  methods: {
    // 下拉刷新
    async onRefresh() {
      try {
        const idNumber = localStorage.idNumber;
        if (idNumber) {
          const res = await this.$http.get(
            `/mobile/user/applyinfo/${idNumber}`
          );
          setTimeout(() => {
            if (res.data.code === 0) {
              this.list = res.data.data;
              this.showCnt = this.list.length > 0 ? false : true;
            } else {
              this.$toast.fail(res.data.msg);
            }
            this.isLoading = false;
          }, 500);
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        if (this.isLoading) {
          this.list = [];
          this.isLoading = false;
        }
        for (let i = 0; i < 10; i++) {
          const obj = {
            name: `张小虎${this.list.length + 1}`,
            type: "市直属幼儿园",
            status: "信息未提交"
          };
          this.list.push(obj);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    // ---------------------------弹框打开函数
    // 查看原因
    lookReason(item) {
      // 信息未通过核实
      if (item.childState == 3) {
        this.reasonText = item.auditResult;
      } else if (item.childState == 5 && item.verifyStatus == 1) {
        // 已摇中，资料未通过核实
        this.reasonText = item.verifyReason;
      }
      this.showBoxReason = true;
    },
    // 查看消息
    async lookMesg(applyId) {
      try {
        // '5efef44ce4b0405d72993c4c'
        const res = await this.$http.get(`/mobile/msg/msg/${applyId}`);
        if (res.data.code === 0) {
          // 通过参数来请求数据，或者获取消息
          this.mesgText = res.data.data;
          this.showBoxMesg = true;
        } else {
          this.$toast.fail(res.data.msg);
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    },
    // 查看消息弹框关闭
    lookMesgClose(){
      this.showBoxMesg = false;
      this.getList();
    },
    // ---------------------------请求函数--------------------------- //
    // 获取列表信息
    async getList() {
      try {
        this.$toast.loading({
          duration: 0,
          message: "获取列表中...",
          forbidClick: true
        });
        const idNumber = localStorage.idNumber;
        if (idNumber) {
          const res = await this.$http.get(
            `/mobile/user/applyinfo/${idNumber}`
          );
          if (res.data.code === 0) {
            this.list = res.data.data;
            this.showCnt = this.list.length > 0 ? false : true;
            this.$toast({
              type: this.showCnt ? "fail" : "success",
              duration: 1000,
              message: this.showCnt ? "暂无数据" : "获取列表成功",
              forbidClick: true
            });
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
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.myDeclaration {
  width: 100%;
  height: 100%;
  .pull {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  .refreshList {
    width: 100%;
    // 如果只有下拉刷新
    padding: 0 30px 30px 30px;
    // 如果既有下拉刷新又有上拉加载
    // padding: 0 30px;
    .list {
      border-radius: 2%;
      background-color: #fff;
      width: 100%;
      padding: 20px 20px 70px 20px;
      font-size: 26px;
      color: #888888;
      position: relative;
      margin-top: 25px;
      .name {
        font-size: 34px;
        color: #333333;
      }
      .tips {
        color: #333333;
        font-size: 28px;
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
      .upload {
        position: absolute;
        bottom: 20px;
        right: 20px;
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #498ef5;
      }
      .lookMesg {
        position: absolute;
        bottom: 20px;
        left: 20px;
        display: flex;
        align-items: center;
        font-size: 24px;
        color: #498ef5;
      }
    }
  }
  .statusGray {
    color: #888888;
  }
  .statusBlue {
    color: #498ef5;
  }
  .statusRed {
    color: #ec7676;
  }
  .statusGreen {
    color: #71cf7c;
  }
  .boxWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    .block {
      width: 80%;
      min-height: 200px;
      background-color: #fff;
      border-radius: 20px;
      padding: 5%;
      color: #333333;
      font-size: 30px;
      position: relative;
      .delete {
        position: absolute;
        right: 3%;
        top: 5%;
      }
      &.reason {
        padding: 8% 5%;
        .reasonList {
          line-height: 50px;
        }
      }
      &.msg {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 60px;
        padding: 10% 5%;
        .text {
          width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .fontWB {
            font-weight: bold;
          }
        }
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