export default ({$axios}, inject) => {
    $axios.defaults.baseURL = 'http://127.0.0.1:7001/'
}