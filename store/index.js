export const state = () => ({});

export const mutations = {
    loginOut(state) {
        for (let key in state.user) {
            if (state.user.hasOwnProperty(key)) {
                state.user[key] = '';
            }
        }
    }
};