<template>
    <el-main>
        <div class="crm-filter-box">
            <!--title-->
            <div class="crm-filter-title">基础信息</div>

            <!--筛选内容-->
            <el-form
                class="crm-filter-form"
                size="mini"
                label-width="70px"
                :model="paramMap"
                :rules="rules"
                label-position="left">

                <el-row :gutter="18">
                    <el-col :span="6">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="paramMap.name" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="手机" prop="phone">
                            <el-input v-model="paramMap.phone" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="性别">
                            <el-select v-model="paramMap.sex" placeholder="请选择">
                                <el-option label="男" value="0"></el-option>
                                <el-option label="女" value="0"></el-option>
                                <el-option label="无" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-select v-model="paramMap.grade" placeholder="请选择">
                                <el-option label="初中" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="意向科学">
                            <el-select v-model="paramMap.intent" placeholder="请选择">
                                <el-option label="物理" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="地区">
                            <el-cascader
                                v-model="paramMap.area"
                                :options="filterOptions.options">
                            </el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="详细地址">
                            <el-input v-model="paramMap.address" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="校区">
                            <el-select v-model="paramMap.school" placeholder="请选择">
                                <el-option label="校区1" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="负责人">
                            <el-select v-model="paramMap.chargePerson" placeholder="请选择">
                                <el-option label="校区1" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-row :gutter="18">
                            <el-col :span="18">
                                <el-form-item label="" label-width="0">
                                    <el-input
                                        type="textarea"
                                        :rows="3"
                                        placeholder="请填写跟进记录"
                                        v-model="paramMap.remark">
                                    </el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <div class="btn-box">
                                    <el-button type="primary" size="small">提交</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>

                </el-row>
            </el-form>
        </div>
    </el-main>
</template>

<script>
    export default {
        name: "leadsAdd",
        data() {
            return {
                paramMap: {
                    name: '',
                    phone: '',
                    sex: 0,
                    area: [],//省市区
                    address: '',//详细地址
                    grade: '',//所在年级
                    intent: [],//意象科学
                    school: '',
                    channel: '',
                    divisionId: '',//事业部
                    campusId: '',//校区
                    chargePerson: '',
                    remark: '',
                },
                rules: {
                    name: {required: true, message: '请输入姓名', trigger: 'blur'},
                    phone: {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (/^1\d{10}$/.test(value)) {
                                callback();
                            } else {
                                callback(new Error('请输入手机号'));
                            }
                        }, message: '请输入手机号'
                    },
                    channel: {required: true, message: '请选择渠道', trigger: 'blur'},
                },

                //leads筛选条件
                filterOptions: {
                    // 三级联动数据
                    options: [
                        {
                            value: 'zhinan',
                            label: '指南',
                            children: [{
                                value: 'shejiyuanze',
                                label: '设计原则',
                                children: [{
                                    value: 'yizhi',
                                    label: '一致'
                                },]
                            }]
                        }
                    ],

                },
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .btn-box {
        height: 64px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }
</style>