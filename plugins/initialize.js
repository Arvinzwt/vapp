/**
 * @description: vue.js实例化之前加载的数据
 */
export default ({store}, inject) => {
    class Initialize {
        constructor() {

        }
    }

    if (process.client) {
        new Initialize();
    }
}