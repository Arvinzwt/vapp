/**
 * @description: 通用数据处理函数
 * @docs: underscore => https://underscorejs.org
 * @docs: moment => http://momentjs.cn
 */

import underscore from 'underscore';
import moment from 'moment';
import {Message} from "element-ui";
import el from "element-ui/src/locale/lang/el";
import ta from "element-ui/src/locale/lang/ta";

export default ({store, $axios, redirect}, inject) => {
    inject('utils', {
        U: underscore,
        /**
         *@descUTC 通用标准时转换为时间
         *@param date [String] 时间
         *@param type [Number] 类型 默认为2
         *   param[type]:0=>date为数组并取出第一位数字转换；
         *   param[type]:1=>date为数组并取出第2位数字转换；
         *   param[type]:2=>date为数字
         *@return Timestamp [long] 返回YYYY-MM-DD HH:mm:ss
         */
        convertTimestamp(date, type = 2) {
            if (date) {
                if (underscore.isArray(date)) {
                    if (type === 0) {
                        return date[type] ? moment(date[type]).format('YYYY-MM-DD HH:mm:ss') : 0;
                    }

                    if (type === 1) {
                        return date[type] ? moment(date[type]).format('YYYY-MM-DD HH:mm:ss') : 0;
                    }
                } else {
                    return '';
                }

                if (type === 2) {
                    return moment(date[type]).format('YYYY-MM-DD HH:mm:ss');
                }
            } else {
                return 0;
            }

        },
    });


    inject('r', {
        /**
         *@desc 跳转页面
         *@param code [String] 路由code
         *@param query [Number] 携带参数 默认为空
         *@param type [Number] 0跳转，1删除，2删除后跳转到制定地址 默认0
         *@param redirectCode [Object] 如果type是2，删除后跳转到制定地址code，默认空
         *@param redirectQuery [Object] 如果type是2，删除后跳转到制定地址query，默认空
         *@return promise [promise] 刷新成功后页面数据
         */
        async go(code, query = {}, type = 0, {redirectCode = '', redirectQuery = {}} = {}) {
            let menuInfo = JSON.parse(JSON.stringify(store.getters['menuInfo/getMenuInfo']));//菜单信息
            let target = false;//操作菜单
            let redirectTarget = false;//如果type===2，重定向对象
            let tomMenuList = [];//topMenu列表

            menuInfo.list.forEach(item => {
                item.child.forEach(list => {//循环菜单信息
                    if (list.code === code) {//找到操作的菜单
                        if (type === 0) {//如果是跳转
                            list.isTopMenu = true;//操作的菜单显示在topMenu
                            list.query = query;//填充query
                        }

                        if (type === 1) {//如果是删除
                            list.isTopMenu = false;//操作的菜单从顶部菜单去掉
                            list.query = {};//清空query
                        }

                        target = list;//保存操作对象
                    }

                    if (type === 2) {//如果删除后打开制定地址
                        if (list.code === code) {//找到需要删除的菜单
                            list.isTopMenu = false;//操作的菜单从顶部菜单去掉
                            list.query = {};//清空query
                        }

                        if (list.code === redirectCode) {//找到制定的菜单对象
                            list.isTopMenu = true;//显示在topMenu
                            list.query = redirectQuery;//填充query

                            redirectTarget = list;//保存重定向对象
                        }
                    }

                    if (list.isTopMenu) {//将所有topMenu记录下来备用
                        tomMenuList.push(list);
                    }
                })
            });

            if (target) {//如果能找到操作菜单
                let obj;//操作后，打开对象
                switch (type) {
                    case 0:
                        obj = target;//如果是新增-新增对象
                        break;
                    case 1:
                        obj = underscore.last(tomMenuList);//删除时，打开topMenu最近的一个对象
                        break;
                    case 2:
                        obj = redirectTarget;//如果删除后有重定向，打开重定向对象
                        break;
                }
                if (obj) {
                    return store.dispatch('menuInfo/setMenuInfo', {//存储下来信息
                        active: obj.code,
                        list: menuInfo.list,
                    }).then(res => {
                        return redirect({//跳转到操作菜单项
                            path: obj.path,
                            query: obj.query
                        });
                    })
                } else {
                    Message.error('重定向地址错误，请检查路由信息');
                    return Promise.reject(false);
                }
            } else {
                Message.error('参数错误，请检查路由信息');
                return Promise.reject(false);
            }
        }
    })
};