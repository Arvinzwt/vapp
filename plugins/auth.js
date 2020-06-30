export default ({store, $axios, app}, inject) => {
    //加载时填充userInfo
    if (process.client) {
        let userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            store.commit('user/saveUserInfo', JSON.parse(userInfo));
        }
    }

    inject('auth', {
        /**
         *@desc 登录
         *@return [promise] userInfo
         */
        async login(params) {
            return app.$post('common', 'login', params).then(userInfo => {
                store.commit('user/saveUserInfo', userInfo);
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                return userInfo;
            });
        },

        /**
         *@desc 登出
         *@return [promise]
         */
        loginOut() {
            store.commit('loginOut');
            localStorage.removeItem('userInfo');
            $axios.setToken(false);
        },

        /**
         *@desc 拉取用户信息
         *@return [promise]
         */
        getUserInfo() {
            return store.state.user;
        },

        /**
         *@desc 验证用户权限
         *@return [promise]
         */
        verifyAuth() {
            return true;
        }
    });
}