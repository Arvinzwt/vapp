<template>
    <!--呼入线索客户确认-待确认-->
    <div>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap"
                 label-width="90px" label-position="left">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="姓名">
                        <el-input v-model="paramMap.value1"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="登记时间">
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
                    <el-form-item label="是否有效">
                        <el-select v-model="paramMap.value2" multiple collapse-tags placeholder="请选择" clearable>
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
                    <el-form-item label="学习中心">
                        <el-select v-model="paramMap.value2" multiple collapse-tags placeholder="请选择" clearable>
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
            <el-row :gutter="15" v-show="filterShow">
                <el-col :span="6">
                    <el-form-item label="确认时间">
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
                    <el-form-item label="呼入类型">
                        <el-select v-model="paramMap.value2" multiple collapse-tags placeholder="请选择" clearable>
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
                    <el-form-item label="坐席">
                        <el-input v-model="paramMap.value1"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="渠道小类">
                        <el-input v-model="paramMap.value1"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="24">
                    <el-form-item label-width="0" class="text-right">
                        <el-button @click="submitSearch" type="primary">查询</el-button>
                        <el-button @click="resetSearch" type="">重置</el-button>
                        <el-link type="primary" class="ml-2" @click="filterShow=!filterShow">
                            <span v-show="filterShow">收起</span>
                            <span v-show="!filterShow">展开</span>
                        </el-link>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <!--列表-->
        <el-table class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column fixed type="selection" align="center" width="50"/>
            <el-table-column fixed label="姓名" prop="name"></el-table-column>
            <el-table-column label="电话" prop="phone">
                <template slot-scope="scope">
                    <el-link type="primary">
                        <span class="">{{ scope.row.phone }}</span>
                        <span class="el-icon-phone-outline"></span>
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="年级" prop="name"></el-table-column>
            <el-table-column label="坐席" prop="name"></el-table-column>
            <el-table-column label="所属校区" prop="name"></el-table-column>
            <el-table-column label="呼入类型" prop="name"></el-table-column>
            <el-table-column label="渠道大类" prop="name"></el-table-column>
            <el-table-column label="渠道小类" prop="name"></el-table-column>
            <el-table-column label="登记时间" prop="name"></el-table-column>
            <el-table-column label="是否有效" prop="name"></el-table-column>
            <el-table-column label="确认人" prop="name"></el-table-column>
            <el-table-column label="确认时间" prop="name"></el-table-column>
            <el-table-column label="通话记录" prop="name"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" @click="confirmCustomer">确认</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
        <!--弹窗-->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false"
                   :append-to-body="true" custom-class="jr-dialog" width="30%">
            <!--弹窗头部-->
            <h3 slot="title" class="dialog-header">客户有效性确认</h3>
            <!--弹窗内容-->
            <div slot="default" class="dialog-body">
                <el-form class="jr-form" size="mini" :model="dialog.form" :rules="dialog.rules"
                         label-width="90px" label-position="left" ref="ruleForm">
                    <el-form-item label="客户名称" prop="value1">
                        <el-input v-model="dialog.form.value1"/>
                    </el-form-item>
                    <el-form-item label="电话" prop="value1">
                        <el-input v-model="dialog.form.value1"/>
                    </el-form-item>
                    <el-form-item label="登记时间" prop="value1">
                        <el-date-picker
                                v-model="dialog.form.value1"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="所属校区" prop="value1">
                        <el-input v-model="dialog.form.value1"/>
                    </el-form-item>
                    <el-form-item label="渠道大类" prop="value1">
                        <el-input v-model="dialog.form.value1"/>
                    </el-form-item>
                    <el-form-item label="渠道小类" prop="value1">
                        <el-input v-model="dialog.form.value1"/>
                    </el-form-item>
                    <el-form-item label="是否有效" prop="value2">
                        <el-select v-model="dialog.form.value2" multiple collapse-tags placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="无效类型" prop="value2">
                        <el-select v-model="dialog.form.value2" multiple collapse-tags placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="教育顾问" prop="value2">
                        <el-select v-model="dialog.form.value2" multiple collapse-tags placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <!--弹窗尾部-->
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeDialog">取 消</el-button>
                <el-button size="mini" @click="submitDialog" type="primary">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";

export default {
    components: {
        PaginationTemplate,
    },
    name: "index",
    data() {
        return {
            filterShow: true,

            // 筛选参数信息
            paramMap: {
                value1: null,//字符串
                value2: [],//数组
            },

            // 筛选选项列表
            options: {
                //渠道列表
                options1: [{label: '选项1', value: '1'}]
            },

            // 列表数据
            tableData: [{name: '英语', phone: '123123123'}],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },

            // 线索客户确认弹窗
            dialog: {
                show: false,//是否显示
                form: {
                    value1: null,
                    value2: [],
                },
                rules: {
                    value1: {required: true, message: '请输入', trigger: 'blur'},
                    value2: {required: true, message: '请输入', trigger: 'blur'}
                },
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
         *@desc 线索客户确认
         */
        confirmCustomer() {
            this.openDialog();
        },

        /**
         *@desc 线索客户确认-打开弹窗
         */
        openDialog() {
            this.dialog.show = true;
        },

        /**
         *@desc 线索客户确认-关闭弹窗
         */
        closeDialog() {
            this.dialog.show = false;
        },

        /**
         *@desc 线索客户确认-提交弹窗
         */
        submitDialog() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {//如果验证通过
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">

</style>