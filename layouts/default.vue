<template>
    <!--默认模板-->
    <el-container class="jr">
        <aside-template class="jr-aside"></aside-template>
        <el-container class="jr-container" direction="vertical">
            <header-template class="jr-header"></header-template>
            <nav-template class="jr-nav"></nav-template>
            <nuxt class="jr-main"/>
        </el-container>
    </el-container>
</template>

<script>
import AsideTemplate from '~/components/Aside.vue'
import HeaderTemplate from '~/components/Header.vue'
import navTemplate from '~/components/Nav.vue'

export default {
    components: {
        AsideTemplate,
        HeaderTemplate,
        navTemplate,
    }
}
</script>

