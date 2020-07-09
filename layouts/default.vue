<template>
    <el-container class="jr">
        <Nav class="jr-nav"></Nav>
        <el-container class="jr-container" direction="vertical">
            <Header class="jr-header"></Header>
            <TopMenu class="jr-topMenu"></TopMenu>
            <nuxt class="jr-main"/>
        </el-container>
    </el-container>
</template>

<script>
    import Nav from '~/components/Nav.vue'
    import Header from '~/components/Header.vue'
    import TopMenu from '~/components/TopMenu.vue'

    export default {
        components: {
            Nav,
            Header,
            TopMenu,
        }
    }
</script>

<style>

</style>