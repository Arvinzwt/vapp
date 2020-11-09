<template>
    <!--推荐客户登记-->
    <el-main class="jr-page jr-customer-customer-add">
        <div class="jr-page-body">
            <!--标题-->
            <h3 class="jr-title">线索客户信息录入</h3>
            <!--筛选项-->
            <el-form class="jr-form" size="mini" :model="paramMap" :rules="paramRules" label-width="90px"
                     label-position="left">
                <el-row :gutter="15">
                    <!--学生姓名-->
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <el-input :maxlength='50' v-model="paramMap.name" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--手机号-->
                    <el-col :span="6">
                        <el-form-item label="手机号">
                            <el-input :maxlength='50' v-model="paramMap.keywords" placeholder="请输入姓名，手机号" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--性别-->
                    <el-col :span="6">
                        <el-form-item label="性别">
                            <el-select v-model="paramMap.sex" placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in dic.sex"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
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
                </el-row>
                <el-row :gutter="15">
                    <!--意向学科-->
                    <el-col :span="6">
                        <el-form-item label="意向学科">
                            <el-select v-model="paramMap.subject" multiple collapse-tags placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.subject"
                                        :key="item.dicCode"
                                        :label="item.name"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="详细地址">
                            <el-input :maxlength='50' v-model="paramMap.address" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="学校">
                            <el-input :maxlength='50' v-model="paramMap.schoool" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="线索来源">
                            <el-select v-model="paramMap.last_trace_status" placeholder="请选择" clearable>
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
                    <!--渠道-->
                    <selected-channel-template v-model="paramMap"/>
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
                    <!--最近负责人-->
                    <el-col :span="6">
                        <el-form-item label="最近负责人">
                            <selected-role-template v-model="paramMap.last_owner"></selected-role-template>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-form-item label-width="0">
                        <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="paramMap.reason1"/>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>
        <div class="jr-page-footer text-right">
            <el-button size="mini" type="">取消</el-button>
            <el-button size="mini" type="primary">确定</el-button>
        </div>
    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedTagTemplate from "@/components/customer/SelectedTag";
import SelectedChannelTemplate from "@/components/customer/SelectedChannel";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedTagTemplate,
        SelectedChannelTemplate
    },
    data() {
        return {
            // 筛选参数信息
            paramMap: {
                show: false,//是否显示筛选
                 // order: "",//排序方式
                // orderfield: "",//排序字段
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

            // 筛选参数规则
            paramRules: {},

            // 列表数据
            tableData: [],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
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
        }
    }
}
</script>

<style lang="scss">
.jr-customer-customer-add {

}
</style>