<template>
    <!--诺访记录-->
    <el-main class="jr-customer-nov-record">
        <!--标题-->
        <h3 class="jr-title">诺访记录</h3>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="推荐给校区" prop="deptid">
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
                <!--负责人-->
                <el-col :span="6">
                    <el-form-item label="负责人">
                        <selected-role-template v-model="paramMap.owner"></selected-role-template>
                    </el-form-item>
                </el-col>
                <!--渠道-->
                <selected-channel-template v-model="paramMap"/>
            </el-row>
            <el-row :gutter="15">
                <!--姓名，手机号-->
                <el-col :span="6">
                    <el-form-item label="姓名、手机号" v-show="paramMap.show">
                        <el-input v-model="paramMap.keywords" placeholder="可搜索姓名、手机" clearable/>
                    </el-form-item>
                </el-col>
                <!--诺到访日期-->
                <el-col :span="6">
                    <el-form-item label="诺到访日期" v-show="paramMap.show">
                        <el-date-picker
                                v-model="paramMap.promissDate"
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
                <!--实到访日期-->
                <el-col :span="6">
                    <el-form-item label="实到访日期" v-show="paramMap.show">
                        <el-date-picker
                                v-model="paramMap.visitDate"
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
                <el-col :span="6">
                    <!--确定按钮-->
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
        <!--列表-有数据-->
        <div v-if="tableData.length>0">
            <el-table @sort-change="tableSortChange" class="jr-table" ref="filterTable" :data="tableData" size="mini">
                <el-table-column fixed width="50px" type="selection" align="center"/>
                <el-table-column fixed width="95px" label="姓名" prop="studentname"/>
                <el-table-column fixed width="105px" label="手机号" prop="phone">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="callCustomer(scope.row)">
                            <span class="">{{ $utils.desensitizationPhone(scope.row.phone) }}</span>
                            <span class="el-icon-phone-outline"></span>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="年级" prop="grade"></el-table-column>
                <el-table-column label="跟进状态" prop="lasttracestatus"></el-table-column>
                <el-table-column label="渠道大类" prop="bigclassname"></el-table-column>
                <el-table-column label="渠道小类" prop="smallclassname"></el-table-column>
                <el-table-column label="负责人" prop="sales"></el-table-column>
                <el-table-column min-width="135px" label="诺到访时间" prop="doordate" :sortable="false"/>
                <el-table-column label="是否到访" prop="doorstatus">
                    <template slot-scope="scope">
                        <div @click="switchHandle(scope.row)" class="el-switch"
                             :class="scope.row.doorstatus?'is-checked is-disabled':''">
                            <span class="el-switch__core"></span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column min-width="135px" label="实到访时间" prop="realdatetime" :sortable="false"/>
            </el-table>
            <!--分页信息-->
            <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
        </div>
        <!--列表-没有数据-->
        <div class="jr-table-placeholder" v-if="tableData.length===0">
            <img src="/images/placeholder.png" alt="placeholder">
            <span>暂无数据</span>
        </div>
        <!--弹窗-->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" :append-to-body="true"
                   title="选择到访时间" custom-class="jr-dialog" width="400px">
            <!--弹窗内容-->
            <div class="dialog-body">
                <el-form class="jr-form" size="mini" :model="dialog.form" label-position="left" :rules="dialog.rules"
                         label-width="90px" ref="ruleForm">
                    <el-form-item label="到访时间" prop="date">
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
import SelectedChannelTemplate from "@/components/customer/SelectedChannel";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedChannelTemplate,
    },
    data() {
        return {
            // 筛选参数信息
            paramMap: {
                show: false,//是否显示全部筛选项
                deptid: "",//学习中心
                bigChannelId: '',//渠道大类
                smallChannelId: '',//渠道小类
                keywords: "",
                owner: "",
                promissDate: [],
                visitDate: []
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
                    id: '',
                    date: ''
                },
                rules: {
                    date: {required: true, message: '请选择时间', trigger: 'blur'},
                }
            },
        }
    },

    computed: {
        dic() {
            return this.$store.state.dic;
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
            let {pagesInfo, paramMap, $utils} = this;

            return this.$api.customer.getCallCCCenterList({
                "pageindex": pagesInfo.pageIndex,
                "pagesize": pagesInfo.pageSize,
                "deptid": $utils.underscore.last(paramMap.deptid) || '',
                "bigclass": paramMap.bigChannelId,
                "smallclass": paramMap.smallChannelId,
                "keywords": paramMap.keywords,
                "owner": paramMap.owner,
                "promissbegindate": $utils.convertTime(paramMap.promissDate, 0),
                "promissenddate": $utils.convertTime(paramMap.promissDate, 1),
                "visitbegindate": $utils.convertTime(paramMap.visitDate, 0),
                "visitenddate": $utils.convertTime(paramMap.visitDate, 1),
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
            this.$utils.resetJson(this.paramMap, ['show']);//重置筛选数据
            this.refreshPage();
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
         *@desc table触发排序时
         */
        tableSortChange(val) {
            let target;
            switch (val.order) {
                case "descending":
                    target = {
                        order: 1,//排序
                        orderfield: val.prop,//排序对象
                    }
                    break;
                case "ascending":
                    target = {
                        order: 0,//排序
                        orderfield: val.prop,//排序对象
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
         *@desc 切换诺方时间
         */
        switchHandle(obj) {
            if (obj.doorstatus) {
                // this.$confirm('确认是否取消到访记录？', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     this.$api.customer.cancelconfirm().then(res=>{
                //         this.$message.success('取消成功');
                //         this.refreshPage();
                //     })
                // }).catch(() => {
                //
                // });
            } else {
                this.dialog.form.id = obj.recordid;
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
                    this.$api.customer.confirm({
                        "vrid": this.dialog.form.id,//记录id
                        "leadsid": "",//学生id
                        "doortype": "",//到访类型
                        "gradename": "",//年级
                        "realdatetime": this.$utils.convertTime(this.dialog.form.date)
                    }).then(res=>{
                        this.$message.success('成功');
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
.jr-customer-nov-record {

}
</style>