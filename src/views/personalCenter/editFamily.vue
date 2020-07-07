
<template>
  <div class="personalInformation">
    <van-nav-bar title="修改家庭成员" fixed @click-left="$router.back()" class="navBar">
      <template #left>
        <van-icon name="arrow-left" color="#498ef5" size="26" />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <van-form validate-first @failed="onFailed" @submit="onSubmit" class="cells">
      <!-- 我的 -->
      <van-field
        v-model="relationChange"
        name="relation"
        label="我的"
        placeholder="请选择与之关系"
        right-icon="arrow"
        @click="pickerRelationBox"
        readonly
        :rules="[{ required: true,message:'没有选择与之关系',trigger:'onChange' }]"
      />
      <!-- -------------------------我的选择面板------------------------- -->
      <van-popup v-model="showPickerRelation" round position="bottom">
        <van-picker
          title="请选择与之关系"
          show-toolbar
          :columns="columnsRelation"
          :default-index="columnsRelationIndex"
          @cancel="showPickerRelation = false"
          @confirm="onConfirmRelation"
        />
      </van-popup>
      <!-- 姓名 -->
      <van-field
        v-model="family.name"
        name="姓名"
        label="姓名"
        placeholder="请输入姓名"
        :rules="[{ required: true,message:'没有输入姓名',trigger:'onChange' }]"
      />
      <!-- 证件类型 -->
      <van-field
        v-model="idTypeChange"
        name="idType"
        label="证件类型"
        placeholder="请选择证件类型"
        right-icon="arrow"
        @click="pickerCertificateTypeBox"
        readonly
        :rules="[{ required: true,message:'没有选择证件类型',trigger:'onChange' }]"
      />
      <!-- -------------------------证件类型选择面板------------------------- -->
      <van-popup v-model="showPickerCertificateType" round position="bottom">
        <van-picker
          title="请选择证件类型"
          show-toolbar
          :columns="columnsCertificateType"
          :default-index="columnsCertificateTypeIndex"
          @cancel="showPickerCertificateType = false"
          @confirm="onConfirmCertificateType"
        />
      </van-popup>
      <!-- 证件号码 -->
      <van-field
        v-model="family.idNumber"
        name="证件号码"
        label="证件号码"
        placeholder="请输入证件号码"
        :rules="[{ required: true,message:'没有输入证件号码',trigger:'onChange' }]"
      />
      <!-- 出生年月 -->
      <van-field
        v-model="family.birthday"
        name="出生年月"
        label="出生年月"
        placeholder="请选择出生年月"
        right-icon="arrow"
        @click="showPickerBirthday = true"
        readonly
        :rules="[{ required: true,message:'没有选择出生年月',trigger:'onChange' }]"
      />
      <!-- -------------------------出生年月选择面板------------------------- -->
      <van-popup v-model="showPickerBirthday" round position="bottom">
        <van-datetime-picker
          :value="currentDate"
          type="date"
          title="选择出生日期"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatterBirthday"
          @cancel="showPickerBirthday = false"
          @confirm="onConfirmBirthday"
        />
      </van-popup>
      <!-- 性别 -->
      <van-field
        v-model="sexChange"
        name="性别"
        label="性别"
        placeholder="请选择性别"
        right-icon="arrow"
        readonly
        @click="pickerSexBox"
        :rules="[{ required: true,message:'没有选择性别',trigger:'onChange' }]"
      />
      <!-- -------------------------性别选择面板------------------------- -->
      <van-popup v-model="showPickerSex" round position="bottom">
        <van-picker
          title="请选择性别"
          show-toolbar
          :columns="columnsSex"
          :default-index="columnsSexIndex"
          @cancel="showPickerSex = false"
          @confirm="onConfirmSex"
        />
      </van-popup>
      <div class="mt-60 mb-50 mx-20">
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
      // 请求过来的数据
      family: {
        // ---------------------------------我的开始
        relation: "", //我的关系name
        myRelation: "", //我的关系code
        // ---------------------------------我的结束
        name: "",
        // ---------------------------------证件类型开始
        idType: "", //证件类型code，1身份证，2护照，3士官证，4出生证
        idTypeName: "", //证件类型的name
        // ---------------------------------证件类型结束
        // 身份证信息需要在数据请求过来之后重新赋值
        idNumber: "",
        // 出生年月需要格式化，1993/10/02
        birthday: "",
        sex: "", //性别code，0男1女2未知
        sexName: "", //用户性别value
      },
      /* -----------------------我的选择框----------------------- */
      // 我的面板
      showPickerRelation: false,
      // 我的的选择项
      columnsRelation: [],
      // 我的的默认选择项
      columnsRelationIndex: 0,
      // 我的的选择项--从后台请求过来的
      columnsRelationOld: [],
      /* -----------------------证件类型选择框----------------------- */
      // 证件类型面板
      showPickerCertificateType: false,
      // 证件类型的选择项
      columnsCertificateType: [],
      // 证件类型的默认选择项
      columnsCertificateTypeIndex: 0,
      // 证件类型的选择项--从后台请求过来的
      columnsCertificateTypeOld: [],
      /* -----------------------出生年月选择框----------------------- */
      // 出生年月面板
      showPickerBirthday: false,
      // 出生年月的选择项
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      /* -----------------------性别选择框----------------------- */
      // 性别面板
      showPickerSex: false,
      // 性别的选择项
      columnsSex: [],
      // 性别的默认选择项
      columnsSexIndex: 0,
      // 现居住区域的选择项--从后台请求过来的
      columnsSexOld: [],
    };
  },
  computed: {
    // 年月日选择器的当前值
    currentDate() {
      const date = new Date(this.family.birthday);
      return date;
    },
    // 性别数字转文字
    sexChange() {
      const str = this.family.sex+"";
      let val = "";
      switch (str) {
        case "0":
          val = "男";
          break;
        case "1":
          val = "女";
          break;
        case "2":
          val = "";
          break;
      }
      return val;
    },
    // 证件类型转文字
    idTypeChange() {
      const str = this.family.idType+"";
      let val = "";
      switch (str) {
        case "1":
          val = "身份证";
          break;
        case "2":
          val = "护照";
          break;
        case "3":
          val = "士官证";
          break;
        case "4":
          val = "出生证";
          break;
      }
      return val;
    },
    // 我的关系转文字
    relationChange() {
      const str = this.family.myRelation+"";
      let val = "";
      switch (str) {
        case "0":
          val = "妻子";
          break;
        case "1":
          val = "丈夫";
          break;
        case "2":
          val = "母亲";
          break;
        case "3":
          val = "父亲";
          break;
        case "4":
          val = "爷爷";
          break;
        case "5":
          val = "奶奶";
          break;
        case "6":
          val = "外公";
          break;
        case "7":
          val = "外婆";
          break;
      }
      return val;
    }
  },
  filters: {},
  methods: {
    // -------------------------选择面板点击确定按钮相关的函数-------------------------//
    // 我的选择面板-确定点击事件
    onConfirmRelation(value, index) {
      // code
      this.family.myRelation = this.columnsRelationOld[index].code;
      // name
      this.family.relation = this.columnsRelationOld[index].value;
      // 当前面板的选中项
      this.columnsRelationIndex = index;
      this.showPickerRelation = false;
    },
    // 证件类型选择面板-确定点击事件
    onConfirmCertificateType(value, index) {
      // code
      this.family.idType = this.columnsCertificateTypeOld[index].code;
      // name
      this.family.idTypeName = this.columnsCertificateTypeOld[index].value;
      // 当前面板的选中项
      this.columnsCertificateTypeIndex = index;
      this.showPickerCertificateType = false;
    },
    // 出生年月日选择面板-确定点击事件
    onConfirmBirthday(value) {
      this.family.birthday = this.$dayjs(value).format("YYYY/MM/DD");
      this.showPickerBirthday = false;
    },
    // 性别选择面板-确定点击事件
    onConfirmSex(value, index) {
      // 性别的code
      this.model.sex = this.columnsSexOld[index].code;
      // name
      this.model.sexName = this.columnsSexOld[index].value;
      // 当前面板的选中项
      this.columnsSexIndex = index;
      this.showPickerSex = false;
    },
    // -------------------------显示选择面板并请求后台数据赋值相关的函数-------------------------//
    // 显示我的选择面板
    pickerRelationBox() {
      // 这里需要判断columnsRelationOld时候有值，如果无值则请求
      if (this.columnsRelationOld.length == 0) {
        this.columnsRelationOld = [
          {
            code: "0",
            value: "妻子"
          },
          {
            code: "1",
            value: "丈夫"
          },
          {
            code: "2",
            value: "母亲"
          },
          {
            code: "3",
            value: "父亲"
          },
          {
            code: "4",
            value: "爷爷"
          },
          {
            code: "5",
            value: "奶奶"
          },
          {
            code: "6",
            value: "外公"
          },
          {
            code: "6",
            value: "外婆"
          }
        ];
        this.columnsRelation = this.columnsRelationOld.map(item => {
          return item.value;
        });
      }
      // 当请求过来的数据赋值不为空
      if (this.columnsRelation.length > 0) {
        // 设置默认值
        this.columnsRelationIndex = this.columnsRelationOld.findIndex(item => {
          return item.code == this.family.myRelation;
        });
        this.showPickerRelation = true;
      } else {
        this.$toast.fail("当前选项为空");
      }
    },
    // 显示证件类型选择面板
    async pickerCertificateTypeBox() {
      // 这里需要判断columnsCertificateTypeOld时候有值，如果无值则请求
      if (this.columnsCertificateTypeOld.length == 0) {
        const res = await this.$http.get("/mobile/dictdata/idtype");
        if (res.data.code === 0) {
          this.columnsCertificateTypeOld = res.data.data;
          this.columnsCertificateType = this.columnsCertificateTypeOld.map(item => {
              return item.value;
          });
        } else {
          this.$toast.fail(res.data.msg);
          return;
        }
      }
      // 当请求过来的数据赋值不为空
      if (this.columnsCertificateType.length > 0) {
        // 设置默认值
        this.columnsCertificateTypeIndex = this.columnsCertificateTypeOld.findIndex(
          item => {
            return item.code == this.family.idType;
          }
        );
        this.showPickerCertificateType = true;
      } else {
        this.$toast.fail("当前选项为空");
      }
    },
    // 显示性别选择面板
    async pickerSexBox() {
      // 这里需要判断columnsSexOld时候有值，如果无值则请求
      if (this.columnsSexOld.length == 0) {
        const res = await this.$http.get("/mobile/dictdata/sex");
        if (res.data.code === 0) {
          this.columnsSexOld = res.data.data;
          this.columnsSexOld.forEach(item => {
            if(item.code !== 2){
              this.columnsSex.push(item.value);
            }
          });
        } else {
          this.$toast.fail(res.data.msg);
          return;
        }
      }
      // 当请求过来的数据赋值不为空
      if (this.columnsSex.length > 0) {
        // 设置默认值
        this.columnsSexIndex = this.columnsSexOld.findIndex(item => {
          return item.code == this.family.sex;
        });
        this.showPickerSex = true;
      } else {
        this.$toast.fail("当前选项为空");
      }
    },
    // -------------------------其他的函数-------------------------//
    // 出生年月picker的格式化
    formatterBirthday(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    // -------------------------请求相关的函数-------------------------//
    // ----提交form表单
    onSubmit() {
      // 得到数据，并发送请求；这里仅模拟
      this.$toast.loading({
        duration: 0,
        message: "提交中...",
        forbidClick: true
      });
      const _this = this;
      setTimeout(() => {
        this.$toast.clear();
        this.$toast.success({
          duration: 1000,
          message: "提交成功",
          forbidClick: true,
          onClose() {
            _this.$router.back();
          }
        });
      }, 1000);
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
.personalInformation {
  .cells {
    padding-top: 30px;
  }
}
</style>