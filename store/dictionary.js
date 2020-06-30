export const state = () => ({
    brand: {}
});

export const actions = {
    /**
     *@desc 请求字典数据
     */
    setDictionary({commit}) {
        return this.$post('common', 'dic', {}).then(res => {
            commit('saveDictionary', res.data);
            return res.data;
        });
    }
};

export const mutations = {
    /**
     *@desc 存储字典数据
     *@param state [Object] state
     *@param dictionary [Object] 字典
     */
    saveDictionary(state, dictionary) {
        Object.assign(state, dictionary)
    },
};

export const getters = {
    /**
     *@desc 获取字典数据
     *@param state [Object] state
     *@para params [Array] 所拉取字典名称列表
     */
    getDictionary: (state) => (params) => {
        return state[params]
    },
};