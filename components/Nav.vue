<template>
    <!--头部导航栏-->
    <div class="jr-nav">
        <el-tag size="small" class="jr-nav_tag"
                v-for="item in topMenu"
                :key="item.name"
                :type="isActive(item)"
                :closable="topMenu.length>1"
                @click="tagClick(item)"
                @close="tagClose(item)">
            {{ item.title }}
        </el-tag>
    </div>
</template>

<script>
export default {
    data() {
        return {
            topMenu: [],//顶部菜单信息
            asideMenu: [],//菜单信息
        }
    },
    computed: {
        isActive() {
            return mList => {
                return this.$route.name === mList.name || mList.child.includes(this.$route.name) ? '' : 'info'
            }
        }
    },
    watch: {
        // 监听路由变化并存储下来
        async "$route"(to, form) {
            let tm = this.getLocalStorageTm();//local存储的路由信息
            let target = tm.find(item => {//找到当前操作的页面在历史存储中的对象
                return item.name === to.name;
            })

            if (!target) {//如果没有该路由，加入
                tm.push({
                    name: to.name,
                    query: to.query,
                });
                localStorage.setItem('tm', JSON.stringify(tm));//本地存储
            } else {//更新query信息
                target.query = to.query;
                localStorage.setItem('tm', JSON.stringify(tm));//本地存储
            }

            this.resetTopMenu();//重新刷新topMenu数据
        }
    },
    mounted() {
        this.$api.common.getMenu().then(menu => {//拉取菜单信息
            this.asideMenu = menu;
            this.resetTopMenu();//重新刷新topMenu数据
        });
    },
    methods: {
        /**
         *@desc 拉取本地存储的topMenu信息
         */
        getLocalStorageTm() {
            return localStorage.getItem('tm') ? JSON.parse(localStorage.getItem('tm')) : [{
                name: 'customer-customer-manage',
                query: {}
            }];
        },

        /**
         *@desc 将本地存储的topMenu转换为数据对象
         */
        async resetTopMenu() {
            let tm = this.getLocalStorageTm();//local存储的路由信息
            this.topMenu = [];//清空topMenu
            tm.forEach(tmItem => {//循环历史记录
                this.asideMenu.forEach(mItem => {//循环菜单第一层
                    mItem.child = mItem.child || [];
                    mItem.child.forEach(mList => {//循环菜单第二层
                        if (mList.name === tmItem.name) {
                            this.topMenu.push({
                                ...mList,
                                query: tmItem.query
                            })
                        }
                    })
                })
            })
            return tm;
        },

        /**
         *@desc topMenu点击
         */
        tagClick(obj) {
            this.$router.push({
                path: obj.path,
                query: obj.query,
            })
        },

        /**
         *@desc topMenu关闭
         */
        tagClose(obj) {
            if (this.topMenu.length > 1) {//保证至少有一个topmenu
                let tm = this.getLocalStorageTm();//本地存储信息

                tm.forEach((item, index) => {//找到操作对象
                    if (item.name === obj.name) {
                        tm.splice(index, 1);//删除
                    }
                })

                localStorage.setItem('tm', JSON.stringify(tm));//重置本地存储

                this.resetTopMenu().then(res => {//重置topmenu数据
                    if (obj.name === this.$route.name) {//如果删除的是当前路由
                        let target = this.$utils.underscore.last(this.topMenu);//找到最后一个
                        this.$router.push({//跳转
                            path: target.path,
                            query: target.query,
                        })
                    }
                })
            }
        },
    }
}
</script>

<style lang="scss">
.jr-nav {
    background-color: #fff;
    padding: 0 20px;

    .jr-nav_tag {
        margin-right: 15px;
        margin-bottom: 15px;
        cursor: pointer;
    }
}
</style>