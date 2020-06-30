import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _30ffee15 = () => interopDefault(import('../pages/goods/home.vue' /* webpackChunkName: "pages/goods/home" */))
const _5770751d = () => interopDefault(import('../pages/order/home.vue' /* webpackChunkName: "pages/order/home" */))
const _7e91c076 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/goods/home",
    component: _30ffee15,
    name: "goods-home"
  }, {
    path: "/order/home",
    component: _5770751d,
    name: "order-home"
  }, {
    path: "/",
    component: _7e91c076,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
