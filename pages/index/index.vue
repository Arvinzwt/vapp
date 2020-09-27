<template>
    <view class="content">
        <cButton class="mt-5" height='76' @click="">提交</cButton>
        <text class="iconfont iconUP- animate__animated animate__bounce"></text>
    </view>
</template>
<script>
export default {
    data() {
        return {
            title: 'Hello',
            item: []
        }
    },
    onLoad() {

    },
    methods: {}
}
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200 rpx;
    width: 200 rpx;
    margin-top: 200 rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50 rpx;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36 rpx;
    color: #8f8f94;
}
</style>
