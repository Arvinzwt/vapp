<template>
    <!--推荐客户登记-->
    <el-main class="jr-page jr-customer-customer-register">
        <!--提示语-->
        <div class="jr-page-header">
            <el-alert
                    class="mt-2 mb-2"
                    title="注意：本系统用户在本系统中登记上传的信息须来源正规合法，用户个人须对在本系统登记上传的信息负责，因用户上传信息违反法律法规或侵犯第三人的合法权益的，全部法律责任和赔偿责任均应由用户自行承担，与本系统所有者无关。"
                    type="warning"
                    show-icon>
            </el-alert>
        </div>
        <!--内容-->
        <div class="jr-page-body">
            <!--标题-->
            <h3 class="jr-title">推荐客户登记</h3>
            <!--筛选项-->
            <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
                <el-row :gutter="15">
                    <!--学生姓名-->
                    <el-col :span="6">
                        <el-form-item label="学生姓名">
                            <el-input v-model="paramMap.truename" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--性别-->
                    <el-col :span="6">
                        <el-form-item label="性别">
                            <el-select v-model="paramMap.sex" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sex"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--年级-->
                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-select v-model="paramMap.grade" placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in dic.grades"
                                        :key="item.dicCode"
                                        :label="item.dicValue"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--推荐给校区-->
                    <el-col :span="6">
                        <el-form-item label="推荐给校区">
                            <el-cascader
                                    v-model="paramMap.deptid"
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
                    <!--就读学校-->
                    <el-col :span="6">
                        <el-form-item label="就读学校">
                            <el-input v-model="paramMap.school" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--线索来源-->
                    <el-col :span="6">
                        <el-form-item label="线索来源">
                            <el-select v-model="paramMap.intype" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sourceClues1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--手机号-->
                    <el-col :span="6">
                        <el-form-item label="手机号">
                            <el-input :maxlength="11" v-model="paramMap.tel" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--教育顾问-->
                    <el-col :span="6">
                        <el-form-item label="联系人身份" prop="relation">
                            <el-select v-model="paramMap.relation" placeholder="请选择" clearable>
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
                <el-row :gutter="15">
                    <!--联系人姓名-->
                    <el-col :span="6">
                        <el-form-item label="联系人姓名">
                            <el-input v-model="paramMap.contact" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--推荐类型-->
                    <el-col :span="6">
                        <el-form-item label="推荐类型">
                            <el-select v-model="paramMap.smallclassname" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.sourceClues1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--学员编号-->
                    <el-col :span="6">
                        <el-form-item label="学员编号">
                            <el-input v-model="paramMap.tjstudent" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <!--推荐码-->
                    <el-col :span="6">
                        <el-form-item label="推荐码">
                            <el-input v-model="paramMap.tjcode" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="paramMap.remark" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="图片证明">
                    <el-upload
                            action=""
                            ref="uploadBom"
                            :multiple="true"
                            list-type="picture-card"
                            :show-file-list="true"
                            :auto-upload="true"

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
        </div>
        <!--提交按钮-->
        <div class="jr-page-footer text-right">
            <el-button size="mini" @click="submitCustomer" type="primary">提交</el-button>
            <el-button size="mini" @click="resetCustomer" type="">重置</el-button>
        </div>

        <!--查看图片弹窗-->
        <preview-picture-template ref="previewPictureRef"/>
    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import PreviewPictureTemplate from "@/components/customer/PreviewPicture";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        PreviewPictureTemplate,
    },
    data() {
        return {
            // 筛选参数信息
            paramMap: {
                // "id": 0,//主键ID
                "tel": "",//学员电话号码
                "grade": "",//年级
                // "adminid": 0,//登记人ID
                "school": "",//就读学校
                // "studentnumber": "",//进入leads表反写回来的学生编号
                "deptid": 0,//校区ID
                // "createdate": 0,//创建时间的时间戳
                // "diffdate": 0,//审核时间
                // "creator": "",//登记人姓名
                // "diffor": "",//审核人用户名
                "remark": "",
                "sex": 0,//性别，1-男，0-女
                "contact": "",//联系人姓名
                // "ifdiff": false,//是否审核（默认0,1已审核）
                "smallclassname": "",//来源渠道小类
                "tjstudent": "",//推荐学员编号（用于计算该学员推荐）
                // "saleid": 0,//教育顾问ID
                "intype": "",//线索来源
                // "tjstudentguid": "",//推荐学员GUID
                // "ifok": 0,//是否审核通过(1通过2驳回) 认定是否推荐有效
                // "whyreject": "",//驳回原因
                "relation": "",//联系人身份
                "truename": "",//学员姓名
                "tjcode": "",//推荐码
                "imgUrl": "",//图片relativename用【;】拼接
                "images": [],//
            },
        }
    },
    mounted() {

    },
    computed: {
        dic() {
            return this.$store.state.dic;
        }
    },
    methods: {
        /**
         *@desc 上传-上传前验证
         */
        onBeforeFile(file) {
            if (file.size / 1024 / 1024 > 5) {
                this.$message.error('每张最大5M!');
                return false;
            } else {
                if (!file.type.includes('image')) {
                    this.$message.error('只能上传图片!');
                    return false;
                } else {
                    return true;
                }
            }
        },

        /**
         *@desc 上传-文件超出个数
         */
        onFileExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },

        /**
         *@desc 上传-上传函数
         */
        onFileUpload(fileObj) {
            this.paramMap.images.push(fileObj.file);
        },

        /**
         *@desc 上传-预览
         */
        onFilePreview(file) {
            this.$refs['previewPictureRef'].open({
                name: file.name,
                url: file.url
            });
        },

        /**
         *@desc 上传-移除上传文件
         */
        onFileRemove(file, fileList) {
            this.paramMap.images = fileList;
        },

        /**
         *@desc 重置
         */
        resetCustomer() {
            this.$utils.resetJson(this.paramMap);//重置筛选数据
        },

        /**
         *@desc 提交
         */
        submitCustomer() {
            let paramMap = this.paramMap;
            if (!paramMap.truename) {
                this.$message.error('请输入学生姓名')
                return false;
            }
            if (!paramMap.deptid) {
                this.$message.error('请选择推荐校区')
                return false;
            }
            if (!/^1\d{10}$/.test(paramMap.tel)) {
                this.$message.error('请输入正确的手机号')
                return false
            }
            if (!paramMap.relation) {
                this.$message.error('请选择联系人身份')
                return false;
            }
            if (!paramMap.contact) {
                this.$message.error('请输入联系人姓名')
                return false;
            }
            if (!paramMap.smallclassname) {
                this.$message.error('请选择推荐人类型')
                return false;
            }
            if (paramMap.images.length === 0) {
                this.$message.error('请选择证明图片')
                return false;
            }


            let imgTarget = [];
            paramMap.images.forEach(file => {
                let reader = new FileReader();
                reader.addEventListener("load", () => {
                    imgTarget.push({
                        filename: file.name,
                        fileContent: reader.result,
                    })
                })
                reader.readAsDataURL(file);
            })


            setTimeout(async () => {
                let fileList = await this.$api.common.uploadfile(imgTarget) || [];

                this.$api.customer.reccustomer({
                    // "id": 0,//主键ID
                    "tel": paramMap.tel,//学员电话号码
                    "grade": paramMap.grade,//年级
                    // "adminid": 0,//登记人ID
                    "school": paramMap.school,//就读学校
                    // "studentnumber": "",//进入leads表反写回来的学生编号
                    "deptid": this.$utils.underscore.last(paramMap.deptid) || '',//校区ID
                    // "createdate": 0,//创建时间的时间戳
                    // "diffdate": 0,//审核时间
                    // "creator": "",//登记人姓名
                    // "diffor": "",//审核人用户名
                    "remark": paramMap.remark,
                    "sex": paramMap.sex,//性别，1-男，0-女
                    "contact": paramMap.contact,//联系人姓名
                    // "ifdiff": false,//是否审核（默认0,1已审核）
                    "smallclassname": paramMap.smallclassname,//来源渠道小类
                    "tjstudent": paramMap.tjstudent,//推荐学员编号（用于计算该学员推荐）
                    // "saleid": 0,//教育顾问ID
                    "intype": paramMap.intype,//线索来源
                    // "tjstudentguid": "",//推荐学员GUID
                    // "ifok": 0,//是否审核通过(1通过2驳回) 认定是否推荐有效
                    // "whyreject": "",//驳回原因
                    "relation": paramMap.relation,//联系人身份
                    "truename": paramMap.truename,//学员姓名
                    "tjcode": paramMap.tjcode,//推荐码
                    "imgUrl": (fileList.map(item => {
                        item.relativeFileName
                    })).join(','),//图片relativename用【;】拼接
                    "images": fileList.map(item => {
                        return item.fileContent
                    })
                }).then(res => {
                    this.resetCustomer();
                    this.$message.success('登记成功')
                })
            }, 300)
        },

    }
}
</script>

<style lang="scss">
.jr-customer-customer-register {

}
</style>