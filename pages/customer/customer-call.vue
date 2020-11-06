<template>
    <!--呼入线索客户确认-->
    <el-main class="jr-page jr-customer-customer-call">
        <!--tab切换-->
        <div class="jr-page-header">
            <el-tabs v-model="paramMap.ifok" @tab-click="tabsClick">
                <el-tab-pane v-for="item in tabs" :key="item.id" :name="item.id" :path="item.path">
                    <div slot="label">
                        <span>{{ item.name }}</span>
                        <i v-if="item.id==='3'&&confirmedNum>0"
                           class="jr-badge">{{ pagesInfo.count }}</i>
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
                                    v-model="paramMap.checkTime"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickerOptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--学习中心-->
                    <el-col :span="6">
                        <el-form-item label="学习中心">
                            <el-cascader
                                    v-model="paramMap.deptId"
                                    :options="dic.hrcodedepts"
                                    :props="$utils.leaningCenterProps"
                                    :show-all-levels="false"
                                    collapse-tags
                                    placeholder="请选择"
                                    filterable
                                    clearable></el-cascader>
                        </el-form-item>
                    </el-col>
                    <!--确认时间-->
                    <el-col :span="6">
                        <el-form-item label="确认时间">
                            <el-date-picker
                                    v-model="paramMap.auditTime"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickerOptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <!--呼入类型-->
                    <el-col :span="6">
                        <el-form-item label="呼入类型" v-show="paramMap.show">
                            <el-select v-model="paramMap.intype" multiple collapse-tags placeholder="请选择" clearable>
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
                        <el-form-item label="坐席" v-show="paramMap.show">
                            <el-input :maxlength='50' v-model="paramMap.callName" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--渠道小类-->
                    <el-col :span="6">
                        <el-form-item label="渠道小类" v-show="paramMap.show">
                            <el-input :maxlength='50' v-model="paramMap.smallclassname" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>

                    <!--确定按钮-->
                    <el-col :span="6">
                        <el-form-item label-width="0" class="text-right">
                            <el-button @click="submitSearch" type="primary">查询</el-button>
                            <el-button @click="resetSearch">重置</el-button>
                            <el-link type="primary" class="ml-4 mr-2" @click="paramMap.show=!paramMap.show">
                                <span v-show="!paramMap.show">展开</span>
                                <span v-show="paramMap.show">收起</span>
                            </el-link>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <!--列表-->
            <el-table v-if="tableData.length>0" @sort-change="tableSortChange" class="jr-table" ref="filterTable" :data="tableData"
                      size="mini">
                <el-table-column fixed label="姓名" prop="studentName"/>
                <el-table-column fixed min-width="100px" label="手机" prop="tel"/>
                <el-table-column label="年级" prop="grade" sortable="grade"/>
                <el-table-column label="坐席" prop="callName"/>
                <el-table-column label="所属校区" prop="name"/>
                <el-table-column label="呼入类型" prop="intype"/>
                <el-table-column label="渠道大类" prop="bigClass"/>
                <el-table-column label="渠道小类" prop="smallClass"/>
                <el-table-column label="登记时间" prop="callTime"/>
                <el-table-column label="确认人" prop="auditUName"/>
                <el-table-column label="确认时间" prop="auditTime"/>
                <el-table-column fixed="right" label="操作" align="center" v-if="paramMap.ifok==='3'">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="customerConfirm(scope.row)">确认</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="jr-table-placeholder" v-if="tableData.length===0">
                <img src="/images/placeholder.png" alt="placeholder">
                <span>暂无数据</span>
            </div>
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
                                <div class="jr-disabled-input">{{ dialog.form.studentName }}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电话">
                                <div class="jr-disabled-input">{{ dialog.form.tel }}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="坐席">
                                <div class="jr-disabled-input">{{ dialog.form.callName }}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属校区">
                                <div class="jr-disabled-input">{{ dialog.form.name }}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="呼入类型">
                                <el-select v-model="dialog.form.intype" placeholder="请选择" clearable>
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
                            <el-form-item label="登记时间">
                                <div class="jr-disabled-input">{{ dialog.form.callTime }}</div>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="渠道大类">
                                <div class="jr-disabled-input">{{ dialog.form.bigClass }}</div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="渠道小类">
                                <div class="jr-disabled-input">{{ dialog.form.smallClass }}</div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="是否有效" prop="ifok">
                                <el-select v-model="dialog.form.ifok" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in dic.isValid2"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="dialog.form.ifok==='1'">
                            <el-form-item label="教育顾问" prop="sales">
                                <el-select v-model="dialog.form.sales" placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in dialog.options.salesList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="dialog.form.ifok==='0'">
                            <el-form-item label="无效类型" prop="invalidType">
                                <el-select v-model="dialog.form.invalidType" placeholder="请选择" clearable>
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
            confirmedNum: 0,

            // tab切换信息
            tabs: [
                {id: '3', name: '待确认'},
                {id: '1', name: '已确认有效'},
                {id: '0', name: '已确认无效'},
            ],

            // 筛选参数信息
            paramMap: {
                show: false,//是否显示筛选
                ifok: "3",//是否有效 - tab切换
                name: "",//姓名
                checkTime: [],//登记时间
                deptId: [],//学习中心
                auditTime: [],//确认时间
                intype: [],//呼入类型
                callName: "",//坐席
                smallclassname: "",//渠道小类
                order: "",//排序
                orderfield: "",//排序对象
            },

            // 列表数据
            tableData: [],

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
                    studentName: '',// 姓名
                    tel: '',// 手机号
                    callName: '',// 坐席
                    name: '',// 所属校区
                    intype: '',// 呼入类型
                    bigClass: '',// 渠道大类
                    smallClass: '',// 渠道小类
                    callTime: '',// 登记时间
                    ifok: '',// 是否有效
                    invalidType: '',// 无效类型
                    sales: '',// 教育顾问
                },
                options: {
                    salesList: [],//教育顾问列表
                },
                rules: {
                    ifok: {required: true, message: '请选择', trigger: 'blur'},
                    invalidType: {required: true, message: '请选择', trigger: 'blur'},
                    sales: {required: true, message: '请选择', trigger: 'blur'},
                }
            },
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
            let {pagesInfo, paramMap, $utils} = this;

            return this.$api.customer.search({
                "pageindex": pagesInfo.pageIndex,
                "pagesize": pagesInfo.pageSize,
                "order": paramMap.order,
                "orderfield": paramMap.orderfield,
                "name": paramMap.name,
                "ifok": paramMap.ifok,
                "startTime": $utils.convertTime(paramMap.checkTime, 0),
                "endTime": $utils.convertTime(paramMap.checkTime, 1),
                "deptId": $utils.underscore.last(paramMap.deptId) || '',
                "startAuditTime": $utils.convertTime(paramMap.auditTime, 0),
                "endAuditTime": $utils.convertTime(paramMap.auditTime, 1),
                "intype": paramMap.intype.join(','),
                "callName": paramMap.callName,
                "smallclassname": paramMap.smallclassname
            }).then(({request = {}, total = 0, list = []} = {}) => {
                Object.assign(this.pagesInfo, {
                    pageIndex: request.pageindex || 1,
                    pageSize: request.pagesize || 20,
                    count: total || 0,//总条数
                })
                this.tableData = list;

                if (paramMap.ifok === '3') {//如果是待确认数据刷新，更新总数
                    this.confirmedNum = total;
                }
            }).catch(err => {
            })
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
            this.$utils.resetJson(this.paramMap, ['show', 'order', 'orderfield', 'ifok']);//重置筛选数据
            this.refreshPage();
        },

        /**
         *@desc table触发排序时
         */
        tableSortChange(val) {
            let target;
            switch (val.order) {
                case "descending":
                    target = {
                        order: "desc",//排序
                        orderfield: val.name,//排序对象
                    }
                    break;
                case "ascending":
                    target = {
                        order: "asce",//排序
                        orderfield: val.name,//排序对象
                    }
                    break;
                default:
                    target = {
                        order: "",//排序
                        orderfield: "",//排序对象
                    }
                    break;
            }
            Object.assign(this.paramMap, target);
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
        async customerConfirm(obj) {
            Object.assign(this.dialog.form, obj);
            this.dialog.options.salesList = await this.$api.common.deptsales({//拉取教育顾问数据
                "deptids": obj.deptId
            })
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
                    let form = this.dialog.form;
                    this.$api.customer.leadsCallCenterUpdate({
                        intype: form.intype,// 呼入类型
                        ifok: form.ifok,// 是否有效
                        invalidType: form.invalidType,// 无效类型
                        sales: form.sales,// 教育顾问
                    }).then(res => {
                        this.$message.success('确认成功');
                        this.refreshPage();
                        this.closeDialog();
                    })
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
