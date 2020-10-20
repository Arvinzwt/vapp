<template>
    <!--分页-->
    <div class="jr-pagination">
        <el-pagination
                @current-change="onCurrentPagesChange"
                @size-change="onPagesSizeChange"
                background
                :page-size="pagesInfo.pageSize"
                :current-page="pagesInfo.pageIndex"
                :page-sizes="pagesInfo.pageSizes"
                :layout="pagesInfo.layout"
                :total="pagesInfo.count">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    data() {
        return {
            // 分页信息默认值
            pagesMsg: {
                pageIndex: 1,//页码
                pageSize: 20,//页宽
                count: 0,//总条数
                pageSizes: [20, 40, 60, 80],//翻页信息
                layout: "total,sizes, prev, pager, next, jumper"
            }
        }
    },
    computed: {
        pagesInfo() {
            return Object.assign(this.pagesMsg, this.model)
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
            default() {
                return {}
            }
        },
    },
    methods: {
        /**
         *@desc 分页模块翻页时触发
         *@param val [Number] 翻页后的页数
         */
        onCurrentPagesChange(val) {
            let target = Object.assign(this.pagesInfo, {
                pageIndex: val
            });
            this.$emit('update', target);//更新数据
            this.$emit('change', target);//触发change
        },

        /**
         *@desc 分页模块跳页时触发时触发
         *@param val [Number] 跳页后的页数
         */
        onPagesSizeChange(val) {
            let target = Object.assign(this.pagesInfo, {
                pageSize: val
            });
            this.$emit('update', target);//更新数据
            this.$emit('change', target);//触发change
        },
    }
}
</script>

<style lang="scss">
.jr-pagination {
    text-align: right;
    padding: 20px 0;
}
</style>
