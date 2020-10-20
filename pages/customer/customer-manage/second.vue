<template>
    <!--线索客户管理-公海-->
    <div class="jr-customer-customer-manage-second">
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" :rules="paramRules"
                 label-width="90px" label-position="left">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="标签">
                        <selected-tag-template v-model="paramMap.tag.ids" @submit="submitSelectedTag"
                                               ref="selectedTag">
                            <el-input v-model="paramMap.tag.name" @focus="openSelectedTagDialog"></el-input>
                        </selected-tag-template>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="跟进状态">
                        <el-select v-model="paramMap.value1" multiple collapse-tags placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="放弃时间">
                        <el-date-picker
                                v-model="paramMap.value2"
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
                <el-col :span="6">
                    <el-form-item label="" label-width="0">
                        <el-input v-model="paramMap.value3" placeholder="可搜索姓名、手机" clearable/>
                    </el-form-item>
                </el-col>
            </el-row>
            <div v-show="filterShow">
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="最新跟进时间">
                            <el-date-picker
                                    v-model="paramMap.value4"
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
                    <el-col :span="6">
                        <el-form-item label="客户状态">
                            <el-select v-model="paramMap.value5" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in options.options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="最近负责人">
                            <selected-role-template v-model="paramMap.role.ids" @submit="submitAssignCustomer"
                                                    ref="selectedRole">
                                <el-input v-model="paramMap.role.name" @focus="openAssignCustomerDialog"></el-input>
                            </selected-role-template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="渠道">
                            <el-input/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="下次联系时间">
                            <el-input/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-input/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="科目">
                            <el-input/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="沟通次数">
                            <el-input/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="之后未跟进">
                            <el-input/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="获得时间">
                            <el-input/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="意向度">
                            <el-input/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="创建时间">
                            <el-input/>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="放弃原因" v-show="filterShow">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="" label-width="0" class="text-right">
                        <el-button type="primary">查询</el-button>
                        <el-button type="">重置</el-button>
                        <el-link type="primary" class="ml-2" @click="filterShow=!filterShow">
                            <span v-show="filterShow">收起</span>
                            <span v-show="!filterShow">展开</span>
                        </el-link>
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
            <el-table-column type="selection" align="center" width="50"/>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="手机" prop="name"></el-table-column>
            <el-table-column label="意向度" prop="">
                <template slot-scope="scope">
                    <el-rate v-model="scope.row.rate" disabled :max="3"/>
                </template>
            </el-table-column>
            <el-table-column label="年级" prop="name"></el-table-column>
            <el-table-column label="地区" prop="name"></el-table-column>
            <el-table-column label="跟进状态" prop="name"></el-table-column>
            <el-table-column label="线索客户状态" prop="name"></el-table-column>
            <el-table-column label="渠道来源" prop="name"></el-table-column>
            <el-table-column label="最近负责人" prop="name"></el-table-column>
            <el-table-column label="最近跟进时间" prop="name"></el-table-column>
            <el-table-column label="最近跟进记录" prop="name"></el-table-column>
            <el-table-column label="放弃原因" prop="name"></el-table-column>
            <el-table-column label="放弃时间" prop="name"></el-table-column>
            <el-table-column label="创建时间" prop="name"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-link type="primary">详情</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
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
            filterShow: false,//是否显示其他筛选

            // 筛选参数信息
            paramMap: {
                value1: [],//跟进状态
                value2: [],//放弃时间
                value3: null,//手机姓名
                value4: [],//手机姓名
                value5: [],//手机姓名

                role: {
                    name: '',
                    ids: []
                },

                tag: {
                    name: '',
                    ids: {value1: '', value2: '', value3: '', value4: ''},
                }
            },

            // 筛选规则信息
            paramRules: {},

            // 筛选选项列表
            options: {
                //跟进状态
                options1: [
                    {value: 3, label: '跟进状态1'},
                    {value: 4, label: '跟进状态2'},
                    {value: 5, label: '跟进状态3'}
                ],

                options2: [
                    {value: 3, label: '客户状态1'},
                    {value: 4, label: '客户状态2'},
                    {value: 5, label: '客户状态3'}
                ],
            },

            // 列表数据
            tableData: [{name: '英语',rate:2,}],

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
         *@desc 分页触发时
         */
        onPagesChange(pagesInfo) {

        },

        /**
         *@desc 打开分配用户弹窗
         */
        openAssignCustomerDialog() {
            if (this.$refs['selectedRole']) {
                this.$refs['selectedRole'].openDialog();
            }
        },

        /**
         *@desc 分配用户
         */
        submitAssignCustomer(obj) {
            Object.assign(this.paramMap.role, {
                name: obj.name.join('、'),
                ids: obj.ids,
            })
        },

        /**
         *@desc 打开分配用户弹窗
         */
        openSelectedTagDialog() {
            if (this.$refs['selectedTag']) {
                this.$refs['selectedTag'].openDialog();
            }
        },

        /**
         *@desc 分配用户
         */
        submitSelectedTag(obj) {
            Object.assign(this.paramMap.tag, {
                name: obj.name.join('、'),
                ids: obj.ids,
            })
        },

    }
}
</script>

<style lang="scss">

</style>