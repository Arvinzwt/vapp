
export default ({store, $axios, app}, inject) => {
    // 初始化拉取字典数据
    // store.dispatch('dictionary/setDictionary');

    inject('dic', {
        /**
         *@desc 拉取字典
         *@param params [Array] 拉取字典名称列表
         *@return [Object] 字典集合
         */
        gitDic(params) {
            return (store.getters['dictionary/getDictionary'])(params);
        }
    });
};