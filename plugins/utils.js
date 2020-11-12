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
         *@desc 时间转化为时间戳
         *@param date 转化对象，可以是数组:转化时间区间，可以是date:转换单个日期
         *@param type[number]
         *   0:target是数组返回第一位的时间戳
         *   1:target是数组返回第二位的时间戳
         *   2:target是date返回时间戳
         *@return date[num]
         */
        convertTime(date, type = 2) {
            let target = 0;
            switch (type) {
                case 0:
                    if (underscore.isArray(date)) {
                        target = date[type] ? moment(date[type]).valueOf() : 0;
                    }
                    break;
                case 1:
                    if (underscore.isArray(date)) {
                        target = date[type] ? moment(date[type]).valueOf() : 0;
                    }
                    break;
                case 2:
                    target = date ? moment(date).valueOf() : 0;
                    break;
                default:
                    target = 0;
                    break;
            }
            return target;
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
                        target = '';
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
         *@desc 手机号脱敏
         *@param phone 手机号
         *@return string
         */
        desensitizationPhone(phone) {
            return phone ? phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2') : '';
        },

        /**
         *@desc 更新菜单数据
         */
        async updateMenuNum() {
            return app.$api.common.getremindcount().then(res => {
                res.forEach(item => {
                    switch (item.key) {
                        case "newleads":
                            store.commit('setMenuNum', {
                                name: "customer-customer-call",
                                num: item.count
                            })
                            break;
                        case "callcenterleads":
                            store.commit('setMenuNum', {
                                name: "customer-customer-call",
                                num: item.count
                            })
                            break;
                        case "todayleads":
                            store.commit('setMenuNum', {
                                name: "customer-today-clue",
                                num: item.count
                            })
                            break;
                        case "appointleads":
                            store.commit('setMenuNum', {
                                name: "customer-today-reserve",
                                num: item.count
                            })
                            break;
                    }
                })
                return res;
            });
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
                        const date1 = moment().startOf('days').format();
                        const date2 = moment().endOf('days').format();
                        picker.$emit('pick', [date1, date2]);
                    }
                }, {
                    text: '昨日',
                    onClick(picker) {
                        let date1 = moment().subtract(1, 'days').startOf('days').format();
                        let date2 = moment().subtract(1, 'days').endOf('days').format();
                        picker.$emit('pick', [date1, date2]);
                    }
                }, {
                    text: '本周',
                    onClick(picker) {
                        let weekDay = moment().format('E');//计算今天是这周第几天
                        let start = moment().subtract(weekDay - 1, 'days').startOf('days').format();//周一日期
                        let end = moment().add(7 - weekDay, 'days').endOf('days').format();//周日日期

                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '本月',
                    onClick(picker) {
                        let start = moment().startOf('month').startOf('days').format();
                        let end = moment().endOf('month').endOf('days').format();
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近7日',
                    onClick(picker) {
                        let date = [];
                        date.push(moment().subtract(6, 'days').startOf('days').format());
                        date.push(moment().endOf('days').format());
                        picker.$emit('pick', date);
                    }
                },
                {
                    text: '最近30日',
                    onClick(picker) {
                        let date = [];
                        date.push(moment().subtract(29, 'days').startOf('days').format());
                        date.push(moment().endOf('days').format());
                        picker.$emit('pick', date);
                    }
                }
            ],
        },

        // 学习中心配置
        leaningCenterProps: {
            multiple: false,
            value: 'deptid',
            label: 'deptname',
            children: 'chlid',
            checkStrictly: true,
        },

        //省市区配置
        cityProps: {
            lazy: true,
            lazyLoad: async (node, resolve) => {
                let level = node.level;
                let param = level === 0 ? {parentid: 0, iscity: true} : {parentid: node.data.id,}
                let nodes = await app.$api.common.getCityStreetData(param) || [];

                if (nodes.length === 0) {
                    nodes = [{name: "未知", id: 0}]
                }

                resolve(nodes.map(item => {
                    return {
                        name: item.name,
                        id: item.id,
                        leaf: level >= 2
                    }
                }));
            },
            value: 'id',
            label: 'name',
            children: 'children',
        }
    })
}