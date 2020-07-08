<template>
    <div class="write_information">
        <van-nav-bar title="填写入学信息" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="main">
            <div class="header_notice">
                <van-notice-bar :scrollable="false" background="#f5f6fa" wrapable class="notice_swipe" color="red"
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
                  v-model="domicileT" 
                  name="户籍情况" 
                  label="户籍情况"
                  placeholder="请选择适户籍情况" 
                  readonly 
                />
                <!--  right-icon="arrow"  -->
                <!--  @click="showPickerDomicile = true"  -->
                <!-- 户籍情况picker面板 -->
                <!-- <van-popup v-model="showPickerDomicile" round position="bottom">
                    <van-picker title="请选择适户籍情况" show-toolbar :columns="columnsDomicile"
                        :default-index="baseInfo.domicile"
                        @cancel="showPickerDomicile = false" @confirm="onConfirmDomicile" />
                </van-popup> -->
                <!-- 市直属 -->
                 <!-- <van-field 
                  v-model="schoolArea" 
                  right-icon="arrow" 
                  name="所属学区" 
                  label="所属学区"
                  placeholder="请选择所属学区" 
                  @click="showPickerSchoolArea = true" 
                  readonly 
                /> -->
                <!-- 证件类型picker面板 -->
                <!-- <van-popup v-model="showPickerSchoolArea" round position="bottom">
                    <van-picker title="请选择所属区情况" show-toolbar :columns="columnsSchoolArea"
                        :default-index="baseInfo.scArea"
                        @cancel="showPickerSchoolArea = false" @confirm="onConfirmSchoolArea" />
                </van-popup> -->

                <van-field v-model="baseInfo.kindergarten" name="学校" :label="schoolArea" placeholder="" readonly  :rules="[{ required: true, message: '请填写幼儿园',trigger:'onChange' }]"/>

                <!-- =====================================================适龄幼儿信息 ======================================-->
                <!-- 标题 -->
                <div class="title mt-20">
                    <div class="line"></div>
                    <div>适龄幼儿信息</div>
                    <van-checkbox v-model="checked" icon-size="16px" class="left_checkbox">是否双胞胎</van-checkbox>
                </div>
                <!-- 姓名 -->
                <van-field v-model="chilrenInfo.childName" name="姓名" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写姓名',trigger:'onChange' }]"/>
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
                        :default-index="columnsCertificateType.indexOf(chilrenInfo.certificateType)"
                        @cancel="showPickerCertificateType = false" @confirm="onConfirmCertificateType" />
                </van-popup>
                <!-- 证件号码 -->
                <van-field v-model="chilrenInfo.childIdNum"  @input="validID"  name="证件号码" label="证件号码" placeholder="请填写证件号码" :rules="[{ required: true, message: '请填写证件号码',trigger:'onChange' }]"/>
                <!-- 出生日期 -->
                <van-field
                    v-model="chilrenInfo.childBirthday"
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
                    <van-picker title="请选择性别" show-toolbar :columns="columnsSex" :default-index="chilrenInfo.childSex"
                        @cancel="showPickerSex = false" @confirm="onConfirmSex" />
                </van-popup>
                <!-- ===================================双胞胎时========================================== -->
                <div v-if="checked">
                     <!-- 姓名 -->
                    <van-field v-model="chilrenTwoInfo.childName" name="姓名" label="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写姓名',trigger:'onChange' }]"/>
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
                            :default-index="columnsCertificateType.indexOf(chilrenTwoInfo.childIdType)"
                            @cancel="showPickerChilrenTwoInfoType = false" @confirm="onConfirmChilrenTwoInfoType" />
                    </van-popup>
                    <!-- 证件号码 -->
                    <van-field v-model="chilrenTwoInfo.childIdNum" name="证件号码" @input="validID" label="证件号码" placeholder="请填写证件号码" :rules="[{ required: true, message: '请填写证件号码',trigger:'onChange' }]"/>
                    <!-- 出生日期 -->
                    <van-field
                        v-model="chilrenTwoInfo.childBirthday"
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
                        <van-picker title="请选择性别" show-toolbar :columns="columnsSex" :default-index="chilrenTwoInfo.childSex"
                            @cancel="showPickerOtherSex = false" @confirm="onConfirmOtherSex" />
                    </van-popup>
                </div>
                <!-- 现居住区域 -->
                <van-field v-model="chilrenInfo.childArea" name="现居住区域" label="现居住区域" placeholder="请选择现居住区域"
                    right-icon="arrow" @click="showPickerArea = true" readonly
                    :rules="[{ required: true,message:'没有选择现居住区域',trigger:'onChange' }]" />
                <!-- -------------------------现居住区域选择面板------------------------- -->
                <van-popup v-model="showPickerArea" round position="bottom">
                    <van-picker title="请选择区域" show-toolbar :columns="columnsArea"
                        :default-index="columnsArea.indexOf(chilrenInfo.childArea)" @cancel="showPickerArea = false"
                        @confirm="onConfirmArea" />
                </van-popup>
                <!-- 详细户籍地址 -->
                <van-field rows="2" autosize type="textarea" v-model="chilrenInfo.childAddress" name="详细户籍地址"
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
                        :default-index="columnsCensus.indexOf(census.censusType)" @cancel="showPickerCensus = false"
                        @confirm="onConfirmCensus" />
                </van-popup>
                <!-- 户籍区域 -->
                <van-field rows="1" autosize type="textarea" v-model="census.censusArea" name="户籍区域" label="户籍区域"
                    placeholder="请选择省份/市县/区" right-icon="arrow" @click="showPickerCensusArea = true" readonly
                />
                <!-- -------------------------户籍区域选择面板------------------------- -->
                <van-popup v-model="showPickerCensusArea" round position="bottom">
                    <van-area title="标题" :area-list="areaList" :value="census.areaNumber"
                        @cancel="showPickerCensusArea = false" @confirm="onConfirmCensusArea" />
                </van-popup>
                <!-- 详细户籍地址 -->
                <van-field rows="2" autosize type="textarea" v-model="census.detailedCensus" name="详细户籍地址"
                    label="详细户籍地址" placeholder="请输入详细户籍地址" :rules="[{ required: true,message:'没有输入详细户籍地址' }]" />
                <!-- =======================================================标题：法定监护人信息 ==========================================-->
                <div class="title mt-20">
                    <div class="line"></div>
                    <div>法定监护人信息</div>
                    <div class="remarks">必须填1位监护人信息</div>
                </div>
                <!-- =============监护人：父亲============= -->
                <van-field v-model="naturalGuardian.fatherName" name="父亲姓名" label="父亲姓名" placeholder="请填写父亲姓名" />
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
                        :default-index="columnsCertificateType.indexOf(naturalGuardian.fatherIdType)"
                        @cancel="showPickerFatherIdType = false" @confirm="onConfirmFatherIdType" />
                </van-popup>
                <!-- 证件号码 -->
                <van-field v-model="naturalGuardian.fatherIdNuber" name="证件号码" label="证件号码" placeholder="请填写证件号码" :rules="[{ required: true, message: '请填写证件号码',trigger:'onChange' }]" />
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
                <van-field v-model="naturalGuardian.fatherPhone" name="联系电话" label="联系电话" placeholder="请填写联系电话" />
                
                <!-- ==============================法定监护人：母亲 ==============================================================================-->
                <van-field v-model="naturalGuardian.motherName" name="母亲姓名" label="母亲姓名" placeholder="请填写母亲姓名" />
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
                        :default-index="columnsCertificateType.indexOf(naturalGuardian.motherIdType)"
                        @cancel="showPickerMotherIdType = false" @confirm="onConfirmMotherIdType" />
                </van-popup>
                <!-- 证件号码 -->
                <van-field v-model="naturalGuardian.motherIdNuber" name="证件号码" label="证件号码" placeholder="请填写证件号码" />
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
                <van-field v-model="naturalGuardian.motherPhone" name="联系电话" label="联系电话" placeholder="请填写联系电话" />

                <!-- ===============法定监护人：其他 ==================-->
                <van-field v-model="naturalGuardian.otherName" name="其他法定监护人" label="其他法定监护人" placeholder="请填写其他法定监护人姓名" />
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
                        :default-index="columnsCertificateType.indexOf(naturalGuardian.otherIdType)"
                        @cancel="showPickerOtherIdType = false" @confirm="onConfirmOtherIdType" />
                </van-popup>
                <!-- 证件号码 -->
                <van-field v-model="naturalGuardian.otherIdNuber" name="证件号码" label="证件号码" placeholder="请填写证件号码" />
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
                <van-field v-model="naturalGuardian.otherPhone" name="联系电话" label="联系电话" placeholder="请填写联系电话" />
                <div class="footer_btn">
                    <div class="btn">
                        <div class="right">
                            <van-button color="#498ef5" size="large" native-type="button" @click="onSubmit(0)">保存</van-button>
                        </div>
                        <div class="left">
                            <van-button color="#FF9966" size="large" native-type="button" @click="onSubmit(1)">提交</van-button>
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
                // 路由跳转参数
                applyId:'',
                // 省市区的数据
                areaList: area,
                checked: false, // 双胞胎
                // 基本信息
                baseInfo: {
                    census: '',
                    domicile:'',
                    kindergarten: '',
                    scArea:''
                },
                // 适龄幼儿信息
                chilrenInfo: {
                    childName: '',
                    childIdNum: '', // 证件号码
                    childIdType: '', // 证件类型
                    childSex: 0, //0男，1女
                    childBirthday:'',
                    childArea: '',
                    childAddress: ''
                },
                // 双胞胎幼儿信息
                chilrenTwoInfo: {
                    childName: '',
                    childIdNum: '',// 证件号码
                    childIdType: '',// 证件类型1居民身份证 2护照 3士官证 4出生证
                    childSex: 0, //0男，1女
                    childBirthday:'',
                    childArea: '',
                    childAddress: ''
                },
                // 法定监护人
                naturalGuardian: {
                    fatherName: '',
                    fatherIdNuber: '',
                    fatherPhone:'',
                    resident: '', // 居住证证 0持有1未持有
                    fatherIdType:'',// 证件类型 1居民身份证 2护照 3士官证 4出生证
                    motherName: '',
                    motherIdNuber: '',
                    motherResident:'',
                    motherIdType:'',
                    motherPhone:'',
                    otherName: '',
                    otherIdNuber: '',
                    otherResident:'',
                    otherIdType:'',
                    otherPhone:''
                },
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
                // 适龄幼儿户籍信息
                census: {
                    censusType: "",
                    censusArea: "",
                    areaNumber: "",
                    detailedCensus: ""
                },
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
            // 学区1市直属2龙华区直属3美兰区直属4秀英区直属5琼山区直属
            schoolArea() {
                let val = '';
                // 如果从幼儿园等级入口进入 存在的缓存则那缓存，因为目前后台没做回显
                if(localStorage.getItem('scArea').toString() !=""){
                    switch (this.baseInfo.scArea || localStorage.getItem('scArea').toString()) {
                        case '1':
                            val = '市直属'
                            break;
                        case '2':
                            val = '龙华区直属'
                            break;  
                        case '3':
                            val = '美兰区直属'
                            break; 
                        case '4':
                            val = '秀英区直属'
                            break;
                        case '5':
                            val = '琼山区直属'
                            break;              
                    }
                }else{
                     switch (this.baseInfo.scArea) {
                        case '1':
                            val = '市直属'
                            break;
                        case '2':
                            val = '龙华区直属'
                            break;  
                        case '3':
                            val = '美兰区直属'
                            break; 
                        case '4':
                            val = '秀英区直属'
                            break;
                        case '5':
                            val = '琼山区直属'
                            break;              
                    }
                }
                return val;
            },
            // 户籍情况
            domicileT() { //0是海口市户籍1非海口市户籍
                let val = '';
                //如果从幼儿园等级入口进入 存在的缓存则那缓存，因为目前后台没做接口回显
                if(localStorage.getItem('census') && localStorage.getItem('census')!= ''){
                     val = localStorage.getItem('census');
                     switch (this.baseInfo.domicile) {
                        case 0:
                            val = '海口市户籍'
                            break;
                        case 1:
                            val = '非海口市户籍'
                            break;             
                    }
                }else{
                     switch (this.baseInfo.domicile) {
                        case 0:
                            val = '海口市户籍'
                            break;
                        case 1:
                            val = '非海口市户籍'
                            break;             
                    }
                }
                return val;
            },
            // 性别数字转文字
            sexChange() {
                const val = this.chilrenInfo.childSex == 0 ? "男" : "女";
                return val;
            },
            // 双胞胎
            sexOtherChange() {
                const val = this.chilrenTwoInfo.childSex == 0 ? "男" : "女";
                return val;
            },
            // 年月日选择器的当前值
            currentDate() {
                const date = new Date(this.chilrenInfo.childBirthday);
                return date;
            },
            // 双胞胎年月日选择器的当前值
            currentTwoDate() {
                const date = new Date(this.chilrenTwoInfo.childBirthday);
                return date;
            },
            // 身份证显示
            idNumberChange() {
                let val = this.chilrenInfo.childIdNum;
                const newVal = val.replace(
                    val.substring(2, val.length - 2),
                    "**************"
                );
                return newVal;
            },
            childIdTypeChange() {  // 幼儿证件类型
                let val = '';
                switch (this.chilrenInfo.childIdType) {
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
                switch (this.chilrenTwoInfo.childIdType) {
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
                switch (this.census.censusType) {
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
            fatherResidencePermit() { // 父亲居住证
                let val = '';
                switch (this.naturalGuardian.resident) {
                    case 0:
                        val = '持有'
                        break;
                    case 1:
                        val = '未持有'
                        break;            
                }
                return val;
            },
            fatherIdType() {  // 父亲证件类型
                let val = '';
                switch (this.naturalGuardian.fatherIdType) {
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
            motherIdType() {  // 母亲证件类型
                let val = '';
                switch (this.naturalGuardian.motherIdType) {
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
                switch (this.naturalGuardian.motherResident) {
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
                switch (this.naturalGuardian.otherIdType) {
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
                switch (this.naturalGuardian.otherResident) {
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
            // 获取之前一步一步登记选择的信息
            this.baseInfo.kindergarten = localStorage.getItem('kindergarten');
            if(localStorage.getItem('census') =='海口市户籍'){this.baseInfo.domicile = '0'}else{this.baseInfo.domicile = '1'}
            if(localStorage.getItem('scArea')){
                switch (localStorage.getItem('scArea')) {
                    case '1':
                        this.baseInfo.scArea = '1' //市直属
                        break;
                    case '2':
                        this.baseInfo.scArea = '2' //龙华区直属
                        break;  
                    case '3':
                        this.baseInfo.scArea = '3' //美兰区直属
                        break; 
                    case '4':
                        this.baseInfo.scArea = '4' //秀英区直属
                        break;
                    case '5':
                        this.baseInfo.scArea = '5' //琼山区直属
                        break;              
                }
            }
            this.applyId =  this.$route.params.applyId;
        },
        methods: {
            async onSubmit(childSubmit){
                const _this = this;
                let postData = {
                    "applySchool": this.baseInfo.kindergarten,
                    "childInfoReqList":[],
                    "domicile": this.baseInfo.domicile,
                    "schoolArea": this.baseInfo.scArea,
                    "domicileAddress": this.census.detailedCensus,
                    "domicileArea": this.census.censusArea,
                    "domicileType": this.census.censusType,
                    // 父亲法定监护人
                    "fatherIdNum": this.naturalGuardian.fatherIdNuber,
                    "fatherIdType": this.naturalGuardian.fatherIdType,
                    "fatherName": this.naturalGuardian.fatherName,
                    "fatherPhone": this.naturalGuardian.fatherPhone,
                    "fatherResidencePermit": this.naturalGuardian.resident,
                    // 母亲法定监护人
                    "motherIdNum": this.naturalGuardian.motherIdNuber,
                    "motherIdType": this.naturalGuardian.motherIdType,
                    "motherName": this.naturalGuardian.motherName,
                    "motherPhone":this.naturalGuardian.motherPhone,
                    "motherResidencePermit":this.naturalGuardian.motherResident,
                    // 其他法定监护人
                    "otherIdNum": this.naturalGuardian.otherIdNuber,
                    "otherIdType": this.naturalGuardian.otherIdType,
                    "otherName": this.naturalGuardian.otherName,
                    "otherPhone": this.naturalGuardian.otherPhone,
                    "otherResidencePermit": this.naturalGuardian.otherResident,
                    "twins": '',// 双胞胎"0是 1否"
                    "childSubmit": childSubmit // 保存0 提交1
                }
                if(this.checked){  // 是双胞胎
                    postData.twins = 0;
                    this.chilrenTwoInfo.childArea =  this.chilrenInfo.childArea;
                    this.chilrenTwoInfo.childAddress =  this.chilrenInfo.childAddress;
                    this.chilrenTwoInfo.childBirthday =  this.chilrenInfo.childBirthday;
                    postData.childInfoReqList.push(this.chilrenInfo);
                    postData.childInfoReqList.push(this.chilrenTwoInfo);
                }else{ // 不是双胞胎
                    postData.twins = 1;
                    postData.childInfoReqList.push(this.chilrenInfo);
                }
                // 这个的检验方式，时间紧 
                if(!(this.baseInfo.kindergarten!='' && this.baseInfo.scArea.toString() !='' && this.baseInfo.domicile.toString()!='')){
                    this.$toast.fail("请完善基本信息")
                }else if(this.checked){
                    if(!(this.chilrenInfo.childName.toString() !='' && this.chilrenInfo.childIdNum!='' && this.chilrenInfo.childIdType.toString() !=''  && this.chilrenInfo.childBirthday.toString() !='' && this.chilrenInfo.childArea.toString() !='' && this.chilrenInfo.childAddress.toString() !='')){
                        this.$toast.fail("请完善双胞胎适龄幼儿园信息")
                    }else if(!(this.chilrenTwoInfo.childName.toString() !='' && this.chilrenTwoInfo.childIdNum!='' && this.chilrenTwoInfo.childIdType.toString() !='' && this.chilrenTwoInfo.childBirthday.toString() !='' && this.chilrenTwoInfo.childArea.toString() !='' && this.chilrenTwoInfo.childAddress.toString() !='')){
                        this.$toast.fail("请完善双胞胎适龄幼儿园信息")
                    }else if(!(this.census.detailedCensus.toString() !='' && this.census.censusType.toString() !='' && this.census.censusArea.toString() !='')){
                        this.$toast.fail("请完善户籍信息")
                    }else if(!(this.naturalGuardian.fatherIdNuber.toString() || this.naturalGuardian.motherIdNuber.toString() || this.naturalGuardian.otherIdNuber.toString())){
                        this.$toast.fail("必须填1位监护人信息")

                    }else if(!(this.naturalGuardian.fatherIdType.toString()  || this.naturalGuardian.motherIdType.toString()  || this.naturalGuardian.otherIdType.toString())){
                        this.$toast.fail("请完善监护人证件类型信息")

                    }else if(!(this.naturalGuardian.fatherPhone.toString() || this.naturalGuardian.motherPhone.toString() || this.naturalGuardian.otherPhone.toString())){
                        this.$toast.fail("请完善监护人手机号码")

                    }else if(!(this.naturalGuardian.fatherName.toString() || this.naturalGuardian.motherName.toString() || this.naturalGuardian.otherName.toString())){
                        this.$toast.fail("请完善监护人姓名")

                    }else if(!(this.naturalGuardian.resident.toString() || this.naturalGuardian.motherResident.toString() || this.naturalGuardian.otherResident.toString())){
                        this.$toast.fail("请完善监护人居住证")
                    }else{
                       const res =  await this.$http.post('/mobile/school/apply/add',postData);
                        if(res.data.code === 0){
                            _this.$toast.success({
                                duration: 2000,
                                message:res.data.msg,
                                forbidClick: true,
                                onClose() {
                                    _this.$router.push({
                                        path: '/home'
                                    })
                                }
                            });
                            
                        }else if(res.data.code === 500){
                            _this.$toast.fail(res.data.msg)
                        }
                    }
                }else if(!this.checked){

                   if(!(this.chilrenInfo.childName.toString() !='' && this.chilrenInfo.childIdNum!='' && this.chilrenInfo.childIdType.toString() !=''  && this.chilrenInfo.childBirthday.toString() !='' && this.chilrenInfo.childArea.toString() !='' && this.chilrenInfo.childAddress.toString() !='')){
                        this.$toast.fail("请完善适龄幼儿园信息")
                    }else if(!(this.census.detailedCensus.toString() !='' && this.census.censusType.toString() !='' && this.census.censusArea.toString() !='')){
                        this.$toast.fail("请完善户籍信息")
                    }else if(!(this.naturalGuardian.fatherIdNuber.toString() || this.naturalGuardian.motherIdNuber.toString() || this.naturalGuardian.otherIdNuber.toString())){
                        this.$toast.fail("请完善监护人信息")

                    }else if(!(this.naturalGuardian.fatherIdType.toString()  || this.naturalGuardian.motherIdType.toString()  || this.naturalGuardian.otherIdType.toString())){
                        this.$toast.fail("请完善监护人信息")

                    }else if(!(this.naturalGuardian.fatherPhone || this.naturalGuardian.motherPhone || this.naturalGuardian.otherPhone)){
                        this.$toast.fail("请完善监护人手机号码")

                    }else if(!(this.naturalGuardian.fatherName || this.naturalGuardian.motherName || this.naturalGuardian.otherName)){
                        this.$toast.fail("请完善监护人姓名")

                    }else if(!(this.naturalGuardian.resident.toString() || this.naturalGuardian.motherResident.toString() || this.naturalGuardian.otherResident.toString())){
                        this.$toast.fail("请完善监护人居住证")

                    }else{
                      const res =  await this.$http.post('/mobile/school/apply/add',postData);
                        if(res.data.code === 0){
                            _this.$toast.success({
                                duration: 2000,
                                message: res.data.msg,
                                forbidClick: true,
                                onClose() {
                                    _this.$router.push({
                                        path: '/home'
                                    })
                                }
                            });
                        }else if(res.data.code === 500){
                            _this.$toast.fail(res.data.msg)
                        }
                    }
                }
            },
             // ------表单校验错误
            onFailed() {
                this.$toast.fail("输入有误！")
            },
            // 户籍情况
            onConfirmDomicile(value, index) {
                this.baseInfo.domicile = index;
                this.showPickerDomicile = false
            },
            // 学区
            onConfirmSchoolArea(value, index) {
                this.baseInfo.scArea = index + 1;
                this.showPickerSchoolArea = false
            },
            // 幼儿证件类型
            onConfirmCertificateType(value, index) {
                this.chilrenInfo.childIdType = index + 1;
                this.showPickerCertificateType = false;
            },
            // 双胞胎证件类型
            onConfirmChilrenTwoInfoType(value, index) {
                this.chilrenTwoInfo.childIdType = index + 1;
                this.showPickerChilrenTwoInfoType = false;
            },
            // 出生日期
            onConfirmBirthday(value) {
                this.chilrenInfo.childBirthday = this.$dayjs(value).format("YYYY-MM-DD");
                this.showPickerBirthday = false;
            },
            // 双胞胎年月日选择器
            onConfirmTwoBirthday(value) {
                this.chilrenTwoInfo.childBirthday = this.$dayjs(value).format("YYYY-MM-DD");
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
                this.chilrenInfo.childSex = index;
                this.showPickerSex = false;
            },
            onConfirmOtherSex(value, index) {
                this.chilrenTwoInfo.childSex = index;
                this.showPickerOtherSex = false;
            },
            // 现居住区域选择面板-确定点击事件
            onConfirmArea(value) {
                this.chilrenInfo.childArea = value;
                this.showPickerArea = false;
            },
            // 户籍类型选择面板-确定点击事件
            onConfirmCensus(value,index) {
                this.census.censusType = index + 1;
                this.showPickerCensus = false;
            },
            // 户籍区域选择面板-确定点击事件
            onConfirmCensusArea(value) {
                this.census.censusArea = value.reduce((total, e) => {
                    return total + e.name;
                }, "");
                this.census.areaNumber = value[2].code;
                this.showPickerCensusArea = false;
            },
            // 法定监护人父亲证件类型picker
            onConfirmFatherIdType(value,index) {
                this.naturalGuardian.fatherIdType = index + 1;
                this.showPickerFatherIdType = false
            },
            // 法定监护人父亲居住证picker
            onConfirmResident(value,index) {
                this.naturalGuardian.resident = index;
                this.showPickerResident = false
            },
            // 法定监护人母亲居证件类型picker
            onConfirmMotherIdType(value,index) {
                this.naturalGuardian.motherIdType = index + 1;
                this.showPickerMotherIdType = false
            },
            // 法定监护人母亲居住证picker
            onConfirmMoResident(value, index) {
                this.naturalGuardian.motherResident = index;
                this.showPickerMoResident = false
            },
            // 其他监护人证件类型picker
            onConfirmOtherIdType(value, index) {
                this.naturalGuardian.otherIdType = index + 1
                this.showPickerOtherIdType = false
            },
            // 其他法定监护人居住证picker
            onConfirmOtResident(value,index) {
                this.naturalGuardian.otherResident = index;
                this.showPickerOtResident = false
            },
            // 根据输入身份证获取出生日期
            // 幼儿信息身份证验证
            async validID(value)
            {
                // console.log(value)
                // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
                let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (reg.test(value)) {
                    await this.go(value.length);
                } 
            },
            // 实现自动生成生日，性别，年龄
            go(val) {
                let iden = this.chilrenInfo.childIdNum;
                let idenTwo = this.chilrenTwoInfo.childIdNum;
                let birth = null;
                let birthTwo = null;
                if(val===18){
                    birth = iden != '' ? iden.substring(6,10)+"-"+iden.substring(10,12)+"-"+iden.substring(12,14):'';
                    birthTwo = idenTwo !='' ? idenTwo.substring(6,10)+"-"+idenTwo.substring(10,12)+"-"+idenTwo.substring(12,14) :'';
                }
                if(val===15){
                    birth = iden != ''? "19"+ iden.substring(6,8)+"-"+iden.substring(8,10)+"-"+iden.substring(10,12):'';
                    birthTwo = idenTwo !='' ?  "19"+idenTwo.substring(6,8)+"-"+idenTwo.substring(8,10)+"-"+idenTwo.substring(10,12):'';
                }
                this.chilrenInfo.childBirthday = birth;
                this.chilrenTwoInfo.childBirthday = birthTwo;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .notice_swipe{padding: 10px;}
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