<template>
    <!--线索客户管理-全部-->
    <div class="jr-customer-customer-manage-all">

    </div>
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
        return {
            // 筛选参数信息
            paramMap: {
                show: true,//是否显示筛选
            },

            // 列表数据
            tableData: [
                {name: '英语', phone: '123123123', rate: 3}
            ],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },
        }
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        }
    },
    mounted() {
        this.refreshPage();
    },
    methods: {
        /**
         *@desc 刷新页面
         */
        refreshPage() {
            console.log(this.paramMap, this.pagesInfo, 'paramMap')
        },

        /**
         *@desc 分页触发时
         */
        onPagesChange() {
            this.refreshPage();
        },

        /**
         *@desc 提交筛选时
         */
        submitSearch() {
            this.pagesInfo.pageIndex = 1;//重置分页数据
            this.refreshPage();
        },

        /**
         *@desc 重置筛选时
         */
        resetSearch() {
            this.pagesInfo.pageIndex = 1;//重置分页数据
            this.$utils.resetJson(this.paramMap, ['show', 'role']);//重置筛选数据
            this.refreshPage();
        },

        // /**
        //  *@desc 分配用户-打开选择负责人弹窗
        //  */
        // openAssignCustomerDialog() {
        //     let ids = this.$refs['filterTable'].selection;
        //     if (ids.length > 0) {
        //         if (this.$refs['selectedRole']) {
        //             this.$refs['selectedRole'].openDialog();
        //         }
        //     } else {
        //         this.$message.error("请至少选择一条leads")
        //     }
        // },
        //
        // /**
        //  *@desc 分配用户-确定分配时
        //  */
        // assignCustomer() {
        //     this.$api.customer.assignCustomer({
        //         customerId: this.$refs['filterTable'].selection,
        //         roleId: this.paramMap.role,
        //     }).then(res => {
        //         this.$message.success('分配成功')
        //         this.refreshPage();
        //     })
        // },
        //
        // /**
        //  *@desc 呼叫用户
        //  */
        // callCustomer() {
        //     this.$api.customer.callCustomer().then(res => {
        //         this.$message.success('呼叫用户')
        //         this.$router.push({
        //             path: '/customer/customer-follow'
        //         })
        //     })
        // },
        //
        // /**
        //  *@desc 用户详情
        //  */
        // customerDetail() {
        //     this.$router.push({
        //         path: '/customer/customer-detail'
        //     })
        // },
        //
        // /**
        //  *@desc table触发排序时
        //  */
        // tableSortChange(val) {
        //     this.refreshPage();
        // }

    }
}
</script>

<style lang="scss">

</style>