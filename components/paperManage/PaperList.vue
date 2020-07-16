<template>
    <div class="jr-paperManage-paperList">
        <div class="paper" v-for="item in paperInfo" :key="item.paperId">
            <div class="paper-top">
                <div class="paper-top-title">
                    <span>{{item.paperName}}</span>
                </div>
                <div class="paper-top-set">
                    <span @click="baseSet(item)">基础设置</span>
                    <span @click="toPaperEdit">试卷编辑</span>
                    <span @click="downLoad(item.paperId)">试卷预览</span>
                    <!-- <nuxt-link :to="'/paperManage/paperPreview?' + item.paperId" target="_blank">
                        <span>试卷预览</span>
                    </nuxt-link> -->
                    <span @click="onPaperAnalyse(item)">试卷分析</span>
                    <span v-if="queryType === 'all'" @click="changeStatus(item)">{{item.status === 1 ? '启用' : '禁用'}}</span>
                    <span v-if="queryType === 'draft'" @click="deletePaper(item.paperId)">删除</span>
                    <span v-if="queryType === 'review'" @click="examinePaper(item.paperId)">审核通过</span>
                </div>
            </div>
            <p class="paper-middle">
                <span>分类：{{item.yearName}} > {{item.provinceName}}{{item.cityName}}{{item.districtName}} > {{item.gradeName}} > {{item.examTypeName}}</span>
            </p>
            <p class="paper-bottom">
                <span>试卷号：{{item.paperId}}</span>
                <span>浏览数：{{item.viewCount}}</span>
                <span>下载量：{{item.downloadCount}}</span>
            </p>
        </div>
        <!--分页-->
        <Pagination v-if="paperInfo.length > 0" v-model="pagesInfo" @change="pageChange"></Pagination>
        <!--编辑试卷基础信息-->
        <el-dialog
            title="试卷基础信息编辑"
            :visible.sync="baseSetForm.dialogVisible"
            width="50%"
            :close-on-click-modal="false">
            <div>
                <el-form ref="form" :model="baseSetForm" label-width="80px" size="mini" label-position="right">
                    <el-form-item label="学科">
                        <el-select class="choose" disabled v-model="baseSetForm.subjectId" placeholder="">
                            <el-option v-for="item in options.subjectList" :key="item.parameterId" :label="item.parameterValue" :value="item.parameterId"></el-option>
                        </el-select>
                        <el-select class="choose" v-model="baseSetForm.phaseId" filterable placeholder="">
                            <el-option v-for="item in options.phaseList" :key="item.parameterId" :label="item.parameterValue" :value="item.parameterId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年级">
                        <el-select class="choose" v-model="baseSetForm.gradeId" filterable placeholder="">
                            <el-option v-for="item in options.gradeList" :key="item.parameterId" :label="item.parameterValue" :value="item.parameterId"></el-option>
                        </el-select>
                        <el-select class="choose" v-model="baseSetForm.termId" filterable placeholder="">
                            <el-option v-for="item in options.termList" :key="item.parameterId" :label="item.parameterValue" :value="item.parameterId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select class="choose" v-model="baseSetForm.examTypeId" filterable placeholder="">
                            <el-option v-for="item in options.categoryList" :key="item.parameterId" :label="item.parameterValue" :value="item.parameterId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所在地">
                        <el-select class="choose" v-model="baseSetForm.provinceId" filterable placeholder="" @change="changeProvince">
                            <el-option v-for="item in options.provinceList" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                        </el-select>
                        <el-select class="choose" v-model="baseSetForm.cityId" filterable placeholder="" @change="changeCity">
                            <el-option v-for="item in options.cityList" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                        </el-select>
                        <el-select class="choose" v-model="baseSetForm.districtId" filterable placeholder="" @change="changeDistrict">
                            <el-option v-for="item in options.areaList" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学校">
                        <el-select class="select" v-model="baseSetForm.schoolId" filterable placeholder="">
                            <el-option v-for="item in options.schoolList" :key="item.schoolId" :label="item.schoolName" :value="item.schoolId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年份">
                        <el-radio-group v-model="baseSetForm.yearId">
                            <el-radio v-for="item in options.yearList" :key="item.parameterId" :label="item.parameterId">{{item.parameterValue}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="试卷名称">
                        <el-input class="select" v-model="baseSetForm.paperName" placeholder=""></el-input>
                    </el-form-item>
               </el-form>
            </div>
            <div slot="footer">
                <el-button size="mini" @click="baseSetForm.dialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="submitBaseSet">确 定</el-button>
            </div>
        </el-dialog>

        <!--试卷分析-->
        <el-dialog
          title="试卷分析"
          :visible.sync="paperAnalyse.dialogVisible"
          width="60%"
          :close-on-click-modal="false">
          <div class="paperAnalyse">
              <div class="table-left">
                  <el-table :data="paperAnalyse.knowledgeList" size="mini" border>
                      <el-table-column prop="knowledgeName" label="知识点"></el-table-column>
                      <el-table-column prop="question" label="涉及题目"></el-table-column>
                  </el-table>
              </div>
              <div class="table-right">
                  <el-table :data="paperAnalyse.abilityList" size="mini" border>
                      <el-table-column prop="abilityName" label="能力"></el-table-column>
                      <el-table-column prop="question" label="涉及题目"></el-table-column>
                  </el-table>
              </div>
          </div>
          <div slot="footer">
            <el-button @click="paperAnalyse.dialogVisible = false" size="mini">关闭</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
    import Title from '~/components/testBank/Title.vue'
    import paperapi from '@/config/module/paperManage';
    import Pagination from '~/components/testBank/Pagination.vue'

    export default {
        name: "paperList",
        components: {
            Title,
            Pagination
        },
        data() {
            return {
                paperInfo: [],
                // 基础设置
                baseSetForm: {
                    paperId: '',
                    subjectId: '',
                    phaseId: '',
                    gradeId: '',
                    termId: '',
                    examTypeId: '',
                    provinceId: '',
                    cityId: '',
                    districtId: '',
                    schoolId: '',
                    yearId: '',
                    paperName: '',
                    dialogVisible: false
                },

                // 试卷分析
                paperAnalyse: {
                    dialogVisible: false,
                    knowledgeList: [],
                    abilityList: []
                },

                options: {
                    subjectList: [],//学科
                    phaseList: [],//学段
                    gradeList: [],//年级
                    termList: [],//学期
                    provinceList: [],//省份
                    cityList: [],//城市
                    areaList: [],//区域
                    categoryList: [],//类别
                    yearList: [],//年份
                    schoolList: [],//学校
                },
                 // 分页信息
                pagesInfo: {
                    pageNum: 1,//页码
                    pageSize: 20,//页宽
                    totalNum: 0,//总条数
                },
            }
        },
        props: ['searchData', 'queryType'],
        created() {
        },
        mounted() {

        },
        destroyed() {
        },
        methods: {
            /**
             *@desc 查询试卷列表
             */
            searchPaperList() {
                const data = Object.assign(this.searchData, { pageNum: this.pagesInfo.pageNum, pageSize: this.pagesInfo.pageSize })
                switch (this.queryType) {
                  case 'all':
                      this.getPaperAll(data)
                      break;
                  case 'draft':
                      this.getPaperDraft()
                      break;
                  default:
                      this.getPaperReview(data)
                    break;
                }
            },
            /**
             *@desc 正式试卷列表查询
             */
            getPaperAll(data){
                paperapi.getPaperList(data).then(res => {
                    this.paperInfo = res.list
                    this.pagesInfo.pageNum = res.pageNum ? res.pageNum  : 1
                    this.pagesInfo.pageSize = res.pageSize ? res.pageSize  : 20
                    this.pagesInfo.totalNum = res.total ? res.total  : 0
                })
            },

            /**
             *@desc 草稿试卷列表查询
             */
            getPaperDraft(){
                paperapi.getDraftPaperList({ pageNum: this.pagesInfo.pageNum, pageSize: this.pagesInfo.pageSize }).then(res => {
                    this.paperInfo = res.list
                    this.pagesInfo.pageNum = res.pageNum ? res.pageNum  : 1
                    this.pagesInfo.pageSize = res.pageSize ? res.pageSize  : 20
                    this.pagesInfo.totalNum = res.total ? res.total  : 0
                })
            },

            /**
             *@desc 待审核试卷列表查询
             */
            getPaperReview(data){
                paperapi.getReviewedPaperList(data).then(res => {
                    this.paperInfo = res.list
                    this.pagesInfo.pageNum = res.pageNum ? res.pageNum  : 1
                    this.pagesInfo.pageSize = res.pageSize ? res.pageSize  : 20
                    this.pagesInfo.totalNum = res.total ? res.total  : 0
                })
            },
            /**
             *@desc 点击基础设置
             *@param item [Object] 单条时间的信息
             */
            async baseSet(item) {
                this.baseSetForm.dialogVisible = true
                this.baseSetForm.paperId = item.paperId;
                this.baseSetForm.subjectId = item.subjectId;
                this.baseSetForm.phaseId = item.phaseId;
                this.baseSetForm.gradeId = item.gradeId;
                this.baseSetForm.termId = item.termId;
                this.baseSetForm.examTypeId = item.examTypeId;
                this.baseSetForm.provinceId = item.provinceId;
                this.baseSetForm.cityId = item.cityId;
                this.baseSetForm.districtId = item.districtId;
                this.baseSetForm.schoolId = item.schoolId;
                this.baseSetForm.yearId = item.yearId;
                this.baseSetForm.paperName = item.paperName;
                this.options.subjectList = await paperapi.queryOptions({paramCode: 'subject'});
                this.options.phaseList = await paperapi.queryOptions({paramCode: 'phase'});
                this.options.gradeList = await paperapi.queryOptions({paramCode: 'grade'});
                this.options.termList = await paperapi.queryOptions({paramCode: 'term'});
                this.options.yearList = await paperapi.queryOptions({paramCode: 'year'});
                this.options.categoryList = await paperapi.queryOptions({paramCode: 'examType'});
                this.getProvinceList()
                this.getCity(item.provinceId);
                this.getArea(item.cityId);
                this.getSchool(item.provinceId, item.cityId, item.districtId)
            },

            /**
             *@desc 获取省份
             */
            getProvinceList() {
                paperapi.queryLocation({level: 1}).then(res => {
                    this.options.provinceList = res.length > 0 ? res : []
                })
            },

            /**
             *@desc 获取市
             */
            getCity(areaid) {
                paperapi.queryLocation({level: 2, parentId: areaid}).then(res => {
                    this.options.cityList = res.length > 0 ? res : []
                })
            },

            /**
             *@desc 获取区
             */
            getArea(areaid) {
                paperapi.queryLocation({level: 3, parentId: areaid}).then(res => {
                    this.options.areaList = res.length > 0 ? res : []
                })
            },

            /**
             *@desc 获取学校
             */
            getSchool(provinceId, cityId, districtId) {
                const data = {
                    provinceId: provinceId,
                    cityId: cityId,
                    districtId: districtId
                }
                paperapi.querySchool(data).then(res => {
                    this.options.schoolList = res.length > 0 ? res : []
                })
            },

            /**
             *@desc 修改省份
             */
            changeProvince() {
                this.options.cityList = [];
                this.options.areaList = [];
                this.options.schoolList = [];
                this.baseSetForm.cityId = '';
                this.baseSetForm.districtId = '';
                this.baseSetForm.schoolId = '';
                this.getCity(this.baseSetForm.provinceId)
            },

            /**
             *@desc 修改城市
             */
            changeCity() {
                this.options.areaList = [];
                this.options.schoolList = [];
                this.baseSetForm.districtId = '';
                this.baseSetForm.schoolId = '';
                this.getArea(this.baseSetForm.cityId)
            },

            /**
             *@desc 修改地区
             */
            changeDistrict() {
                this.options.schoolList = [];
                this.baseSetForm.schoolId = '';
                this.getSchool(this.baseSetForm.provinceId, this.baseSetForm.cityId, this.baseSetForm.districtId)
            },

            /**
            *@desc 基础设置提交
            */
            submitBaseSet() {
                const data = {
                    paperId: this.baseSetForm.paperId,
                    subjectId: this.baseSetForm.subjectId,
                    phaseId: this.baseSetForm.phaseId,
                    gradeId: this.baseSetForm.gradeId,
                    termId: this.baseSetForm.termId,
                    examTypeId: this.baseSetForm.examTypeId,
                    provinceId: this.baseSetForm.provinceId,
                    cityId: this.baseSetForm.cityId,
                    districtId: this.baseSetForm.districtId,
                    schoolId: this.baseSetForm.schoolId,
                    yearId: this.baseSetForm.yearId,
                    paperName: this.baseSetForm.paperName
                }
                paperapi.saveBasic(data).then(res => {
                    this.$message({
                        message: '试卷基础信息编辑成功',
                        type: 'success'
                    });
                    this.baseSetForm.dialogVisible = false
                })
            },

            /**
             *@desc 点击试卷分析
             *@param item [Object] 单条时间的信息
             */
            onPaperAnalyse(item) {
                this.paperAnalyse.dialogVisible = true;
                const data = {
                    testpaperId: item.paperId
                }
                paperapi.testpaperAnalyse(data).then(res => {
                    this.paperAnalyse.knowledgeList = res ? res.knowledgeList : []
                    this.paperAnalyse.abilityList = res ? res.abilityList : []
                })
            },

            /**
            *@desc 正式试卷禁用/启用
            */
            changeStatus(item) {
                const data = {
                    testpaperId: item.paperId,
                    status: item.status === 1 ? -1 : 1
                }
                paperapi.testpaperStatus(data).then(res => {
                    this.searchPaperList()
                })
            },

            /**
            *@desc 草稿试卷删除
            */
            deletePaper(paperId) {
                paperapi.deleteDraft({ testpaperId: paperId }).then(res => {
                    this.searchPaperList()
                })
            },

            /**
            *@desc 待审核试卷审核通过
            */
            examinePaper(paperId) {
                paperapi.passExamine({ testpaperId: paperId }).then(res => {
                    this.searchPaperList()
                })
            },

            /**
            *@desc 下载试卷
            */
            downLoad(paperId) {
                this.$r.go('1-6', { paperId: paperId })
                // paperapi.downLoadPaper({ testpaperId: paperId }).then(res => {
                //     // this.searchPaperList()
                // })
            },

            /**
            *@desc 分页操作
            */
            pageChange(val) {
                this.pagesInfo.pageNum = val.pageNum
                this.pagesInfo.pageSize = val.pageSize
                this.searchPaperList()
            },

            /**
            *@desc 分页操作
            */
            clearPaperList() {
                this.paperInfo = []
            },

            toPaperEdit() {
                this.$r.go('1-5')
            },
        }
    }
</script>

<style lang="scss" scoped>
    .jr-paperManage-paperList {
        width: 100%;
        margin-top: 42px;
        box-sizing: border-box;
        padding-right: 18px;
        .paper {
            height: 104px;
            box-sizing: border-box;
            padding: 13px 17px;
            .paper-top {
                height: 26px;
                line-height: 26px;
                margin: 0;
                .paper-top-title {
                    height: 26px;
                    float: left;
                    span  {
                        line-height: 26px;
                        font-weight: bold;
                    }
                }
                .paper-top-set {
                    float: right;
                    span {
                        line-height: 26px;
                        color: #4186EE;
                        margin-left: 20px;
                        cursor: pointer;
                    }
                }
            }
            p {
                height: 26px;
                line-height: 26px;
                margin: 0;
            }
            .paper-bottom {
                span {
                    margin-right: 10px;
                }
            }
        }
        .paper:nth-child(2n+1) {
            background: #F5F5F5;
        }

        /deep/ .el-dialog__title {
            font-size: 14px;
        }
        /deep/ .el-form-item__label {
            font-size: 12px;
        }
        .choose {
            width: 30%;
            margin-right: 10px;
        }
        .select {
            width: 50%;
        }
        .el-radio {
            display: inline-block;
            height: 28px;
        }
        .paperAnalyse {
            width: 100%;
            overflow: hidden;
            .table-left {
                width: 48%;
                float: left;
            }
            .table-right {
                width: 48%;
                float: right;
            }
        }
    }
</style>
