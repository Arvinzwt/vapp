// Docs：https://underscorejs.org

import underscore from 'underscore';
import moment from 'moment';

export default ({app}, inject) => {
    inject('utils', {
        // ...underscore,

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
        },

        /**
         *@desc 设置时间的快捷按钮
         *@return config [Object] 返回设置数据
         */
        pickerOptions: {
            shortcuts: [
                {
                    text: '当日',
                    onClick(picker) {
                        // 精确到时分秒
                        // const end = moment().endOf('days').format('YYYY-MM-DD HH:mm:ss');
                        // const start = moment().startOf('days').format('YYYY-MM-DD HH:mm:ss');
                        const date = moment().format('YYYY-MM-DD');
                        picker.$emit('pick', [date, date]);
                    }
                }, {
                    text: '昨日',
                    onClick(picker) {
                        let date = moment().subtract('days',1).format('YYYY-MM-DD');
                        // 获取昨天的开始结束时间，精确到时分秒
                        // moment().subtract('days',1).startOf('days').format('YYYY-MM-DD HH:mm:ss')
                        // moment().subtract('days',1).endOf('days').format('YYYY-MM-DD HH:mm:ss')
                        picker.$emit('pick', [date,date]);
                    }
                }, {
                    text: '本周',
                    onClick(picker) {
                        let start = moment().startOf('week').format('YYYY-MM-DD')
                        let end = moment().endOf('week').format('YYYY-MM-DD')

                        picker.$emit('pick', [start,end]);
                    }
                },
                {
                    text: '本月',
                    onClick(picker) {
                        let start = moment().startOf('month').format('YYYY-MM-DD')
                        let end = moment().endOf('month').format('YYYY-MM-DD')
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近7日',
                    onClick(picker) {
                        let date = [];
                        // 不包含当天
                        date.push(moment().subtract('days',7).format('YYYY-MM-DD'));
                        date.push(moment().subtract('days',1).format('YYYY-MM-DD'));
                        // 包含当天
                        // date.push(moment().subtract('days',6).format('YYYY-MM-DD'))
                        // date.push(moment().format('YYYY-MM-DD'))
                        picker.$emit('pick', date);
                    }
                },
                {
                    text: '最近30日',
                    onClick(picker) {
                        let date = [];
                        date.push(moment().subtract('days',30).format('YYYY-MM-DD'))
                        date.push(moment().subtract('days',1).format('YYYY-MM-DD'))
                        picker.$emit('pick', date);
                    }
                }
            ]
        },
    });
}
