<template>
    <el-container class="crm">
        <Nav class="crm-nav"></Nav>
        <el-container class="crm-container" direction="vertical">
            <Header class="crm-header"></Header>
            <nuxt class="crm-main"/>
        </el-container>
    </el-container>
</template>


<script>
    import Nav from '~/components/Nav.vue'
    import Header from '~/components/Header.vue'

    export default {
        components: {
            Nav,
            Header,
        }
    }
</script>

<style lang="scss">

</style>
