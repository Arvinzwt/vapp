<template>
    <div class="jr-customer-customer-manage-third">
        <!--筛选项-->
        <el-form class="jr-form" size="mini"
                 :model="paramMap" :rules="paramRules"
                 label-width="90px" label-position="left">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="标签">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="跟进状态">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="删除时间">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="" label-width="0">
                        <el-input placeholder="可搜索姓名、手机"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <div v-show="filterShow">
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="最新跟进时间">
                            <el-input />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户状态">
                            <el-input />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="最近负责人">
                            <el-input />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="渠道">
                            <el-input />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="下次联系时间">
                            <el-input />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-input />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="科目">
                            <el-input />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="沟通次数">
                            <el-input />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="之后未跟进">
                            <el-input />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="获得时间">
                            <el-input />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="意向度">
                            <el-input />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="创建时间">
                            <el-input />
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="删除原因" v-show="filterShow">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="" label-width="0" class="text-right">
                        <el-button type="primary">查询</el-button>
                        <el-button type="">重置</el-button>
                        <el-link type="primary" class="ml-2" @click="filterShow=!filterShow">
                            <span v-show="filterShow">收起</span>
                            <span v-show="!filterShow">展开</span>
                        </el-link>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--操作栏-->
        <div class="action-bar">
            <el-button type="primary" size="mini">分配</el-button>
        </div>
        <!--列表-->
        <el-table class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column type="selection" align="center" width="50"/>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="手机" prop="name"></el-table-column>
            <el-table-column label="年级" prop="name"></el-table-column>
            <el-table-column label="科目" prop="name"></el-table-column>
            <el-table-column label="地区" prop="name"></el-table-column>
            <el-table-column label="渠道来源" prop="name"></el-table-column>
            <el-table-column label="备注" prop="name"></el-table-column>
            <el-table-column label="创建时间" prop="name"></el-table-column>
            <el-table-column label="创建人" prop="name"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-link type="primary">详情</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
    </div>
</template>

<script>
import PaginationTemplate from "@/components/Pagination";

export default {
    components: {
        PaginationTemplate
    },
    data() {
        return {
            filterShow: false,//是否显示其他筛选

            // 筛选参数信息
            paramMap: {},

            // 筛选规则信息
            paramRules: {},

            // 筛选选项列表
            options: {},

            // 列表数据
            tableData: [{name: '英语'}],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
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
        /**
         *@desc 分页触发时
         */
        onPagesChange(pagesInfo) {

        }
    }
}
</script>

<style lang="scss">

</style>