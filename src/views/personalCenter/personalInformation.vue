
<template>
  <div class="personalInformation">
    <van-nav-bar title="个人信息" fixed @click-left="$router.back()" class="navBar">
      <template #left>
        <van-icon name="arrow-left" color="#498ef5" size="26" />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <van-form validate-first @failed="onFailed" @submit="onSubmit" class="cells">
      <!-- 标题：用户信息 -->
      <div class="title mt-20">
        <div class="line"></div>
        <div>用户信息</div>
      </div>
      <!-- 姓名 -->
      <van-field
        v-model="model.scUserName"
        name="scUserName"
        label="姓名"
        placeholder="请输入姓名"
        readonly
      />
      <!-- 证件类型 -->
      <van-field
        v-model="model.idTypeName"
        name="idType"
        label="证件类型"
        placeholder="请选择证件类型"
        readonly
      />
      <!-- 证件号码 -->
      <van-field
        v-model="idNumberChange"
        name="idNumber"
        label="证件号码"
        placeholder="请输入证件号码"
        readonly
      />
      <!-- 性别 -->
      <van-field
        v-model="model.sexName"
        name="sex"
        label="性别"
        placeholder="请选择性别"
        right-icon="arrow"
        readonly
        @click="pickerSexBox"
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
      <!-- 与子女关系 -->
      <van-field
        v-model="model.relationName"
        name="relation"
        label="与子女关系"
        placeholder="请选择与子女关系"
        right-icon="arrow"
        @click="pickerRelationBox"
        readonly
      />
      <!-- -------------------------与子女关系选择面板------------------------- -->
      <van-popup v-model="showPickerRelation" round position="bottom">
        <van-picker
          title="请选择与子女关系"
          show-toolbar
          :columns="columnsRelation"
          :default-index="columnsRelationIndex"
          @cancel="showPickerRelation = false"
          @confirm="onConfirmRelation"
        />
      </van-popup>
      <!-- 现居住区域 -->
      <van-field
        v-model="model.area"
        name="area"
        label="现居住区域"
        placeholder="请选择现居住区域"
        right-icon="arrow"
        @click="pickerAreaBox"
        readonly
      />
      <!-- -------------------------现居住区域选择面板------------------------- -->
      <van-popup v-model="showPickerArea" round position="bottom">
        <van-picker
          title="请选择区域"
          show-toolbar
          :columns="columnsArea"
          :default-index="columnsAreaIndex"
          @cancel="showPickerArea = false"
          @confirm="onConfirmArea"
        />
      </van-popup>
      <!-- 详细居住地址 -->
      <van-field
        rows="2"
        autosize
        type="textarea"
        v-model="model.areaAddress"
        name="areaAddress"
        label="详细居住地址"
        placeholder="请输入详细居住地址"
      />
      <!-- 标题：户籍信息 -->
      <div class="title mt-20">
        <div class="line"></div>
        <div>户籍信息</div>
        <div class="remarks">填写户口本上的信息</div>
      </div>
      <!-- 户籍类型 -->
      <van-field
        v-model="model.domicileTypeName"
        name="domicileType"
        label="户籍类型"
        placeholder="请选择户籍类型"
        right-icon="arrow"
        @click="pickerCensusBox"
        readonly
      />
      <!-- -------------------------户籍类型选择面板------------------------- -->
      <van-popup v-model="showPickerCensus" round position="bottom">
        <van-picker
          title="请选择户籍类型"
          show-toolbar
          :columns="columnsCensus"
          :default-index="columnsCensusIndex"
          @cancel="showPickerCensus = false"
          @confirm="onConfirmCensus"
        />
      </van-popup>
      <!-- 户籍区域 -->
      <van-field
        rows="1"
        autosize
        type="textarea"
        v-model="model.domicileArea"
        name="domicileArea"
        label="户籍区域"
        placeholder="请选择省份/市县/区"
        right-icon="arrow"
        @click="pickerCensusAreaBox"
        readonly
      />
      <!-- -------------------------户籍区域选择面板:value="columnsCensusAreaIndex"------------------------- -->
      <van-popup v-model="showPickerCensusArea" round position="bottom">
        <van-area
          title="标题"
          :area-list="columnsCensusArea"
          @cancel="showPickerCensusArea = false"
          @confirm="onConfirmCensusArea"
        />
      </van-popup>
      <!-- 详细户籍地址 -->
      <van-field
        rows="2"
        autosize
        type="textarea"
        v-model="model.domicileAddress"
        name="domicileAddress"
        label="详细户籍地址"
        placeholder="请输入详细户籍地址"
      />
      <!-- 标题：其他 -->
      <div class="title mt-20">
        <div class="line"></div>
        <div>其他</div>
      </div>
      <!-- 学历 -->
      <van-field
        v-model="model.educationLevel"
        name="education"
        label="学历"
        placeholder="请选择学历"
        readonly
        right-icon="arrow"
        @click="pickerEducationBox"
      />
      <!-- -------------------------学历选择面板------------------------- -->
      <van-popup v-model="showPickerEducation" round position="bottom">
        <van-picker
          title="请选择学历"
          show-toolbar
          :columns="columnsEducation"
          :default-index="columnsEducationIndex"
          @cancel="showPickerEducation = false"
          @confirm="onConfirmEducation"
        />
      </van-popup>
      <!-- 电子邮箱 -->
      <van-field
        v-model="model.scEmail"
        name="scEmail"
        label="电子邮箱"
        placeholder="请输入电子邮箱"
        :rules="[{ validator:emailValidator, message:'电子邮箱格式错误' }]"
      />
      <div class="mt-40 mb-50 mx-20">
        <van-button color="#498ef5" block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 省市区的数据，有请求接口的时候可以删除了
import area from "../../area.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      model: {
        scUserName: "", //用户名
        // ---------------------------------证件类型开始
        idType: "", //证件类型的code，1居民身份证，2护照，3士官证，4出生证
        idTypeName: "", //证件类型的value 如果后台传过来了，就用这个变量，没有就用计算属性
        // ---------------------------------证件类型结束
        idNumber: "", //身份证号
        scUserId: "", //用户ID
        sex: "", //用户性别code 0男1女2未知
        sexName: "", //用户性别value
        // ---------------------------------与子女关系开始
        relation: "", //与子女关系code，0父亲1母亲2自己3爷爷4奶奶5外公6外婆
        relationName: "", //与子女关系value
        // ---------------------------------与子女关系结束
        area: "", //居住区域value
        areaCode: "", //现居住区域的code，122龙华区，123美兰区，124秀英区，125琼山区
        areaAddress: "", //详细居住地址
        // ---------------------------------户籍类型开始
        domicileType: "", //户籍类型code， 1本市城区，2本市乡镇，3外市城区，4外市乡镇
        domicileTypeName: "", //户籍类型value
        // ---------------------------------户籍类型结束
        // ---------------------------------户籍区域开始
        domicileArea: "", //户籍区域value
        domicileCode: "", //户籍区域的code
        // ---------------------------------户籍区域结束
        domicileAddress: "", //详细户籍地址
        // ---------------------------------学历开始
        educationLevel: "", //学历value
        educationCode: "", //学历code，1初中，2高中，3高职，4大专，5本科，6硕士，7博士
        // ---------------------------------学历结束
        scEmail: "" //邮箱
      },
      /* -----------------------性别选择框----------------------- */
      // 性别面板
      showPickerSex: false,
      // 性别的选择项
      columnsSex: [],
      // 性别的默认选择项
      columnsSexIndex: 0,
      // 现居住区域的选择项--从后台请求过来的
      columnsSexOld: [],
      /* -----------------------现居住区域选择框----------------------- */
      // 现居住区域面板
      showPickerArea: false,
      // 现居住区域的选择项
      columnsArea: [],
      // 现居住区域的默认选择项
      columnsAreaIndex: 0,
      // 现居住区域的选择项--从后台请求过来的
      columnsAreaOld: [],
      /* -----------------------与子女关系选择框----------------------- */
      // 与子女关系面板
      showPickerRelation: false,
      // 与子女关系的选择项
      columnsRelation: [],
      // 与子女关系的默认选择项
      columnsRelationIndex: 0,
      // 与子女关系的选择项--从后台请求过来的
      columnsRelationOld: [],
      /* -----------------------户籍类型选择框----------------------- */
      // 户籍类型的面板
      showPickerCensus: false,
      // 户籍类型的选择项
      columnsCensus: [],
      // 户籍类型的默认选择项
      columnsCensusIndex: 0,
      // 户籍类型的选择项--从后台请求过来的
      columnsCensusOld: [],
      /* -----------------------户籍区域选择框----------------------- */
      // 户籍区域的面板
      showPickerCensusArea: false,
      // 户籍区域的选择项
      columnsCensusArea: [],
      // 户籍区域的默认选择项
      columnsCensusAreaIndex: 0,
      // 户籍区域的选择项--从后台请求过来的
      columnsCensusAreaOld: [],
      /* -----------------------学历选择框----------------------- */
      // 学历的面板
      showPickerEducation: false,
      // 学历的选择项
      columnsEducation: [],
      // 学历的默认选择项
      columnsEducationIndex: 0,
      // 学历的选择项--从后台请求过来的
      columnsEducationOld: []
    };
  },
  computed: {
    // 证件类型转文字
    idTypeChange() {
      const str = this.model.idType + "";
      let val = "";
      switch (str) {
        case "1":
          val = "居民身份证";
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
    // 身份证显示
    idNumberChange() {
      let val = this.model.idNumber + "";
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
  filters: {},
  methods: {
    // 校验函数
    emailValidator(val) {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (val) {
        return reg.test(val);
      } else {
        return true;
      }
    },
    // -------------------------选择面板点击确定按钮相关的函数-------------------------//
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
    // 现居住区域选择面板-确定点击事件
    onConfirmArea(value, index) {
      // code
      this.model.areaCode = this.columnsAreaOld[index].code;
      // name
      this.model.area = this.columnsAreaOld[index].value;
      // 当前面板的选中项
      this.columnsAreaIndex = index;
      this.showPickerArea = false;
    },
    // 与子女关系选择面板-确定点击事件
    onConfirmRelation(value, index) {
      // code
      this.model.relation = this.columnsRelationOld[index].code;
      // name
      this.model.relationName = this.columnsRelationOld[index].value;
      // 当前面板的选中项
      this.columnsRelationIndex = index;
      this.showPickerRelation = false;
    },
    // 户籍类型选择面板-确定点击事件
    onConfirmCensus(value, index) {
      // code
      this.model.domicileType = this.columnsCensusOld[index].code;
      // name
      this.model.domicileTypeName = this.columnsCensusOld[index].value;
      // 当前面板的选中项
      this.columnsCensusIndex = index;
      this.showPickerCensus = false;
    },
    // 户籍区域选择面板-确定点击事件
    onConfirmCensusArea(value) {
      this.model.domicileArea = value.reduce((total, e) => {
        return total + e.name;
      }, "");
      this.model.domicileCode = value[2].code;
      // 当前面板的选中项
      this.columnsCensusAreaIndex = value[2].code;
      this.showPickerCensusArea = false;
    },
    // 学历选择面板-确定点击事件
    onConfirmEducation(value, index) {
      // code
      this.model.educationCode = this.columnsEducationOld[index].code;
      // name
      this.model.educationLevel = this.columnsEducationOld[index].value;
      // 当前面板的选中项
      this.columnsEducationIndex = index;
      this.showPickerEducation = false;
    },
    // -------------------------显示选择面板并请求后台数据赋值相关的函数-------------------------//
    // 显示性别选择面板
    async pickerSexBox() {
      try {
        // 这里需要判断columnsSexOld时候有值，如果无值则请求
        if (this.columnsSexOld.length == 0) {
          const res = await this.$http.get("/mobile/dictdata/sex");
          if (res.data.code === 0) {
            this.columnsSexOld = res.data.data;
          } else {
            this.$toast.fail(res.data.msg);
            return;
          }
        }
        this.columnsSexOld.forEach(item => {
          if (item.code !== 2) {
            this.columnsSex.push(item.value);
          }
        });
        // 当请求过来的数据赋值不为空
        if (this.columnsSex.length > 0) {
          // 设置默认值
          this.columnsSexIndex = this.columnsSexOld.findIndex(item => {
            return item.code == this.model.sex;
          });
          this.showPickerSex = true;
        } else {
          this.$toast.fail("当前选项为空");
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    },
    // 显示与子女关系选择面板
    async pickerRelationBox() {
      try {
        // 这里需要判断columnsRelationOld时候有值，如果无值则请求
        if (this.columnsRelationOld.length == 0) {
          const res = await this.$http.get("/mobile/dictdata/relation");
          if (res.data.code === 0) {
            this.columnsRelationOld = res.data.data;
          } else {
            this.$toast.fail(res.data.msg);
            return;
          }
        }
        this.columnsRelation = this.columnsRelationOld.map(item => {
          return item.value;
        });
        // 当请求过来的数据赋值不为空
        if (this.columnsRelation.length > 0) {
          // 设置默认值
          this.columnsRelationIndex = this.columnsRelationOld.findIndex(
            item => {
              return item.code == this.model.relation;
            }
          );
          this.showPickerRelation = true;
        } else {
          this.$toast.fail("当前选项为空");
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    },
    // 显示现居住区域选择面板
    pickerAreaBox() {
      // 这里需要判断columnsRelationOld时候有值，如果无值则请求
      if (this.columnsAreaOld.length == 0) {
        this.columnsAreaOld = [
          {
            code: "122",
            value: "龙华区"
          },
          {
            code: "123",
            value: "美兰区"
          },
          {
            code: "124",
            value: "秀英区"
          },
          {
            code: "125",
            value: "琼山区"
          }
        ];
      }
      this.columnsArea = this.columnsAreaOld.map(item => {
        return item.value;
      });
      if (this.columnsArea.length > 0) {
        // 设置默认值
        this.columnsAreaIndex = this.columnsAreaOld.findIndex(item => {
          return item.code == this.model.areaCode;
        });
        this.showPickerArea = true;
      } else {
        this.$toast.fail("当前选项为空");
      }
    },
    // 显示户籍类型选择面板
    async pickerCensusBox() {
      try {
        // 这里需要判断columnsCensusOld时候有值，如果无值则请求
        if (this.columnsCensusOld.length == 0) {
          const res = await this.$http.get("/mobile/dictdata/domiciletype");
          if (res.data.code === 0) {
            this.columnsCensusOld = res.data.data;
          } else {
            this.$toast.fail(res.data.msg);
            return;
          }
        }
        this.columnsCensus = this.columnsCensusOld.map(item => {
          return item.value;
        });
        if (this.columnsCensus.length > 0) {
          // 设置默认值
          this.columnsCensusIndex = this.columnsCensusOld.findIndex(item => {
            return item.code == this.model.domicileType;
          });
          this.showPickerCensus = true;
        } else {
          this.$toast.fail("当前选项为空");
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    },
    // 显示户籍区域选择面板
    pickerCensusAreaBox() {
      // 这里需要判断columnsCensusAreaOld时候有值，如果无值则请求
      if (this.columnsCensusAreaOld.length == 0) {
        this.columnsCensusAreaOld = area;
      }
      this.columnsCensusArea = this.columnsCensusAreaOld;
      if (this.columnsCensusArea.city_list) {
        // 设置默认值
        //this.columnsCensusAreaIndex = this.model.domicileCode;
        this.showPickerCensusArea = true;
      } else {
        this.$toast.fail("当前选项为空");
      }
    },
    // 显示学历选择面板
    async pickerEducationBox() {
      try {
        // 这里需要判断columnsEducationOld时候有值，如果无值则请求
        if (this.columnsEducationOld.length == 0) {
          const res = await this.$http.get("/mobile/dictdata/educationlevel");
          if (res.data.code === 0) {
            this.columnsEducationOld = res.data.data;
          } else {
            this.$toast.fail(res.data.msg);
            return;
          }
        }
        this.columnsEducation = this.columnsEducationOld.map(item => {
          return item.value;
        });
        if (this.columnsEducation.length > 0) {
          // 设置默认值
          this.columnsEducationIndex = this.columnsEducationOld.findIndex(
            item => {
              return item.code == this.model.educationCode;
            }
          );
          this.showPickerEducation = true;
        } else {
          this.$toast.fail("当前选项为空");
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    },
    // -------------------------请求相关的函数-------------------------//
    // ----提交form表单
    async onSubmit() {
      try {
        const _this = this;
        // 得到数据，并发送请求；这里仅模拟
        this.$toast.loading({
          duration: 0,
          message: "提交中...",
          forbidClick: true
        });
        const obj = {
          area: this.model.area, //现居住区域value
          areaAddress: this.model.areaAddress, //现居住详细地址
          areaCode: this.model.areaCode, //现居住区域的code编号
          domicileAddress: this.model.domicileAddress, //户籍详细地址
          domicileArea: this.model.domicileArea, //户籍省市县的中文名称
          domicileType: this.model.domicileType, //户籍类型code编号
          educationLevel: this.model.educationCode, //学历code
          relation: this.model.relation, //与子女关系code编号
          scEmail: this.model.scEmail, //电子邮箱
          scUserId: this.model.scUserId, //用户ID
          sex: this.model.sex //性别code编号
        };
        const res = await this.$http.put("/mobile/user/update", obj);
        this.$toast.clear();
        if (res.data.code === 0) {
          this.$toast.success({
            duration: 1000,
            message: "提交成功",
            forbidClick: true,
            onClose() {
              _this.$router.back();
            }
          });
        } else {
          this.$toast.fail(res.data.msg);
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    },
    // ----获取用户信息
    async getUser() {
      try {
        this.$toast.loading({
          duration: 0,
          message: "数据加载中...",
          forbidClick: true
        });
        const idNumber = localStorage.idNumber;
        if (idNumber) {
          const res = await this.$http.get(`/mobile/user/userinfo/${idNumber}`);
          /* ----------------------字典---------------------- */
          // 证件类型
          const resIdType = await this.$http.get("/mobile/dictdata/idtype");
          // 性别
          const resSex = await this.$http.get("/mobile/dictdata/sex");
          // 与子女关系
          const resRelation = await this.$http.get("/mobile/dictdata/relation");
          // 户籍类型
          const resCensus = await this.$http.get(
            "/mobile/dictdata/domiciletype"
          );
          // 学历
          const resEducation = await this.$http.get(
            "/mobile/dictdata/educationlevel"
          );

          if (res.data.code === 0) {
            const data = res.data.data;
            /* ----------------------字典---------------------- */
            // 证件类型字典
            const columnsIdTypeOld = resIdType.data.data;
            const indexIdType = columnsIdTypeOld.findIndex(item => {
              return item.code == data.idType;
            });
            const idTypeName =
              indexIdType >= 0 ? columnsIdTypeOld[indexIdType].value : "";
            // 性别字典
            this.columnsSexOld = resSex.data.data;
            const indexSex = this.columnsSexOld.findIndex(item => {
              return item.code == data.sex;
            });
            const sexName =
              indexSex >= 0 ? this.columnsSexOld[indexSex].value : "";
            // 与子女关系字典
            this.columnsRelationOld = resRelation.data.data;
            const indexRelation = this.columnsRelationOld.findIndex(item => {
              return item.code == data.relation;
            });
            const relationName =
              indexRelation >= 0
                ? this.columnsRelationOld[indexRelation].value
                : "";
            // 户籍类型
            this.columnsCensusOld = resCensus.data.data;
            const indexCensus = this.columnsCensusOld.findIndex(item => {
              return item.code == data.domicileType;
            });
            const domicileTypeName =
              indexCensus >= 0 ? this.columnsCensusOld[indexCensus].value : "";
            // 学历
            this.columnsEducationOld = resEducation.data.data;
            const indexEducation = this.columnsEducationOld.findIndex(item => {
              return item.code == data.educationLevel;
            });
            const educationLevel =
              indexEducation >= 0
                ? this.columnsEducationOld[indexEducation].value
                : "";

            // 这里是将后台返回过来的位null的值全部替换成""，避免显示出错
            for (let k in data) {
              if (data[k] == null) {
                data[k] = "";
              }
            }

            // 填充请求过来的值
            this.model = {
              scUserId: data.scUserId, //主键ID
              scUserName: data.scUserName, //用户姓名
              idType: data.idType, //证件类型code
              idTypeName, //证件类型value
              idNumber: data.idNumber, //证件号码
              sex: data.sex, //性别code
              sexName, //性别的value值
              relation: data.relation, //与子女关系code
              relationName, //与子女关系value
              area: data.area, //现居住区域
              areaCode: data.areaCode, //现居住区域的编号code
              areaAddress: data.areaAddress, //现居住区域详细地址
              domicileType: data.domicileType, //户籍类型code
              domicileTypeName, //户籍类型value
              domicileArea: data.domicileArea, //户籍区域
              domicileAddress: data.domicileAddress, //户籍详细地址
              educationCode: data.educationLevel, //学历的code
              educationLevel, //学历的value
              scEmail: data.scEmail //电子邮箱
            };
            this.$toast.success({
              duration: 1000,
              message: "数据获取成功",
              forbidClick: true
            });
          } else {
            this.$toast.fail(res.data.msg);
          }
        }
      } catch (error) {
        this.$toast.fail("处理异常");
      }
    },
    // -------------------------事件函数-------------------------//
    // ------表单校验错误
    onFailed() {
      this.$toast.fail("输入有误！");
    },
    // 初始化所有面板的value值
    async initValue(obj) {
      try {
        // 性别
        const res = await this.$http.get(obj.url);
        if (res.data.code === 0) {
          const columns = res.data.data;
          const index = columns.findIndex(item => {
            return item.code == obj.getCode;
          });
          return columns[index].value;
        } else {
          this.$toast.fail(res.data.msg);
          return;
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
.personalInformation {
  .cells {
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