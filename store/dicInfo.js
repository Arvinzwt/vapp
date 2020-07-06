export const state = () => ({});

export const mutations = {
    saveDicInfo(state, dicInfo) {
        Object.assign(state, dicInfo);
    },
};

export const actions = {
    async setDicInfo({commit}, dicInfo) {
        localStorage.setItem('dicInfo', JSON.stringify(dicInfo));
        commit('saveDicInfo', dicInfo);
        return dicInfo;
    },
};

export const getters = {
    getDicInfo(state) {
        return state;
    }
};