<template>
    <el-main class="crm-quotaSettings">
        <div class="crm-tabs">
            <el-tabs v-model="activeName" type="card">
                <!--每日新leads配额-->
                <el-tab-pane label="每日新leads配额" name="first">

                    <!--筛选栏-->
                    <div class="crm-filter-box">
                        <!--筛选内容-->
                        <el-form
                            class="crm-filter-form"
                            size="mini"
                            label-width="70px"
                            label-position="left">
                            <el-row :gutter="18">
                                <el-col :span="6">
                                    <el-form-item label="事业部">
                                        <el-select v-model="paramMap.divisionId"
                                                   placeholder="请选择">
                                            <el-option label="精锐在线·1v1" value="0"></el-option>
                                            <el-option label="精锐在线·1v2" value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <el-form-item label="校区">
                                        <el-select v-model="paramMap.divisionId"
                                                   placeholder="请选择">
                                            <el-option label="精锐在线·1v1" value="0"></el-option>
                                            <el-option label="精锐在线·1v2" value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <el-form-item label="角色">
                                        <el-select v-model="paramMap.divisionId"
                                                   placeholder="请选择">
                                            <el-option label="精锐在线·1v1" value="0"></el-option>
                                            <el-option label="精锐在线·1v2" value="1"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <el-form-item label="" label-width="0">
                                        <el-row :gutter="10">
                                            <el-col :span="18">
                                                <el-input v-model="paramMap.name" placeholder="可搜索姓名、手机"></el-input>
                                            </el-col>
                                            <el-col :span="6">
                                                <el-button type="primary" size="mini" @click="onSubmitFilter">查询
                                                </el-button>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                </el-col>


                            </el-row>
                        </el-form>
                    </div>

                    <!--操作栏-->
                    <div class="operation-bar">
                        <span></span>
                        <el-link type="primary" class="c-font_basic">保存</el-link>
                    </div>

                    <!--table-->
                   <div class="wrapper">
                       <el-table
                           class="crm-table"
                           cell-class-name="crm-table_cell"
                           header-cell-class-name="crm-table_header"
                           :data="tableData"
                           size="mini">
                           <el-table-column align="center" type="index" label="序号"></el-table-column>
                           <el-table-column align="center" prop="name" label="姓名"/>
                           <el-table-column align="center" prop="name" label="每日配额">
                               <template v-slot="scope">
                                   <el-input v-model="paramMap.name" placeholder=""></el-input>
                               </template>
                           </el-table-column>
                       </el-table>
                   </div>


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

                </el-tab-pane>

                <!--回收机制-->
                <el-tab-pane label="留资记录" name="second">

                    <!--筛选栏-->
                    <div class="crm-filter-box">
                        <!--筛选内容-->
                        <el-form
                            class="crm-filter-form"
                            size="mini">
                            <el-form-item>
                                <el-radio v-model="paramMap.radio" :label="1">通用配置</el-radio>
                                <el-radio v-model="paramMap.radio" :label="2">按事业部</el-radio>
                            </el-form-item>
                        </el-form>
                    </div>

                    <!--操作栏-->
                    <div class="operation-bar">
                        <span class="c-font_basic">说明：通用配置会应用到所有事业部，只有当事业部有特殊设置时，才需要事业部配置。</span>
                        <el-link type="primary" class="c-font_basic">保存</el-link>
                    </div>

                    <!--table-->
                    <div class="wrapper">
                        <el-table
                            class="crm-table"
                            cell-class-name="crm-table_cell"
                            header-cell-class-name="crm-table_header"
                            :data="tableData"
                            size="mini">
                            <el-table-column align="center" type="index" label="序号"></el-table-column>
                            <el-table-column align="center" prop="name" label="配置项"/>
                            <el-table-column align="center" prop="name" label="配置值">
                                <template slot-scope="scope">
                                    <el-input></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="name" label="说明">
                                <template slot-scope="scope">
                                   <span class="c-color_blue">表示未签约leads隔多少天未跟进就回收为公共资源，0表示永不回收。 </span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

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
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-main>
</template>

<script>
    export default {
        name: "quotaSettings",
        data() {
            return {
                activeName: 'first',
                paramMap: {
                    divisionId: '',
                    name: '',

                    radio:1,
                },
                tableData: [{name: 123}],

                // 分页信息
                pagesInfo: {
                    currentPage: 1,//当前页面
                    total: 200,//数据总条数
                    pageSize: 20,//单页面数据条数
                },
            }
        },
        methods: {
            onSubmitFilter() {

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

<style lang="scss">
    .crm-quotaSettings {

        .wrapper{
            width: 50%;
        }
        .operation-bar {
            display: flex;
            justify-content: space-between;
            padding: 10px;
        }

    }

</style>