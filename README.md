<!--
 * @Author: lck
 * @Date: 2020-06-30 08:42:31
 * @LastEditTime: 2020-07-08 08:31:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \education\README.md
--> 

# education

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
"serve": "vue-cli-service serve",//本地开发运行，会把process.env.NODE_ENV设置为'development'

### Compiles and minifies for production
```
npm run build
```
"build": "vue-cli-service build", // 默认打包模式，会把process.env.NODE_ENV设置为'production'

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 项目目录结构

├── node_modules               # 依赖包相关
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── http.js                # 请求相关
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   │       ├── tabContent     # tab 下拉刷新容器
│   ├── router                 # 路由
│   ├── views                  # views 所有页面
│   │     ├── kindergarten     # 幼儿园登记入口模块所有页面
│   │     ├── serviceGuide     # 服务查询入口模块所有页面
│   │     ├── schoolSeach      # 学校查询入口模块所有页面
│   │     ├── secondaryVocationalSchools     # 中职入口模块所有页面
│   │     ├── personalCenter     # 个人中心模块所有页面
│   │     ├── myDeclaration     # 我的申报模块所有页面
│   │     ├── login.vue        # 登录页面
│   │     ├── register.vue     # 注册页面  
│   │     ├── personal.vue     # 个人中心主页
│   │     ├── Home.vue         # 首页
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化 filter等
│   └── permission.js          # 权限管理
├── .env.xxx                   # 环境变量配置
├── .babel.config.js           # babel-loader 配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json