/**
 * @description: 线索客户接口
 */
import Request from "../request";

export default class Customer extends Request {
    constructor(context) {
        super(context);
    }

    //分配用户
    async assignCustomer(data) {
        return true;
    }

    //呼叫用户
    async callCustomer(data) {
        return true;
    }

    //用户详情
    async customerDetail(data) {
        return {};
    }

    //获取地图信息
    async getMap(data){
        return []
    }
}