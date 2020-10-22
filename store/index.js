export const state = () => ({});

export const mutations = {
    /**
     *@desc 登出
     */
    logout(state) {
        state = {};
    }
};

export const actions = {
    /**
     *@desc 登出
     *@return promise [promise]
     */
    async logout({commit}) {
        return commit('logout');
    },

};
