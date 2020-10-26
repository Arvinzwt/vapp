<template>
    <!--客户跟进-->
    <el-main class="jr-customer-customer-follow">
        <h3 class="jr-title">跟进记录</h3>
        <!--基本信息-->
        <div class="bg-gray pl-4 pr-4 pb-1 border-radius-base">
            <h3 class="jr-title">基本信息</h3>
            <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机">
                            <span class="mr-2">13122122212</span>
                            <span class="mr-2 el-icon-phone-outline text-color-brand"></span>
                            <span class="el-icon-view text-color-brand"></span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="渠道">张三</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="创建时间">张三</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
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
                    <el-col :span="6">
                        <el-form-item label="省市区">
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
                    <el-col :span="6">
                        <el-form-item label="详细地址">
                            <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所在学校">
                            <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="所在年级">
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
                    <el-col :span="6">
                        <el-form-item label="意向科目">
                            <el-select v-model="paramMap.selectedArr" multiple collapse-tags placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in options.options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话1">
                            <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话2">
                            <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注">张三</el-form-item>
                <el-form-item label-width="0" class="text-right">
                    <el-button type="primary" size="mini">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--添加跟进记录-->
        <div class="bg-gray pl-4 pr-4 pb-1 mt-4 border-radius-base">
            <h3 class="jr-title">添加跟进记录</h3>
            <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="跟进状态">
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
                    <el-col :span="6">
                        <el-form-item label="下次跟进时间">
                            <el-date-picker
                                    v-model="paramMap.str"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    :picker-options="{firstDayOfWeek: 1}">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="诺到访时间">
                            <el-date-picker
                                    v-model="paramMap.str"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    :picker-options="{firstDayOfWeek: 1}">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="跟进记录">
                    <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入内容"
                            v-model="paramMap.str">
                    </el-input>
                </el-form-item>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="分发校区">
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
                    <el-col :span="6">
                        <el-form-item label-width="0">
                            <el-link type="primary">请选择校区</el-link>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label-width="0">
                            <el-checkbox v-model="paramMap.checked">转至线上电销</el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label-width="0" class="text-right">
                    <el-button type="primary" size="mini">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--历史记录-->
        <el-tabs class="details-tabs" type="card">
            <!--跟进记录-->
            <el-tab-pane label="跟进记录">
                <div class="details-timeline">
                    <!--跟进记录列表-->
                    <div class="details-timeline_item">
                        <div class="details-timeline_title text-color-main">
                            <div class="details-timeline_date text-ellipsis">跟进记录 2020-3-5 19:03:09</div>
                            <div class="details-timeline_user text-ellipsis">操作人：张三张三张三张三张三张三张三张三张三</div>
                            <div class="details-timeline_status text-ellipsis">跟进状态：已分发校区</div>
                        </div>
                        <div class="details-timeline_content_wrap">
                            <div class="details-timeline_content">
                                <div class="details-timeline_remark">
                                    留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录
                                </div>
                                <div class="details-timeline_audio">
                                    <audio src="" controls>您的浏览器不支持 audio 标签</audio>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--暂无跟进记录空-->
                    <div class="p-4 bg-gray">
                        <span>暂无跟进记录空</span>
                    </div>
                </div>
            </el-tab-pane>

            <!--留资记录-->
            <el-tab-pane label="留资记录">
                <div class="details-timeline">
                    <!--留资记录列表-->
                    <div class="details-timeline_item">
                        <div class="details-timeline_title text-color-main">
                            <div class="details-timeline_date text-ellipsis">留资记录 2020-3-5 19:03:09</div>
                        </div>
                        <div class="details-timeline_content_wrap">
                            <div class="details-timeline_content">
                                <div class="details-timeline_remark">
                                    留资渠道：张三张三张三张三张三张三张三张三张三
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--留资记录空-->
                    <div class="p-4 bg-gray">
                        <span>暂无留资记录</span>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
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
                checked:false,

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
    }
}
</script>

<style lang="scss">
.jr-customer-customer-follow {
    //tabs
    .details-tabs {
        margin-top: 20px;

        .el-tabs__header {
            margin-bottom: 0;
            border-bottom: none;

            .el-tabs__nav {
                border: none;
            }

            .el-tabs__item {
                font-size: 12px;
                border: none;
            }

            .is-active {
                background-color: #fafafa;
            }
        }

        .el-tabs__content {
            background-color: #fafafa;
            padding: 0;
            font-size: 12px;
        }
    }

    //时间线
    .details-timeline {
        .details-timeline_item {
            .details-timeline_title {
                height: 30px;
                padding-top: 15px;
                display: flex;
                align-items: center;

                .details-timeline_date {
                    max-width: 200px;
                    margin-right: 20px;
                }

                .details-timeline_user {
                    max-width: 120px;
                    margin-right: 20px;
                }
            }

            .details-timeline_content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #f7f7f7;
                padding: 8px 0;
                padding-right: 20px;

                .details-timeline_remark {
                    padding-left: 20px;
                    padding-right: 20px;
                }

                .details-timeline_audio {
                    audio {
                        display: block;
                        height: 30px;
                    }
                }
            }

            $iconWidth: 40px;

            .details-timeline_title, .details-timeline_content_wrap {
                padding-left: $iconWidth;
                position: relative;

                &:after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: $iconWidth/2;
                    margin-left: -1px;
                    width: 2px;
                    background-color: #e4e7ed;
                }
            }

            .details-timeline_title {
                &:before {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    left: $iconWidth/2;
                    margin-left: -6px;
                    border-radius: 50%;
                    background-color: #e4e7ed;;
                }
            }
        }


    }
}
</style>