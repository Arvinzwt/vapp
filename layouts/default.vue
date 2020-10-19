<template>
    <el-container class="jr">
        <asideTemplate class="jr-aside"></asideTemplate>
        <el-container class="jr-container" direction="vertical">
            <headerTemplate class="jr-header"></headerTemplate>
            <navTemplate class="jr-nav"></navTemplate>
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

