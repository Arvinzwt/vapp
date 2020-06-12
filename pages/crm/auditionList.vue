<template>
    <el-main>
        <div class="crm-filter-box">
            <!--title-->
            <div class="crm-filter-title">试听列表</div>

            <!--筛选内容-->
            <el-form
                class="crm-filter-form"
                size="mini"
                label-width="70px"
                label-position="left">

                <el-row :gutter="18">
                    <el-col :span="6">
                        <el-form-item label="事业部">
                            <el-select v-model="paramMap.divisionId" placeholder="请选择">
                                <el-option label="精锐在线·1v1" value="0"></el-option>
                                <el-option label="精锐在线·1v2" value="1"></el-option>
                            </el-select>                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="校区">
                            <el-select v-model="paramMap.school" placeholder="请选择">
                                <el-option label="校区1" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="试听状态">
                            <el-select v-model="paramMap.status" multiple placeholder="请选择">
                                <el-option label="线索" value="21"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="负责人">
                            <el-select v-model="paramMap.chargePersonId" multiple placeholder="请选择">
                                <el-option label="线索" value="21"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="上课时间">
                            <el-date-picker
                                v-model="paramMap.recentTimeDate"
                                type="daterange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="" label-width="0">
                            <el-row :gutter="10">
                                <el-col :span="20">
                                    <el-input v-model="paramMap.name" placeholder="可搜索姓名、手机"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-button type="primary" size="mini" @click="onSubmitFilter">查询</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
        </div>

        <!--操作栏-->
        <div class="operation-bar">
            <el-link class="c-font_basic" type="">
                已邀约：12  出席：5  缺席：3  取消：2  合计：22
            </el-link>
        </div>

        <!--table-->
        <el-table
            class="crm-table"
            cell-class-name="crm-table_cell"
            header-cell-class-name="crm-table_header"
            :data="tableData"
            size="mini">

            <el-table-column prop="id" label="id"/>
            <el-table-column prop="name" label="姓名"/>
            <el-table-column prop="phone" label="手机号"/>
            <el-table-column prop="course" label="课程"/>
            <el-table-column prop="status" label="上课状态"/>
            <el-table-column prop="teacher" label="教师"/>
            <el-table-column width="160" prop="date" label="试听时间"/>
            <el-table-column width="160" prop="createTime" label="创建时间"/>
            <el-table-column prop="chargePerson" label="负责人"/>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-link class="c-font_basic" type="primary">取消</el-link>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <div class="crm-pagination-wrapper">
            <el-pagination
                @current-change="onCurrentPagesChange"
                background
                @size-change="onPagesSizeChange"
                :current-page="pagesInfo.currentPage"
                :page-size="pagesInfo.pageSize"
                :page-sizes="[20, 40, 60,80, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagesInfo.total">
            </el-pagination>
        </div>

    </el-main>
</template>

<script>
    export default {
        name: "auditionList",
        data() {
            return {
                paramMap:{
                    divisionId:'',
                    school:'',
                    status:'',
                    chargePersonId:'',
                    recentTimeDate:'',
                    name:'',
                },

                // 控制时间选择器只能选当前时间之后
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },

                // table数据
                tableData: [
                    {
                        id:'11',
                        name:'张三',
                        phone:'12312232',
                        course:'试听课',//课程
                        status:'出席',//上课状态
                        teacher:'老师1',//教师
                        date:'2020-5-12 20:15-21:00',//试听时间
                        createTime:'2020-5-1 08:50:08',
                        chargePerson:'郑渊1',//负责人
                    }
                ],

                // 分页信息
                pagesInfo: {
                    currentPage: 1,//当前页面
                    total: 200,//数据总条数
                    pageSize: 20,//单页面数据条数
                },
            }
        },
        created() {
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
            onSubmitFilter(){

            },

            /**
             *@desc 分页模块翻页时触发
             *@param val [Number] 翻页后的页数
             */
            onCurrentPagesChange(val) {
                console.log(val)
            },

            /**
             *@desc 分页模块跳页时触发时触发
             *@param val [Number] 跳页后的页数
             */
            onPagesSizeChange(val) {
                console.log(val)
            },

        }
    }
</script>

<style scoped>
    .operation-bar {
        display: flex;
        justify-content: flex-end;
        padding: 10px 0;
    }
</style>