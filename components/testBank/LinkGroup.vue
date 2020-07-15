<template>
    <!--列表-->
    <div class="jr-link-group">
        <el-link
            v-if="options.length>0"
            class="jr-link"
            v-for="item in options"
            :key="item.parameterId"
            :underline="false"
            :type="item.parameterId===model?'primary':''"
            :disabled="disabled"
            @click="handleClick(item)">
            {{item.parameterValue}}
        </el-link>
        <span v-if="options.length===0" class="color-gray">暂无数据</span>
    </div>
</template>

<script>
    export default {
        name: "LinkGroup",
        data() {
            return {}
        },
        //数据双向绑定
        model: {
            prop: 'model',
            event: 'update'
        },
        props: {
            model: {//绑定值，默认空
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            options: {
                type: Array,
                default: []
            }
        },
        methods: {
            handleClick(obj) {
                this.$emit('update', obj.parameterId);
                this.$emit('change', obj.parameterId);
            }
        }
    }
</script>

<style lang="scss">
    .jr-link-group {
        .jr-link {
            margin-right: 18px;
        }

        .color-gray {
            color: #9F9F9F;
        }

        .el-link.is-disabled {
            color: #9F9F9F;
        }
    }
</style>