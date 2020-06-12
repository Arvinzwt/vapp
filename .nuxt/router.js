import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _eb427a48 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _b3750d0e = () => interopDefault(import('../pages/crm/auditionList.vue' /* webpackChunkName: "pages/crm/auditionList" */))
const _5aec9610 = () => interopDefault(import('../pages/crm/leadsAdd.vue' /* webpackChunkName: "pages/crm/leadsAdd" */))
const _a34d61ac = () => interopDefault(import('../pages/crm/leadsFollow.vue' /* webpackChunkName: "pages/crm/leadsFollow" */))
const _b44f25c4 = () => interopDefault(import('../pages/crm/leadsImport.vue' /* webpackChunkName: "pages/crm/leadsImport" */))
const _2047bb99 = () => interopDefault(import('../pages/crm/novoRecord.vue' /* webpackChunkName: "pages/crm/novoRecord" */))
const _59779abd = () => interopDefault(import('../pages/crm/quotaSettings.vue' /* webpackChunkName: "pages/crm/quotaSettings" */))
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
    path: "/login",
    component: _eb427a48,
    name: "login"
  }, {
    path: "/crm/auditionList",
    component: _b3750d0e,
    name: "crm-auditionList"
  }, {
    path: "/crm/leadsAdd",
    component: _5aec9610,
    name: "crm-leadsAdd"
  }, {
    path: "/crm/leadsFollow",
    component: _a34d61ac,
    name: "crm-leadsFollow"
  }, {
    path: "/crm/leadsImport",
    component: _b44f25c4,
    name: "crm-leadsImport"
  }, {
    path: "/crm/novoRecord",
    component: _2047bb99,
    name: "crm-novoRecord"
  }, {
    path: "/crm/quotaSettings",
    component: _59779abd,
    name: "crm-quotaSettings"
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
