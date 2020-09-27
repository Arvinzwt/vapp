import $H from "../request.js"
import url from "../url.js"

export default {
    //发送验证码
    sendSms(data) {
        return $H.post(`${url.USER_API}/Validation/sms`,data)
    },

    //校验验证码
    validateSms(data){
        return $H.post(`${url.USER_API}/Validation/validate`,data)
    },

    login(data){
        return $H.post(`${url.OOL_API}/user/login`,data)
    },

    //获取openid
    getOpenId(){
        let returnUrl = window.location.origin + '/$$/' + window.location.hash.replace('#/','');
        returnUrl = encodeURIComponent(returnUrl);
        console.log(`${url.admin_url}/Distribution/WeiXinLogin?callurl=${returnUrl}`)
        window.location.href = `${url.admin_url}/Distribution/WeiXinLogin?callurl=${returnUrl}`
    },

    //根据手机号重置密码
    setPassword(data){
        return $H.post(`${url.USER_API}/User/restpwd`,data)
    },

    //获取字典数据
    getBasic(code){
        return $H.get(`${url.COMMON_API}/basic`,code)
    }
}
