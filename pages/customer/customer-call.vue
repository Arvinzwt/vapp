<template>
    <!--呼入线索客户确认-->
    <el-main class="jr-customer-customer-call">
        <!--标题-->
        <h3 class="jr-title">呼入线索客户确认</h3>
        <!--tab切换-->
        <el-tabs :value="$route.name" @tab-click="tabsClick">
            <el-tab-pane v-for="item in tabs" :key="item.id" :name="item.id" :path="item.path">
                <div slot="label">
                    <span>{{ item.name }}</span>
                    <i v-if="item.num" class="jr-badge">{{ item.num }}</i>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="渠道">
                        <el-cascader
                                v-model="paramMap.value1"
                                :options="options.options1"
                                :props="options.cascadeProps"
                                collapse-tags
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--操作栏-->
        <div class="action-bar">
            <el-button type="primary" size="mini">分配</el-button>
        </div>
        <!--列表-->
        <el-table class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column fixed type="selection" align="center" width="50"/>
            <el-table-column fixed label="姓名" prop="name"></el-table-column>
            <el-table-column label="手机" prop="phone"></el-table-column>
        </el-table>
        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
    },
    data() {
        return {
            // tab切换信息
            tabs: [
                {id: 'customer-customer-call', name: '待确认', num: 6, path: '/customer/customer-call',},
                {id: 'customer-customer-call-confirmed', name: '已确认', path: '/customer/customer-call/confirmed',},
            ],

            // 筛选参数信息
            paramMap: {
                show: false,//是否显示全部筛选项
                arr: [],
                str: '',
                obj: {},
            },

            // 筛选选项列表
            options: {
                options1: [
                    {
                        value: 1,
                        label: '选项1',
                        children: [{
                            value: 2,
                            label: '选项1-1',
                            children: [
                                {value: 3, label: '选项1-1-1'},
                                {value: 4, label: '选项1-1-2'},
                                {value: 5, label: '选项1-1-3'}
                            ]
                        }]
                    }
                ],
            },

            // 列表数据
            tableData: [],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },

        }
    },
    created() {
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {
        /**
         *@desc 刷新页面
         */
        refreshPage() {
            console.log(this.paramMap, 'paramMap')
            console.log(this.pagesInfo, 'pagesInfo')
        },

        /**
         *@desc 切换tab时
         */
        tabsClick(tab) {

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
            this.$utils.resetJson(this.paramMap);//重置筛选数据
            this.refreshPage();
        },
    }
}
</script>

<style lang="scss">
.jr-customer-customer-call {

}
</style>