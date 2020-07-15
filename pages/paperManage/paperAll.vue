<template>
    <el-main class="jr-paperManage-paperAll">
        <Title>全部试卷</Title>
        <PaperSelect ref="paperSelect" :showphase="false"></PaperSelect>
        <div class="paper-all-search">
            <el-row :gutter="18">
              <el-col :span="5">
                <el-input v-model="paperName" placeholder="" size="mini" style="width:202px;"></el-input>
              </el-col>
              <el-button class="search" type="primary" size="mini" @click="searchPaperList">搜索</el-button>
            </el-row>
        </div>
        <PaperList :paperInfo="paperInfo"></PaperList>
        <!--分页-->
        <Pagination v-if="paperInfo.list.length > 0" v-model="pagesInfo" @change="pageChange"></Pagination>
    </el-main>
</template>

<script>
    import Title from '~/components/testBank/Title.vue'
    import PaperSelect from '@/components/paperManage/PaperSelect.vue'
    import PaperList from '~/components/paperManage/PaperList.vue'
    import paperapi from '@/config/module/paperManage'
    import Pagination from '~/components/testBank/Pagination.vue'

    export default {
        name: "paperAll",
        components: {
            Title,
            PaperSelect,
            PaperList,
            Pagination
        },
        data() {
            return {
                paperName: '',//试卷编号
                // 分页信息
                pagesInfo: {
                    pageNum: 1,//页码
                    pageSize: 20,//页宽
                    totalNum: 0,//总条数
                },
                paperInfo: {
                    list: []
                }
            }
        },
        created() {
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
            searchPaperList() {
                const isCheckOut = this.$refs.paperSelect.checkForm()
                const paramMap = this.$refs.paperSelect.paramMap
                // if(isCheckOut) {
                    const data = {
                        paperName: paramMap.paperName,
                        subjectId: paramMap.subjectId,
                        gradeId: paramMap.gradeId,
                        termId: paramMap.termId,
                        provinceId: paramMap.provinceId,
                        cityId: paramMap.cityId,
                        cityId: paramMap.cityId,
                        examTypeId: this.examTypeId,
                        yearId: paramMap.yearId,
                        schoolId: paramMap.schoolId,
                        pageNum: this.pagesInfo.pageNum,
                        pageSize: this.pagesInfo.pageSize,
                    }
                    paperapi.getPaperList(data).then(res => {
                        this.paperInfo.list = res.list
                        this.pagesInfo.pageNum = res.pageNum ? res.pageNum  : 1
                        this.pagesInfo.pageSize = res.pageSize ? res.pageSize  : 20
                        this.pagesInfo.totalNum = res.total ? res.total  : 0
                    })
                // } else {
                //     console.log(222)
                // }
            },
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
    .paper-all-search {
        margin-left: 70px;
        .search {
            margin-left: 11px;
        }
    }
</style>
