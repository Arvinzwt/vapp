import Vue from 'vue'
import App from './App'
import store from './store'
import VConsole from 'vconsole';

import {env} from './common/api/url.js'//当前环境变量
import $util from "./common/util/base.js"//通用函数
import $api from "./common/api/base.js" //api入口
import cDownloadApp from './common/plugin/cDownloadApp.js' //自定义插件
import mixin_base from "./common/mixin/base.js"; //全局混入
import cDivider from "./components/c/cDivider.vue"//全局组件


// 生产环境隐藏VConsole并阻止启动生产消息
if (env !== 'uat' && env !== 'pro') {
    new VConsole();
    Vue.config.productionTip = true
} else {
    console.log = function () {
    }
    Vue.config.productionTip = false
}

// 配置全局变量
Vue.prototype.$api = $api
Vue.prototype.$util = $util

// 绑定自定义插件
Vue.use(cDownloadApp)

// 注册全局组件
Vue.component('cDivider', cDivider)

// 全局混入
Vue.mixin(mixin_base)

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
