<template>
    <el-form
        class="jr-filter-form"
        size="mini"
        label-width="70px"
        label-position="left"
        :rules="rules"
        :model="paramMap"
        ref="rulesForm">
        <el-form-item label="学科" prop="subjectId">
            <linkGroup class="subjectId" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
        </el-form-item>
        <el-form-item v-if="showphase" label="学段" prop="phaseId">
            <linkGroup class="phaseId" v-model="paramMap.phaseId" :options="options.phaseList"></linkGroup>
        </el-form-item>
        <el-form-item label="年级" prop="gradeId">
            <linkGroup class="gradeId" v-model="paramMap.gradeId" :options="options.gradeList"></linkGroup>
        </el-form-item>
        <el-form-item label="学期" prop="termId">
            <linkGroup class="termId" v-model="paramMap.termId" :options="options.termList"></linkGroup>
        </el-form-item>
        <el-form-item label="省份" prop="provinceId">
            <linkGroup class="provinceId" v-model="paramMap.provinceId" :options="options.provinceList" @change="getCity"></linkGroup>
        </el-form-item>
        <el-form-item label="城市" prop="cityId">
            <linkGroup v-if="showcity" class="cityId" v-model="paramMap.cityId" :options="options.cityList" @change="getArea"></linkGroup>
        </el-form-item>
        <el-form-item label="区域" prop="districtId">
            <linkGroup v-if="showarea" class="areaId" v-model="paramMap.districtId" :options="options.areaList" @change="getSchool"></linkGroup>
        </el-form-item>
        <el-form-item label="类型" prop="examTypeId">
            <linkGroup class="typeId" v-model="paramMap.examTypeId" :options="options.categoryList"></linkGroup>
        </el-form-item>
        <el-form-item label="年份" prop="yearId">
            <linkGroup class="yearId" v-model="paramMap.yearId" :options="options.yearList"></linkGroup>
        </el-form-item>
        <el-form-item label="学校">
            <el-select clearable v-model="paramMap.schoolId" filterable placeholder="请选择" style="width:202px;">
                <el-option v-for="item in options.schoolList" :key="item.schoolId"
                            :label="item.schoolName" :value="item.schoolId"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
    import linkGroup from '@/components/testBank/LinkGroup.vue';
    import paperapi from '@/config/module/paperManage';

    export default {
        name: "paperSelect",
        components: {
            linkGroup
        },
        data() {
            return {
                paramMap: {
                    subjectId: '',
                    phaseId: undefined,
                    gradeId: '',
                    termId: '',
                    provinceId: '',
                    cityId: '',
                    districtId: '',
                    examTypeId: '',
                    yearId: '',
                    schoolId: '',
                },

                //字典列表
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

                showcity: false,//是否显示城市列表
                showarea: false,//是否显示区域列表

                //验证规则
                rules: {
                    subjectId: {
                        required: true,
                        message: '请选择学科'
                    },
                    phaseId: {
                        required: true,
                        message: '请选择学段'
                    },
                    gradeId: {
                        required: true,
                        message: '请选择年级'
                    },
                    termId: {
                        required: true,
                        message: '请选择学期'
                    },
                    provinceId: {
                        required: true,
                        message: '请选择省份'
                    },
                    cityId: {
                        required: true,
                        message: '请选择城市'
                    },
                    districtId: {
                        required: true,
                        message: '请选择区域'
                    },
                    examTypeId: {
                        required: true,
                        message: '请选择类型'
                    },
                    yearId: {
                        required: true,
                        message: '请选择年份'
                    }
                },
            }
        },
        props: ['showphase'],
        async created() {
            this.options.subjectList = await paperapi.queryOptions({paramCode: 'subject'});
            this.options.phaseList = await paperapi.queryOptions({paramCode: 'phase'});
            this.options.gradeList = await paperapi.queryOptions({paramCode: 'grade'});
            this.options.termList = await paperapi.queryOptions({paramCode: 'term'});
            this.options.yearList = await paperapi.queryOptions({paramCode: 'year'});
            this.options.categoryList = await paperapi.queryOptions({paramCode: 'examType'});
            this.getProvinceList()
        },
        mounted() {

        },
        destroyed() {
        },
        methods: {
            /**
             *@desc 获取省份
             */
            getProvinceList() {
                this.options.provinceList = []
                paperapi.queryLocation({level: 1}).then(res => {
                    if(res.length > 0) {
                        res.forEach(item => {
                            this.options.provinceList.push({
                                parameterCode: "Province",
                                parameterId: item.areaId,
                                parameterName: item.areaName,
                                parameterStatus: item.areaLevel,
                                parameterValue: item.areaName,
                            })
                        })
                    }
                })
            },

             /**
             *@desc 获取城市
             */
            getCity(val) {
                this.options.cityList = []
                this.options.areaList = []
                this.options.schoolList = []
                this.paramMap.schoolId = ''
                this.showcity = true
                this.showarea = false
                paperapi.queryLocation({level: 2, parentId: val}).then(res => {
                    if(res.length > 0) {
                        res.forEach(item => {
                            this.options.cityList.push({
                                parameterCode: "City",
                                parameterId: item.areaId,
                                parameterName: item.areaName,
                                parameterStatus: item.status,
                                parameterValue: item.areaName,
                            })
                        })
                    }
                })
            },

             /**
             *@desc 获取区域
             */
            getArea(val) {
                this.options.areaList = []
                this.options.schoolList = []
                this.paramMap.schoolId = ''
                this.showarea = true
                paperapi.queryLocation({level: 3, parentId: val}).then(res => {
                    if(res.length > 0) {
                        res.forEach(item => {
                            this.options.areaList.push({
                                parameterCode: "Area",
                                parameterId: item.areaId,
                                parameterName: item.areaName,
                                parameterStatus: item.status,
                                parameterValue: item.areaName,
                            })
                        })
                    }
                })
            },

             /**
             *@desc 获取学校
             */
            getSchool() {
                this.options.schoolList = []
                const data = {
                    provinceId: this.paramMap.provinceId,
                    cityId: this.paramMap.cityId,
                    districtId: this.paramMap.districtId
                }
                paperapi.querySchool(data).then(res => {
                    if(res.length > 0) {
                        res.forEach(item => {
                            this.options.schoolList.push(item)
                        })
                    }
                })
            },

             /**
             *@desc 表单校验
             */
            checkForm() {
                let isCheckOut = false;
                this.$refs['rulesForm'].validate((valid) => {
                    if(valid) {
                        isCheckOut = true
                    } else {
                        isCheckOut = false
                    }
                })
                return isCheckOut
            }
        },
        watch: {
            paramMap: {
                handler: function(val,oldval) {
                    for(let item in val){
                        if(val[item]) {
                            this.$refs.rulesForm.clearValidate([item])
                        }
                    }
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/testBank.scss";
</style>
