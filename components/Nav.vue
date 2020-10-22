<template>
    <!--头部导航栏-->
    <div class="jr-nav">
        <el-tag size="small" class="jr-nav_tag"
                v-for="item in topMenu"
                :key="item.name"
                type="info"
                :closable="topMenu.length>1">
            {{ item.title }}
        </el-tag>
    </div>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            topMenu: [{//顶部菜单信息
                name: '123',
                title: '页面'
            }],
        }
    },
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