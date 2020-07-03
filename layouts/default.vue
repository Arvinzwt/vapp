<template>
    <el-container class="jr">
        <Nav class="jr-nav"></Nav>
        <el-container class="jr-container" direction="vertical">
            <Header class="jr-header"></Header>
            <TopMenu class="jr-topMenu"></TopMenu>
            <div class="jr-scroll">
                <nuxt class="jr-main"/>
            </div>
        </el-container>
    </el-container>
</template>

<script>
    import Nav from '~/components/common/Nav.vue'
    import Header from '~/components/common/Header.vue'
    import TopMenu from '~/components/common/TopMenu.vue'

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
