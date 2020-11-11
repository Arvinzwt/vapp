<template>
    <!--推荐审核-->
    <el-main class="jr-customer-recommend-check">
        <!--标题-->
        <h3 class="jr-title">推荐审核</h3>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
            <el-row :gutter="15">
                <!--姓名-->
                <el-col :span="6">
                    <el-form-item label="姓名">
                        <el-input v-model="paramMap.name" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
                <!--状态-->
                <el-col :span="6">
                    <el-form-item label="状态">
                        <el-select v-model="paramMap.ifok" placeholder="请选择">
                            <el-option
                                    v-for="item in dic.checkStatus"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--学习中心-->
                <el-col :span="6">
                    <el-form-item label="学习中心">
                        <el-cascader
                                v-model="paramMap.deptId"
                                :options="dic.hrcodedepts"
                                :props="$utils.leaningCenterProps"
                                :show-all-levels="false"
                                collapse-tags
                                placeholder="请选择"
                                filterable
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <!--推荐者-->
                <el-col :span="6">
                    <el-form-item label="推荐者">
                        <el-input v-model="paramMap.tjzhe" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <!--年级-->
                <el-col :span="6">
                    <el-form-item label="年级" v-show="paramMap.show">
                        <el-select v-model="paramMap.grade" placeholder="请选择"
                                   clearable>
                            <el-option
                                    v-for="item in dic.grades"
                                    :key="item.dicCode"
                                    :label="item.name"
                                    :value="item.dicCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--就读学校-->
                <el-col :span="6">
                    <el-form-item label="就读学校" v-show="paramMap.show">
                        <el-input v-model="paramMap.school" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
                <!--登记时间-->
                <el-col :span="6">
                    <el-form-item label="登记时间" v-show="paramMap.show">
                        <el-date-picker
                                v-model="paramMap.time"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']"
                                :picker-options="$utils.pickerOptions"
                                clearable>
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label-width="0" class="text-right">
                        <el-button @click="submitSearch" type="primary">查询</el-button>
                        <el-button @click="resetSearch">重置</el-button>
                        <el-link type="primary" class="ml-4" @click="paramMap.show=!paramMap.show">
                            <span v-show="!paramMap.show">展开</span>
                            <span v-show="paramMap.show">收起</span>
                        </el-link>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <!--列表-有数据-->
        <div v-if="tableData.length>0">
            <!--列表-->
            <el-table v-if="tableData.length>0" class="jr-table" ref="filterTable" :data="tableData" size="mini">
                <el-table-column fixed width="95px" label="姓名" prop="truename"/>
                <el-table-column min-width="100px" label="学习中心" prop="dname"/>
                <el-table-column label="年级" prop="grade" :sortable="false"/>
                <el-table-column label="就读学校" prop="school"/>
                <el-table-column label="联系人身份" prop="relation"/>
                <el-table-column label="联系人姓名" prop="contact"/>
                <el-table-column label="联系人电话" prop="tel">
                    <template slot-scope="scope">
                        <span class="">{{ $utils.desensitizationPhone(scope.row.tel) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="登记人" prop="creator"/>
                <el-table-column label="登记时间" prop="createdate"/>
                <el-table-column label="审核状态" prop="ifok_desc"/>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-link v-if="scope.row.ifok===0" type="primary" @click="modifyCustomer(scope.row)">修改
                        </el-link>
                        <el-link v-if="scope.row.ifok===0" type="primary" @click="checkCustomer(scope.row)">审核</el-link>
                        <el-link type="primary" @click="viewCustomer(scope.row)">查看</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页信息-->
            <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
        </div>
        <!--列表-没有数据-->
        <div class="jr-table-placeholder" v-if="tableData.length===0">
            <img src="/images/placeholder.png" alt="placeholder">
            <span>暂无数据</span>
        </div>
        <!-- 弹窗 -->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" :append-to-body="true"
                   :title="dialog.title" custom-class="jr-dialog" width="800px" class="jr-customer-recommend-check">
            <!--弹窗内容-->
            <el-form class="jr-form" size="mini" :model="dialog.form" :rules="dialog.rules" label-width="90px"
                     label-position="left" :disabled="dialog.type!==1" ref="ruleForm">
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="学生姓名" prop="truename">
                            <el-input v-model="dialog.form.truename" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="dialog.form.sex" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sex"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="年级" prop="grade">
                            <el-select v-model="dialog.form.grade" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.grades"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="推荐给校区" prop="deptid">
                            <el-cascader
                                    v-model="dialog.form.deptid"
                                    :options="dic.hrcodedepts"
                                    :props="$utils.leaningCenterProps"
                                    :show-all-levels="false"
                                    collapse-tags
                                    placeholder="请选择"
                                    filterable
                                    clearable></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="就读学校" prop="school">
                            <el-input v-model="dialog.form.school" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="线索来源" prop="intype">
                            <el-select v-model="dialog.form.intype" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sourceClues1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="tel">
                            <el-input :maxlength='11' v-model="dialog.form.tel" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人身份" prop="relation">
                            <el-select v-model="dialog.form.relation" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.contactIdentity"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="联系人姓名" prop="contact">
                            <el-input v-model="dialog.form.contact" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="推荐类型" prop="intype">
                            <el-select v-model="dialog.form.intype" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sourceClues1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="学员编号" prop="tjstudent">
                            <el-input v-model="dialog.form.tjstudent" placeholder="请输入内容"
                                      clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="推荐码" prop="tjcode">
                            <el-input v-model="dialog.form.tjcode" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="dialog.form.remark" placeholder="请输入内容"
                              clearable/>
                </el-form-item>
                <el-form-item label="图片证明" prop="showImageList">
                    <el-upload
                            action=""
                            ref="uploadBom"
                            :multiple="true"
                            list-type="picture-card"
                            :show-file-list="true"
                            :auto-upload="true"
                            :file-list="dialog.form.showImageList"
                            :limit="3"
                            :on-preview="onFilePreview"
                            :on-remove="onFileRemove"
                            :on-exceed="onFileExceed"
                            :http-request="onFileUpload"
                            :before-upload="onBeforeFile">
                        <span class="el-icon-plus"></span>
                        <div slot="tip" class="el-upload__tip">最多三张，每张最大5M</div>
                    </el-upload>
                </el-form-item>
            </el-form>

            <el-form v-if="dialog.type===2" class="jr-form" size="mini" :model="dialog.form" :rules="dialog.rules"
                     label-width="90px"
                     label-position="left" ref="ruleForm2">
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="审核结果" prop="ifok">
                            <el-radio v-model="dialog.form.ifok" :label="1">通过</el-radio>
                            <el-radio v-model="dialog.form.ifok" :label="2">驳回</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="教育顾问" prop="saleid" v-if="dialog.form.ifok===1">
                            <el-select v-model="dialog.form.saleid" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sales"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="驳回理由" prop="whyreject" v-if="dialog.form.ifok===2">
                    <el-input type="textarea" v-model="dialog.form.whyreject" placeholder="请输入内容"
                              clearable/>
                </el-form-item>
            </el-form>

            <!--弹窗尾部-->
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeDialog">取 消</el-button>
                <el-button size="mini" @click="submitDialog" type="primary">提 交</el-button>
            </div>
        </el-dialog>

        <!--查看图片弹窗-->
        <PreviewPictureTemplate ref="previewPictureRef"/>
    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedChannelTemplate from "@/components/customer/SelectedChannel";
import PreviewPictureTemplate from "@/components/customer/PreviewPicture";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedChannelTemplate,
        PreviewPictureTemplate,
    },
    data() {
        return {
            // 筛选参数信息
            paramMap: {
                show: false,//是否显示筛选
                "name": "",//姓名
                "ifok": '0',//状态（默认0待审批,1已审核2驳回）
                // "startTime": 0,//开始时间Unix时间戳（单位:s）
                // "endTime": 0,//结束时间Unix时间戳（单位:s）
                "time": [],
                "deptId": 0,//学习中心
                "tjzhe": "",//推荐者
                "grade": "",//年级
                "school": ""//就读学校
            },

            // 列表数据
            tableData: [],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },

            // 弹窗
            dialog: {
                show: false,
                type: null,//1修改，2审核，3查看
                title: '',
                form: {
                    "createdate": 0,//创建时间的时间戳
                    "diffdate": 0,//审核时间
                    "images": [],//图片地址
                    "id": 0,//主键ID
                    "tel": "",//学员电话号码
                    "grade": "",//年级
                    "adminid": 0,//登记人ID
                    "school": "",//就读学校
                    "studentnumber": "",//进入leads表反写回来的学生编号
                    "deptid": 0,//校区ID
                    "creator": "",//登记人姓名
                    "diffor": "",//审核人用户名
                    "remark": "",
                    "sex": 0,//性别，1-男，0-女
                    "contact": "",//联系人姓名
                    "ifdiff": true,//是否审核（默认0,1已审核）
                    "smallclassname": "",//来源渠道小类
                    "tjstudent": "",//推荐学员编号（用于计算该学员推荐）
                    "saleid": 0,//教育顾问ID
                    "intype": "",//线索来源
                    "tjstudentguid": "",//推荐学员GUID
                    "ifok": 0,//是否审核通过(1通过2驳回) 认定是否推荐有效
                    "whyreject": null,//驳回原因
                    "relation": "",//联系人身份
                    "truename": "",//学员姓名
                    "tjcode": "",//推荐码
                    "imgUrl": "",

                    showImageList: [],
                },
                rules: {
                    truename: {required: true, message: '请输入学生姓名', trigger: 'blur'},
                    deptid: {required: true, message: '请选择校区id', trigger: 'blur'},
                    tel: {
                        required: true, validator(rule, value, callback) {
                            if (/^1\d{10}$/.test(value)) {
                                callback();
                            } else {
                                callback(new Error('请输入正确的手机号'));
                            }
                        }, trigger: 'blur'
                    },
                    relation: {required: true, message: '请选择联系人身份', trigger: 'blur'},
                    contact: {required: true, message: '请输入联系人姓名', trigger: 'blur'},
                    intype: {required: true, message: '请选择推荐类型', trigger: 'blur'},
                    showImageList: {required: true, type: 'array', message: '请选择证明图片', trigger: 'blur'},

                    ifok: {
                        required: true, validator(rule, value, callback) {
                            if (!!value) {
                                callback();
                            } else {
                                callback(new Error('请选择审核结果'));
                            }
                        }, trigger: 'blur'
                    },
                    saleid: {required: true, message: '请选择教育顾问', trigger: 'blur'},
                    whyreject: {required: true, message: '请填写驳回理由', trigger: 'blur'},
                }
            },
        }
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        },
    },
    mounted() {
        this.refreshPage();
    },
    methods: {
        /**
         *@desc 刷新页面
         */
        refreshPage() {
            let {pagesInfo, paramMap, $utils} = this;
            return this.$api.customer.recommendSearch({
                "pageindex": pagesInfo.pageIndex,
                "pagesize": pagesInfo.pageSize,
                "name": paramMap.name,//姓名
                "ifok": paramMap.ifok,//状态（默认0待审批,1已审核2驳回）
                "startTime": $utils.convertTime(paramMap.time, 0),//开始时间Unix时间戳（单位:s）
                "endTime": $utils.convertTime(paramMap.time, 1),//结束时间Unix时间戳（单位:s）
                "deptId": $utils.underscore.last(paramMap.deptId) || 0,//学习中心
                "tjzhe": paramMap.tjzhe,//推荐者
                "grade": paramMap.grade,//年级
                "school": paramMap.school//就读学校
            }).then(({request = {}, total = 0, list = []} = {}) => {
                Object.assign(this.pagesInfo, {
                    pageIndex: request.pageindex || 1,
                    pageSize: request.pagesize || 20,
                    count: total || 0,//总条数
                })
                this.tableData = list;
            }).catch(err => {
            })
        },

        /**
         *@desc 分页触发时
         */
        onPagesChange() {
            this.refreshPage();
        },

        /**
         *@desc 提交筛选时
         */
        submitSearch() {
            this.pagesInfo.pageIndex = 1;//重置分页数据
            this.refreshPage();
        },

        /**
         *@desc 重置筛选时
         */
        resetSearch() {
            this.pagesInfo.pageIndex = 1;//重置分页数据
            this.$utils.resetJson(this.paramMap, ['show']);//重置筛选数据
            this.refreshPage();
        },

        /**
         *@desc 修改 - 获取详情
         */
        async getDetail(param) {
            return await this.$api.customer.recommendDetail(param).then(res => {
                let images = res.images || [];
                let imgUrl = res.imgUrl ? res.imgUrl.split(';') : [];
                return {
                    ...res,
                    showImageList: imgUrl.map((item, index) => {
                        return {
                            name: item,
                            url: images[index]
                        }
                    }),
                }
            }) || {};
        },

        /**
         *@desc 修改 - 打开弹窗
         */
        async modifyCustomer(obj) {
            this.dialog.type = 1;
            this.dialog.title = '修改线索客户信息'
            Object.assign(this.dialog.form, await this.getDetail({id: obj.id}))
            this.dialog.show = true;
        },

        /**
         *@desc 审核 - 打开弹窗
         */
        async checkCustomer(obj) {
            this.dialog.type = 2;
            this.dialog.title = '审核线索客户信息'
            Object.assign(this.dialog.form, await this.getDetail({id: obj.id}))
            this.dialog.show = true;
        },

        /**
         *@desc 查看 - 打开弹窗
         */
        async viewCustomer(obj) {
            this.dialog.type = 3;
            this.dialog.title = '查看线索客户信息'
            Object.assign(this.dialog.form, await this.getDetail({id: obj.id}))
            this.dialog.show = true;
        },

        /**
         *@desc 上传-文件超出个数
         */
        onFileExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },

        /**
         *@desc 上传-上传前验证
         */
        onBeforeFile(file) {
            if (!file.type.includes('image')) {
                this.$message.error('只能上传图片!');
                return false;
            } else {
                return true;
            }
        },

        /**
         *@desc 上传-上传函数
         */
        onFileUpload(fileObj) {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
                this.$api.common.uploadfile([{
                    filename: fileObj.file.name,
                    fileContent: reader.result,
                }]).then(res => {
                    res = res || [];
                    if (res[0]) {
                        this.dialog.form.showImageList.push({
                            name: res[0].filename,
                            url: res[0].fileContent,
                            relativeFileName: res[0].relativeFileName,
                        });
                    }
                })
            })
            reader.readAsDataURL(fileObj.file);
        },

        /**
         *@desc 上传-移除上传文件
         */
        onFileRemove(file, fileList) {
            this.dialog.form.showImageList = fileList;
        },

        /**
         *@desc 上传-查看图片
         */
        onFilePreview(file) {
            this.$refs['previewPictureRef'].open(file);
        },

        /**
         *@desc 客户确定 - 关闭弹窗
         */
        closeDialog() {
            this.dialog.show = false;
        },

        /**
         *@desc 客户确定 - 提交弹窗
         */
        submitDialog() {
            let form = this.dialog.form;
            if (this.dialog.type === 1) {//1修改
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {//如果验证通过
                        this.$api.customer.reccustomer({
                            ...form,
                            images: form.showImageList.map(item => {
                                return item.url
                            }),
                            imgUrl: (form.showImageList.map(item => {
                                return item.relativeFileName
                            })).join(';')
                        }).then(res => {
                            this.$message.success('修改成功')
                            this.refreshPage();
                            this.closeDialog()
                        })
                    } else {
                        return false;
                    }
                })
            }
            if (this.dialog.type === 2) {//2审核
                this.$refs['ruleForm2'].validate((valid) => {
                    if (valid) {//如果验证通过
                        console.log(form, 111)
                        this.$api.customer.audit({
                            "tjcode": form.tjcode,//推荐吗
                            "tjstudent": form.tjstudent,//学员编号
                            "id": form.tjstudent.id,
                            "sales": form.saleid,//教育顾问
                            "isaggress": form.ifok,//审核结果：1-通过，2-驳回
                            "whyreject": form.whyreject//驳回理由
                        }).then(res => {
                            this.$message.success('审核成功')
                            this.refreshPage();
                            this.closeDialog()
                        })
                    } else {
                        return false;
                    }
                })
            }
            if (this.dialog.type === 3) {//3查看
                this.closeDialog()
            }
        },
    }
}
</script>

<style lang="scss">
.jr-customer-recommend-check {
    .el-upload-list--picture-card .el-upload-list__item {
        transition: none;
    }
}
</style>