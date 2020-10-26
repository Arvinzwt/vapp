<template>
    <!--推荐客户登记-->
    <el-main class="jr-customer-customer-register">
        <el-alert
                title="注意：本系统用户在本系统中登记上传的信息须来源正规合法，用户个人须对在本系统登记上传的信息负责，因用户上传信息违反法律法规或侵犯第三人的合法权益的，全部法律责任和赔偿责任均应由用户自行承担，与本系统所有者无关。"
                type="warning"
                show-icon>
        </el-alert>
        <!--标题-->
        <h3 class="jr-title">推荐客户登记</h3>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px"
                 label-position="left">
            <el-row :gutter="15">
                <!--学生姓名-->
                <el-col :span="6">
                    <el-form-item label="学生姓名">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
                <!--性别-->
                <el-col :span="6">
                    <el-form-item label="性别">
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
                <!--年级-->
                <el-col :span="6">
                    <el-form-item label="年级">
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
                <!--推荐给校区-->
                <el-col :span="6">
                    <el-form-item label="推荐给校区">
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
                <!--就读学校-->
                <el-col :span="6">
                    <el-form-item label="就读学校">
                        <el-input :maxlength='50' v-model="paramMap.value4" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
                <!--线索来源-->
                <el-col :span="6">
                    <el-form-item label="线索来源">
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
                <!--手机号-->
                <el-col :span="6">
                    <el-form-item label="手机号">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
                <!--联系人身份-->
                <el-col :span="6">
                    <el-form-item label="联系人身份">
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
                <!--联系人姓名-->
                <el-col :span="6">
                    <el-form-item label="联系人姓名">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
                <!--推荐类型-->
                <el-col :span="6">
                    <el-form-item label="推荐类型">
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
                <!--学员编号-->
                <el-col :span="6">
                    <el-form-item label="学员编号">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
                <!--推荐码-->
                <el-col :span="6">
                    <el-form-item label="推荐码">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="备注">
                <el-input
                        type="textarea"
                        :maxlength='50'
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="paramMap.str" clearable>
                </el-input>
            </el-form-item>
            <el-form-item label="图片证明">
                <el-upload
                        action=""
                        ref="uploadBom"
                        :multiple="true"
                        list-type="picture-card"
                        :show-file-list="true"
                        :auto-upload="false"
                        :file-list="paramMap.arr"
                        :limit="3"
                        :on-preview="onFilePreview"
                        :on-remove="onFileRemove"
                        :on-exceed="onFileExceed"
                        :http-request="onFileUpload"
                        :before-upload="onBeforeFile">
                    <span class="el-icon-plus"></span>
                </el-upload>

            </el-form-item>
        </el-form>

        <div class="text-right">
            <el-button size="mini" type="primary">提交</el-button>
            <el-button size="mini" type="">重置</el-button>
        </div>
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
                show: true,//是否显示筛选
                date: [],//创建时间
                cascader: [],//渠道
                selectedArr: [],//年级
                input: '',//姓名手机号
                selectedArr2: [],//科目

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

            //级联选择器配置
            props: {
                multiple: true,
                value: 'value',
                label: 'label',
                children: 'children'
            },
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
            this.$utils.resetJson(this.paramMap, ['show', 'role']);//重置筛选数据
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
        assignCustomer() {
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
        callCustomer() {
            this.$api.customer.callCustomer().then(res => {
                this.$message.success('呼叫用户')
                this.customerDetail();
            })
        },

        /**
         *@desc 用户详情
         */
        customerDetail() {
            this.$router.push({
                path: '/customer/customer-detail'
            })
        },


        /**
         *@desc 上传-文件超出个数
         */
        onFileExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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

        onFilePreview(file) {
            console.log('点击文件列表中已上传的文件时的钩子\t')
        },
        onFileRemove(file, fileList) {
            console.log('文件列表移除文件时的钩子\t')
        },
    }
}
</script>

<style lang="scss">
.jr-customer-customer-register {

}
</style>