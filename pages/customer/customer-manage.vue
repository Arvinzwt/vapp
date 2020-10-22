<template>
    <!--线索客户管理-->
    <el-main class="jr-customer-customer-manage">
        <!--tab切换-->
        <el-tabs :value="$route.name" @tab-click="tabsClick">
            <el-tab-pane v-for="item in tabs" :key="item.id" :name="item.id" :path="item.path">
                <div slot="label">
                    <span>{{ item.name }}</span>
                    <i v-if="item.num" class="jr-badge">{{ item.num }}</i>
                </div>
            </el-tab-pane>
        </el-tabs>

        <!--内容-->
        <nuxt-child class="main"/>
    </el-main>
</template>

<script>
export default {
    data() {
        return {
            tabs: [
                {
                    id: 'customer-customer-manage',
                    name: '新海（待分配）',
                    num: 6,
                    path: '/customer/customer-manage',
                },
                {
                    id: 'customer-customer-manage-second',
                    name: '公海',
                    path: '/customer/customer-manage/second',
                },
                {
                    id: 'customer-customer-manage-third',
                    name: '死海',
                    path: '/customer/customer-manage/third',
                },
                {
                    id: 'customer-customer-manage-fourth',
                    name: '全部',
                    path: '/customer/customer-manage/fourth',
                }
            ]
        }
    },
    methods: {
        tabsClick(tab) {
            this.$router.push({
                path: tab.$attrs.path
            })
        }
    }
}
</script>

<style lang="scss">
.jr-customer-customer-manage {
    .main {

    }

    .el-col {
        border: 1px solid transparent;
    }

    .el-tabs__item {
        font-size: 13px;
    }
}
</style>