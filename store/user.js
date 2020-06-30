export const state = () => ({
    name: '',
    id: '',
});

export const mutations = {
    saveUserInfo(state, userInfo) {
        Object.assign(state,userInfo)
    },
};

export const actions = {};

export const getters = {};