<template>
    <!--我的线索客户-->
    <el-main class="jr-customer-my-customer"></el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedTagTemplate from "@/components/customer/SelectedTag";

export default {}
</script>

<style lang="scss">
.jr-customer-my-customer {
    .action-bar {
        display: flex;
        justify-content: space-between;

        .action-bar_left {
            display: flex;
        }
    }
}
</style>