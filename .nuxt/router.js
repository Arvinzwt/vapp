import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _56bd5342 = () => interopDefault(import('../pages/demo.vue' /* webpackChunkName: "pages/demo" */))
const _7e48f4d2 = () => interopDefault(import('../pages/goods/home.vue' /* webpackChunkName: "pages/goods/home" */))
const _1351d5ce = () => interopDefault(import('../pages/order/invoiceDetail.vue' /* webpackChunkName: "pages/order/invoiceDetail" */))
const _347c9e3c = () => interopDefault(import('../pages/order/invoiceManage.vue' /* webpackChunkName: "pages/order/invoiceManage" */))
const _524c95da = () => interopDefault(import('../pages/order/orderCreate.vue' /* webpackChunkName: "pages/order/orderCreate" */))
const _7a294aa2 = () => interopDefault(import('../pages/order/orderDetail.vue' /* webpackChunkName: "pages/order/orderDetail" */))
const _d549947a = () => interopDefault(import('../pages/order/orderManage.vue' /* webpackChunkName: "pages/order/orderManage" */))
const _c0dea6c6 = () => interopDefault(import('../pages/order/payManage.vue' /* webpackChunkName: "pages/order/payManage" */))
const _eb1cc086 = () => interopDefault(import('../pages/order/refundManage.vue' /* webpackChunkName: "pages/order/refundManage" */))
const _23f75f03 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/demo",
    component: _56bd5342,
    name: "demo"
  }, {
    path: "/goods/home",
    component: _7e48f4d2,
    name: "goods-home"
  }, {
    path: "/order/invoiceDetail",
    component: _1351d5ce,
    name: "order-invoiceDetail"
  }, {
    path: "/order/invoiceManage",
    component: _347c9e3c,
    name: "order-invoiceManage"
  }, {
    path: "/order/orderCreate",
    component: _524c95da,
    name: "order-orderCreate"
  }, {
    path: "/order/orderDetail",
    component: _7a294aa2,
    name: "order-orderDetail"
  }, {
    path: "/order/orderManage",
    component: _d549947a,
    name: "order-orderManage"
  }, {
    path: "/order/payManage",
    component: _c0dea6c6,
    name: "order-payManage"
  }, {
    path: "/order/refundManage",
    component: _eb1cc086,
    name: "order-refundManage"
  }, {
    path: "/",
    component: _23f75f03,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
