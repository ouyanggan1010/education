<template>
    <div class="write_information">
        <van-nav-bar title="查看入学信息" fixed @click-left="$router.back()" class="navBar">
            <template #left>
                <van-icon name="arrow-left" color="#498ef5" size="26" />
            </template>
        </van-nav-bar>
        <div class="main">
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
                <van-field v-model="detail.applySchool" name="学校" :label="schoolArea" placeholder="" readonly />

                <!-- =====================================================适龄幼儿信息 ======================================-->
                <!-- 标题 -->
                <div class="title mt-20">
                    <div class="line"></div>
                    <div>适龄幼儿信息</div>
                    <van-checkbox v-model="checked" :disabled="disabled" icon-size="16px" class="left_checkbox">是否双胞胎</van-checkbox>
                </div>
                <!-- 姓名 -->
                <van-field v-model="scChildInfo.childName" name="姓名" label="姓名" placeholder="姓名" readonly/>
                <!-- 证件类型 -->
                <van-field 
                  v-model="childIdTypeChange" 
                  name="证件类型" 
                  label="证件类型"
                  placeholder="请选择适龄幼儿证件类型" 
                  readonly 
                />
                <!-- 证件号码 -->
                <van-field v-model="scChildInfo.childIdNum" name="证件号码" label="证件号码" placeholder="请填写证件号码" readonly />
                <!-- 出生日期 -->
                <van-field
                    v-model="childBirthday"
                    name="出生年月"
                    label="出生年月"
                    placeholder="请选择出生年月"
                    readonly
                />
                <!-- 性别 -->
                <van-field v-model="sexChange" name="性别" label="性别" placeholder="请选择性别"  readonly />
                <!-- ===================================双胞胎时========================================== -->
                <div v-if="checked">
                     <!-- 姓名 -->
                    <van-field v-model="sexChange" name="姓名" label="姓名" placeholder="姓名" />
                    <!-- 证件类型 -->
                    <van-field 
                    v-model="childTwoInfoIdTypeChange" 
                    name="证件类型" 
                    label="证件类型"
                    placeholder="请选择适龄幼儿证件类型" 
                    readonly 
                    />
                    <!-- 证件号码 -->
                    <van-field v-model="chilrenTwoInfo.childIdNum" name="证件号码" label="证件号码" placeholder="请填写证件号码" />
                    <!-- 出生日期 -->
                    <van-field
                        v-model="childTwoBirthday"
                        name="出生年月"
                        label="出生年月"
                        placeholder="请选择出生年月"
                        readonly
                    />
                    <!-- 性别 -->
                    <van-field v-model="sexTwoChange" name="性别" label="性别" placeholder="请选择性别" readonly />
                </div>
                <!-- 现居住区域 -->
                <van-field v-model="scChildInfo.childArea" name="现居住区域" label="现居住区域" placeholder="请选择现居住区域" readonly/>
                <!-- 详细户籍地址 -->
                <van-field rows="2" autosize type="textarea" v-model="scChildInfo.childAddress" name="详细户籍地址"
                    label="详细户籍地址" placeholder="请输入详细户籍地址" />

                <!-- =============================================================================标题：户籍信息 ============================================================================-->
                <div class="title mt-20">
                    <div class="line"></div>
                    <div>户籍信息</div>
                    <div class="remarks">填写适龄幼儿户口本上的信息</div>
                </div>
                <!-- 户籍类型 -->
                <van-field v-model="domicileType" name="户籍类型" label="户籍类型" placeholder="请选择户籍类型" readonly/>
                
                <!-- 户籍区域 -->
                <van-field rows="1" autosize type="textarea" v-model="detail.domicileArea" name="户籍区域" label="户籍区域"
                    placeholder="请选择省份/市县/区" readonly
                />
                <van-field rows="2" autosize type="textarea" v-model="detail.domicileAddress" name="详细户籍地址"
                    label="详细户籍地址" placeholder="请输入详细户籍地址" readonly/>
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
                  name="证件类型" 
                  label="证件类型"
                  placeholder="请选择证件类型" 
                  readonly 
                />
                <!-- 证件号码 -->
                <van-field v-model="detail.fatherIdNum" name="证件号码" label="证件号码" placeholder="请填写证件号码" />
                <!-- 居住证 -->
                <van-field v-model="fatherResidencePermit" name="居住证" label="居住证" placeholder="请选择居住证" readonly />
                <!-- 联系电话 -->
                <van-field v-model="detail.fatherPhone" name="联系电话" label="联系电话" placeholder="请填写联系电话" readonly/>
                
                <!-- ==============================法定监护人：母亲 ==============================================================================-->
                <van-field v-model="detail.motherName" name="母亲姓名" label="母亲姓名" placeholder="请填写母亲姓名" readonly/>
                 <!-- 证件类型 -->
                <van-field 
                  v-model="motherIdType" 
                  name="证件类型" 
                  label="证件类型"
                  placeholder="请选择证件类型" 
                  readonly 
                />
                <!-- 证件号码 -->
                <van-field v-model="detail.motherIdNum" name="证件号码" label="证件号码" placeholder="请填写证件号码" readonly/>
                <!-- 居住证 -->
                <van-field 
                    v-model="motherResidencePermit" 
                    name="居住证" 
                    label="居住证" 
                    placeholder="请选择居住证"
                    readonly
                    />
                <!-- 联系电话 -->
                <van-field v-model="detail.motherPhone" name="联系电话" label="联系电话" placeholder="请填写联系电话" readonly/>

                <!-- ===============法定监护人：其他 ==================-->
                <van-field v-model="detail.otherName" name="其他法定监护人" label="其他法定监护人" placeholder="请填写其他法定监护人姓名" readonly/>
                <!-- 证件类型 -->
                <van-field 
                  v-model="otherIdType" 
                  name="证件类型" 
                  label="证件类型"
                  placeholder="请选择证件类型" 
                  readonly 
                />
                <!-- 证件号码 -->
                <van-field v-model="detail.otherIdNum" name="证件号码" label="证件号码" placeholder="请填写证件号码" />
                <!-- 居住证 -->
                <van-field 
                    v-model="otherResidencePermit" 
                    name="居住证" 
                    label="居住证" 
                    placeholder="请选择居住证"
                    readonly
                    />
                <!-- 联系电话 -->
                <van-field v-model="detail.otherPhone" name="联系电话" label="联系电话" placeholder="请填写联系电话" />
                <!-- <div class="footer_btn">
                    <div class="btn">
                        <div class="right">
                            <van-button color="#498ef5" size="large" native-type="button" @click="onSubmit(0)">保存</van-button>
                        </div>
                        <div class="left">
                            <van-button color="#498ef5" size="large" native-type="button" @click="onSubmit(1)">提交</van-button>
                        </div>
                    </div>
                </div> -->
                 <div v-if="type">
                    <!-- 标题：上传申请就学所需的材料 -->
                    <div class="title  mt-20" >
                        <div class="line"></div>
                        <div>上传申请就学所需的材料</div>
                    </div>
                    <!-- 居住证/房产证/工作证 -->
                    <van-cell
                        v-for="(item,j) in titleList"
                        :key="j"
                        :title="item.name"
                        is-link
                        :to="{path:'/home/kindergarten/lookImg',query:item}"
                    />
                 </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                type:false,
                checked:false,
                disabled:true,
                detail:{},
                scChildInfo:{},
                chilrenTwoInfo:{
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
            }
        },
        computed: {
            childBirthday() {
                return this.$dayjs( this.scChildInfo.childBirthday).format("YYYY-MM-DD");
            },
            childTwoBirthday() {
                return this.$dayjs( this.chilrenTwoInfo.childBirthday).format("YYYY-MM-DD");
            },
            // 户籍情况
            domicile() { //0是海口市户籍1非海口市户籍
                let val = '';
               switch (this.detail.domicile) {
                    case '0':
                        val = '海口市户籍'
                        break;
                    case '1':
                        val = '非海口市户籍'
                        break;             
                }
                return val;
            },
            // 学校直属区
            schoolArea() {
                let val = '';
                switch (this.detail.schoolArea) {
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
                return val;
            },
            // 幼儿证件类型
            childIdTypeChange() {  // 幼儿证件类型
                let val = '';
                switch ( this.scChildInfo.childIdType) {
                    case '1':
                        val = '居民身份证'
                        break;
                    case '2':
                        val = '护照'
                        break;  
                    case '3':
                        val = '士官证'
                        break; 
                    case '4':
                        val = '出生证'
                        break;             
                }
                return val;
            },
            childTwoInfoIdTypeChange() {  // 双胞胎幼儿证件类型
                let val = '';
                switch (this.chilrenTwoInfo.childIdType) {
                    case '1':
                        val = '居民身份证'
                        break;
                    case '2':
                        val = '护照'
                        break;  
                    case '3':
                        val = '士官证'
                        break; 
                    case '4':
                        val = '出生证'
                        break;             
                }
                return val;
            },
            //  性别
            sexChange() {
                const val = this.scChildInfo.childSex == 0 ? "男" : "女";
                return val;
            },
            //  性别
            sexTwoChange() {
                const val = this.chilrenTwoInfo.childSex == 0 ? "男" : "女";
                return val;
            },
            domicileType() {  // 户籍类型
                let val = '';
                switch (this.detail.domicileType) {
                    case '1':
                        val = '本市城区'
                        break;
                    case '2':
                        val = '本市乡镇'
                        break;  
                    case '3':
                        val = '外市城区'
                        break; 
                    case '4':
                        val = '外市乡镇'
                        break;             
                }
                return val;
            },
            fatherIdType() {  // 父亲证件类型
                let val = '';
                switch (this.detail.fatherIdType) {
                    case '1':
                        val = '居民身份证'
                        break;
                    case '2':
                        val = '护照'
                        break;  
                    case '3':
                        val = '士官证'
                        break; 
                    case '4':
                        val = '出生证'
                        break;             
                }
                return val;
            },
            fatherResidencePermit() { // 父亲居住证
                let val = '';
                switch (this.detail.fatherResidencePermit) {
                    case '0':
                        val = '持有'
                        break;
                    case '1':
                        val = '未持有'
                        break;            
                }
                return val;
            },
            motherIdType() {  // 母亲证件类型
                let val = '';
                switch (this.detail.motherIdType) {
                    case '1':
                        val = '居民身份证'
                        break;
                    case '2':
                        val = '护照'
                        break;  
                    case '3':
                        val = '士官证'
                        break; 
                    case '4':
                        val = '出生证'
                        break;             
                }
                return val;
            },
            motherResidencePermit() { // 母亲居住证
                let val = '';
                switch (this.detail.motherResident) {
                    case '0':
                        val = '持有'
                        break;
                    case '1':
                        val = '未持有'
                        break;            
                }
                return val;
            },
            otherIdType() {  // 其他监护人证件类型
                let val = '';
                switch (this.detail.otherIdType) {
                    case '1':
                        val = '居民身份证'
                        break;
                    case '2':
                        val = '护照'
                        break;  
                    case '3':
                        val = '士官证'
                        break; 
                    case '4':
                        val = '出生证'
                        break;             
                }
                return val;
            },
            otherResidencePermit() { // 其他监护人暂住证 
                let val = '';
                switch (this.detail.otherResident) {
                    case '0':
                        val = '持有'
                        break;
                    case '1':
                        val = '未持有'
                        break;            
                }
                return val;
            }
        },
        created() {
            const applyId =  this.$route.params.applyId;
            const childState =  this.$route.params.type;
            if(childState == 5){
                this.type = true;
                this.getApplyFileDetail(applyId);
            }
            this.getDetail(applyId);
        },
        methods: {
            // 获取申请信息详情
            async getDetail(applyId){
                const res =  await this.$http.get(`/mobile/user/applydetail/${applyId}`);
                if(res.data.code == 0){
                    this.detail = res.data.data;
                    // console.log(this.detail)
                    if(res.data.data.twins == '0'){
                        this.checked = true
                    }else if(res.data.data.twins == '1'){
                        this.checked = false
                    }
                    this.scChildInfo = res.data.data.scChildInfo[0];
                    if(res.data.data.scChildInfo.length>1){
                        // this.chilrenTwoInfo = res.data.data.scChildInfo[1];
                        // 合并对象
                        Object.assign(this.chilrenTwoInfo,res.data.data.scChildInfo[1]);
                    }
                }
            },
            // 获取上传资料详情
            async getApplyFileDetail(applyId){
                const res =  await this.$http.get(`/mobile/user/getApplyFileDetailById/${applyId}`);
                // console.log(res)
                if (res.data.code === 0) {
                    const imgsData = res.data.data;
                    const imagesReq = {
                        // 监护人与孩子的户口簿的图片数组
                        custodianChildAccountImages: imgsData.custodianChildAccountImages,
                        // 出生证明的图片数组
                        birthCertificateImages: imgsData.birthCertificateImages,
                        // 监护人身份证的图片数组
                        custodianIdCardImages: imgsData.custodianIdCardImages,
                        // 预防接种本的图片数组
                        vaccinationImages: imgsData.vaccinationImages,
                        // 居住证/房产证/工作证的图片数组
                        proveImages: imgsData.proveImages
                    };
                    localStorage.applyFileData = JSON.stringify(imagesReq);
                } else {
                    // 清除上传图片的数据
                    localStorage.applyFileData = "";
                }
            },
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