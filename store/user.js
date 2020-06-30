export const state = () => ({
    name: '',
    id: '',
});

export const mutations = {
    /**
     *@desc 存储用户信息
     */
    saveUserInfo(state, userInfo) {
        Object.assign(state,userInfo)
    },
};

export const actions = {};

export const getters = {};