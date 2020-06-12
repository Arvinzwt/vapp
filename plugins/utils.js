// Docs：https://underscorejs.org

import underscore from 'underscore';

export default ({app}, inject) => {
    inject('utils', {
        ...underscore,

        /**
         *@desc 手机号脱敏
         *@param phone [String] 电话号码
         *@return config [Object] 返回对象
         */
        desensitization(phone) {
            if (phone) {
                let str = underscore.isNumber(phone) ? phone.toString() : phone;
                return str.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
            } else {
                return '';
            }
        }
    });
}
