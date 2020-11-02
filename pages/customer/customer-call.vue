<template>
    <!--呼入线索客户确认-->
    <el-main class="jr-page jr-customer-customer-call">
        <!--tab切换-->
        <div class="jr-page-header">
            <el-tabs v-model="paramMap.tab" @tab-click="tabsClick">
                <el-tab-pane v-for="item in tabs" :key="item.id" :name="item.id" :path="item.path">
                    <div slot="label">
                        <span>{{ item.name }}</span>
                        <i v-if="item.num" class="jr-badge">{{ item.num }}</i>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--滚动内容-->
        <div class="jr-page-body">
            <!--筛选项-->
            <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">

            </el-form>
        </div>
    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";

export default {
    components: {
        PaginationTemplate,
    },
    data() {
        return {
            // tab切换信息
            tabs: [
                {id: '0', name: '待确认', num: 6},
                {id: '1', name: '已确认'},
            ],

            // 筛选参数信息
            paramMap: {
                show: true,//是否显示筛选
                tab: '0',
            },

            // 列表数据
            tableData: [
                {name: '英语', phone: '123123123'}
            ],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },

            // 弹窗
            dialog: {
                show: false,
                form: {

                },
                rules: {
                    str7: {required: true, message: '请选择', trigger: 'blur'},
                }
            }
        }
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        }
    },
    async mounted() {
        this.refreshPage();
    },
    methods: {
        /**
         *@desc 切换tab
         */
        tabsClick() {
            this.refreshPage();
        },

        /**
         *@desc 刷新页面
         */
        refreshPage() {
            console.log(this.paramMap.tab, 'paramMap')
        },

        // /**
        //  *@desc 提交筛选时
        //  */
        // submitSearch() {
        //     this.pagesInfo.pageIndex = 1;//重置分页数据
        //     this.refreshPage();
        // },
        //
        // /**
        //  *@desc 重置筛选时
        //  */
        // resetSearch() {
        //     this.pagesInfo.pageIndex = 1;//重置分页数据
        //     this.$utils.resetJson(this.paramMap, ['show', 'tab']);//重置筛选数据
        //     this.refreshPage();
        // },
        //
        // /**
        //  *@desc table触发排序时
        //  */
        // tableSortChange(val) {
        //     console.log(val.order, val.prop);//descending ascending
        //     this.refreshPage();
        // },
        //
        // /**
        //  *@desc 分页触发时
        //  */
        // onPagesChange() {
        //     this.refreshPage();
        // },
        //
        // /**
        //  *@desc 客户确定 - 打开弹窗
        //  */
        // customerConfirm() {
        //     this.dialog.show = true;
        // },
        //
        // /**
        //  *@desc 客户确定 - 关闭弹窗
        //  */
        // closeDialog() {
        //     this.dialog.show = false;
        // },
        //
        // /**
        //  *@desc 客户确定 - 提交弹窗
        //  */
        // submitDialog() {
        //     this.$refs['ruleForm'].validate((valid) => {
        //         if (valid) {//如果验证通过
        //             this.dialog.show = false;
        //         } else {
        //             return false;
        //         }
        //     })
        // },
    }
}
</script>

<style lang="scss">

</style>