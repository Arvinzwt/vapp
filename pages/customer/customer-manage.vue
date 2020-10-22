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
            // tab切换信息
            tabs: [
                {
                    id: 'customer-customer-manage',
                    name: '新海（待分配）',
                    num: 6,
                    path: '/customer/customer-manage',
                },
                {
                    id: 'customer-customer-manage-public',
                    name: '公海',
                    path: '/customer/customer-manage/public',
                },
                {
                    id: 'customer-customer-manage-dead',
                    name: '死海',
                    path: '/customer/customer-manage/dead',
                },
                {
                    id: 'customer-customer-manage-all',
                    name: '全部',
                    path: '/customer/customer-manage/all',
                }
            ],
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
            this.$router.push({
                path: tab.$attrs.path
            })
        }
    }
}
</script>

<style lang="scss">
.jr-customer-customer-manage {

}
</style>