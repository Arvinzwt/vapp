<template>
    <div class="jr-topMenu">
        <div class="jr-topMenu_item">
            <span class="jr-topMenu_txt">订单管理</span>
            <span class="jr-topMenu_icon el-icon-circle-close"></span>
        </div>
        <div class="jr-topMenu_item active">
            <span class="jr-topMenu_txt">退费管理</span>
            <span class="jr-topMenu_icon el-icon-circle-close"></span>
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

        },
        methods: {

        },
    }
</script>

<style lang="scss">
    .jr-topMenu {
        padding: 0 20px 10px;
        display: flex;

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
