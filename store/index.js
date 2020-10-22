export const state = () => ({
    user: {}
});

export const mutations = {
    /**
     *@desc 登出
     */
    logout(state) {
        state.user = {};
    }
};

export const actions = {
    /**
     *@desc 登出
     *@return promise [promise]
     */
    async logout({commit}) {
        console.log('登出')
        return commit('logout');
    },

};
