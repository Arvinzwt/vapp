/**
 * @description: api公用参数配置
 */

let localhost, env, baseUrl;

if (process.client) {// 如果客户端已经被加载，判断域名
    localhost = location.origin;

    //接口地址，根据域名不同调取不同的后端接口地址
    if (localhost.indexOf('crm-dev.jronline.com') !== -1) {//dev
        env = 'dev'
        baseUrl = '//mgr-api-dev.jronline.com'
    } else if (localhost.indexOf('crm-test.jronline.com') !== -1) {//test
        env = 'test'
        baseUrl = '//mgr-api-test.jronline.com'
    } else if (localhost.indexOf('crm-uat.jronline.com') !== -1) {//uat
        env = 'uat'
        baseUrl = '//mgr-api-uat.jronline.com'
    } else if (localhost.indexOf('crm.jronline.com') !== -1) {//pro
        env = 'pro'
        baseUrl = '//mgr-api.jronline.com';
    } else {//local
        env = 'local'
        // baseUrl = '//mgr-api-dev.jronline.com'
        baseUrl = '//localhost:7001'
    }
}

export default {
    localhost,//当前域名
    env,//当前环境
    baseUrl,//接口地址
}