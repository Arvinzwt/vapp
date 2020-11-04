<template>
    <!--线索客户管理-->
    <el-main class="jr-page jr-customer-customer-manage">
        <!--tab切换-->
        <div class="jr-page-header">
            <el-tabs :value="$route.name" @tab-click="tabsClick">
                <el-tab-pane v-for="item in tabs" :key="item.id" :name="item.id" :path="item.path">
                    <div slot="label">
                        <span>{{ item.name }}</span>
                        <i v-if="seaNum>0&&item.id==='customer-customer-manage'" class="jr-badge">{{ seaNum }}</i>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--内容-->
        <nuxt-child v-model="seaNum" class="jr-page-body"/>
    </el-main>
</template>

<script>
export default {
    data() {
        return {
            seaNum: 0,//新海消息数

            // tab切换信息
            tabs: [
                {
                    id: 'customer-customer-manage',
                    name: '新海（待分配）',
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