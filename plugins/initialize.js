/**
 * @description: vue.js实例化之前加载的数据
 * TODO 根据接口情况更改
 */
export default ({store}, inject) => {
    class Initialize {
        constructor() {
            this.setUserInfo();//加载并处理user信息
            this.setMenuInfo();//加载并处理菜单信息
        }

        /**
         * @description: 拉取本地存储的user信息
         */
        setUserInfo() {
            let userInfo = localStorage.getItem('userInfo'); // 拉取本地存储
            if (userInfo) { //如果有，则添加token和vux数据同步
                store.commit('userInfo/saveUserInfo', JSON.parse(userInfo));//提交
            }
        }

        /**
         * @description: 拉取本地存储的菜单信息
         */
        setMenuInfo() {
            let MenuInfo = localStorage.getItem('menuInfo'); // 拉取本地存储
            if (MenuInfo) { //如果有，则添加token和vux数据同步
                store.commit('menuInfo/saveMenuInfo', JSON.parse(MenuInfo));//提交
            }
        }
    }

    if (process.client) {
        new Initialize();
    }
}