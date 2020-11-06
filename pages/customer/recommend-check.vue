<template>
    <!--推荐审核-->
    <el-main class="jr-customer-recommend-check">
        <!--标题-->
        <h3 class="jr-title">推荐审核</h3>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
            <el-row :gutter="15">
                <!--姓名-->
                <el-col :span="6">
                    <el-form-item label="姓名">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
                <!--状态-->
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
                <!--学习中心-->
                <el-col :span="6">
                    <el-form-item label="学习中心">
                        <el-cascader
                                v-model="paramMap.deptid"
                                :options="dic.hrcodedepts"
                                :props="$utils.leaningCenterProps"
                                :show-all-levels="false"
                                collapse-tags
                                placeholder="请选择"
                                filterable
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <!--登记人-->
                <el-col :span="6">
                    <el-form-item label="登记人">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <!--年级-->
                <el-col :span="6">
                    <el-form-item label="年级">
                        <el-select v-model="paramMap.grade" multiple collapse-tags placeholder="请选择"
                                   clearable>
                            <el-option
                                    v-for="item in dic.grades"
                                    :key="item.dicCode"
                                    :label="item.name"
                                    :value="item.dicCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--就读学校-->
                <el-col :span="6">
                    <el-form-item label="就读学校" v-show="paramMap.show">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
                <!--登记日期-->
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
        <!--列表-->
        <div class="jr-table-placeholder" v-if="tableData.length===0">
            <img src="/images/placeholder.png" alt="placeholder">
            <span>暂无数据</span>
        </div>

        <el-table v-if="tableData.length>0" @sort-change="tableSortChange" class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column fixed width="50" type="selection" align="center"/>
            <el-table-column fixed label="姓名" prop="name"/>
            <el-table-column label="学习中心" prop="deptname"/>
            <el-table-column label="年级" prop="grade" sortable="custom"/>
            <el-table-column label="就读学校" prop="school"/>
            <el-table-column label="联系人身份" prop=""/>
            <el-table-column label="联系人姓名" prop=""/>
            <el-table-column label="联系人电话" prop=""/>
            <el-table-column label="登记人" prop=""/>
            <el-table-column label="登记时间" prop=""/>
            <el-table-column label="审核状态" prop=""/>

            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" @click="modifyCustomer(scope.row)">修改</el-link>
                    <el-link type="primary" @click="checkCustomer(scope.row)">审核</el-link>
                    <el-link type="primary" @click="viewCustomer(scope.row)">查看</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>

        <!-- 弹窗 -->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" :append-to-body="true"
                   :title="dialog.title" custom-class="jr-dialog" width="800px">
            <!--弹窗内容-->
            <el-form class="jr-form" size="mini" :model="dialog.form" :rules="dialog.rules" label-width="90px"
                     label-position="left" :disabled="dialog.type!==1" ref="ruleForm">
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="学生姓名" prop="str">
                            <el-input :maxlength='50' v-model="dialog.form.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="str">
                            <el-select v-model="dialog.form.sex" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sex"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="年级" prop="str">
                            <el-select v-model="dialog.form.garde" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.grades"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="推荐给校区" prop="str">
                            <el-cascader
                                    v-model="dialog.form.deptId"
                                    :options="dic.hrcodedepts"
                                    :props="$utils.leaningCenterProps"
                                    :show-all-levels="false"
                                    collapse-tags
                                    placeholder="请选择"
                                    filterable
                                    clearable></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="就读学校" prop="str">
                            <el-input :maxlength='50' v-model="dialog.form.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="线索来源" prop="str">
                            <el-select v-model="dialog.form.last_trace_status" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sourceClues1"
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
                        <el-form-item label="手机号" prop="str">
                            <el-input :maxlength='50' v-model="dialog.form.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人身份" prop="str">
                            <el-select v-model="dialog.form.sales" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sale"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="联系人姓名" prop="str">
                            <el-input :maxlength='50' v-model="dialog.form.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="推荐类型" prop="str">
                            <el-select v-model="dialog.form.str" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sourceClues1"
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
                        <el-form-item label="学员编号" prop="str">
                            <el-input :maxlength='50' v-model="dialog.form.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="推荐码" prop="str">
                            <el-input :maxlength='50' v-model="dialog.form.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注" prop="str">
                    <el-input :maxlength='50' type="textarea" v-model="dialog.form.str" placeholder="请输入内容" clearable/>
                </el-form-item>
                <el-form-item label="图片证明" prop="str">
                    <el-upload
                            action=""
                            ref="uploadBom"
                            :multiple="true"
                            list-type="picture-card"
                            :show-file-list="true"
                            :auto-upload="false"
                            :file-list="dialog.form.cascader"
                            :limit="3"
                            :on-preview="onFilePreview"
                            :on-remove="onFileRemove"
                            :on-exceed="onFileExceed"
                            :http-request="onFileUpload"
                            :before-upload="onBeforeFile">
                        <span class="el-icon-plus"></span>
                        <div slot="tip" class="el-upload__tip">最多三张，每张最大5M</div>
                    </el-upload>
                </el-form-item>
            </el-form>

            <el-form v-if="dialog.type===2" class="jr-form" size="mini" :model="dialog.form" :rules="dialog.rules" label-width="90px"
                     label-position="left" ref="ruleForm2">
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="审核结果" :disabled="false">
                            <el-radio :disabled="false" v-model="dialog.form.str" label="1">通过</el-radio>
                            <el-radio :disabled="false" v-model="dialog.form.str" label="2">驳回</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="教育顾问">
                            <el-select v-model="dialog.form.str" placeholder="请选择" clearable>
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
                <el-form-item label="驳回理由" prop="str">
                    <el-input :maxlength='50' type="textarea" v-model="dialog.form.str" placeholder="请输入内容" clearable/>
                </el-form-item>
            </el-form>

            <!--弹窗尾部-->
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeDialog">取 消</el-button>
                <el-button size="mini" @click="submitDialog" type="primary">提 交</el-button>
            </div>
        </el-dialog>
        <!--弹窗2-->
        <el-dialog :visible.sync="dialog2.show" :close-on-click-modal="false" :append-to-body="true"
                   :title="dialog2.name" custom-class="jr-dialog" width="500px">
            <!--弹窗内容-->
            <div class="dialog-body">
                <img :src="dialog2.img" alt="" class="w-100">
            </div>
            <!--弹窗尾部-->
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialog2.show=false" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedChannelTemplate from "@/components/customer/SelectedChannel";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedChannelTemplate
    },
    data() {
        return {
            // 筛选参数信息
            paramMap: {
                show: false,//是否显示筛选
                order: "",//排序方式
                orderfield: "",//排序字段
                keywords: "",//手机号或姓名
                grade: [],//年级
                subjects: "",//学科
                bigChannelId: '',//渠道大类
                smallChannelId: '',//渠道小类
                createdDate: [],//创建时间
                deptid: [],//学习中心(deptid)
                leads_status: [],//客户状态(code)
                intension: [],//意向度
                isvalid: [],//是否有效
                last_trace_status: [],//最近跟进状态
                last_trace_time: [],//最近跟进时间
                next_trace_time: [],//下次跟进时间
                no_trace_time: 0,//之后未跟进
                gain_time: [],//获取时间
                giveup_time: [],//放弃时间
                deadsea_time: [],//进入死海时间
                area_code: "",//海域
                appoint_time: 0,//预约沟通时间
                trace_num: [],//跟进次数
                last_owner: '',//最近一次负责人
                if_trace: [],//是否已跟踪（为空时查全部，0：未跟踪，1：已跟踪）
                tags: [],//标签

                role: [],//选择的角色
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
                type: null,//1修改，2审核，3查看
                title: '',
                form: {
                    str: '',
                    cascader: []
                },
                rules: {}
            },

            dialog2: {
                show: false,
                img: '',
                name:''
            }
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
            let {pagesInfo, paramMap, $utils} = this;

            return this.$api.customer.leadsSearch({
                area_code: '1',
                pageindex: pagesInfo.pageIndex,
                pagesize: pagesInfo.pageSize,
                order: paramMap.order,
                orderfield: paramMap.order,
                keywords: paramMap.keywords,
                grade: paramMap.grade.join(','),
                subjects: paramMap.subjects,
                bigclass: paramMap.bigChannelId,//渠道大类
                smallclass: paramMap.smallChannelId,
                created_start: $utils.convertTime(paramMap.createdDate, 0),
                created_end: $utils.convertTime(paramMap.createdDate, 1),
                deptid: $utils.underscore.last(paramMap.deptid) || '',
                leads_status: paramMap.leads_status.join(','),
                intension: paramMap.intension.join(','),
                isvalid: paramMap.isvalid.join(','),
                last_trace_status: paramMap.last_trace_status.join(','),
                last_trace_time_start: $utils.convertTime(paramMap.last_trace_time, 0),
                last_trace_time_end: $utils.convertTime(paramMap.last_trace_time, 1),
                next_trace_time_start: $utils.convertTime(paramMap.createdDate, 0),
                next_trace_time_end: $utils.convertTime(paramMap.next_trace_time, 0),
                no_trace_time: $utils.convertTime(paramMap.no_trace_time, 2),
                gain_time_start: $utils.convertTime(paramMap.gain_time, 0),
                gain_time_end: $utils.convertTime(paramMap.gain_time, 1),
                giveup_time_start: $utils.convertTime(paramMap.giveup_time, 0),
                giveup_time_end: $utils.convertTime(paramMap.giveup_time, 1),
                deadsea_time_start: $utils.convertTime(paramMap.deadsea_time, 0),
                deadsea_time_end: $utils.convertTime(paramMap.deadsea_time, 1),
                appoint_time_start: $utils.convertTime(paramMap.appoint_time, 0),
                appoint_time_end: $utils.convertTime(paramMap.appoint_time, 1),
                trace_num: paramMap.trace_num.join(','),
                last_owner: paramMap.last_owner,
                if_trace: paramMap.if_trace.join(','),
                tags: paramMap.tags.join(',')
            }).then(({request = {}, total = 0, list = []} = {}) => {
                Object.assign(this.pagesInfo, {
                    pageIndex: request.pageindex || 1,
                    pageSize: request.pagesize || 20,
                    count: total || 0,//总条数
                })
                this.tableData = list;
                this.$emit('update', total)
            }).catch(err => {
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
            this.$utils.resetJson(this.paramMap, ['show', "order", "orderfield", "role"]);//重置筛选数据
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
        callCustomer(obj) {
            this.$api.customer.callCustomer().then(res => {
                this.$message.success('呼叫用户')
                this.$router.push({
                    path: '/customer/customer-follow',
                    query: {
                        id: obj.leadsid,
                    }
                })
            })
        },

        /**
         *@desc 用户详情
         */
        customerDetail(obj) {
            this.$router.push({
                path: '/customer/customer-detail',
                query: {
                    id: obj.leadsid,
                }
            })
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
         *@desc 修改 - 打开弹窗
         */
        modifyCustomer() {
            this.dialog.title = '修改线索客户信息'
            this.dialog.type = 1;
            this.dialog.show = true;
        },

        /**
         *@desc 审核 - 打开弹窗
         */
        checkCustomer() {
            this.dialog.title = '审核线索客户信息'
            this.dialog.type = 2;
            this.dialog.show = true;
        },

        /**
         *@desc 查看 - 打开弹窗
         */
        viewCustomer() {
            this.dialog.title = '查看线索客户信息'
            this.dialog.type = 3;
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
         *@desc 上传-文件超出个数
         */
        onFileExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },

        /**
         *@desc 上传-上传函数
         */
        onFileUpload(fileObj) {
            let paramMap = this.paramMap;
            let linkage = this.$refs.linkage;
            let formData = new FormData();

            formData.append('leads_file', fileObj.file);
            formData.append('org_code', linkage.org_code);
            formData.append('school_code', linkage.school_code);
            formData.append('charge_person', paramMap.charge_person.value);

            this.$post('leads-api/v2/leads/importleadsinfo', formData, {isAllParams: true}).then(res => {
                this.refreshPage().then(() => {
                    this.$message.success(res.data.msg);
                });
            })
        },

        /**
         *@desc 上传-上传前验证
         */
        onBeforeFile(file) {
            if (!file.name.includes('xls')) {
                this.$message.error('只能上传excel!');
                return false;
            } else {
                this.paramMap.list = [];//清空上传列表，每次只上传最近上传的
                return true;
            }
        },

        /**
         *@desc 上传-点击上传文件
         */
        onFilePreview(file) {
            this.dialog2.img = file.url;
            this.dialog2.name = file.name;
            this.dialog2.show = true;
        },

        /**
         *@desc 上传-移除上传文件
         */
        onFileRemove(file, fileList) {
            console.log('文件列表移除文件时的钩子\t')
        },

    }
}
</script>

<style lang="scss">
.jr-customer-recommend-check {

}
</style>