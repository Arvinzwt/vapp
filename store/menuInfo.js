import fa from "element-ui/src/locale/lang/fa";

export const state = () => ({
    active: '',
    list: []
});

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
    },
};