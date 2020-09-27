import cDownloadApp from '@/components/c/cDownloadApp.vue'
const obj = {};

obj.install = function (Vue) {
    //1.创建组件构造器
    const contrustor = Vue.extend(cDownloadApp);

    //2.创建组件构造器实例
    const instance = new contrustor();

    //3.手动将实例挂载到body上
    instance.$mount(document.createElement('div'));

    //渲染到body里面
    document.body.appendChild(instance.$el);

    Vue.prototype.$cDownloadApp = instance;
}

export default obj
