import base from '../base';

class Api extends base {
    //登录
    login(data, config) {
        return this.post('/ool-api/user/base/login', data, config);
    }

    //菜单
    getMenu(data) {
        return this.post('/mgr-api/v1/admin/menus', data);
    }

    //字典
    getDicInfo() {
        return this.post('/mgr-api/v1/basic/dics');
    }
}

export default new Api();