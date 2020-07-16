<template>
    <!--分页-->
    <div class="jr-pagination-wrapper">
        <el-pagination
            @current-change="onCurrentPagesChange"
            @size-change="onPagesSizeChange"
            background
            :page-size="model.pageSize"
            :current-page="model.pageNum"
            :page-sizes="[20, 40, 60,80, 100]"
            layout="total,sizes, prev, pager, next, jumper"
            :total="model.totalNum">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        data() {
            return {
                // 分页信息
                // pagesInfo: {
                //     pageNum: 1,//页码
                //     pageSize: 0,//总条数
                // }
            }
        },
        //数据双向绑定
        model: {
            prop: 'model',
            event: 'update'
        },
        props: {
            model: {//绑定值，默认空
                type: Object,
                default: {
                    pageNum: 1,//页码
                    pageSize: 1,//页宽
                    totalNum: 0,//总条数
                }
            },
        },
        methods: {
            /**
             *@desc 分页模块翻页时触发
             *@param val [Number] 翻页后的页数
             */
            onCurrentPagesChange(val) {
                let target = {
                    ...this.model,
                    pageNum: val
                };
                this.$emit('update', target);
                this.$emit('change', target);
            },
            /**
             *@desc 分页模块跳页时触发时触发
             *@param val [Number] 跳页后的页数
             */
            onPagesSizeChange(val) {
                let target = {
                    ...this.model,
                    pageSize: val
                };
                this.$emit('update', target);
                this.$emit('change', target);
            },

        }
    }
</script>

<style lang="scss">
    //分页
    .jr-pagination-wrapper {
        display: flex;
        justify-content: flex-end;
    }
</style>