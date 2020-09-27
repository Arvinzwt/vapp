let localhost = location.protocol + "//" + location.host + "/#/",//前端域名+端口
    env = "local",//当前环境
    api_url = '//api-dev.jronline.com',//接口地址
    admin_url = '//admin-dev.jronline.com';//接口地址

//接口地址，根据域名不同调取不同的后端接口地址
if (localhost.indexOf('dev') > -1) {//dev
    env = 'dev'
    api_url = '//api-dev.jronline.com'
    admin_url = '//admin-dev.jronline.com'
} else if (localhost.indexOf('test') > -1) {//test
    env = 'test'
    api_url = '//api-test.jronline.com'
    admin_url = '//admin-test.jronline.com'
} else if (localhost.indexOf('uat') > -1) {//uat
    env = 'uat'
    api_url = '//api-uat.jronline.com'
    admin_url = '//admin-test.jronline.com'
} else if (localhost.indexOf('marketing.jronline.com') > -1) {//pro
    env = 'pro'
    api_url = '//api.jronline.com';
    admin_url = '//admin.jronline.com'
}

export default {
    localhost,//当前域名+端口
    env,//当前环境
    base: api_url,//接口地址
    admin_url,//接口地址
    //基础服务
    COMMON_API: "/common-api/api",
    //用户服务
    USER_API: "/user-api/api",
    //营销服务
    MARKET_API: "/market-api/api",
    //商品交易服务
    TRADE_API: "/trade-api/api",
    //课表服务
    COURSE_API: "/course-api/api",
    LEADS_API: "/leads-api",
    //appserver
    OOL_API: "/ool-api",

    //客服地址
    service_url: "https://kefu.easemob.com/webim/im.html?configId=18577ca9-2553-41c9-b7e4-0649efe31f0f&autoConnect=true",
    //app下载地址
    ANDROID_DOWNLOAD_URL: "https://sj.qq.com/myapp/detail.htm?apkName=com.jingruionline.student.mobile",
    IOS_DOWNLOAD_URL: "https://apps.apple.com/us/app/%E7%B2%BE%E9%94%90%E5%9C%A8%E7%BA%BF/id1505987947?l=zh&ls=1",
    JR_ONLINE: "https://h5.jronline.com",
}

