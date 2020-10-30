<template>
    <!--默认模板-->
    <el-container class="jr">
        <aside-template class="jr-aside" :navIsCollapse="navIsCollapse"></aside-template>
        <el-container class="jr-container" direction="vertical">
            <header-template class="jr-header" :navIsCollapse="navIsCollapse"
                             @change="navCollapseHandle"></header-template>
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
    data() {
        return {
            navIsCollapse: true,
        }
    },
    async beforeMount() {
        await this.$store.dispatch('dic');//填充字典
    },
    components: {
        AsideTemplate,
        HeaderTemplate,
        navTemplate,
    },
    methods: {
        navCollapseHandle() {
            this.navIsCollapse = !this.navIsCollapse;
        }
    }
}
</script>

