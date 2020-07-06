export const state = () => ({});

export const mutations = {
    loginOUt(state) {
        state.dicInfo = [];
        state.menuInfo = [];
        state.userInfo = {};
    },
};

export const actions = {
    async loginOut({commit}) {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('menuInfo');
        localStorage.removeItem('dicInfo');
        this.$axios.setToken(false);
        commit('loginOUt');
        return true;
    },
};

