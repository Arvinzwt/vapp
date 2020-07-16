<template>
    <el-main class="jr-paperManage-paperAll">
        <Title>全部试卷</Title>
        <PaperSelect ref="paperSelect" :showphase="false"></PaperSelect>
        <div class="paper-all-search">
            <el-row :gutter="18">
                <el-col :span="5">
                    <el-input v-model="paperName" clearable placeholder="" size="mini" style="width:202px;"></el-input>
                </el-col>
                <el-button class="search" type="primary" size="mini" @click="searchPaper">搜索</el-button>
            </el-row>
        </div>
        <PaperList ref="paperList" :searchData="searchData" :queryType="queryType"></PaperList>
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
                queryType: 'all',//查询试卷列表的类型（正式：all， 草稿：draft，待审核：review）
                // 分页信息
                pagesInfo: {
                    pageNum: 1,//页码
                    pageSize: 20,//页宽
                    totalNum: 0,//总条数
                },
                searchData: {
                    paperName: '',
                    subjectId: '',
                    gradeId: '',
                    termId: '',
                    provinceId: '',
                    cityId: '',
                    districtId: '',
                    examTypeId: '',
                    yearId: '',
                    schoolId: '',
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
            /**
            *@desc 搜索试卷
            */
            searchPaper() {
                const paramMap = this.$refs.paperSelect.paramMap
                this.searchData.paperName = this.paperName
                this.searchData.subjectId = paramMap.subjectId
                this.searchData.gradeId = paramMap.gradeId
                this.searchData.termId = paramMap.termId
                this.searchData.provinceId = paramMap.provinceId
                this.searchData.cityId = paramMap.cityId
                this.searchData.districtId = paramMap.districtId
                this.searchData.examTypeId = paramMap.examTypeId
                this.searchData.yearId = paramMap.yearId
                this.searchData.schoolId = paramMap.schoolId
                if(this.paperName) {
                    this.$refs.paperList.searchPaperList()
                } else {
                    this.$refs.paperList.clearPaperList()
                    const isCheckOut = this.$refs.paperSelect.checkForm()
                    if(isCheckOut) {
                        this.$refs.paperList.searchPaperList()
                    }
                }
            },
            toLinkImport() {
                this.$r.go('1-4')
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
