<template>
    <!--今日新线索-->
    <el-main class="jr-page jr-customer-today-clue">
        <!--tab切换-->
        <div class="jr-page-header">
            <el-tabs :value="paramMap.tab" @tab-click="tabsClick">
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
                <el-row :gutter="15">
                    <!--标签-->
                    <el-col :span="6">
                        <el-form-item label="标签">
                            <selected-tag-template v-model="paramMap.tag" @change="selectedTagChange"/>
                        </el-form-item>
                    </el-col>
                    <!--跟进状态-->
                    <el-col :span="6">
                        <el-form-item label="跟进状态">
                            <el-select v-model="paramMap.arr" multiple collapse-tags placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in options.options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--最近跟进时间-->
                    <el-col :span="6">
                        <el-form-item label="最近跟进时间">
                            <el-date-picker
                                    v-model="paramMap.date"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickerOptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--姓名，手机号-->
                    <el-col :span="6">
                        <el-form-item label="姓名，手机号">
                            <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div v-show="paramMap.show">
                    <el-row :gutter="15">
                        <!--最新跟进时间-->
                        <el-col :span="6">
                            <el-form-item label="最新跟进时间">
                                <el-date-picker
                                        v-model="paramMap.date"
                                        type="daterange"
                                        range-separator="-"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :default-time="['00:00:00', '23:59:59']"
                                        :picker-options="$utils.pickerOptions"
                                        clearable>
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <!--客户状态-->
                        <el-col :span="6">
                            <el-form-item label="客户状态">
                                <el-select v-model="paramMap.str" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in options.options1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!--负责人-->
                        <el-col :span="6">
                            <el-form-item label="负责人">
                                <selected-role-template v-model="paramMap.role"
                                                        @change="selectedRoleChange"></selected-role-template>
                            </el-form-item>
                        </el-col>
                        <!--渠道-->
                        <el-col :span="6">
                            <el-form-item label="渠道">
                                <el-cascader
                                        v-model="paramMap.cascader"
                                        :options="options.options1"
                                        :props="props"
                                        :show-all-levels="false"
                                        collapse-tags
                                        placeholder="请选择"
                                        clearable></el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <!--下次联系时间-->
                        <el-col :span="6">
                            <el-form-item label="下次联系时间">
                                <el-date-picker
                                        v-model="paramMap.date"
                                        type="daterange"
                                        range-separator="-"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :default-time="['00:00:00', '23:59:59']"
                                        :picker-options="$utils.pickerOptions"
                                        clearable>
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <!--年级-->
                        <el-col :span="6">
                            <el-form-item label="年级">
                                <el-select v-model="paramMap.arr" multiple collapse-tags placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in options.options1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!--科目-->
                        <el-col :span="6">
                            <el-form-item label="科目">
                                <el-select v-model="paramMap.arr" multiple collapse-tags placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in options.options1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!--沟通次数-->
                        <el-col :span="6">
                            <el-form-item label="沟通次数">
                                <el-select v-model="paramMap.str" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in options.options1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <!--之后未跟进-->
                        <el-col :span="6">
                            <el-form-item label="之后未跟进">
                                <el-date-picker
                                        v-model="paramMap.date"
                                        type="daterange"
                                        range-separator="-"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :default-time="['00:00:00', '23:59:59']"
                                        :picker-options="$utils.pickerOptions"
                                        clearable>
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <!--获得时间-->
                        <el-col :span="6">
                            <el-form-item label="获得时间">
                                <el-date-picker
                                        v-model="paramMap.date"
                                        type="daterange"
                                        range-separator="-"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :default-time="['00:00:00', '23:59:59']"
                                        :picker-options="$utils.pickerOptions"
                                        clearable>
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <!--意向度-->
                        <el-col :span="6">
                            <el-form-item label="意向度">
                                <el-select v-model="paramMap.str" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in options.options1"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!--创建时间-->
                        <el-col :span="6">
                            <el-form-item label="创建时间">
                                <el-date-picker
                                        v-model="paramMap.date"
                                        type="daterange"
                                        range-separator="-"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :default-time="['00:00:00', '23:59:59']"
                                        :picker-options="$utils.pickerOptions"
                                        clearable>
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <el-row :gutter="15">
                    <el-col :span="24">
                        <el-form-item label-width="0" class="text-right">
                            <el-button @click="submitSearch" type="primary">查询</el-button>
                            <el-button @click="resetSearch">重置</el-button>
                            <el-link type="primary" class="ml-4" @click="paramMap.show=!paramMap.show">
                                <span v-show="!paramMap.show">展开</span>
                                <span v-show="paramMap.show">收起</span>
                            </el-link>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!--列表-->
            <el-table @sort-change="tableSortChange" class="jr-table" ref="filterTable" :data="tableData" size="mini">
                <el-table-column fixed type="selection" width="50px" align="center"/>
                <el-table-column fixed label="姓名" prop="name"></el-table-column>
                <el-table-column fixed label="手机" min-width="110px" prop="phone">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="callCustomer">
                            <span class="">{{ scope.row.phone }}</span>
                            <span class="el-icon-phone-outline"></span>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column min-width="95px" label="意向度" prop="name">
                    <template slot-scope="scope">
                        <el-rate v-model="scope.row.rate" disabled :max="5"/>
                    </template>
                </el-table-column>
                <el-table-column label="年级" prop="name" sortable="custom"></el-table-column>
                <el-table-column label="科目" prop="name" sortable="custom"></el-table-column>
                <el-table-column label="地区" prop="name"></el-table-column>
                <el-table-column min-width="95px" label="最新跟进状态" prop="name"></el-table-column>
                <el-table-column min-width="95px" label="线索客户状态" prop="name"></el-table-column>
                <el-table-column label="渠道" prop="name" sortable="custom"></el-table-column>
                <el-table-column min-width="95px" label="最近负责人" prop="name"></el-table-column>
                <el-table-column min-width="135px" label="最近跟进时间" prop="name"></el-table-column>
                <el-table-column min-width="95px" label="最近跟进记录" prop="name"></el-table-column>
                <el-table-column min-width="135px" label="获取时间" prop="name" sortable="custom"></el-table-column>
                <el-table-column label="创建人" prop="name"></el-table-column>
                <el-table-column min-width="130px" fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="customerFollow">跟进</el-link>
                        <el-link type="primary" @click="customerDetail">详情</el-link>
                        <el-link type="primary" @click="customerAudition">试听</el-link>
                        <el-link type="primary" @click="customerReserve">预约</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页信息-->
            <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
        </div>
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
        return {
            currentTab: '0',

            // tab切换信息
            tabs: [
                {id: '0', name: '未跟进', num: 6},
                {id: '1', name: '已跟进'},
                {id: '2', name: '全部'},
            ],

            // 筛选参数信息
            paramMap: {
                show: false,//是否显示全部筛选项
                arr: [],
                str: '',
                obj: {},
                cascader: [],
                tag: [],
                date: [],
                tab: '0',
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


            //级联选择器配置
            props: {
                multiple: true,
                value: 'value',
                label: 'label',
                children: 'children'
            },

            // 列表数据
            tableData: [{name: 123, phone: 12121212121, rate: 3}],

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
            this.$utils.resetJson(this.paramMap, ['show', 'tab']);//重置筛选数据
            this.refreshPage();
        },

        /**
         *@desc 选择标签时
         */
        selectedTagChange() {

        },

        /**
         *@desc 选择角色时
         */
        selectedRoleChange() {

        },

        /**
         *@desc 呼叫用户
         */
        callCustomer() {
            this.$api.customer.callCustomer().then(res => {
                this.$message.success('呼叫用户')
                this.customerFollow();
            })
        },

        /**
         *@desc 跟进
         */
        customerFollow() {
            this.$router.push({
                path: '/customer/customer-follow'
            })
        },

        /**
         *@desc 详情
         */
        customerDetail() {
            this.$router.push({
                path: '/customer/customer-detail'
            })
        },

        /**
         *@desc 试听
         */
        customerAudition() {
            this.$message.success('跳到upc')
        },

        /**
         *@desc 签约
         */
        customerReserve() {
            this.$message.success('跳到upc')
        },

        /**
         *@desc table触发排序时
         */
        tableSortChange(val) {
            this.refreshPage();
        }
    }
}
</script>

<style lang="scss">
.jr-customer-today-clue {

}
</style>