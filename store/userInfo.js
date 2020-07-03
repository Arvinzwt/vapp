export const state = () => ({
    "id": 1,
    "name": "张三",
    "token": "ac0a08c4ba093764209258fbb8e86cc4"
});

export const mutations = {
    saveUserInfo(state, userInfo) {
        Object.assign(state, userInfo);
    },
};

export const actions = {
    setUserInfo({commit}, userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        commit('saveUserInfo', userInfo);
    },
};

export const getters = {
    getUserInfo(state) {
        return state;
    }
};