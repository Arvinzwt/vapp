<template>
    <el-main class="jr-paperManage-paperReview">
        <Title>待审核试卷库</Title>
        <PaperSelect></PaperSelect>
        <div class="paper-review-search">
            <el-row :gutter="18">
              <el-col :span="5">
                <el-input v-model="aa" placeholder="" size="mini" style="width:202px;"></el-input>
              </el-col>
              <el-button class="search" type="primary" size="mini">搜索</el-button>
            </el-row>
        </div>
        <PaperList></PaperList>
        <!--分页-->
        <Pagination v-model="pagesInfo" @change="pageChange"></Pagination>
    </el-main>
</template>

<script>
    import Title from '~/components/testBank/Title.vue'
    import PaperSelect from '@/components/paperManage/PaperSelect.vue'
    import PaperList from '~/components/paperManage/PaperList.vue'
    import Pagination from '~/components/testBank/Pagination.vue'

    export default {
        name: "paperReview",
        components: {
            Title,
            PaperSelect,
            PaperList,
            Pagination
        },
        data() {
            return {
                aa: '',
                // 分页信息
                pagesInfo: {
                    pageNum: 1,//页码
                    pageSize: 1,//页宽
                    totalNum: 0,//总条数
                },
            }
        },
        created() {
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
            toLinkImport() {
                this.$r.go('1-4')
            },

            pageChange(val) {
                console.log(val)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .paper-review-search {
        margin-left: 70px;
        .search {
            margin-left: 11px;
        }
    }
</style>
