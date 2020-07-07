<template>
    <div class="write_information">
        <van-nav-bar title="填写入学信息" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="main">
            <div class="header_notice">
                <van-notice-bar :scrollable="false" background="#f5f6fa" color="red"
                    text="所录入的信息必须真实，如提供虚假信息，将导致登记无效。" />
            </div>
            <van-form  class="cells">
                <!-- =====================================================基本信息========================================= -->
                <!-- 标题 -->
                <div class="title">
                    <div class="line"></div>
                    <div>基本信息</div>
                </div>
                <!-- 户籍情况 -->
                <van-field 
                  v-model="domicile" 
                  name="户籍情况" 
                  label="户籍情况"
                  placeholder="请选择适户籍情况" 
                  readonly 
                />
                <van-field v-model="detail.applySchool" name="学校" :label="schoolArea" placeholder="" readonly  :rules="[{ required: true, message: '请填写幼儿园',trigger:'onChange' }]"/>

                <!-- =====================================================适龄幼儿信息 ======================================-->
                <!-- 标题 -->
                <div class="title mt-20">
                    <div class="line"></div>
                    <div>适龄幼儿信息</div>
                    <van-checkbox v-model="checked" icon-size="16px" class="left_checkbox">是否双胞胎</van-checkbox>
                </div>
                <!-- 姓名 -->
                <van-field v-model="scChildInfo.childName" name="姓名" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写姓名',trigger:'onChange' }]"/>
                <!-- 证件类型 -->
                <van-field 
                  v-model="childIdTypeChange" 
                  right-icon="arrow" 
                  name="证件类型" 
                  label="证件类型"
                  placeholder="请选择适龄幼儿证件类型" 
                  @click="showPickerCertificateType = true" 
                  readonly 
                />
                <!-- 证件类型picker面板 -->
                <van-popup v-model="showPickerCertificateType" round position="bottom">
                    <van-picker title="请选择证件类型" show-toolbar :columns="columnsCertificateType"
                        @cancel="showPickerCertificateType = false" @confirm="onConfirmCertificateType" />
                </van-popup>
                <!-- 证件号码 -->
                <van-field v-model="scChildInfo.childIdNum" name="证件号码" label="证件号码" placeholder="请填写证件号码" :rules="[{ required: true, message: '请填写证件号码',trigger:'onChange' }]"/>
                <!-- 出生日期 -->
                <van-field
                    v-model="childBirthday"
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
                <van-field v-model="sexChange" name="性别" label="性别" placeholder="请选择性别" right-icon="arrow" readonly
                    @click="showPickerSex = true" :rules="[{ required: true,message:'没有选择性别',trigger:'onChange' }]" />
                <!-- -------------------------性别选择面板------------------------- -->
                <van-popup v-model="showPickerSex" round position="bottom">
                    <van-picker title="请选择性别" show-toolbar :columns="columnsSex"
                        @cancel="showPickerSex = false" @confirm="onConfirmSex" />
                </van-popup>
                <!-- ===================================双胞胎时========================================== -->
                <div v-if="checked">
                     <!-- 姓名 -->
                    <van-field v-model="scChildTwoInfo.childName" name="姓名" label="姓名" placeholder="姓名" />
                    <!-- 证件类型 -->
                    <van-field 
                    v-model="childTwoInfoIdTypeChange" 
                    right-icon="arrow" 
                    name="证件类型" 
                    label="证件类型"
                    placeholder="请选择适龄幼儿证件类型" 
                    @click="showPickerChilrenTwoInfoType = true" 
                    readonly 
                    />
                    <!-- 证件类型picker面板 -->
                    <van-popup v-model="showPickerChilrenTwoInfoType" round position="bottom">
                        <van-picker title="请选择证件类型" show-toolbar :columns="columnsCertificateType"
                            @cancel="showPickerChilrenTwoInfoType = false" @confirm="onConfirmChilrenTwoInfoType" />
                    </van-popup>
                    <!-- 证件号码 -->
                    <van-field v-model="scChildTwoInfo.childIdNum" name="证件号码" label="证件号码" placeholder="请填写证件号码" :rules="[{ required: true, message: '请填写证件号码',trigger:'onChange' }]"/>
                    <!-- 出生日期 -->
                    <van-field
                        v-model="childTwoBirthday"
                        name="出生年月"
                        label="出生年月"
                        placeholder="请选择出生年月"
                        right-icon="arrow"
                        @click="showPickerTwoBirthday = true"
                        readonly
                        :rules="[{ required: true,message:'没有选择出生年月',trigger:'onChange' }]"
                    />
                    <!-- -------------------------出生年月选择面板------------------------- -->
                    <van-popup v-model="showPickerTwoBirthday" round position="bottom">
                        <van-datetime-picker
                        :value="currentTwoDate"
                        type="date"
                        title="选择出生日期"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :formatter="formatterTwoBirthday"
                        @cancel="showPickerTwoBirthday = false"
                        @confirm="onConfirmTwoBirthday"
                        />
                    </van-popup>
                    <!-- 性别 -->
                    <van-field v-model="sexOtherChange" name="性别" label="性别" placeholder="请选择性别" right-icon="arrow" readonly
                        @click="showPickerOtherSex = true" :rules="[{ required: true,message:'没有选择性别',trigger:'onChange' }]" />
                    <!-- -------------------------性别选择面板------------------------- -->
                    <van-popup v-model="showPickerOtherSex" round position="bottom">
                        <van-picker title="请选择性别" show-toolbar :columns="columnsSex" :default-index="scChildTwoInfo.childSex"
                            @cancel="showPickerOtherSex = false" @confirm="onConfirmOtherSex" />
                    </van-popup>
                </div>
                <!-- 现居住区域 -->
                <van-field v-model="scChildInfo.childArea" name="现居住区域" label="现居住区域" placeholder="请选择现居住区域"
                    right-icon="arrow" @click="showPickerArea = true" readonly
                    :rules="[{ required: true,message:'没有选择现居住区域',trigger:'onChange' }]" />
                <!-- -------------------------现居住区域选择面板------------------------- -->
                <van-popup v-model="showPickerArea" round position="bottom">
                    <van-picker title="请选择区域" show-toolbar :columns="columnsArea"
                        :default-index="columnsArea.indexOf(scChildInfo.childArea)" @cancel="showPickerArea = false"
                        @confirm="onConfirmArea" />
                </van-popup>
                <!-- 详细户籍地址 -->
                <van-field rows="2" autosize type="textarea" v-model="scChildInfo.childAddress" name="详细户籍地址"
                    label="详细户籍地址" placeholder="请输入详细户籍地址" :rules="[{ required: true,message:'没有输入详细户籍地址' }]" />

                <!-- =============================================================================标题：户籍信息 ============================================================================-->
                <div class="title mt-20">
                    <div class="line"></div>
                    <div>户籍信息</div>
                    <div class="remarks">填写适龄幼儿户口本上的信息</div>
                </div>
                <!-- 户籍类型 -->
                <van-field v-model="domicileType" name="户籍类型" label="户籍类型" placeholder="请选择户籍类型" right-icon="arrow"
                    @click="showPickerCensus = true" readonly
                 />
                <!-- -----------------------户籍类型选择面板--------------------->
                <van-popup v-model="showPickerCensus" round position="bottom">
                    <van-picker title="请选择户籍类型" show-toolbar :columns="columnsCensus"
                        @cancel="showPickerCensus = false"
                        @confirm="onConfirmCensus" />
                </van-popup>
                <!-- 户籍区域 -->
                <van-field rows="1" autosize type="textarea" v-model="detail.domicileArea" name="户籍区域" label="户籍区域"
                    placeholder="请选择省份/市县/区" right-icon="arrow" @click="showPickerCensusArea = true" readonly
                />
                <!-- -------------------------户籍区域选择面板------------------------- -->
                <van-popup v-model="showPickerCensusArea" round position="bottom">
                    <van-area title="标题" :area-list="areaList" 
                        @cancel="showPickerCensusArea = false" @confirm="onConfirmCensusArea" />
                </van-popup>
                <!-- 详细户籍地址 -->
                <van-field rows="2" autosize type="textarea" v-model="detail.domicileAddress" name="详细户籍地址"
                    label="详细户籍地址" placeholder="请输入详细户籍地址" :rules="[{ required: true,message:'没有输入详细户籍地址' }]" />
                <!-- =======================================================标题：法定监护人信息 ==========================================-->
                <div class="title mt-20">
                    <div class="line"></div>
                    <div>法定监护人信息</div>
                    <div class="remarks">必须填1位监护人信息</div>
                </div>
                <!-- =============监护人：父亲============= -->
                <van-field v-model="detail.fatherName" name="父亲姓名" label="父亲姓名" placeholder="请填写父亲姓名" />
                <!-- 证件类型 -->
                <van-field 
                  v-model="fatherIdType" 
                  right-icon="arrow" 
                  name="证件类型" 
                  label="证件类型"
                  placeholder="请选择证件类型" 
                  @click="showPickerFatherIdType = true" 
                  readonly 
                />
                <!-- 证件类型picker面板 -->
                <van-popup v-model="showPickerFatherIdType" round position="bottom">
                    <van-picker title="请选择证件类型" show-toolbar :columns="columnsCertificateType"
                        @cancel="showPickerFatherIdType = false" @confirm="onConfirmFatherIdType" />
                </van-popup>
                <!-- 证件号码 -->
                <van-field v-model="detail.fatherIdNum" name="证件号码" label="证件号码" placeholder="请填写证件号码" />
                <!-- 居住证 -->
                <van-field v-model="fatherResidencePermit" name="居住证" label="居住证" placeholder="请选择居住证"
                    right-icon="arrow" @click="showPickerResident = true" readonly
                    :rules="[{ required: true,message:'没有选择居住证',trigger:'onChange' }]" />
                <!-- -------------------------居住证选择------------------------- -->
                <van-popup v-model="showPickerResident" round position="bottom">
                    <van-picker title="标题" show-toolbar :columns="columnsResident" @cancel="showPickerResident = false"
                        @confirm="onConfirmResident" />
                </van-popup>
                <!-- 联系电话 -->
                <van-field v-model="detail.fatherPhone" name="联系电话" label="联系电话" placeholder="请填写联系电话" />
                
                <!-- ==============================法定监护人：母亲 ==============================================================================-->
                <van-field v-model="detail.motherName" name="母亲姓名" label="母亲姓名" placeholder="请填写母亲姓名" />
                 <!-- 证件类型 -->
                <van-field 
                  v-model="motherIdType" 
                  right-icon="arrow" 
                  name="证件类型" 
                  label="证件类型"
                  placeholder="请选择证件类型" 
                  @click="showPickerMotherIdType = true" 
                  readonly 
                />
                <!-- 证件类型picker面板 -->
                <van-popup v-model="showPickerMotherIdType" round position="bottom">
                    <van-picker title="请选择证件类型" show-toolbar :columns="columnsCertificateType"
                        @cancel="showPickerMotherIdType = false" @confirm="onConfirmMotherIdType" />
                </van-popup>
                <!-- 证件号码 -->
                <van-field v-model="detail.motherIdNum" name="证件号码" label="证件号码" placeholder="请填写证件号码" />
                <!-- 居住证 -->
                <van-field 
                    v-model="motherResidencePermit" 
                    name="居住证" 
                    label="居住证" 
                    placeholder="请选择居住证"
                    right-icon="arrow" 
                    @click="showPickerMoResident = true" 
                    readonly
                    />
                <!-- -------------------------居住证选择------------------------- -->
                <van-popup v-model="showPickerMoResident" round position="bottom">
                    <van-picker title="标题" show-toolbar :columns="columnsResident" @cancel="showPickerMoResident = false"
                        @confirm="onConfirmMoResident" />
                </van-popup>
                <!-- 联系电话 -->
                <van-field v-model="detail.motherPhone" name="联系电话" label="联系电话" placeholder="请填写联系电话" />

                <!-- ===============法定监护人：其他 ==================-->
                <van-field v-model="detail.otherName" name="其他法定监护人" label="其他法定监护人" placeholder="请填写其他法定监护人姓名" />
                <!-- 证件类型 -->
                <van-field 
                  v-model="otherIdType" 
                  right-icon="arrow" 
                  name="证件类型" 
                  label="证件类型"
                  placeholder="请选择证件类型" 
                  @click="showPickerOtherIdType = true" 
                  readonly 
                />
                <!-- 证件类型picker面板 -->
                <van-popup v-model="showPickerOtherIdType" round position="bottom">
                    <van-picker title="请选择证件类型" show-toolbar :columns="columnsCertificateType"
                        @cancel="showPickerOtherIdType = false" @confirm="onConfirmOtherIdType" />
                </van-popup>
                <!-- 证件号码 -->
                <van-field v-model="detail.otherIdNum" name="证件号码" label="证件号码" placeholder="请填写证件号码" />
                <!-- 居住证 -->
                <van-field 
                    v-model="otherResidencePermit" 
                    name="居住证" 
                    label="居住证" 
                    placeholder="请选择居住证"
                    right-icon="arrow" 
                    @click="showPickerOtResident = true" 
                    readonly
                    />
                <!-- -------------------------居住证选择------------------------- -->
                <van-popup v-model="showPickerOtResident" round position="bottom">
                    <van-picker title="标题" show-toolbar :columns="columnsResident" @cancel="showPickerOtResident = false"
                        @confirm="onConfirmOtResident" />
                </van-popup>
                <!-- 联系电话 -->
                <van-field v-model="detail.otherPhone" name="联系电话" label="联系电话" placeholder="请填写联系电话" />
                <div class="footer_btn">
                    <div class="btn">
                        <div class="right">
                            <van-button color="#498ef5" size="large" native-type="button" @click="onSubmit('0')">保存</van-button>
                        </div>
                        <div class="left">
                            <van-button color="#FF9966" size="large" native-type="button" @click="onSubmit('1')">提交</van-button>
                        </div>
                    </div>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    // 省市区的数据，有请求接口的时候可以删除了
    import area from "../../area.js";
    export default {
        data() {
            return {
                disabled:true,
                detail:{},
                scChildInfo:{},
                scChildTwoInfo:{
                    "childId": "",
                    "applyId": "",
                    "childName": "",
                    "childIdType": "",
                    "childIdNum": "",
                    "childBirthday": "",
                    "childSex": "",
                    "childArea": "",
                    "childAddress": ""
                },
                // 路由跳转参数
                applyId:'',
                // 省市区的数据
                areaList: area,
                checked: false, // 双胞胎
                // 户籍情况 0是海口市户籍1非海口市户籍
                columnsDomicile:['海口市户籍','非海口市户籍'],
                showPickerDomicile:false,
                // 所属区情况 学区1市直属2龙华区直属3美兰区直属4秀英区直属5琼山区直属
                columnsSchoolArea:['市直属','龙华区直属','美兰区直属','秀英区直属','琼山区直属'],
                showPickerSchoolArea:false,
                // 证件类型
                columnsCertificateType: ['居民身份证', '护照', '士官证', '出生证'],
                /***********幼儿证件类型 *****************/
                showPickerCertificateType: false,
                showPickerChilrenTwoInfoType:false,
                // 性别面板
                showPickerSex: false,
                showPickerOtherSex:false,
                // 时间选择
                showPickerBirthday:false,
                // 双胞胎时时间
                showPickerTwoBirthday: false,
                // 出生年月的选择项
                minDate: new Date(1900, 0, 1),
                maxDate: new Date(),
                // 性别的选择项
                columnsSex: ["男", "女"],
                // 现居住区域面板
                showPickerArea: false,
                // 现居住区域的选择项
                columnsArea: ["龙华区", "美兰区", "秀英区", "琼山区"],
                // 户籍类型的面板
                showPickerCensus: false,
                // 户籍类型的选择项
                columnsCensus: ["本市城区", "本市乡镇", "外市城区", "外市乡镇"],
                /* -----------------------户籍区域选择框----------------------- */
                // 户籍区域的面板
                showPickerCensusArea: false,
                // 法定监护人父亲证件类型面板
                showPickerFatherIdType:false,
                // 法定监护人父亲居住证面板
                showPickerResident: false,
                columnsResident: ['持有', '未持有'],
                // 法定监护人证件类型面板
                showPickerMotherIdType:false,
                // 法定监护人母亲居住证面板
                showPickerMoResident:false,
                // 其他法定监护人类型面板
                showPickerOtherIdType : false,
                // 其他法定监护人居住证面板
                showPickerOtResident:false
            }
        },
        computed: {
            childBirthday() {
                return this.$dayjs( this.scChildInfo.childBirthday).format("YYYY-MM-DD");
            },
            childTwoBirthday() {
                return this.$dayjs( this.scChildTwoInfo.childBirthday).format("YYYY-MM-DD");
            },
            // 学区1市直属2龙华区直属3美兰区直属4秀英区直属5琼山区直属
            schoolArea() {
                let val = '';
               switch (Number(this.detail.schoolArea)) {
                    case 1:
                        val = '市直属'
                        break;
                    case 2:
                        val = '龙华区直属'
                        break;  
                    case 3:
                        val = '美兰区直属'
                        break; 
                    case 4:
                        val = '秀英区直属'
                        break;
                    case 5:
                        val = '琼山区直属'
                        break;              
                }
                return val;
            },
            // 户籍情况
            domicile() { //0是海口市户籍1非海口市户籍
                let val = '';
               switch (Number(this.detail.domicile)) {
                    case 0:
                        val = '海口市户籍'
                        break;
                    case 1:
                        val = '非海口市户籍'
                        break;             
                }
                return val;
            },
            // 性别数字转文字
            sexChange() {
                const val = this.scChildInfo.childSex == 0 ? "男" : "女";
                return val;
            },
            // 双胞胎
            sexOtherChange() {
                const val = this.scChildTwoInfo.childSex == 0 ? "男" : "女";
                return val;
            },
            // 年月日选择器的当前值
            currentDate() {
                const date = new Date(this.scChildInfo.childBirthday);
                return date;
            },
            // 双胞胎年月日选择器的当前值
            currentTwoDate() {
                const date = new Date(this.scChildTwoInfo.childBirthday);
                return date;
            },
            // 幼儿证件类型
            childIdTypeChange() {  // 幼儿证件类型
                let val = '';
                switch (Number(this.scChildInfo.childIdType)) {
                    case 1:
                        val = '居民身份证'
                        break;
                    case 2:
                        val = '护照'
                        break;  
                    case 3:
                        val = '士官证'
                        break; 
                    case 4:
                        val = '出生证'
                        break;             
                }
                return val;
            },
            childTwoInfoIdTypeChange() {  // 双胞胎幼儿证件类型
                let val = '';
                switch (Number(this.scChildTwoInfo.childIdType)) {
                    case 1:
                        val = '居民身份证'
                        break;
                    case 2:
                        val = '护照'
                        break;  
                    case 3:
                        val = '士官证'
                        break; 
                    case 4:
                        val = '出生证'
                        break;             
                }
                return val;
            },
            domicileType() {  // 户籍类型
                let val = '';
                switch (Number(this.detail.domicileType)) {
                    case 1:
                        val = '本市城区'
                        break;
                    case 2:
                        val = '本市乡镇'
                        break;  
                    case 3:
                        val = '外市城区'
                        break; 
                    case 4:
                        val = '外市乡镇'
                        break;             
                }
                return val;
            },
           fatherIdType() {  // 父亲证件类型
                let val = '';
                switch (Number(this.detail.fatherIdType)) {
                    case 1:
                        val = '居民身份证'
                        break;
                    case 2:
                        val = '护照'
                        break;  
                    case 3:
                        val = '士官证'
                        break; 
                    case 4:
                        val = '出生证'
                        break;             
                }
                return val;
            },
            fatherResidencePermit() { // 父亲居住证
                let val = '';
                switch (Number(this.detail.fatherResidencePermit)) {
                    case 0:
                        val = '持有'
                        break;
                    case 1:
                        val = '未持有'
                        break;            
                }
                return val;
            },
            motherIdType() {  // 母亲证件类型
                let val = '';
                switch (Number(this.detail.motherIdType)) {
                    case 1:
                        val = '居民身份证'
                        break;
                    case 2:
                        val = '护照'
                        break;  
                    case 3:
                        val = '士官证'
                        break; 
                    case 4:
                        val = '出生证'
                        break;             
                }
                return val;
            },
            motherResidencePermit() { // 母亲居住证
                let val = '';
                switch (Number(this.detail.motherResidencePermit)) {
                    case 0:
                        val = '持有'
                        break;
                    case 1:
                        val = '未持有'
                        break;            
                }
                return val;
            },
            otherIdType() {  // 其他监护人证件类型
                let val = '';
                switch (Number(this.detail.otherIdType)) {
                    case 1:
                        val = '居民身份证'
                        break;
                    case 2:
                        val = '护照'
                        break;  
                    case 3:
                        val = '士官证'
                        break; 
                    case 4:
                        val = '出生证'
                        break;             
                }
                return val;
            },
            otherResidencePermit() { // 其他监护人暂住证 
                let val = '';
                switch (Number(this.detail.otherResidencePermit)) {
                    case 0:
                        val = '持有'
                        break;
                    case 1:
                        val = '未持有'
                        break;            
                }
                return val;
            }
        },
        created() {
            const applyId =  this.$route.params.applyId;
            this.applyId =  this.$route.params.applyId;
            this.getDetail(applyId);
        },
        methods: {
             async getDetail(applyId){
                const res =  await this.$http.get(`/mobile/user/applydetail/${applyId}`);
                // console.log('申请详情',res)
                if(res.data.code == 0){
                    this.detail = res.data.data;
                    if(res.data.data.twins == '0'){
                        this.checked = true
                    }else if(res.data.data.twins == '1'){
                        this.checked = false
                    }
                    this.scChildInfo = res.data.data.scChildInfo[0];
                    if(res.data.data.scChildInfo.length>1){
                       Object.assign(this.scChildTwoInfo,res.data.data.scChildInfo[1]);
                    }
                }
            },
            async onSubmit(childSubmit){
                const _this = this;
                let postData = {
                    "applyId":this.applyId,
                    "applySchool": this.detail.applySchool,
                    "childInfoReqList":[],
                    "domicile": this.detail.domicile,
                    "schoolArea": this.detail.schoolArea,
                    "domicileAddress": this.detail.domicileAddress,
                    "domicileArea": this.detail.domicileArea,
                    "domicileType":this.detail.domicileType,
                    // 父亲法定监护人
                    "fatherIdNum": this.detail.fatherIdNum,
                    "fatherIdType": this.detail.fatherIdType,
                    "fatherName": this.detail.fatherName,
                    "fatherPhone": this.detail.fatherPhone,
                    "fatherResidencePermit": this.detail.fatherResidencePermit,
                    // 母亲法定监护人
                    "motherIdNum": this.detail.motherIdNum,
                    "motherIdType": this.detail.motherIdType,
                    "motherName": this.detail.motherName,
                    "motherPhone":this.detail.motherPhone,
                    "motherResidencePermit":this.detail.motherResidencePermit,
                    // 其他法定监护人
                    "otherIdNum": this.detail.otherIdNum,
                    "otherIdType": this.detail.otherIdType,
                    "otherName": this.detail.otherName,
                    "otherPhone": this.detail.otherPhone,
                    "otherResidencePermit": this.detail.otherResidencePermit,
                    "twins": '',// 双胞胎"0是 1否"
                    "childSubmit": childSubmit // 保存0 提交1
                }
                if(this.checked){  // 是双胞胎
                    postData.twins = '0';
                    postData.childInfoReqList.push(this.scChildTwoInfo)
                
                }else{ // 不是双胞胎
                    postData.twins = '1';
 
                }
                postData.childInfoReqList.push(this.scChildInfo)
                // 这个的检验方式，时间紧 
                if(!(this.detail.applySchool!='' && this.detail.schoolArea.toString() !='' && this.detail.domicile.toString()!='')){
                    this.$toast.fail("请完善基本信息")
                }else if(this.checked){
                    if(!(this.scChildInfo.childName.toString() !='' && this.scChildInfo.childIdNum!='' && this.scChildInfo.childIdType.toString() !=''  && this.scChildInfo.childBirthday.toString() !='' && this.scChildInfo.childArea.toString() !='' && this.scChildInfo.childAddress.toString() !='')){
                        this.$toast.fail("请完善双胞胎适龄幼儿园信息")
                    }else if(!(this.scChildTwoInfo.childName.toString() !='' && this.scChildTwoInfo.childIdNum!='' && this.scChildTwoInfo.childIdType.toString() !='' && this.scChildTwoInfo.childBirthday.toString() !='' && this.scChildTwoInfo.childArea.toString() !='' && this.scChildTwoInfo.childAddress.toString() !='')){
                        this.$toast.fail("请完善双胞胎适龄幼儿园信息")
                    }else if(!(this.detail.domicileArea.toString() !='' && this.detail.domicileType.toString() !='' && this.detail.domicileAddress.toString() !='')){
                        this.$toast.fail("请完善户籍信息")
                    }else if(!(this.detail.fatherIdNum.toString() || this.detail.motherIdNum.toString() || this.detail.otherIdNum.toString())){
                        this.$toast.fail("必须填1位监护人信息")

                    }else if(!(this.detail.fatherIdType.toString()  || this.detail.motherIdType.toString()  || this.detail.otherIdType.toString())){
                        this.$toast.fail("请完善监护人证件类型信息")

                    }else if(!(this.detail.fatherPhone.toString() || this.detail.motherPhone.toString() || this.detail.otherPhone.toString())){
                        this.$toast.fail("请完善监护人手机号码")

                    }else if(!(this.detail.fatherName.toString() || this.detail.motherName.toString() || this.detail.otherName.toString())){
                        this.$toast.fail("请完善监护人姓名")

                    }else if(!(this.detail.fatherResidencePermit.toString() || this.detail.motherResidencePermit.toString() || this.detail.otherResidencePermit.toString())){
                        this.$toast.fail("请完善监护人居住证")
                    }else{
                         // 修改申请
                        const res =  await this.$http.put('/mobile/user/updateApply',postData);
                        // console.log('双胞胎',postData)
                        // console.log(JSON.stringify(postData))
                        if(res.data.code === 0){
                            this.$toast.success({
                                duration: 1000,
                                message: res.data.msg,
                                forbidClick: true,
                                onClose() {
                                    _this.$router.push({
                                        path: '/home'
                                    })
                                }
                            });
                        }else{
                           this.$toast.fail({
                                duration: 2000,
                                message: res.data.msg,
                                forbidClick: true
                            }); 
                        }
                    }
                }else if(!this.checked){

                   if(!(this.scChildInfo.childName.toString() !='' && this.scChildInfo.childIdNum!='' && this.scChildInfo.childIdType.toString() !=''  && this.scChildInfo.childBirthday.toString() !='' && this.scChildInfo.childArea.toString() !='' && this.scChildInfo.childAddress.toString() !='')){
                        this.$toast.fail("请完善适龄幼儿园信息")
                    }else if(!(this.detail.domicileArea.toString() !='' && this.detail.domicileType.toString() !='' && this.detail.domicileAddress.toString() !='')){
                        this.$toast.fail("请完善户籍信息")
                    }else if(!(this.detail.fatherIdNum.toString() || this.detail.motherIdNum.toString() || this.detail.otherIdNum.toString())){
                        this.$toast.fail("必须填1位监护人信息")

                    }else if(!(this.detail.fatherIdType.toString()  || this.detail.motherIdType.toString()  || this.detail.otherIdType.toString())){
                        this.$toast.fail("请完善监护人证件类型信息")

                    }else if(!(this.detail.fatherPhone.toString() || this.detail.motherPhone.toString() || this.detail.otherPhone.toString())){
                        this.$toast.fail("请完善监护人手机号码")

                    }else if(!(this.detail.fatherName.toString() || this.detail.motherName.toString() || this.detail.otherName.toString())){
                        this.$toast.fail("请完善监护人姓名")

                    }else if(!(this.detail.fatherResidencePermit.toString() || this.detail.motherResidencePermit.toString() || this.detail.otherResidencePermit.toString())){
                        this.$toast.fail("请完善监护人居住证")
                    }else{
                         // 修改申请
                        const res =  await this.$http.put('/mobile/user/updateApply',postData);
                        // console.log(res)
                        // console.log('双胞胎',postData)
                        // console.log(JSON.stringify(postData))
                        if(res.data.code === 0){
                            this.$toast.success({
                                duration: 1000,
                                message: res.data.msg,
                                forbidClick: true,
                                onClose() {
                                    _this.$router.push({
                                        path: '/home'
                                    })
                                }
                            });
                            
                        }else{
                            this.$toast.fail({
                                duration: 2000,
                                message: res.data.msg,
                                forbidClick: true
                            });
                        }
                    }
                
                }
            },
            // 幼儿证件类型
            onConfirmCertificateType(value, index) {
                this.scChildInfo.childIdType = index + 1;
                this.showPickerCertificateType = false;
            },
            // 双胞胎证件类型
            onConfirmChilrenTwoInfoType(value, index) {
                this.scChildTwoInfo.childIdType = index + 1;
                this.showPickerChilrenTwoInfoType = false;
            },
            // 出生日期
            onConfirmBirthday(value) {
                this.scChildInfo.childBirthday = this.$dayjs(value).format("YYYY-MM-DD");
                this.showPickerBirthday = false;
            },
            // 双胞胎年月日选择器
            onConfirmTwoBirthday(value) {
                this.scChildTwoInfo.childBirthday = this.$dayjs(value).format("YYYY-MM-DD");
                this.showPickerTwoBirthday = false;
            },
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
            // 双胞胎出生年月picker的格式化
            formatterTwoBirthday(type, val) {
                if (type === "year") {
                    return `${val}年`;
                } else if (type === "month") {
                    return `${val}月`;
                } else if (type === "day") {
                    return `${val}日`;
                }
                return val;
            },
            // 性别选择面板-确定点击事件
            onConfirmSex(value, index) {
                this.scChildInfo.childSex = index;
                this.showPickerSex = false;
            },
            onConfirmOtherSex(value, index) {
                this.scChildTwoInfo.childSex = index;
                this.showPickerOtherSex = false;
            },
            // 现居住区域选择面板-确定点击事件
            onConfirmArea(value) {
                this.scChildInfo.childArea = value;
                this.showPickerArea = false;
            },
            // 户籍类型选择面板-确定点击事件
            onConfirmCensus(value,index) {
                this.detail.domicileType = index + 1;
                this.showPickerCensus = false;
            },
            // 户籍区域选择面板-确定点击事件
            onConfirmCensusArea(value) {
                this.detail.domicileArea = value.reduce((total, e) => {
                    return total + e.name;
                }, "");
                // this.census.areaNumber = value[2].code;
                this.showPickerCensusArea = false;
            },
            // 法定监护人父亲证件类型picker
            onConfirmFatherIdType(value,index) {
                this.detail.fatherIdType = index + 1;
                this.showPickerFatherIdType = false
            },
            // 法定监护人父亲居住证picker
            onConfirmResident(value,index) {
                this.detail.fatherResidencePermit = index;
                this.showPickerResident = false
            },
            // 法定监护人母亲居证件类型picker
            onConfirmMotherIdType(value,index) {
                this.detail.motherIdType = index + 1;
                this.showPickerMotherIdType = false
            },
            // 法定监护人母亲居住证picker
            onConfirmMoResident(value, index) {
                this.detail.motherResidencePermit = index;
                this.showPickerMoResident = false
            },
            // 其他监护人证件类型picker
            onConfirmOtherIdType(value, index) {
                this.detail.otherIdType = index + 1
                this.showPickerOtherIdType = false
            },
            // 其他法定监护人居住证picker
            onConfirmOtResident(value,index) {
                this.detail.otherResidencePermit = index;
                this.showPickerOtResident = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .write_information {
        height: 100%;
        position: relative;
        .main{
            .cells {
                // height: calc(100% + 1px);
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

                    .left_checkbox {
                        margin-left: 280px;
                    }
                }
                .footer_btn{
                    margin-top: 50px;
                    min-height: 80px;
                    width: 100%;
                    background: #fff;
                    padding: 25px;
                    .btn{
                        display: flex;
                        .right{
                            flex: 1;
                            margin-right: 10px;
                        }
                        .left{
                            flex:1;
                            margin-left:10px;
                        }
                    }
                }
            }
        }
    }
</style>