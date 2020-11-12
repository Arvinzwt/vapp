<template>
    <!--推荐客户登记-->
    <el-main class="jr-page jr-customer-customer-add">
        <div class="jr-page-body">
            <!--标题-->
            <h3 class="jr-title">线索客户信息录入</h3>
            <!--筛选项-->
            <el-form class="jr-form" size="mini" :model="paramMap" :rules="paramRules" label-width="90px"
                     label-position="left" ref="ruleForm">
                <el-row :gutter="15">
                    <!--学生姓名-->
                    <el-col :span="6">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="paramMap.name" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--手机号-->
                    <el-col :span="6">
                        <el-form-item label="手机号" prop="phone">
                            <el-input :maxlength="11" v-model="paramMap.phone" placeholder="请输入姓名，手机号" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--性别-->
                    <el-col :span="6">
                        <el-form-item label="性别" prop="sex">
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
                    <!--省市区-->
                    <el-col :span="6">
                        <el-form-item label="省市区">
                            <el-cascader :props="$utils.cityProps" v-model="paramMap.city"></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <!--详细地址-->
                    <el-col :span="6">
                        <el-form-item label="详细地址" prop="address">
                            <el-input v-model="paramMap.address" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--学校-->
                    <el-col :span="6">
                        <el-form-item label="学校" prop="schoool">
                            <el-input v-model="paramMap.schoool" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--年级-->
                    <el-col :span="6">
                        <el-form-item label="年级" prop="grade">
                            <el-select v-model="paramMap.grade" placeholder="请选择"
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
                    <!--意向科目-->
                    <el-col :span="6">
                        <el-form-item label="意向科目" prop="subjects">
                            <el-select v-model="paramMap.subjects" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.subject"
                                        :key="item.dicCode"
                                        :label="item.name"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <!--线索来源-->
                    <el-col :span="6">
                        <el-form-item label="线索来源" prop="inType">
                            <el-select v-model="paramMap.inType" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sourceClues1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--渠道-->
                    <selected-channel-template v-model="paramMap"/>
                    <!--校区-->
                    <el-col :span="6">
                        <el-form-item label="校区" prop="deptId">
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
                </el-row>
                <el-form-item label="备注" prop="remark">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="paramMap.remark"/>
                </el-form-item>
            </el-form>
        </div>
        <div class="jr-page-footer text-right">
            <el-button size="mini" type="" @click="cancelCustomer">取消</el-button>
            <el-button size="mini" type="" @click="resetCustomer">重置</el-button>
            <el-button size="mini" type="primary" @click="submitCustomer">确定</el-button>
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
                name: "",//手机号或姓名
                phone: "",
                sex: "",
                grade: '',//年级
                subjects: "",//学科
                address: "",//详细地址
                schoool: "",//学校
                inType: "",//线索来源
                deptId: "",//学习中心
                bigChannelId: '',//渠道大类
                smallChannelId: '',//渠道小类
                remark: "",//备注
                city: [],
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

    },
    methods: {
        /**
         *@desc 刷新页面
         */
        cancelCustomer() {
        },

        /**
         *@desc 重置
         */
        resetCustomer() {
            this.$utils.resetJson(this.paramMap);//重置筛选数据
        },

        /**
         *@desc 提交
         */
        submitCustomer() {
            let paramMap = this.paramMap;

            if (!paramMap.name) {
                this.$message.error('请输入姓名')
                return false
            }
            if (!/^1\d{10}$/.test(paramMap.phone)) {
                this.$message.error('请输入正确的手机号')
                return false
            }
            if (!paramMap.inType) {
                this.$message.error('请选择线索来源')
                return false
            }
            if (!paramMap.bigChannelId) {
                this.$message.error('请选择渠道大类')
                return false
            }
            if (!paramMap.smallChannelId) {
                this.$message.error('请选择渠道小类')
                return false
            }
            this.$api.customer.addleads({
                "leadsid": "",
                "name": paramMap.name,
                "phone": paramMap.phone,
                "grade": paramMap.grade,
                "subjects": paramMap.subjects,
                "bigclass": paramMap.bigChannelId,
                "smallclass": paramMap.smallChannelId,
                "intype": paramMap.inType,
                "address": paramMap.address,
                "sex": paramMap.sex,
                "school": paramMap.schoool,
                "owner": paramMap.phone,
                "remark": paramMap.remark,
                "deptid": paramMap.deptId,
                "studentguid": "",
                // city: [],
            }).then(res => {
                this.$message.success('新增成功')
            }).catch(err => {
            });
        }
    }
}
</script>

<style lang="scss">
.jr-customer-customer-add {

}
</style>