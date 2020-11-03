<template>
    <!--我的学员-->
    <el-main class="jr-customer-my-student">
        <!--标题-->
        <h3 class="jr-title">我的学员</h3>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
            <el-row :gutter="15">
                <!--标签-->
                <el-col :span="6">
                    <el-form-item label="标签">
                        <selected-tag-template v-model="paramMap.tag" @change="selectedTagChange"/>
                    </el-form-item>
                </el-col>
                <!--跟进状态-->
                <el-col :span="6">
                    <el-form-item label="跟进状态">
                        <el-select v-model="paramMap.arr" multiple collapse-tags placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--最近跟进时间-->
                <el-col :span="6">
                    <el-form-item label="最近跟进时间">
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
                <!--姓名，手机号-->
                <el-col :span="6">
                    <el-form-item label="姓名，手机号">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
            </el-row>
            <div v-show="paramMap.show">
                <el-row :gutter="15">
                    <!--最新跟进时间-->
                    <el-col :span="6">
                        <el-form-item label="最新跟进时间">
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
                    <!--客户状态-->
                    <el-col :span="6">
                        <el-form-item label="客户状态">
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
                    <!--负责人-->
                    <el-col :span="6">
                        <el-form-item label="负责人">
                            <selected-role-template v-model="paramMap.role"
                                                    @change="selectedRoleChange"></selected-role-template>
                        </el-form-item>
                    </el-col>
                    <!--渠道-->
                    <el-col :span="6">
                        <el-form-item label="渠道">
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
                    <!--下次联系时间-->
                    <el-col :span="6">
                        <el-form-item label="下次联系时间">
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
                    <!--年级-->
                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-select v-model="paramMap.arr" multiple collapse-tags placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in options.options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--科目-->
                    <el-col :span="6">
                        <el-form-item label="科目">
                            <el-select v-model="paramMap.arr" multiple collapse-tags placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in options.options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--沟通次数-->
                    <el-col :span="6">
                        <el-form-item label="沟通次数">
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
                    <!--之后未跟进-->
                    <el-col :span="6">
                        <el-form-item label="之后未跟进">
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
                    <!--获得时间-->
                    <el-col :span="6">
                        <el-form-item label="获得时间">
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
                    <!--意向度-->
                    <el-col :span="6">
                        <el-form-item label="意向度">
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
                    <!--创建时间-->
                    <el-col :span="6">
                        <el-form-item label="创建时间">
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
                </el-row>
            </div>
            <el-row :gutter="15">
                <el-col :span="24">
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
        <div class="action-bar text-right">
            <el-button @click="addCustomer" type="" size="mini">新增</el-button>
            <el-button @click="importCustomer" type="" size="mini">导入</el-button>
        </div>
        <!--列表-->
        <el-table @sort-change="tableSortChange" class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column fixed type="selection" width="50px" align="center"/>
            <el-table-column fixed label="回收倒计时" width="90px" prop="name"></el-table-column>
            <el-table-column fixed label="姓名" prop="name"></el-table-column>
            <el-table-column fixed label="手机号" min-width="110px" prop="phone">
                <template slot-scope="scope">
                    <el-link type="primary" @click="callCustomer">
                        <span class="">{{ scope.row.phone }}</span>
                        <span class="el-icon-phone-outline"></span>
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column min-width="95px" label="意向度" prop="name">
                <template slot-scope="scope">
                    <el-rate v-model="scope.row.rate" disabled :max="3"/>
                </template>
            </el-table-column>
            <el-table-column label="年级" prop="name" sortable="custom"/>
            <el-table-column label="科目" prop="name" sortable="custom"/>
            <el-table-column label="地区" prop="name"></el-table-column>
            <el-table-column min-width="95px" label="最新跟进状态" prop="name"></el-table-column>
            <el-table-column min-width="95px" label="线索客户状态" prop="name"></el-table-column>
            <el-table-column label="渠道" prop="name" sortable="custom"/>
            <el-table-column min-width="95px" label="最近负责人" prop="name"></el-table-column>
            <el-table-column min-width="135px" label="最近跟进时间" prop="name"></el-table-column>
            <el-table-column width="220px" label="最近跟进记录" prop="recording">
                <template slot-scope="scope">
                    <el-popover
                            placement="top-start"
                            width="200"
                            trigger="hover"
                            :content="scope.row.recording">
                        <template slot="reference">
                            <div class="text-ellipsis w-p200">{{ scope.row.recording }}</div>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column min-width="135px" label="获取时间" prop="name" sortable="custom"/>
            <el-table-column label="创建人" prop="name"></el-table-column>
            <el-table-column min-width="130px" fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" @click="customerFollow">跟进</el-link>
                    <el-link type="primary" @click="customerDetail">详情</el-link>
                    <el-link type="primary" @click="customerAudition">试听</el-link>
                    <el-link type="primary" @click="customerReserve">预约</el-link>
                    <el-link type="primary" @click="customerUpload">上传报告</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>

        <!--弹窗-->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" :append-to-body="true"
                   :title="dialog.title" custom-class="jr-dialog" width="600px">
            <!--弹窗内容-->
            <div class="dialog-body">
                <el-form class="jr-form" size="mini" :model="dialog.form" label-position="left" :rules="dialog.rules"
                         label-width="90px" ref="ruleForm">
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="学员姓名">张三</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="生日">2012-09-09</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="线索客户来源">抖音</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学校">郑州大学</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="手机号">13111122222</el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="家庭住址">张三</el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="类型">
                        <el-select v-model="dialog.form.str" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择文件">
                        <el-upload
                                action=""
                                ref="uploadBom"
                                :multiple="true"
                                list-type="text"
                                :show-file-list="true"
                                :auto-upload="false"
                                :file-list="dialog.form.file"
                                :limit="10"
                                :on-preview="onFilePreview"
                                :on-remove="onFileRemove"
                                :on-exceed="onFileExceed"
                                :http-request="onFileUpload"
                                :before-upload="onBeforeFile">
                            <el-link size="small" type="primary">上传</el-link>
                        </el-upload>
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
import SelectedTagTemplate from "@/components/customer/SelectedTag";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedTagTemplate,
    },
    data() {
        return {
            // 筛选参数信息
            paramMap: {
                show: false,//是否显示全部筛选项
                arr: [],
                str: '',
                obj: {},
                cascader: [],
                tag: [],
                date: [],
            },

            // 筛选选项列表
            options: {
                options1: [
                    {
                        value: 1,
                        label: '选项1',
                        children: [{
                            value: 2,
                            label: '选项1-1',
                            children: [
                                {value: 3, label: '选项1-1-1'},
                                {value: 4, label: '选项1-1-2'},
                                {value: 5, label: '选项1-1-3'}
                            ]
                        }]
                    }
                ],
            },

            //级联选择器配置
            props: {
                multiple: true,
                value: 'value',
                label: 'label',
                children: 'children'
            },

            // 列表数据
            tableData: [
                {
                    name: 123,
                    phone: 12121212121, rate: 3,
                    recording: '显示最近一条跟进记录内容，保证显示15个字，超过...表示，鼠标悬停展示完成内容显示最近一条跟进记录内容，保证显示15个字，超过...表示，鼠标悬停展示完成内容'
                }
            ],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },

            dialog: {
                show: false,
                title: '上传报告',
                form: {
                    str:'',
                    file: [],
                },
                rules: {
                    file: {required: true, message: '请选择文件', trigger: 'blur'},
                }
            }

        }
    },
    created() {
    },
    mounted() {
    },
    destroyed() {
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        }
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
            this.$utils.resetJson(this.paramMap, ['show']);//重置筛选数据
            this.refreshPage();
        },

        /**
         *@desc 选择标签时
         */
        selectedTagChange() {

        },

        /**
         *@desc 选择角色时
         */
        selectedRoleChange() {

        },

        /**
         *@desc 呼叫用户
         */
        callCustomer() {
            this.$api.customer.callCustomer().then(res => {
                this.$message.success('呼叫用户')
                this.customerFollow();
            })
        },

        /**
         *@desc 跟进
         */
        customerFollow() {
            this.$router.push({
                path: '/customer/customer-follow'
            })
        },

        /**
         *@desc 详情
         */
        customerDetail() {
            this.$router.push({
                path: '/customer/customer-detail'
            })
        },

        /**
         *@desc 试听
         */
        customerAudition() {
            this.$message.success('跳到upc')
        },

        /**
         *@desc 签约
         */
        customerReserve() {
            this.$message.success('跳到upc')
        },

        /**
         *@desc table触发排序时
         */
        tableSortChange(val) {
            this.refreshPage();
        },

        /**
         *@desc 上传报告
         */
        customerUpload() {
            this.dialog.show = true;
        },

        /**
         *@desc 新增
         */
        addCustomer() {
            this.$router.push({
                path: '/customer/customer-add'
            })
        },

        /**
         *@desc 导入
         */
        importCustomer() {
            this.$router.push({
                path: '/customer/customer-import'
            })
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
                    this.closeDialog();
                } else {
                    return false;
                }
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

        /**
         *@desc 上传-点击已上传文件
         */
        onFilePreview(file) {
            console.log('点击文件列表中已上传的文件时的钩子\t')
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
.jr-customer-my-customer {
    .action-bar {
        display: flex;
        justify-content: space-between;

        .action-bar_left {
            display: flex;
        }
    }
}
</style>