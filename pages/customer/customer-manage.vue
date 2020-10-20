<template>
    <!--线索客户管理-->
    <el-main class="jr-customer-customer-manage">
        <!--tab切换-->
        <div class="jr-tabs">
            <div class="jr-tabs-main">
                <div class="jr-tabs-item" v-for="item in tabs" :key="item.id"
                     :class="item.path===$route.path?'active':''"
                     @click="tabsClick(item)">
                    <span>{{ item.name }}</span>
                    <span v-if="item.num" class="jr-badge">{{ item.num }}</span>
                </div>
            </div>
            <div class="jr-tabs-active"></div>
        </div>

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
                    id: 'first',
                    name: '新海（待分配）',
                    num: 6,
                    path: '/customer/customer-manage',
                },
                {
                    id: 'second',
                    name: '公海',
                    path: '/customer/customer-manage/second',
                },
                {
                    id: 'third',
                    name: '死海',
                    path: '/customer/customer-manage/third',
                },
                {
                    id: 'fourth',
                    name: '全部',
                    path: '/customer/customer-manage/fourth',
                }
            ]
        }
    },
    methods: {
        tabsClick(e) {
            this.$router.push({
                path: e.path
            })
        }
    }
}
</script>

<style lang="scss">
.jr-customer-customer-manage {
    .main {
        margin: 0;
        padding: 0;
        margin-top: 20px;
    }
    .el-col{
        border: 1px solid transparent;
    }
}
</style>