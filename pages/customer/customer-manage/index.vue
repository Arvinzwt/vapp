<template>
    <!--线索客户管理-新海-->
    <div class="jr-customer-customer-manage-first">
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px"
                 label-position="left">
            <el-row :gutter="15">
                <!--渠道大类-->
                <el-col :span="6">
                    <el-form-item label="渠道大类">
                        <el-select v-model="paramMap.cascader" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in dic.bigclass"
                                    :key="item.classid"
                                    :label="item.classname"
                                    :value="item.classid+'&'+item.classname">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--渠道小类-->
                <el-col :span="6">
                    <el-form-item label="渠道小类">
                        <el-select v-model="paramMap.cascader2" placeholder="请选择" clearable>
                            <el-option
                                    v-for="(item,index) in options.smallclass"
                                    :key="index"
                                    :label="item.bigclassname"
                                    :value="item.bigclassid">
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
                <!--年级-->
                <el-col :span="6">
                    <el-form-item label="年级">
                        <el-select v-model="paramMap.grades" multiple collapse-tags placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in dic.grades"
                                    :key="item.dicCode"
                                    :label="item.name"
                                    :value="item.dicCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <!--姓名，手机号-->
                <el-col :span="6">
                    <el-form-item label="姓名、手机号" v-show="paramMap.show">
                        <el-input :maxlength='50' v-model="paramMap.input" placeholder="可搜索姓名、手机" clearable/>
                    </el-form-item>
                </el-col>
                <!--科目-->
                <el-col :span="6">
                    <el-form-item label="科目" v-show="paramMap.show">
                        <el-select v-model="paramMap.arr2" multiple collapse-tags placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in dic.subject"
                                    :key="item.dicCode"
                                    :label="item.label"
                                    :value="item.dicCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--学习中心-->
                <el-col :span="6">
                    <el-form-item label="学习中心" v-show="paramMap.show">
                        <el-cascader
                                v-model="paramMap.arr3"
                                :options="dic.hrcodedepts"
                                :props="$utils.hrcodedeptsProps"
                                :show-all-levels="false"
                                collapse-tags
                                placeholder="请选择"
                                filterable
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <!--确定按钮-->
                <el-col :span="6">
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
        <!--操作栏-->
        <div class="action-bar">
            <selected-role-template v-model="paramMap.role" @change="submitAssignCustomer" ref="selectedRole">
                <el-button @click="openAssignCustomerDialog" type="warning" size="mini">分配</el-button>
            </selected-role-template>
        </div>
        <!--列表-->
        <el-table @sort-change="tableSortChange" class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column fixed width="50" type="selection" align="center"/>
            <el-table-column fixed label="姓名" prop="name"/>
            <el-table-column fixed min-width="100px" label="手机" prop="phone">
                <template slot-scope="scope">
                    <el-link type="primary" @click="callCustomer">
                        <span class="">{{ scope.row.phone }}</span>
                        <span class="el-icon-phone-outline"></span>
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="年级" prop="name" sortable="custom"/>
            <el-table-column label="科目" prop="name" sortable="custom"/>
            <el-table-column label="地区" prop="name"/>
            <el-table-column label="渠道" prop="name" sortable="custom"/>
            <el-table-column label="备注" prop="name"/>
            <el-table-column label="创建时间" prop="name"/>
            <el-table-column label="创建人" prop="name"/>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" @click="customerDetail">详情</el-link>
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

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
    },
    data() {
        return {
            // 筛选参数信息
            paramMap: {
                show: true,//是否显示筛选
                cascader: '',//渠道大类
                cascader2: '',//渠道小类
                date: [],//创建时间
                grades: [],//年级
                input: '',//姓名手机号
                arr2: [],//科目
                arr3: [],//学习中心
                sort:'',//年级-科目-渠道-排序
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

            options: {
                smallclass: [],//渠道小类
            },
        }
    },
    watch: {
        async 'paramMap.cascader'(val) {//监听渠道大类值，赋值渠道小类
            this.options.smallclass = val ? await this.$api.common.smallclass({
                "bigclassname": val.split('&')[1],
                "deptids": ""
            }) : [];
        }
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        },
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
            this.$utils.resetJson(this.paramMap, ['show']);//重置筛选数据
            this.refreshPage();
        },

        /**
         *@desc 分配用户-打开选择负责人弹窗
         */
        openAssignCustomerDialog() {
            let ids = this.$refs['filterTable'].selection;
            if (ids.length > 0) {
                if (this.$refs['selectedRole']) {
                    this.$refs['selectedRole'].openDialog();
                }
            } else {
                this.$message.error("请至少选择一条leads")
            }
        },

        /**
         *@desc 分配用户-确定分配时
         */
        submitAssignCustomer() {
            this.$api.customer.assignCustomer({
                customerId: this.$refs['filterTable'].selection,
                roleId: this.paramMap.role,
            }).then(res => {
                this.$message.success('分配成功')
                this.refreshPage();
            })
        },

        /**
         *@desc 呼叫用户
         */
        callCustomer() {
            this.$api.customer.callCustomer().then(res => {
                this.$message.success('呼叫用户')
                this.$router.push({
                    path: '/customer/customer-follow',
                    query: {
                        id: 123,
                    }
                })
            })
        },

        /**
         *@desc 用户详情
         */
        customerDetail() {
            this.$router.push({
                path: '/customer/customer-detail',
                query: {
                    id: 123,
                }
            })
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

</style>