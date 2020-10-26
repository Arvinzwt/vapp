<template>
    <!--我的线索客户-->
    <el-main class="jr-customer-my-customer">
        <!--标题-->
        <h3 class="jr-title">我的线索客户</h3>
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
                                        v-for="item in options"
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
        <!--操作栏-->
        <div class="action-bar">
            <div class="action-bar_left">
                <selected-role-template v-model="dialog.form.role" class="mr-2"
                                        @change="submitAssignCustomer" ref="selectedRoleRef">
                    <el-button @click="assignCustomer" type="warning" size="mini">分配</el-button>
                </selected-role-template>
                <el-button @click="quitCustomer" type="warning" size="mini">放弃</el-button>
                <el-button @click="deleteCustomer" type="warning" size="mini">删除</el-button>
            </div>
            <div>
                <el-button @click="addCustomer" type="" size="mini">新增</el-button>
                <el-button @click="importCustomer" type="" size="mini">导入</el-button>
            </div>
        </div>
        <!--列表-->
        <el-table class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column fixed type="selection" width="50px" align="center"/>
            <el-table-column fixed label="姓名" prop="name"></el-table-column>
            <el-table-column fixed label="手机号" min-width="110px" prop="phone">
                <template slot-scope="scope">
                    <el-link type="primary" @click="callCustomer">
                        <span class="">{{ scope.row.phone }}</span>
                        <span class="el-icon-phone-outline"></span>
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="意向度" prop="name">
                <template slot-scope="scope">
                    <el-rate v-model="scope.row.rate" disabled :max="3"/>
                </template>
            </el-table-column>
            <el-table-column label="年级" prop="name"></el-table-column>
            <el-table-column label="科目" prop="name"></el-table-column>
            <el-table-column label="地区" prop="name"></el-table-column>
            <el-table-column label="最新跟进状态" prop="name"></el-table-column>
            <el-table-column label="线索客户状态" prop="name"></el-table-column>
            <el-table-column label="渠道" prop="name"></el-table-column>
            <el-table-column label="最近负责人" prop="name"></el-table-column>
            <el-table-column label="最近跟进时间" prop="name"></el-table-column>
            <el-table-column label="最近跟进记录" prop="name"></el-table-column>
            <el-table-column label="获取时间" prop="name"></el-table-column>
            <el-table-column label="创建人" prop="name"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" @click="customerFollow">跟进</el-link>
                    <el-link type="primary" @click="customerDetail">详情</el-link>
                    <el-link type="primary" @click="customerAudition">试听</el-link>
                    <el-link type="primary" @click="customerReserve">预约</el-link>
                    <el-link type="primary" @click="customerUpload">上传报告</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>

        <!--弹窗-->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" :append-to-body="true"
                   :title="dialog.title" custom-class="jr-dialog" width="600px">
            <!--弹窗内容-->
            <div class="dialog-body">
                <el-form class="jr-form" size="mini" :model="dialog.form" label-position="left" :rules="dialog.rules"
                         label-width="90px" ref="ruleForm">

                    <!--放弃-->
                    <div v-if="dialog.type===1">
                        <el-form-item label="放弃愿意" prop="reason1">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="dialog.form.reason1"/>
                        </el-form-item>
                    </div>
                    <!--删除-->
                    <div v-if="dialog.type===2">
                        <el-form-item label="删除原因" prop="reason2">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="dialog.form.reason2"/>
                        </el-form-item>
                    </div>
                    <!--新增-->
                    <div v-if="dialog.type===3">
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <el-form-item label="姓名" prop="">
                                    <el-input :maxlength='50' v-model="dialog.form.str" placeholder="请输入内容" clearable/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="手机" prop="">
                                    <el-input :maxlength='50' v-model="dialog.form.str" placeholder="请输入内容" clearable/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <el-form-item label="性别" prop="">
                                    <el-select v-model="dialog.form.str" placeholder="请选择" clearable>
                                        <el-option
                                                v-for="item in options.options1"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="年级" prop="">
                                    <el-select v-model="dialog.form.str" placeholder="请选择" clearable>
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
                            <el-col :span="12">
                                <el-form-item label="意向科学" prop="">
                                    <el-select v-model="dialog.form.str" placeholder="请选择" clearable>
                                        <el-option
                                                v-for="item in options.options1"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="地区" prop="">
                                    <el-cascader
                                            v-model="paramMap.cascader"
                                            :options="options.options1"
                                            :show-all-levels="false"
                                            collapse-tags
                                            placeholder="请选择"
                                            clearable></el-cascader>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <el-form-item label="详细地址" prop="">
                                    <el-input :maxlength='50' v-model="dialog.form.str" placeholder="请输入内容" clearable/>

                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="学校" prop="">
                                    <el-input :maxlength='50' v-model="dialog.form.str" placeholder="请输入内容" clearable/>

                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <el-form-item label="渠道" prop="">
                                    <el-cascader
                                            v-model="paramMap.cascader"
                                            :options="options.options1"
                                            :show-all-levels="false"
                                            collapse-tags
                                            placeholder="请选择"
                                            clearable></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="事业部" prop="">
                                    <el-select v-model="dialog.form.str" placeholder="请选择" clearable>
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
                            <el-col :span="12">
                                <el-form-item label="校区" prop="">
                                    <el-cascader
                                            v-model="paramMap.cascader"
                                            :options="options.options1"
                                            :show-all-levels="false"
                                            collapse-tags
                                            placeholder="请选择"
                                            clearable></el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="负责人" prop="">
                                    <selected-role-template v-model="paramMap.role"
                                                            @change="selectedRoleChange"></selected-role-template>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="15">
                            <el-col :span="24">
                                <el-form-item label="备注" prop="">
                                    <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            v-model="dialog.form.reason2"/>
                                </el-form-item>
                            </el-col>

                        </el-row>


                    </div>
                    <!--上传报告-->
                    <div v-if="dialog.type===4">

                    </div>
                </el-form>
            </div>
            <!--弹窗尾部-->
            <div slot="footer" class="dialog-footer">
                <span v-if="dialog.type===1||dialog.type===2" class="el-icon-warning"></span>
                <span v-if="dialog.type===1" class="mr-4">放弃后线索客户将进入公海</span>
                <span v-if="dialog.type===2" class="mr-4">删除后线索客户将进入死海</span>
                <el-button size="mini" @click="closeDialog">取 消</el-button>
                <el-button size="mini" @click="submitDialog" type="primary">提 交</el-button>
            </div>
        </el-dialog>
    </el-main>
</template>

<script>
import moment from "moment";

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
                show: false,//是否显示全部筛选项
                arr: [],
                str: '',
                obj: {},
                cascader: [],
                tag: [],
                date: []
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
            tableData: [{name: 123, phone: 12121212121, rate: 3,}],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },

            dialog: {
                show: false,
                type: null,//1放弃，2删除，3新增，4上传报告
                title: '',
                form: {
                    role: [],//分配
                    reason1: '',//放弃
                    reason2: '',//删除
                    str: '',
                },
                rules: {}
            }

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
         *@desc 上传报告
         */
        customerUpload() {
            this.dialog.type = 4;
            this.dialog.title = '上传报告';
            this.dialog.show = true;
        },

        _canBatch() {
            let ids = this.$refs['filterTable'].selection;
            if (ids.length > 0) {
                return true;
            } else {
                this.$message.error("请至少选择一条leads")
                return false;
            }
        },

        /**
         *@desc 分配-打开弹窗
         */
        assignCustomer() {
            if (this.$refs['selectedRoleRef'] && this._canBatch()) {
                this.$refs['selectedRoleRef'].openDialog();
            }
        },

        /**
         *@desc 分配-提交
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
         *@desc 放弃
         */
        quitCustomer() {
            if (this._canBatch()) {
                this.dialog.type = 1;
                this.dialog.title = '放弃线索客户';
                this.dialog.show = true;
            }

        },

        /**
         *@desc 删除
         */
        deleteCustomer() {
            if (this._canBatch()) {
                this.dialog.show = true;
                this.dialog.type = 2;
                this.dialog.title = '删除线索客户';
                this.dialog.show = true;
            }
        },

        /**
         *@desc 新增
         */
        addCustomer() {
            this.dialog.type = 3;
            this.dialog.title = '新增用户';
            this.dialog.show = true;
        },

        /**
         *@desc 导入
         */
        importCustomer() {
            this.$router.push({
                path: '/customer/customer-import'
            })
        },

        closeDialog() {
            this.dialog.show = false;
        },
        submitDialog() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {//如果验证通过
                    this.closeDialog();
                } else {
                    return false;
                }
            })
        }
    }
}
</script>

<style lang="scss">
.jr-customer-my-customer {
    .action-bar {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;

        .action-bar_left {
            display: flex;
        }
    }
}
</style>