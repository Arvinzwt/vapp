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
                label-position="left">

                <el-row :gutter="18">
                    <el-col :span="6">
                        <el-form-item label="事业部">
                            <el-input v-model="paramMap.divisionId" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="校区">
                            <el-input v-model="paramMap.school" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="负责人">
                            <el-input v-model="paramMap.chargePerson" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item>
                            <el-upload
                                ref="upload"
                                multiple
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :file-list="paramMap.fileList"
                                :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary">浏览</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success"
                                           @click="onSubmitUpload">上传
                                </el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!--操作栏-->
        <div class="operation-bar">
            <el-link class="c-font_basic" type="primary">下载导入模板</el-link>
        </div>

        <!--table-->
        <el-table
            class="crm-table"
            cell-class-name="crm-table_cell"
            header-cell-class-name="crm-table_header"
            :data="tableData"
            size="mini">

            <el-table-column type="index" align="center" label="ID"/>
            <el-table-column prop="importTime" label="导入时间"/>
            <el-table-column prop="principal" label="操作人员"/>
            <el-table-column prop="success" label="导入成功数量"/>
            <el-table-column prop="division" label="事业部"/>
            <el-table-column prop="campus" label="校区"/>
            <el-table-column prop="chargePerson" label="负责人"/>
            <el-table-column label="操作" align="center">
                <template v-slot="scope">
                    <el-link class="c-font_basic" type="primary">下载导入失败记录</el-link>
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
        name: "leadsImport",
        data() {
            return {
                // 筛选内容
                paramMap: {
                    divisionId: '',//事业部
                    campusId: '',//校区
                    chargePerson: '',
                    fileList: [],
                },

                // table数据
                tableData: [
                    {
                        importTime:'2019-09-09 13:12:11',
                        principal:'李四',
                        success:11,
                        division:'精锐在线·1v1',
                        campus:'校区1',
                        chargePerson:'张三',
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
        methods: {
            onSubmitUpload() {
                this.$refs.upload.submit();
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