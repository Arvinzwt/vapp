<template>
    <el-main class="jr-customer-customer-recover">
        <h3 class="jr-title">即将回收</h3>
        <!--tab切换-->
        <el-tabs :value="$route.name" @tab-click="tabsClick">
            <el-tab-pane v-for="item in tabs" :key="item.id" :name="item.id">
                <div slot="label">
                    <span>{{ item.name }}</span>
                    <i v-if="item.num" class="jr-badge">{{ item.num }}</i>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap"
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
                    <el-form-item label="最近跟进时间">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="姓名，手机号">
                        <el-input/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="最新跟进时间">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="客户状态">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="负责人">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="渠道">
                        <el-input/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="下次联系时间">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="年级">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="科目">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="沟通次数">
                        <el-input/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="之后未跟进">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="获得时间">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="意向度">
                        <el-input/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="创建时间">
                        <el-input/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--列表-->
        <el-table class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column fixed type="selection" align="center" width="50"/>
            <el-table-column fixed label="姓名" prop="name"></el-table-column>
            <el-table-column label="手机号" prop="phone">
                <template slot-scope="scope">
                    <span class="">{{ scope.row.phone }}</span>
                    <span class="el-icon-phone-outline"></span>
                </template>
            </el-table-column>
            <el-table-column label="意向度" prop="name"></el-table-column>
            <el-table-column label="年级" prop="name"></el-table-column>
            <el-table-column label="科目" prop="name"></el-table-column>
            <el-table-column label="地区" prop="name"></el-table-column>
            <el-table-column label="最新跟进状态" prop="name"></el-table-column>
            <el-table-column label="线索客户状态" prop="name"></el-table-column>
            <el-table-column label="渠道" prop="name"></el-table-column>
            <el-table-column label="最近负责人" prop="name"></el-table-column>
            <el-table-column label="最近跟进时间" prop="name"></el-table-column>
            <el-table-column label="最近跟进记录" prop="name"></el-table-column>
            <el-table-column label="获取时间" prop="name"></el-table-column>
            <el-table-column label="创建人" prop="name"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" @click="">跟进</el-link>
                    <el-link type="primary" @click="">详情</el-link>
                    <el-link type="primary" @click="">试听</el-link>
                    <el-link type="primary" @click="">签约</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
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
            tabs: [
                {id: '0', name: '3天回收', num: 6,},
                {id: '1', name: '7天回收',},
                {id: '2', name: '10天回收',},
            ],
            paramMap: {},
            tableData: [],
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
        tabsClick(tab) {

        },

        /**
         *@desc 分页触发时
         */
        onPagesChange() {
            this.refreshPage();
        },
    }
}
</script>

<style lang="scss">

</style>