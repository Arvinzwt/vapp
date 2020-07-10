import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _32817240 = () => interopDefault(import('../pages/demo.vue' /* webpackChunkName: "pages/demo" */))
const _3afa01d6 = () => interopDefault(import('../pages/paperManage/allExam.vue' /* webpackChunkName: "pages/paperManage/allExam" */))
const _f1d14a52 = () => interopDefault(import('../pages/paperManage/editTest.vue' /* webpackChunkName: "pages/paperManage/editTest" */))
const _53496b92 = () => interopDefault(import('../pages/paperManage/examDraft.vue' /* webpackChunkName: "pages/paperManage/examDraft" */))
const _6e8080b2 = () => interopDefault(import('../pages/paperManage/importTest.vue' /* webpackChunkName: "pages/paperManage/importTest" */))
const _269b96af = () => interopDefault(import('../pages/paperManage/previewTest.vue' /* webpackChunkName: "pages/paperManage/previewTest" */))
const _e5008696 = () => interopDefault(import('../pages/paperManage/unauditedExam.vue' /* webpackChunkName: "pages/paperManage/unauditedExam" */))
const _6fd4e091 = () => interopDefault(import('../pages/testBank/myDraft.vue' /* webpackChunkName: "pages/testBank/myDraft" */))
const _cbb685c2 = () => interopDefault(import('../pages/testBank/myTopic.vue' /* webpackChunkName: "pages/testBank/myTopic" */))
const _2704dd24 = () => interopDefault(import('../pages/testBank/topicDetect.vue' /* webpackChunkName: "pages/testBank/topicDetect" */))
const _3be4c3d6 = () => interopDefault(import('../pages/testBank/topicEdit.vue' /* webpackChunkName: "pages/testBank/topicEdit" */))
const _aeabfff6 = () => interopDefault(import('../pages/testBank/topicModify.vue' /* webpackChunkName: "pages/testBank/topicModify" */))
const _51f899cc = () => interopDefault(import('../pages/testBank/topicUpload.vue' /* webpackChunkName: "pages/testBank/topicUpload" */))
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
    path: "/demo",
    component: _32817240,
    name: "demo"
  }, {
    path: "/paperManage/allExam",
    component: _3afa01d6,
    name: "paperManage-allExam"
  }, {
    path: "/paperManage/editTest",
    component: _f1d14a52,
    name: "paperManage-editTest"
  }, {
    path: "/paperManage/examDraft",
    component: _53496b92,
    name: "paperManage-examDraft"
  }, {
    path: "/paperManage/importTest",
    component: _6e8080b2,
    name: "paperManage-importTest"
  }, {
    path: "/paperManage/previewTest",
    component: _269b96af,
    name: "paperManage-previewTest"
  }, {
    path: "/paperManage/unauditedExam",
    component: _e5008696,
    name: "paperManage-unauditedExam"
  }, {
    path: "/testBank/myDraft",
    component: _6fd4e091,
    name: "testBank-myDraft"
  }, {
    path: "/testBank/myTopic",
    component: _cbb685c2,
    name: "testBank-myTopic"
  }, {
    path: "/testBank/topicDetect",
    component: _2704dd24,
    name: "testBank-topicDetect"
  }, {
    path: "/testBank/topicEdit",
    component: _3be4c3d6,
    name: "testBank-topicEdit"
  }, {
    path: "/testBank/topicModify",
    component: _aeabfff6,
    name: "testBank-topicModify"
  }, {
    path: "/testBank/topicUpload",
    component: _51f899cc,
    name: "testBank-topicUpload"
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
