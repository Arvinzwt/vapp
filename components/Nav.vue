<template>
    <!--头部导航栏-->
    <div class="jr-nav">
        <el-tag size="small" class="jr-nav_tag"
                v-for="item in topMenu"
                :key="item.name"
                :type="item.name===$route.name?'':'info'"
                :closable="topMenu.length>1"
                @click="tagClick(item)"
                @close="tagClose(item)">
            {{ item.title }}
        </el-tag>
    </div>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            menu: [],//菜单信息
            topMenu: [],//顶部菜单信息
        }
    },
    watch: {
        // 监听路由变化并存储下来
        async "$route"(to, form) {
            this.saveTopMenu(to).then(res => {//存储变化的路由
                this.getTopMenu();//重新刷新topMenu数据
            });
        }
    },
    mounted() {
        this.$api.common.getMenu().then(menu => {//拉取菜单信息
            this.menu = menu;
            this.getTopMenu();//计算topMenu
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
        async getTopMenu() {
            let tm = this.getLocalStorageTm();

            this.topMenu = [];
            this.menu.forEach(item => {
                item.child.forEach(list => {
                    tm.forEach(tmItem => {
                        if (tmItem.name === list.name) {
                            this.topMenu.push({
                                ...list,
                                query: tmItem.query
                            })
                        }
                    })
                })
            })
            return tm;
        },

        /**
         *@desc 路由发生变化时，存储路由信息
         */
        async saveTopMenu(to) {
            let tm = this.getLocalStorageTm();
            let target = tm.find(item => {
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
            return tm;
        },

        /**
         *@desc 删除路由时，更新路由信息
         */
        async deleteTopMenu(obj) {
            let tm = this.getLocalStorageTm();
            tm.forEach((item, index) => {
                if (item.name === obj.name) {
                    tm.splice(index, 1);
                    localStorage.setItem('tm', JSON.stringify(tm));
                    return false
                }
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
            if (this.topMenu.length > 1) {
                this.deleteTopMenu(obj).then(res => {
                    return this.getTopMenu();//刷新topMenu
                }).then(res => {
                    if (obj.name === this.$route.name) {//如果删除的是当前路由
                        let target = this.$utils.underscore.last(this.topMenu);//找到最后一个
                        this.$router.push({//跳转
                            path: target.path,
                            query: target.query,
                        })
                    }
                });
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