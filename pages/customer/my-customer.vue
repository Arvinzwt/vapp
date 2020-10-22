<template>
    <!--我的线索客户-->
    <el-main class="jr-customer-my-customer">
        <h3 class="jr-title">我的线索客户</h3>
    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedTagTemplate from "@/components/customer/SelectedTag";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedTagTemplate,
    },
    data() {
        return {}
    },
    created() {
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {}
}
</script>

<style lang="scss">
.jr-customer-my-customer {
}
</style>