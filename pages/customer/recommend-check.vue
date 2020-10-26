<template>
    <!--推荐审核-->
    <el-main class="jr-customer-recommend-check">
        <!--标题-->
        <h3 class="jr-title">推荐审核</h3>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="姓名">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="状态">
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
                <el-col :span="6">
                    <el-form-item label="学习中心">
                        <el-cascader
                                v-model="paramMap.cascader"
                                :options="options.options1"
                                :props="options.cascadeProps"
                                :show-all-levels="false"
                                collapse-tags
                                placeholder="请选择"
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="登记人">
                        <el-autocomplete
                                v-model="paramMap.str"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                :maxlength='50'
                                @select="handleSelect"
                                clearable>
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.value }}</div>
                                <span class="addr">{{ item.address }}</span>
                            </template>
                        </el-autocomplete>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="年级" v-show="paramMap.show">
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
                <el-col :span="6">
                    <el-form-item label="就读学校" v-show="paramMap.show">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="登记日期" v-show="paramMap.show">
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
            <el-button type="warning" size="mini">分配</el-button>
        </div>
        <!--列表-->
        <el-table class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column fixed type="selection" width="50px" align="center"/>
            <el-table-column fixed label="姓名" prop="name"></el-table-column>
            <el-table-column label="推荐到中心" prop="name"></el-table-column>
            <el-table-column label="年级" prop="name"></el-table-column>
            <el-table-column label="就读学校" prop="name"></el-table-column>
            <el-table-column label="联系人身份" prop="name"></el-table-column>
            <el-table-column label="联系人姓名" prop="name"></el-table-column>
            <el-table-column label="联系电话" prop="name"></el-table-column>
            <el-table-column label="登记人" prop="name"></el-table-column>
            <el-table-column label="登记时间" prop="name"></el-table-column>
            <el-table-column label="审核状态" prop="name"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" @click="">修改</el-link>
                    <el-link type="primary" @click="">审核</el-link>
                    <el-link type="primary" @click="">查看</el-link>
                </template>
            </el-table-column>
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

            // 筛选参数信息
            paramMap: {
                show: false,//是否显示筛选
                date: [],//创建时间
                cascader: [],//渠道
                selectedArr: [],//年级
                input: '',//姓名手机号
                selectedArr2: [],//科目
                str: '',
                role: [],//选择的负责人
            },

            // 筛选选项列表
            options: {
                //渠道列表
                options1: [
                    {
                        value: '1',
                        label: '选项1',
                    },
                    {
                        value: '2',
                        label: '选项2',
                        children: [{
                            value: '2-1',
                            label: '选项2-1',
                            children: [
                                {value: '2-1-1', label: '选项2-1-1'},
                                {value: '2-1-2', label: '选项2-1-2'},
                                {value: '2-1-3', label: '选项2-1-3'}
                            ]
                        }]
                    }
                ],

                //级联选择器配置
                cascadeProps: {
                    multiple: true,
                    value: 'value',
                    label: 'label',
                    children: 'children',
                },
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
                    str: ''
                },
                rules: {}
            }
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
            this.$utils.resetJson(this.paramMap, ['show']);//重置筛选数据
            this.refreshPage();
        },

        /**
         *@desc 切换tab
         */
        tabsClick() {

        },

        /**
         *@desc 呼叫用户
         */
        callCustomer() {
            this.$router.push({
                path: '/customer/customer-detail'
            })
        },

        /**
         *@desc 渠道小类/坐席-查询时
         */
        querySearchAsync(queryString, cb) {
            cb([
                {"value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13"},
                {"value": "阳阳麻辣烫", "address": "天山西路389号"},
            ])
        },

        /**
         *@desc 渠道小类/坐席-确定时
         */
        handleSelect(item) {
            console.log(item);
        },

        /**
         *@desc 客户确定 - 打开弹窗
         */
        customerConfirm() {
            this.dialog.show = true;
        },

        /**
         *@desc 客户确定 - 关闭弹窗
         */
        closeDialog() {
            this.dialog.show = false;
        },

        /**
         *@desc 客户确定 - 提交弹窗
         */
        submitDialog() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {//如果验证通过
                    this.dialog.show = false;
                } else {
                    return false;
                }
            })
        }
    }
}
</script>

<style lang="scss">
.jr-customer-recommend-check {

}
</style>