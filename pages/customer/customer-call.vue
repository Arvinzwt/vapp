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
                            <el-input :maxlength='50' v-model="paramMap.name" placeholder="请输入内容" clearable/>
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
                            <el-select v-model="paramMap.isValid" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.isValid"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--学习中心-->
                    <el-col :span="6">
                        <el-form-item label="学习中心">
                            <el-cascader
                                    v-model="paramMap.cascader"
                                    :options="dic.hrcodedepts"
                                    :props="$utils.hrcodedeptsProps"
                                    :show-all-levels="false"
                                    collapse-tags
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
                                    v-model="paramMap.date2"
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
                            <el-select v-model="paramMap.str3" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.incomingType"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--坐席-->
                    <el-col :span="6">
                        <el-form-item label="坐席">
                            <el-input :maxlength='50' v-model="paramMap.str1" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--渠道小类-->
                    <el-col :span="6">
                        <el-form-item label="渠道小类">
                            <el-input :maxlength='50' v-model="paramMap.str2" placeholder="请输入内容" clearable/>
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
                <el-table-column label="年级" prop="name" sortable="custom"/>
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
                                <el-input :maxlength='50' v-model="dialog.form.name" disabled clearable/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电话">
                                <el-input :maxlength='50' v-model="dialog.form.phone" disabled clearable/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="坐席">
                                <el-input :maxlength='50' v-model="dialog.form.str1" disabled clearable/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属校区">
                                <el-input :maxlength='50' v-model="dialog.form.str2" disabled clearable/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="呼入类型" prop="str3">
                                <el-select v-model="dialog.form.str3" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in dic.incomingType"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="渠道大类">
                                <el-input :maxlength='50' v-model="dialog.form.str4" disabled clearable/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="渠道小类">
                                <el-input :maxlength='50' v-model="dialog.form.str5" disabled clearable/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="登记时间">
                                <el-input :maxlength='50' v-model="dialog.form.str6" disabled clearable/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="是否有效" prop="str7">
                                <el-select v-model="dialog.form.str7" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in dic.isValid2"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="教育顾问" prop="str9">
                                <el-select v-model="dialog.form.str9" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in dic.sales"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15" v-if="dialog.form.str7==='0'">
                        <el-col :span="12">
                            <el-form-item label="无效类型" prop="str8">
                                <el-select v-model="dialog.form.str8" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in dic.invalidType"
                                            :key="item.value"
                                            :label="item.name"
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
            tabs: [
                {id: '0', name: '待确认', num: 6},
                {id: '1', name: '已确认'},
            ],

            // 筛选参数信息
            paramMap: {
                show: true,//是否显示筛选
                tab: '0',
                name: '',//姓名
                date1: '',//登记时间
                isValid: '',//是否有限
                cascader: [],// 学习中心
                date2: [],//确认时间
                str1: '',//坐席
                str2: '',//渠道小类
                str3: '',//呼入类型
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
                    name: '姓名',//姓名
                    phone: '1322222222',//手机号
                    str1: '坐席',//坐席
                    str2: '所属校区',//所属校区
                    str3: '',//呼入类型
                    str4: "渠道大类",//渠道大类
                    str5: "渠道小类",//渠道小类
                    str6: "登记时间",//登记时间
                    str7: "",//是否有效
                    str8: "",//无效类型
                    str9: "",//教育顾问
                    sort: '',//年级的排序
                },
                rules: {
                    str7: {required: true, message: '请选择', trigger: 'blur'},
                    str8: {required: true, message: '请选择', trigger: 'blur'},
                    str9: {required: true, message: '请选择', trigger: 'blur'},
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
         *@desc table触发排序时
         */
        tableSortChange(val) {
            console.log(val.order, val.prop);//descending ascending
            this.refreshPage();
        },

        /**
         *@desc 分页触发时
         */
        onPagesChange() {
            this.refreshPage();
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
    }
}
</script>

<style lang="scss">

</style>