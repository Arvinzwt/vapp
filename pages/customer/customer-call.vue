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
                <el-row :gutter="15">
                    <!--姓名-->
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <el-input :maxlength='50' v-model="paramMap.value4" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--登记时间-->
                    <el-col :span="6">
                        <el-form-item label="登记时间">
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
                    <!--是否有效-->
                    <el-col :span="6">
                        <el-form-item label="是否有效">
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
                    <!--学习中心-->
                    <el-col :span="6">
                        <el-form-item label="学习中心">
                            <el-cascader
                                    v-model="paramMap.cascader"
                                    :options="options.options1"
                                    :props="options.cascadeProps"
                                    collapse-tags
                                    :show-all-levels="false"
                                    placeholder="请选择"
                                    filterable
                                    clearable></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15" v-show="paramMap.show">
                    <!--确认时间-->
                    <el-col :span="6">
                        <el-form-item label="确认时间">
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
                    <!--呼入类型-->
                    <el-col :span="6">
                        <el-form-item label="呼入类型">
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
                    <!--坐席-->
                    <el-col :span="6">
                        <el-form-item label="坐席">
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
                    <!--渠道小类-->
                    <el-col :span="6">
                        <el-form-item label="渠道小类">
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
                    <!--确定按钮-->
                    <el-form-item label-width="0" class="text-right">
                        <el-button @click="submitSearch" type="primary">查询</el-button>
                        <el-button @click="resetSearch">重置</el-button>
                        <el-link type="primary" class="ml-4 mr-2" @click="paramMap.show=!paramMap.show">
                            <span v-show="!paramMap.show">展开</span>
                            <span v-show="paramMap.show">收起</span>
                        </el-link>
                    </el-form-item>
                </el-row>
            </el-form>
            <!--列表-->
            <el-table @sort-change="tableSortChange" class="jr-table" ref="filterTable" :data="tableData" size="mini">
                <el-table-column fixed label="姓名" prop="name"/>
                <el-table-column fixed min-width="100px" label="手机" prop="phone"/>
                <el-table-column label="年级" prop="name"  sortable="custom"/>
                <el-table-column label="坐席" prop="name"/>
                <el-table-column label="所属校区" prop="name"/>
                <el-table-column label="呼入类型" prop="name"/>
                <el-table-column label="渠道大类" prop="name"/>
                <el-table-column label="渠道小类" prop="name"/>
                <el-table-column label="登记时间" prop="name"/>
                <el-table-column label="是否有效" prop="name"/>
                <el-table-column label="确认人" prop="name"/>
                <el-table-column label="确认时间" prop="name"/>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="customerConfirm">确认</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页信息-->
            <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
        </div>
        <!--弹窗-->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" :append-to-body="true"
                   title="客户有效性确认" custom-class="jr-dialog" width="50%">
            <!--弹窗内容-->
            <div class="dialog-body">
                <el-form class="jr-form" size="mini" :model="dialog.form" :rules="dialog.rules" ref="ruleForm"
                         label-width="90px" label-position="left">
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="姓名">
                                名字
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            手机号
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="坐席">
                                校区
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属校区">
                                校区
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="呼入类型" prop="str">
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
                            <el-form-item label="渠道大类">
                                渠道大类
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="渠道小类">
                                渠道小类
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="登记时间">
                                登记时间
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="是否有效" prop="str">
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
                            <el-form-item label="无效类型" prop="str">
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
                            <el-form-item label="教育顾问" prop="str">
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

export default {
    components: {
        PaginationTemplate,
    },
    data() {
        return {
            // tab切换信息
            currentTab: '0',
            tabs: [
                {id: '0', name: '待确认', num: 6},
                {id: '1', name: '已确认'},
            ],

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
                tab: '0',
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
                rules: {
                    str: {required: true, message: '请选择', trigger: 'blur'},
                }
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
            this.refreshPage();
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