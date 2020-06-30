export const state = () => ({});

export const mutations = {
    /**
     *@desc 登出-清除user/menu/dic数据
     */
    loginOut(state) {

        for (let key in state.user) {
            if (state.user.hasOwnProperty(key)) {
                state.user[key] = '';
            }
        }
    }
};