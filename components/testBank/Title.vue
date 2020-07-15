<template>
    <!--标题-->
    <div class="jr-title">
        <h2 class="title">
            <slot></slot>
        </h2>
        <a v-if="haveLink" class="link color-blue font-basic"
           href="http://guanjia.onesmart.org:991/helper/ExciseUpload-guide.html"
           target="_blank">
            <span class="el-icon-warning-outline"></span>
            <span>查看学习管家操作指南</span>
        </a>
    </div>
</template>

<script>
    export default {
        name: "Title",
        props: {
            haveLink: {
                type: Boolean,
                default: false,
            }
        }
    }
</script>

<style lang="scss">
    .jr-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 25px;
        }
    }
</style>