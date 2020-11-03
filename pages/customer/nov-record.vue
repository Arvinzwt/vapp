<template>
    <!--诺访记录-->
    <el-main class="jr-customer-nov-record">
        <!--标题-->
        <h3 class="jr-title">诺访记录</h3>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="校区">
                        <el-cascader
                                v-model="paramMap.arr"
                                :options="options.options1"
                                :props="props"
                                :show-all-levels="false"
                                collapse-tags
                                placeholder="请选择"
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="负责人">
                        <selected-role-template v-model="paramMap.role"
                                                @change="selectedRoleChange"></selected-role-template>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="渠道">
                        <el-cascader
                                v-model="paramMap.arr"
                                :options="options.options1"
                                :props="props"
                                :show-all-levels="false"
                                collapse-tags
                                placeholder="请选择"
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="姓名、手机号">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="诺到访日期" v-show="paramMap.show">
                        <el-date-picker
                                v-model="paramMap.arr"
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
                    <el-form-item label="实到访日期" v-show="paramMap.show">
                        <el-date-picker
                                v-model="paramMap.arr"
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
                <el-col :span="12">
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
            <el-table-column fixed type="selection" align="center" width="50"/>
            <el-table-column fixed label="姓名" prop="name"></el-table-column>
            <el-table-column fixed label="手机" min-width="110px" prop="phone">
                <template slot-scope="scope">
                    <el-link type="primary" @click="callCustomer">
                        <span class="">{{ scope.row.phone }}</span>
                        <span class="el-icon-phone-outline"></span>
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="年级" prop="name"></el-table-column>
            <el-table-column label="地区" prop="name"></el-table-column>
            <el-table-column label="跟进状态" prop="name"></el-table-column>
            <el-table-column label="渠道来源" prop="name"></el-table-column>
            <el-table-column label="负责人" prop="name"></el-table-column>
            <el-table-column min-width="135px" label="诺到访时间" prop="name" sortable="custom"/>
            <el-table-column label="是否到访" prop="name">
                <template slot-scope="scope">
                    <div @click="switchHandle(scope.row)" class="el-switch" :class="scope.row.switch?'is-checked':''">
                        <span class="el-switch__core"></span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column min-width="135px" label="实到访时间" prop="name" sortable="custom"/>
        </el-table>
        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
        <!--弹窗-->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" :append-to-body="true"
                   title="选择到访时间" custom-class="jr-dialog" width="400px">
            <!--弹窗内容-->
            <div class="dialog-body">
                <el-form class="jr-form" size="mini" :model="dialog.form" label-position="left" :rules="dialog.rules"
                         label-width="90px" ref="ruleForm">
                    <el-form-item label="到访时间">
                        <el-date-picker
                                v-model="dialog.form.date"
                                type="datetime"
                                placeholder="选择日期时间"
                                :picker-options="{firstDayOfWeek: 1}">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <!--弹窗尾部-->
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeDialog">取 消</el-button>
                <el-button size="mini" @click="submitDialog" type="primary">提 交</el-button>
            </div>
        </el-dialog>
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
            tableData: [{name: 123, phone: 13122222222, switch: true,}],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },

            props: {
                multiple: true,
                value: 'value',
                label: 'label',
                children: 'children'
            },

            dialog: {
                show: false,
                form: {
                    id: '',
                    date: ''
                },
                rules: {
                    date: {required: true, message: '请选择文件', trigger: 'blur'},
                }
            }
        }
    },
    created() {
    },
    mounted() {
    },
    destroyed() {
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        }
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
         *@desc 呼叫用户
         */
        callCustomer() {
            this.$api.customer.callCustomer().then(res => {
                this.$message.success('呼叫用户')
                this.customerDetail();
            })
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

        /**
         *@desc 选择负责人
         */
        selectedRoleChange() {

        },

        /**
         *@desc table触发排序时
         */
        tableSortChange(val) {
            this.refreshPage();
        },

        /**
         *@desc 切换诺方时间
         */
        switchHandle(obj) {
            if (obj.switch) {
                this.$confirm('确认是否取消到访记录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message.success('取消成功');
                    obj.switch = false;
                    this.refreshPage();
                }).catch(() => {

                });
            } else {
                this.dialog.form.id = obj.id;
                this.dialog.show = true;
            }
        },

        /**
         *@desc 上传报告-关闭弹窗
         */
        closeDialog() {
            this.dialog.show = false;
        },

        /**
         *@desc 上传报告-提交
         */
        submitDialog() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {//如果验证通过
                    this.refreshPage();
                    this.closeDialog();
                } else {
                    return false;
                }
            })
        },
    }
}
</script>

<style lang="scss">
.jr-customer-nov-record {

}
</style>