<template>
    <el-main class="jr-customer-customer-call">
        <h3 class="jr-title">呼入线索客户</h3>

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
                    id: 'customer-customer-call',
                    name: '待确认',
                    num: 6,
                    path: '/customer/customer-call',
                },
                {
                    id: 'customer-customer-call-confirmed',
                    name: '已确认',
                    path: '/customer/customer-call/confirmed',
                },
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
.jr-customer-customer-call {
    .main {
        margin: 0;
        padding: 0;
        margin-top: 20px;
    }

    .el-col {
        border: 1px solid transparent;
    }

    .el-tabs__item {
        font-size: 13px;
    }
}
</style>