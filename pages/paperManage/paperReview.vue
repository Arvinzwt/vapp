<template>
    <el-main class="jr-paperManage-paperReview">
        <Title>待审核试卷库</Title>
        <PaperSelect ref="paperSelect" :showphase="false"></PaperSelect>
        <div class="paper-review-search">
            <el-row :gutter="18">
                <el-col :span="5">
                    <el-input v-model="paperName" placeholder="" size="mini" style="width:202px;"></el-input>
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
                paperName: '',//试卷编号
                queryType: 'review',//查询试卷列表的类型（正式：all， 草稿：draft，待审核：review
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
            *@desc 搜索待审核试卷
            */
            searchPaper() {
                const isCheckOut = this.$refs.paperSelect.checkForm()
                const paramMap = this.$refs.paperSelect.paramMap
                if(isCheckOut) {
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
                    this.$refs.paperList.searchPaperList()
                } else {
                    console.log(222)
                }
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
    .paper-review-search {
        margin-left: 70px;
        .search {
            margin-left: 11px;
        }
    }
</style>
