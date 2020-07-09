export const state = () => ({});

export const mutations = {
    /**
     *@desc 存储用户信息
     *@return promise [promise]
     */
    saveUserInfo(state, userInfo) {
        Object.assign(state, userInfo);
    },
};

export const actions = {
    /**
     *@desc 设置userInfo
     *@return userInfo [Object]
     */
    async setUserInfo({commit}, userInfo) {
        commit('saveUserInfo', userInfo);//存储vux
        localStorage.setItem('userInfo', JSON.stringify(userInfo));//存储localStorage
        return userInfo;
    },
};

export const getters = {
    /**
     *@desc 拉取userInfo
     *@return userInfo [Object]
     */
    getUserInfo(state) {
        return state;
    }
};