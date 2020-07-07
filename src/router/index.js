
import Vue from 'vue'
import VueRouter from 'vue-router'
import Service from '../views/serviceGuide/serviceGuide'
import School from '../views/schoolSeach/schoolSeach'
import SchoolDetail from '../views/schoolSeach/schoolSearchDetail'
Vue.use(VueRouter)

  const routes = [
   {
    path: '/',
    redirect: '/home',
    meta:{
        footShow:true,
        title:"首页"
    }
   },   
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue'),
    meta:{
      title:"登录"
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register.vue'),
    meta:{
      title:"注册"
    }
  },
//   忘记密码
{
    path: '/forgetPassword',
    name: 'RorgetPassword',
    component: () => import('../views/forgetPassword.vue'),
    meta:{
      title:"忘记密码"
    }
},
//  首页
  {
    path: '/home',
    name: 'Home',
    component:() => import('../views/Home.vue'),
    meta:{
        footShow:true, //显示隐藏底部导航栏
        title:"首页"
    }
  },
//  学校查询
  {
    path: '/home/school',
    name: 'School',
    component: School,
    meta:{
      title:"学校查询"
    }
  },
  {
    path: '/schoolSeachDetail/:scId',
    name: 'SchoolDetail',
    component: SchoolDetail,
    meta:{
      title:"学校详细"
    }
  },
 // 服务指南
  {
    path: '/home/serviceGuide',
    name: 'Service',
    component: Service,
    meta:{
      title:"服务指南"
    }
  }, 
  {
    path: '/home/serviceGuide/serviceGuideDetail/:guideId',
    name: 'ServiceDetail',
    component: () => import('../views/serviceGuide/serviceGuideDetail')
  },
  // 幼儿园登记
  {
    path: '/home/kindergarten',
    name: 'Kindergarten',
    component: () => import('../views/kindergarten/kindergarten.vue'),
    meta:{
      title:"幼儿园入学登记"
    }
  },
  {
    path: '/home/kindergartenNeed',
    name: 'KindergartenNeed',
    component: () => import('../views/kindergarten/kindergartenNeed.vue'),
    meta:{
      title:"查阅须知"
    }
  },
  // 选择户籍情况  
  {
    path: '/home/registry',
    name: 'Registry',
    component: () => import('../views/kindergarten/registry.vue'),
    meta:{
      title:"选择户籍"
    }
  },
  // 选择学区
  {
    path: '/home/selectSchoolDistrict',
    name: 'SelectSchoolDistrict',
    component: () => import('../views/kindergarten/selectSchoolDistrict.vue'),
    meta:{
      title:"选择学区"
    }
  },
  // 选择学校 selectSchool.vue
  {
    path: '/home/kindergarten/selectSchool/:scArea',
    name: 'SelectSchool',
    component: () => import('../views/kindergarten/selectSchool.vue'),
    meta:{
      title:"选择学校"
    }
  },
  // 填写入学信息和编辑入学信息
  {
    path: '/home/kindergarten/admissionInformation',
    name: 'AdmissionInformation',
    component: () => import('../views/kindergarten/admissionInformation.vue'),
    meta:{
      title:"填写入学信息"
    }
  },
  // 编辑申请详情
  {
    path: '/home/kindergarten/editInformation/:applyId',
    name: 'EditInformation',
    component: () => import('../views/kindergarten/editInformation.vue'),
    meta:{
      title:"查看申请信息"
    }  
  },
 // 查看申请详情
  {
    path: '/home/lookInformation/:applyId',
    name: 'LookInformation',
    component: () => import('../views/kindergarten/lookInformation.vue'),
    meta:{
      title:"查看申请信息"
    }  
  },
  //中职首页
  {
    path: '/home/secondarySchool',
    name: 'SecondarySchool',
    component: () => import('../views/secondaryVocationalSchools/index.vue'),
    meta:{
      title:"中职首页",
      footShow:true
    }
  },
  // 招生报名须知
  {
    path: '/home/secondarySchoolNotes',
    name: 'SecondarySchoolNotes',
    component: () => import('../views/secondaryVocationalSchools/notes.vue'),
    meta:{
      title:"招生报名须知"
    }
  },
  // 学校介绍 
  {
    path: '/home/schoolIntroduce/:scId',
    name: 'SchoolIntroduce',
    component: () => import('../views/secondaryVocationalSchools/introduce.vue'),
    meta:{
      title:"学校介绍"
    }
  },
  // 中职点击学校更多 
  {
    path: '/home/schoolList',
    name: 'SchoolListMore',
    component: () => import('../views/secondaryVocationalSchools/schoolList.vue'),
    meta:{
      title:"学校列表"
    }
  },
 // 专业介绍
 {
    path: '/home/profession/:midId',
    name: 'SchoolProfession',
    component: () => import('../views/secondaryVocationalSchools/profession.vue'),
    meta:{
      title:"专业介绍"
    }
  },
  // 底部个人中心菜单
  {
    path: '/personal',
    name: 'Personal',
    component: () => import(/* webpackChunkName: "about" */ '../views/personal.vue'),
    meta:{
        footShow:true
    }
  },
  // 个人中心-个人信息
  {
    path: '/personal/information',
    name: 'information',
    component: () => import('../views/personalCenter/personalInformation.vue'),
    meta:{
      title:"个人信息"
    }
  },
  // 个人中心-安全中心
  {
    path: '/personal/safe',
    name: 'informationSafe',
    component: () => import('../views/personalCenter/personalSafe.vue'),
    meta:{
      title:"安全中心"
    }
  },
  // 个人中心-安全中心-修改密码
  {
    path: '/personal/safe/editPassword',
    name: 'editPassword',
    component: () => import('../views/personalCenter/editPassword.vue'),
    meta:{
      title:"修改密码"
    }
  },
  // 个人中心-家庭成员
  {
    path: '/personal/familyMember',
    name: 'familyMember',
    component: () => import('../views/personalCenter/familyMember.vue'),
    meta:{
      title:"家庭成员"
    }
  },
  // 个人中心-家庭成员-修改成员信息
  {
    path: '/personal/familyMember/editFamily',
    name: 'editFamily',
    component: () => import('../views/personalCenter/editFamily.vue'),
    meta:{
      title:"修改成员信息"
    }
  },
  // 个人中心-家庭成员-修改成员信息
  // {
  //   path: '/personal/familyMember/editFamily',
  //   name: 'editFamily',
  //   component: () => import('../views/personalCenter/editFamily.vue'),
  //   meta:{
  //     title:"修改成员信息"
  //   }
  // },
  // 个人中心-我的申报
  {
    path: '/personal/myDeclaration',
    name: 'myDeclaration',
    component: () => import('../views/myDeclaration/myDeclaration.vue'),
    meta:{
      title:"我的申报"
    }
  },
  // 个人中心-上传资料
  {
    path: '/personal/uploadData',
    name: 'uploadData',
    component: () => import('../views/myDeclaration/uploadData.vue'),
    meta:{
      title:"上传资料"
    }
  },
  // 个人中心-上传资料-上传图片
  {
    path: '/personal/uploadData/uploadImg',
    name: 'uploadImg',
    component: () => import('../views/myDeclaration/uploadImg.vue'),
    meta:{
      title:"上传图片"
    }
  },
  // 个人中心-安全中心-添加手机号
  {
    path: '/personal/safe/addPhone',
    name: 'addPhone',
    component: () => import('../views/personalCenter/addPhone.vue'),
    meta:{
      title:"添加手机号"
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
