/**
 * @description: vue.js实例化之前加载的数据
 * TODO 根据接口情况更改
 */
export default ({store, $axios, redirect}) => {

    class Initialize {
        constructor() {
            this.setUserInfo();//加载并处理user信息
            this.setDicInfo();//加载并处理数据字典
            this.setMenuInfo();//加载并处理菜单信息
        }

        /**
         * @description: 拉取本地存储的user信息
         */
        setUserInfo() {
            let userInfo = localStorage.getItem('userInfo'); // 拉取本地存储
            if (userInfo) { //如果有，则添加token和vux数据同步
                let user = JSON.parse(userInfo);
                store.commit('userInfo/saveUserInfo', user);//提交
            } else {
                redirect('/')
            }
        }

        /**
         * @description: 拉取本地存储字典信息
         */
        setDicInfo() {

        }

        /**
         * @description: 拉取本地存储的菜单信息
         */
        setMenuInfo() {

        }
    }

    if (process.client) {
        new Initialize();
    }

}