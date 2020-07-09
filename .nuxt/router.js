import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _32817240 = () => interopDefault(import('../pages/demo.vue' /* webpackChunkName: "pages/demo" */))
const _45eca6f5 = () => interopDefault(import('../pages/paperManage/AllExam.vue' /* webpackChunkName: "pages/paperManage/AllExam" */))
const _de3aa212 = () => interopDefault(import('../pages/paperManage/EditTest.vue' /* webpackChunkName: "pages/paperManage/EditTest" */))
const _28ddcdcc = () => interopDefault(import('../pages/paperManage/EditTopic.vue' /* webpackChunkName: "pages/paperManage/EditTopic" */))
const _05fa7a17 = () => interopDefault(import('../pages/paperManage/ExamDraft.vue' /* webpackChunkName: "pages/paperManage/ExamDraft" */))
const _32c74cd2 = () => interopDefault(import('../pages/paperManage/ImportTest.vue' /* webpackChunkName: "pages/paperManage/ImportTest" */))
const _29a362e2 = () => interopDefault(import('../pages/paperManage/PreviewTest.vue' /* webpackChunkName: "pages/paperManage/PreviewTest" */))
const _46ee5ab6 = () => interopDefault(import('../pages/paperManage/UnauditExam.vue' /* webpackChunkName: "pages/paperManage/UnauditExam" */))
const _533ab887 = () => interopDefault(import('../pages/testBank/draftEdit.vue' /* webpackChunkName: "pages/testBank/draftEdit" */))
const _6fd4e091 = () => interopDefault(import('../pages/testBank/myDraft.vue' /* webpackChunkName: "pages/testBank/myDraft" */))
const _cbb685c2 = () => interopDefault(import('../pages/testBank/myTopic.vue' /* webpackChunkName: "pages/testBank/myTopic" */))
const _ec456978 = () => interopDefault(import('../pages/testBank/resolveFile.vue' /* webpackChunkName: "pages/testBank/resolveFile" */))
const _0cdbba3e = () => interopDefault(import('../pages/testBank/titleEdit.vue' /* webpackChunkName: "pages/testBank/titleEdit" */))
const _34570848 = () => interopDefault(import('../pages/testBank/titleSearch.vue' /* webpackChunkName: "pages/testBank/titleSearch" */))
const _01b04fb5 = () => interopDefault(import('../pages/testBank/titleUpload.vue' /* webpackChunkName: "pages/testBank/titleUpload" */))
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
    path: "/paperManage/AllExam",
    component: _45eca6f5,
    name: "paperManage-AllExam"
  }, {
    path: "/paperManage/EditTest",
    component: _de3aa212,
    name: "paperManage-EditTest"
  }, {
    path: "/paperManage/EditTopic",
    component: _28ddcdcc,
    name: "paperManage-EditTopic"
  }, {
    path: "/paperManage/ExamDraft",
    component: _05fa7a17,
    name: "paperManage-ExamDraft"
  }, {
    path: "/paperManage/ImportTest",
    component: _32c74cd2,
    name: "paperManage-ImportTest"
  }, {
    path: "/paperManage/PreviewTest",
    component: _29a362e2,
    name: "paperManage-PreviewTest"
  }, {
    path: "/paperManage/UnauditExam",
    component: _46ee5ab6,
    name: "paperManage-UnauditExam"
  }, {
    path: "/testBank/draftEdit",
    component: _533ab887,
    name: "testBank-draftEdit"
  }, {
    path: "/testBank/myDraft",
    component: _6fd4e091,
    name: "testBank-myDraft"
  }, {
    path: "/testBank/myTopic",
    component: _cbb685c2,
    name: "testBank-myTopic"
  }, {
    path: "/testBank/resolveFile",
    component: _ec456978,
    name: "testBank-resolveFile"
  }, {
    path: "/testBank/titleEdit",
    component: _0cdbba3e,
    name: "testBank-titleEdit"
  }, {
    path: "/testBank/titleSearch",
    component: _34570848,
    name: "testBank-titleSearch"
  }, {
    path: "/testBank/titleUpload",
    component: _01b04fb5,
    name: "testBank-titleUpload"
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
