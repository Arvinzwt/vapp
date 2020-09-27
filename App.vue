<script>
export default {
    onLaunch: function() {
        console.log('App Launch')
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    }
}
</script>

<style>
/*每个页面公共css */
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css");
@import url("https://at.alicdn.com/t/font_2101497_7yrbpn8l19c.css");
@import url("common/css/free.css");
@import url("common/css/common.css");

.iconfont{
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}
</style>
