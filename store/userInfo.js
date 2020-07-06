export const state = () => ({});

export const mutations = {
    saveUserInfo(state, userInfo) {
        Object.assign(state, userInfo);
    },
};

export const actions = {
    async setUserInfo({commit}, userInfo) {
        commit('saveUserInfo', userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        return userInfo;
    },
};

export const getters = {
    getUserInfo(state) {
        return state;
    }
};