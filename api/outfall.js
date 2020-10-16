/**
 * @description: api模块管理
 */
import Common from "./module/common";
import Customer from "./module/customer";

export default context => {
    return {
        common: new Common(context),
        customer: new Customer(context),
    }
}