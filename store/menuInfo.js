export const state = () => ({});

export const mutations = {
    saveMenuInfo(state, menuInfo) {
        Object.assign(state, menuInfo);
    },
};

export const actions = {
    async setMenuInfo({commit}, menuInfo) {
        localStorage.setItem('menuInfo', JSON.stringify(menuInfo));
        commit('saveMenuInfo', menuInfo);
        return menuInfo;
    },
};

export const getters = {
    getMenuInfo(state) {
        return state;
    }
};