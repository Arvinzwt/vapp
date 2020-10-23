<template>
    <el-main>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
            <el-row :gutter="15">
                <!--级联选择器 - 不支持搜素-->
                <el-col :span="6">
                    <el-form-item label="级联选择器">
                        <el-cascader
                                v-model="paramMap.cascader"
                                :options="options"
                                :props="props"
                                collapse-tags
                                placeholder="请选择"
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>

                <!--级联选择器 - 支持搜素-->
                <el-col :span="6">
                    <el-form-item label="级联选择器">
                        <el-cascader
                                v-model="paramMap.cascader"
                                :options="options"
                                :props="props"
                                collapse-tags
                                placeholder="请选择"
                                filterable
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>

                <!--日期区间选择器-->
                <el-col :span="6">
                    <el-form-item label="时间区间选择器">
                        <el-date-picker
                                v-model="paramMap.arr"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :default-time="['00:00:00', '23:59:59']"
                                :picker-options="pickerOptions"
                                clearable>
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <!--日期时间选择器-->
                <el-col :span="6">
                    <el-form-item label="时间区间选择器">
                        <el-date-picker
                                v-model="paramMap.str"
                                type="datetime"
                                placeholder="选择日期时间"
                                :picker-options="pickerOptions2">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <!--下拉筛选-可多选-->
                <el-col :span="6">
                    <el-form-item label="下拉筛选-可多选">
                        <el-select v-model="paramMap.selectedArr" multiple collapse-tags placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <!--下拉筛选-单选-->
                <el-col :span="6">
                    <el-form-item label="下拉筛选-单选">
                        <el-select v-model="paramMap.str" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>


                <!--输入框 - 不支持搜索-->
                <el-col :span="6">
                    <el-form-item label="输入框-不支持搜索">
                        <el-input :maxlength='50' v-model="paramMap.value4" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>

                <!--输入框 - 支持搜索-->
                <el-col :span="6">
                    <el-form-item label="输入框-支持搜索">
                        <el-autocomplete
                                v-model="paramMap.str"
                                :fetch-suggestions="querySearchAsync"
                                placeholder="请输入内容"
                                :maxlength='50'
                                @select="handleSelect"
                                clearable
                        >
                            <template slot-scope="{ item }">
                                <div class="name">{{ item.value }}</div>
                                <span class="addr">{{ item.address }}</span>
                            </template>
                        </el-autocomplete>

                    </el-form-item>
                </el-col>

                <!--图片上传-->
                <el-col :span="6">
                    <el-form-item label="图片上传">
                        <!--                        text/picture/picture-card-->
                        <el-upload
                                action=""
                                ref="uploadBom"
                                :multiple="true"
                                list-type="picture"
                                :show-file-list="true"
                                :auto-upload="false"
                                :file-list="paramMap.arr"
                                :limit="10"
                                :on-preview="onFilePreview"
                                :on-remove="onFileRemove"
                                :on-exceed="onFileExceed"
                                :http-request="onFileUpload"
                                :before-upload="onBeforeFile">
                            <el-button size="small" type="primary">上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>

                <!--负责人-->
                <el-col :span="6">
                    <el-form-item label="负责人">
                        <selected-role-template v-model="paramMap.role" @change="selectedRoleChange"></selected-role-template>
                    </el-form-item>
                </el-col>

                <!--标签-->
                <el-col :span="6">
                    <el-form-item label="标签">
                        <selected-tag-template v-model="paramMap.tag" @change="selectedTagChange">

                        </selected-tag-template>
                    </el-form-item>
                </el-col>

            </el-row>
        </el-form>

        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>

    </el-main>
</template>

<script>
import moment from "moment";

import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedTagTemplate from "@/components/customer/SelectedTag";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedTagTemplate,
    },
    name: "demo",
    data() {
        return {
            // 筛选参数
            paramMap: {
                show: false,
                arr: [],
                str: '',
                num: 0,
                obj: {},
                bool: false,
                date: '',
                email: '',

                cascader: [],

                role: [],
                tag: [],
                selectedArr:[],
            },

            // 筛选选项列表
            options: [
                {
                    label: '选项1', value: '1',
                    children: [
                        {value: 3, label: '普陀'},
                        {value: 4, label: '黄埔'},
                    ]
                },
                {label: '选项2', value: '2'},
                {label: '选项3', value: '3'},
            ],

            //级联选择器配置
            props: {
                multiple: true,
                value: 'value',
                label: 'label',
                children: 'children'
            },

            // 时间选择器配置
            pickerOptions: {
                firstDayOfWeek: 1,
                shortcuts: [
                    {
                        text: '当日',
                        onClick(picker) {
                            const date1 = moment().startOf('days').format('YYYY-MM-DD HH:mm:ss');
                            const date2 = moment().endOf('days').format('YYYY-MM-DD HH:mm:ss');
                            picker.$emit('pick', [date1, date2]);
                        }
                    }, {
                        text: '昨日',
                        onClick(picker) {
                            console.log(this, 111)
                            let date1 = moment().subtract(1, 'days').startOf('days').format('YYYY-MM-DD HH:mm:ss');
                            let date2 = moment().subtract(1, 'days').endOf('days').format('YYYY-MM-DD HH:mm:ss');
                            picker.$emit('pick', [date1, date2]);
                        }
                    }, {
                        text: '本周',
                        onClick(picker) {
                            let weekDay = moment().format('E');//计算今天是这周第几天
                            let start = moment().subtract(weekDay - 1, 'days').startOf('days').format('YYYY-MM-DD HH:mm:ss');//周一日期
                            let end = moment().add(7 - weekDay, 'days').endOf('days').format('YYYY-MM-DD HH:mm:ss');//周日日期

                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '本月',
                        onClick(picker) {
                            let start = moment().startOf('month').startOf('days').format('YYYY-MM-DD HH:mm:ss');
                            let end = moment().endOf('month').endOf('days').format('YYYY-MM-DD HH:mm:ss');
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近7日',
                        onClick(picker) {
                            let date = [];
                            date.push(moment().subtract(6, 'days').startOf('days').format('YYYY-MM-DD HH:mm:ss'));
                            date.push(moment().endOf('days').format('YYYY-MM-DD HH:mm:ss'));
                            picker.$emit('pick', date);
                        }
                    },
                    {
                        text: '最近30日',
                        onClick(picker) {
                            let date = [];
                            date.push(moment().subtract(29, 'days').startOf('days').format('YYYY-MM-DD HH:mm:ss'));
                            date.push(moment().endOf('days').format('YYYY-MM-DD HH:mm:ss'));
                            picker.$emit('pick', date);
                        }
                    }
                ],
            },

            pickerOptions2: {
                firstDayOfWeek: 1,
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
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
                show: false,//是否显示
                form: {
                    arr: [],
                    str: '',
                    num: 0,
                    obj: {},
                    bool: false,
                    date: '',
                    email: '',

                },
                rules: {
                    arr: {required: true, type: 'array', message: '请输入', trigger: 'blur'},
                    str: {required: true, type: 'string', message: '请输入', trigger: 'blur'},
                    num: {required: true, type: 'number', message: '请输入', trigger: 'blur'},
                    obj: {required: true, type: 'number', object: '请输入', trigger: 'blur'},
                    bool: {required: true, type: 'boolean', message: '请输入', trigger: 'blur'},
                    date: {required: true, type: 'date', message: '请输入', trigger: 'blur'},
                    email: {required: true, type: 'email', message: '请输入', trigger: 'blur'},
                    test: {
                        required: true, type: 'email', message: '请输入', trigger: 'blur',
                        validator: (rule, value, callback) => value === 'muji',
                    },
                },
            },

            timeOut: null
        }
    },
    created() {
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {
        querySearchAsync(queryString, cb) {
            cb([
                {"value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13"},
                {"value": "阳阳麻辣烫", "address": "天山西路389号"},
            ])
        },
        handleSelect(item) {
            console.log(item);
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

        /**
         *@desc 确定选中负责人时
         */
        selectedRoleChange(target){
            console.log(target)
        },

        selectedTagChange(target){
            console.log(target)
        },

        onPagesChange(){

        }
    }
}
</script>

<style lang="scss">

</style>