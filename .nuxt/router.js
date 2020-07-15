import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _34a29f16 = () => interopDefault(import('../pages/demo.vue' /* webpackChunkName: "pages/demo" */))
const _52958286 = () => interopDefault(import('../pages/paperManage/AllEditTest.vue' /* webpackChunkName: "pages/paperManage/AllEditTest" */))
const _60108214 = () => interopDefault(import('../pages/paperManage/AllEditTopic.vue' /* webpackChunkName: "pages/paperManage/AllEditTopic" */))
const _3a0e9820 = () => interopDefault(import('../pages/paperManage/AllExam.vue' /* webpackChunkName: "pages/paperManage/AllExam" */))
const _30ed2012 = () => interopDefault(import('../pages/paperManage/AuditEditTest.vue' /* webpackChunkName: "pages/paperManage/AuditEditTest" */))
const _69c2781a = () => interopDefault(import('../pages/paperManage/AuditEditTopic.vue' /* webpackChunkName: "pages/paperManage/AuditEditTopic" */))
const _20fee32c = () => interopDefault(import('../pages/paperManage/EditTest.vue' /* webpackChunkName: "pages/paperManage/EditTest" */))
const _5efb6b85 = () => interopDefault(import('../pages/paperManage/EditTopic.vue' /* webpackChunkName: "pages/paperManage/EditTopic" */))
const _7964cc82 = () => interopDefault(import('../pages/paperManage/ExamDraft.vue' /* webpackChunkName: "pages/paperManage/ExamDraft" */))
const _2ca747c7 = () => interopDefault(import('../pages/paperManage/ImportTest.vue' /* webpackChunkName: "pages/paperManage/ImportTest" */))
const _5ac76d45 = () => interopDefault(import('../pages/paperManage/paperAll.vue' /* webpackChunkName: "pages/paperManage/paperAll" */))
const _0c243a45 = () => interopDefault(import('../pages/paperManage/paperDraft.vue' /* webpackChunkName: "pages/paperManage/paperDraft" */))
const _15d778d4 = () => interopDefault(import('../pages/paperManage/paperEdit.vue' /* webpackChunkName: "pages/paperManage/paperEdit" */))
const _4b15d6b1 = () => interopDefault(import('../pages/paperManage/paperImport.vue' /* webpackChunkName: "pages/paperManage/paperImport" */))
const _5b6448e4 = () => interopDefault(import('../pages/paperManage/paperReview.vue' /* webpackChunkName: "pages/paperManage/paperReview" */))
const _2d4db23a = () => interopDefault(import('../pages/paperManage/PreviewTest.vue' /* webpackChunkName: "pages/paperManage/PreviewTest" */))
const _ede4833e = () => interopDefault(import('../pages/paperManage/UnauditExam.vue' /* webpackChunkName: "pages/paperManage/UnauditExam" */))
const _37951174 = () => interopDefault(import('../pages/testBank/myDraft.vue' /* webpackChunkName: "pages/testBank/myDraft" */))
const _0e8553d4 = () => interopDefault(import('../pages/testBank/myTopic.vue' /* webpackChunkName: "pages/testBank/myTopic" */))
const _7c99c5a3 = () => interopDefault(import('../pages/testBank/topicDetect.vue' /* webpackChunkName: "pages/testBank/topicDetect" */))
const _7eb948ec = () => interopDefault(import('../pages/testBank/topicEdit.vue' /* webpackChunkName: "pages/testBank/topicEdit" */))
const _38c6343a = () => interopDefault(import('../pages/testBank/topicModify.vue' /* webpackChunkName: "pages/testBank/topicModify" */))
const _3bd663fe = () => interopDefault(import('../pages/testBank/topicUpload.vue' /* webpackChunkName: "pages/testBank/topicUpload" */))
const _7331a830 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _34a29f16,
    name: "demo"
  }, {
    path: "/paperManage/AllEditTest",
    component: _52958286,
    name: "paperManage-AllEditTest"
  }, {
    path: "/paperManage/AllEditTopic",
    component: _60108214,
    name: "paperManage-AllEditTopic"
  }, {
    path: "/paperManage/AllExam",
    component: _3a0e9820,
    name: "paperManage-AllExam"
  }, {
    path: "/paperManage/AuditEditTest",
    component: _30ed2012,
    name: "paperManage-AuditEditTest"
  }, {
    path: "/paperManage/AuditEditTopic",
    component: _69c2781a,
    name: "paperManage-AuditEditTopic"
  }, {
    path: "/paperManage/EditTest",
    component: _20fee32c,
    name: "paperManage-EditTest"
  }, {
    path: "/paperManage/EditTopic",
    component: _5efb6b85,
    name: "paperManage-EditTopic"
  }, {
    path: "/paperManage/ExamDraft",
    component: _7964cc82,
    name: "paperManage-ExamDraft"
  }, {
    path: "/paperManage/ImportTest",
    component: _2ca747c7,
    name: "paperManage-ImportTest"
  }, {
    path: "/paperManage/paperAll",
    component: _5ac76d45,
    name: "paperManage-paperAll"
  }, {
    path: "/paperManage/paperDraft",
    component: _0c243a45,
    name: "paperManage-paperDraft"
  }, {
    path: "/paperManage/paperEdit",
    component: _15d778d4,
    name: "paperManage-paperEdit"
  }, {
    path: "/paperManage/paperImport",
    component: _4b15d6b1,
    name: "paperManage-paperImport"
  }, {
    path: "/paperManage/paperReview",
    component: _5b6448e4,
    name: "paperManage-paperReview"
  }, {
    path: "/paperManage/PreviewTest",
    component: _2d4db23a,
    name: "paperManage-PreviewTest"
  }, {
    path: "/paperManage/UnauditExam",
    component: _ede4833e,
    name: "paperManage-UnauditExam"
  }, {
    path: "/testBank/myDraft",
    component: _37951174,
    name: "testBank-myDraft"
  }, {
    path: "/testBank/myTopic",
    component: _0e8553d4,
    name: "testBank-myTopic"
  }, {
    path: "/testBank/topicDetect",
    component: _7c99c5a3,
    name: "testBank-topicDetect"
  }, {
    path: "/testBank/topicEdit",
    component: _7eb948ec,
    name: "testBank-topicEdit"
  }, {
    path: "/testBank/topicModify",
    component: _38c6343a,
    name: "testBank-topicModify"
  }, {
    path: "/testBank/topicUpload",
    component: _3bd663fe,
    name: "testBank-topicUpload"
  }, {
    path: "/",
    component: _7331a830,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
