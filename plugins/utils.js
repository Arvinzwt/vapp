/**
 * @pluginsName: $utils
 * @description: 通用数据处理函数
 * @docs: underscore => https://underscorejs.org
 * @docs: moment => http://momentjs.cn
 * @updateRemark:
 * @version: v1.0
 */

import underscore from 'underscore';
import moment from 'moment';

export default ({store, $axios, app}, inject) => {
    inject('utils', {
        U:underscore,

    });
};