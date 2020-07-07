
import Vue from 'vue'
import App from './App.vue'
//路由
import router from './router'

// 样式
import "./assets/scss/style.scss"
import "amfe-flexible"

// 字体图标
import "./assets/font/iconfont.css"
import './permission' // permission control
// 引用UI框架
import { Button,Popup, Swipe, SwipeItem ,Tabbar, TabbarItem, Lazyload, Cell, CellGroup, Field, Form, Picker, PullRefresh, List, Search, Sticky ,Tab, Tabs,NavBar, Area, Toast, Image as VanImage, DatetimePicker, Icon, Checkbox, Empty , RadioGroup, Radio, NoticeBar, Overlay,Uploader,ImagePreview,Dialog,Loading,Tag 
} from 'vant'
Vue.use(Button)
Vue.use(Popup)
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Lazyload);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Form);
Vue.use(Field);
Vue.use(Picker);
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Search);
Vue.use(Sticky);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(NavBar);
Vue.use(Area);
Vue.use(Toast);
Vue.use(VanImage);
Vue.use(DatetimePicker);
Vue.use(Icon);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(NoticeBar);
Vue.use(Overlay);
Vue.use(Uploader);
Vue.use(ImagePreview);
Vue.use(Dialog);
Vue.use(Empty);
Vue.use(Tag);
Vue.use(Loading);

Vue.prototype.$imagePreview = ImagePreview;
Vue.prototype.$Dialog = Dialog;
Vue.prototype.$Toast = Toast;
// 动态修改微信公众号title
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

Vue.config.productionTip = false

import http from './http.js'
// 将http加载到Vue原型上面，则可以在任意页面使用this.$http来访问数据请求接口 this.$http.get("/phone/my/index");
Vue.prototype.$http = http;

//序列化对象
import qs from "qs";
Vue.prototype.$qs = qs;
// qs.parse()是将URL解析成对象的形式 qs.stringify()是将对象 序列化成URL的形式，以&进行拼接
/* let postData = this.$qs.stringify({
  consumeType: this.consumeType,
  consumeTime: this.dateTimes[this.consumeTime].consumeTime
});
const res = await this.$http.get(
  `/phone/orderFood/listGoodsPlan?${postData}`
); */

// 修改时间格式
import dayjs from "dayjs";
Vue.prototype.$dayjs = dayjs;
// this.$dayjs(nextDate).format("YYYY-MM-DD")

// 混合器
Vue.mixin({
  filters: {
    
  },
  computed: {
    
  },
  methods: {
    
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
