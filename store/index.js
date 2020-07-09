export const state = () => ({});

export const mutations = {
    /**
     *@desc 登出
     *@return promise [promise]
     */
    loginOUt(state) {
        state.userInfo = {};
        state.menuInfo = {
            active: '',
            list: []
        };
    }
};

export const actions = {
    /**
     *@desc 登出
     *@return promise [promise]
     */
    async loginOut({commit}) {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('menuInfo');
        this.$axios.setToken(false);
        commit('loginOUt');
        this.$router.replace({path: '/'});
        return true;
    }
};
