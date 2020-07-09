<template>
    <div class="jr-topMenu">
        <div class="jr-topMenu_item"
             v-for="mItem in menuInfo.list"
             :key="mItem.code"
             :class="menuInfo.active===mItem.code?'active':''"
             @click.stop="linkTo(mItem,0)"
        >
            <span class="jr-topMenu_txt">{{mItem.name}}</span>
            <span class="jr-topMenu_icon el-icon-circle-close"
                  v-if="menuInfo.list.length>1"
                  @click.stop="linkTo(mItem,1)"
            ></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TopMenu",
        data() {
            return {}
        },
        computed: {
            menuInfo() {
                let menuInfo = this.$store.getters['menuInfo/getMenuInfo'];
                let menuList = [];

                menuInfo.list.forEach(item => {
                    item.child.forEach(list => {
                        if (list.isTopMenu) {
                            menuList.push(list)
                        }
                    })
                });

                return {
                    active: menuInfo.active,
                    list: menuList
                }
            },
        },
        methods: {
            /**
             *@desc 跳转页面
             *@param obj [Object] 路由信息
             *@param type [Number] 0:跳转 ，1删除
             *@return promise [promise] 刷新成功后页面数据
             */
            linkTo(obj, type) {
                this.$r.go(obj.code, obj.query, type);
            }
        }
    }
</script>

<style lang="scss">
    .jr-topMenu {
        padding: 0 20px 10px;
        display: flex;
        overflow-x: scroll;

        .jr-topMenu_item {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 22px;
            padding: 0 13px;
            background-color: #f1f1f1;
            font-size: 12px;
            color: #999;
            cursor: pointer;
            margin-right: 12px;
            border-radius: 11px;

            &.active {
                color: #4892F2;
                background-color: #DFEDFF;
            }

            .jr-topMenu_txt {
                white-space: nowrap;
            }

            .jr-topMenu_icon {
                margin-left: 12px;
                font-size: 15px;

                &:hover {
                    opacity: 0.5;
                }
            }
        }

    }
</style>
