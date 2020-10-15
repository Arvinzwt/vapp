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
            customStrategy: {
                _scheme: '~/schemes/customScheme',
                endpoints: {
                    login: {url: '/api/auth/login', method: 'post', propertyName: 'token'},
                    logout: {url: '/api/auth/logout', method: 'post'},
                    user: {url: '/api/auth/user', method: 'get', propertyName: 'user'}
                },
            }
        },
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
        transpile: [/^element-ui/, '@nuxtjs/auth'],
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
