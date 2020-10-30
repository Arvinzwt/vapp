/**
 * @description: 自定义工具函数
 * @docs: underscore => https://underscorejs.org
 * @docs: moment => http://momentjs.cn
 */

import underscore from 'underscore';
import moment from 'moment';

export default ({store, $axios, app}, inject) => {
    inject('utils', {
        underscore,
        moment,

        /**
         *@desc 验证权限
         *@param authCode 需要验证的权限code
         *@return {string}
         */
        verifyAuth(authCode = '') {
            let right = '';
            if (process.client) {
                let usr = localStorage.getItem('usr');//存储localStorage
                right = usr ? JSON.parse(usr).rightid || '' : ''
            }
            return right.split(',').includes(authCode);
        },

        /**
         *@desc 格式化时间
         *@param timestamp[number] 单位为毫秒的时间戳或者date对象
         *@param format[string] 格式化时间结构默认YYYY-MM-DD HH:mm:ss
         *@return date[string]
         */
        formatTime(timestamp, format = 'YYYY/MM/DD HH:mm:ss') {
            return timestamp ? moment(timestamp).format(format) : ''
            // 时间戳单位为秒时// return timestamp ? moment.unix(timestamp).format(format) : '';
        },

        /**
         *@desc 重置json对象-只能处理第一层
         *@param json[Object] 重置对象
         *@param arr[array] 忽略的值
         *@return json[Object]
         */
        resetJson(json, arr = []) {
            for (let key in json) {
                if (json.hasOwnProperty(key) && !arr.includes(key)) {
                    let target = json[key];
                    if (underscore.isObject(json[key])) {
                        target = {};
                    }
                    if (underscore.isArray(json[key])) {
                        target = [];
                    }
                    if (underscore.isFunction(json[key])) {
                        target = json[key];
                    }
                    if (underscore.isString(json[key])) {
                        target = '';
                    }
                    if (underscore.isNumber(json[key])) {
                        target = '0';
                    }
                    if (underscore.isBoolean(json[key])) {
                        target = false;
                    }
                    json[key] = target;
                }
            }
            return json;
        },

        /**
         *@desc 时间区间选择器的快捷筛选
         */
        pickerOptions: {
            firstDayOfWeek: 1,
            shortcuts: [
                {
                    text: '当日',
                    onClick(picker) {
                        const date1 = moment().startOf('days').format('YYYY-MM-DD HH:mm:ss');
                        const date2 = moment().endOf('days').format('YYYY-MM-DD HH:mm:ss');
                        picker.$emit('pick', [date1, date2]);
                    }
                }, {
                    text: '昨日',
                    onClick(picker) {
                        let date1 = moment().subtract(1, 'days').startOf('days').format('YYYY-MM-DD HH:mm:ss');
                        let date2 = moment().subtract(1, 'days').endOf('days').format('YYYY-MM-DD HH:mm:ss');
                        picker.$emit('pick', [date1, date2]);
                    }
                }, {
                    text: '本周',
                    onClick(picker) {
                        let weekDay = moment().format('E');//计算今天是这周第几天
                        let start = moment().subtract(weekDay - 1, 'days').startOf('days').format('YYYY-MM-DD HH:mm:ss');//周一日期
                        let end = moment().add(7 - weekDay, 'days').endOf('days').format('YYYY-MM-DD HH:mm:ss');//周日日期

                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '本月',
                    onClick(picker) {
                        let start = moment().startOf('month').startOf('days').format('YYYY-MM-DD HH:mm:ss');
                        let end = moment().endOf('month').endOf('days').format('YYYY-MM-DD HH:mm:ss');
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近7日',
                    onClick(picker) {
                        let date = [];
                        date.push(moment().subtract(6, 'days').startOf('days').format('YYYY-MM-DD HH:mm:ss'));
                        date.push(moment().endOf('days').format('YYYY-MM-DD HH:mm:ss'));
                        picker.$emit('pick', date);
                    }
                },
                {
                    text: '最近30日',
                    onClick(picker) {
                        let date = [];
                        date.push(moment().subtract(29, 'days').startOf('days').format('YYYY-MM-DD HH:mm:ss'));
                        date.push(moment().endOf('days').format('YYYY-MM-DD HH:mm:ss'));
                        picker.$emit('pick', date);
                    }
                }
            ],
        },

    })
}