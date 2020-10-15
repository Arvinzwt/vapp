module.exports = {
    mode: 'universal',

    /*
    ** Nuxt Telemetry Module
    ** See https://github.com/nuxt/telemetry
    */
    telemetry: false,

    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#4994F2'},

    /*
    ** Global CSS
    */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        '@/assets/css/common.scss'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@/plugins/element-ui',
        '@/plugins/utils',
        '@/plugins/api-repository',
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        // Doc: https://auth.nuxtjs.org/
        '@nuxtjs/auth',
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},

    /*
   ** Auth module configuration
   ** See https://auth.nuxtjs.org/
   */
    auth: {
        strategies: {
            local: {
                endpoints: {
                    //     login: {url: '/api/auth/login', method: 'post', propertyName: 'token'},
                    //     logout: {url: '/api/auth/logout', method: 'post'},
                    //     user: {url: '/api/auth/user', method: 'get', propertyName: 'user'}
                    login: false,
                    user: false,
                    logout: false,
                },
            }
        },
        // redirect: {//通过将设置为，可以禁用每个重定向路径false。您也可以通过设置redirect为禁用所有重定向false
        //     login: '/login',//如果需要登录，用户将被重定向到该路径。
        //     logout: '/',//如果注销后当前路径受保护，则用户将被重定向到该路径。
        //     callback: '/login',//登录后，身份提供者会将用户重定向到此路径。（应将Allowed Callback URLs您的应用程序/客户端中配置的（或类似设置）与身份提供商匹配）
        //     home: '/'//登录后，用户将重定向到该路径。（rewriteRedirects将重写此路径）
        // },
        // watchLoggedIn:true,//启用后（默认），用户将在登录/注销时重定向。
        // token: {
        //     prefix: '_token.'//用于为所有存储提供程序构建令牌存储密钥的默认前缀。
        // }
        // localStorage:{
        //     prefix: 'auth.'//默认令牌前缀，用于在浏览器的localStorage中构建用于令牌存储的密钥。
        // }

    },

    /*
    ** 路由监听
    */
    router: {
        middleware: ['auth']
    },

    /*
    ** Build configuration
    */
    build: {
        transpile: [/^element-ui/],
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    },

    /*
    ** Define server access host and port
    */
    server: {
        port: 3005, // default: 3000
        host: '0.0.0.0', // default: localhost,
    },
}
