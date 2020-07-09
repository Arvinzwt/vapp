module.exports = {
    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
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
        title: '精锐在线',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ],
        script: [
            {src: '/libs/ckeditor4/ckeditor.js'},
            {src: '/libs/ckeditor4/samples/js/sample.js'},
            {src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'},
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
        '@/plugins/initialize',
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
    ],

    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},

    /*
    ** Build configuration
    */
    build: {
        transpile: [/^element-ui/],
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        },

        extractCSS: {
            allChunks: true
        },
    },

    /*
     ** Define server access host and port
     */
    server: {
        port: 3000, // default: 3000
        host: 'localhost', // default: localhost,
    },
};
