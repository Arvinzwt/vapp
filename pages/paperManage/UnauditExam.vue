<template>
    <el-main>
        <div class="unaudit-exam">
          <div class="header">
            待审核试卷库
          </div>
            <div class="search">
                <el-form :model="searchForm" :rules="searchRules" ref="searchForm" label-width="100px" class="demo-setForm" label-position="left" size="mini">
                  <el-form-item label="学科" prop="subject">
                      <el-radio-group v-model="searchForm.subject">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="年级" prop="level">
                      <el-radio-group v-model="searchForm.level">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="学期" prop="semester">
                      <el-radio-group v-model="searchForm.semester">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="省份" prop="province">
                      <el-radio-group v-model="searchForm.province">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="城市" prop="city">
                      <el-radio-group v-model="searchForm.city">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="区域" prop="area">
                      <el-radio-group v-model="searchForm.area">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="类型" prop="type">
                      <el-radio-group v-model="searchForm.type">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="年份" prop="year">
                      <el-radio-group v-model="searchForm.year">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="学校" prop="school" class="special school">
                      <el-select v-model="searchForm.school" placeholder="请选择学校">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="试卷名称" prop="name" class="special">
                        <el-input v-model="searchForm.name" style="width: 172px"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-button type="primary" size="mini" @click="submitForm('searchForm')" style="margin-left: 20px">搜索</el-button>
                    </el-col>
                  </el-row>
                </el-form>
            </div>
            <div class="table">
              <el-table
                size="mini"
                stripe
                :show-header="false"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  label="姓名"
                >
                  <template slot-scope="scope">
                    <p>{{scope.row.name }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="right">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      @click="handleSet(scope.$index, scope.row)"
                    >
                      基础设置
                    </el-button>
                    <el-button
                      size="mini"
                      type="text"
                      @click="handleEdit(scope.$index, scope.row)"
                    >
                      试卷编辑
                    </el-button>
                    <el-button
                      size="mini"
                      type="text"
                      @click="handleView(scope.$index, scope.row)"
                    >
                      试卷预览
                    </el-button>
                    <el-button
                      size="mini"
                      type="text"
                      @click="handleAnalysis(scope.$index, scope.row)"
                    >
                      试卷分析
                    </el-button>
                    <el-button
                      size="mini"
                      slot="reference"
                      type="text"
                      @click="handleAudit(scope.$index, scope.row)"
                    >
                      审核通过
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
             <div class="page">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[20, 40, 60, 80]"
                :page-size="20"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
            </div>
            <div class="modal">
              <el-dialog title="试卷基础信息编辑" :visible.sync="dialogFormVisible">
               <el-form :model="setForm" :rules="setRules" ref="setForm" label-width="100px" class="demo-setForm" label-position="left" size="mini">
                <el-form-item label="学科" prop="subject">
                  <el-radio-group v-model="setForm.subject">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="学段" prop="section">
                  <el-radio-group v-model="setForm.section">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="年级" prop="level">
                  <el-radio-group v-model="setForm.level">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="学期" prop="semester">
                  <el-radio-group v-model="setForm.semester">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="省份" prop="province">
                  <el-radio-group v-model="setForm.province">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="城市" prop="city">
                  <el-radio-group v-model="setForm.city">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="区域" prop="area">
                  <el-radio-group v-model="setForm.area">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                  <el-radio-group v-model="setForm.type">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="年份" prop="year">
                  <el-radio-group v-model="setForm.year">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="学校" prop="school" class="special school">
                  <el-select v-model="setForm.school" placeholder="请选择学校">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="试卷名称" prop="name" class="special">
                  <el-input v-model="setForm.name" style="width: 172px"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="resetForm('setForm')">取消</el-button>
                  <el-button type="primary" @click="submitForm('setForm')" style="margin-left: 20px">保存</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
            <el-dialog
            title="试卷分析"
            :visible.sync="dialogPaperVisible"
          >
            <el-table
              size="mini"
              :border="true"
              :data="knowledgeData"
              style="width: 49%; display: inline-block"
            >
              <el-table-column
                prop="date"
                label="知识点"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="涉及题目"
                width="180">
              </el-table-column>
            </el-table>
            <el-table
              size="mini"
              :data="abilityData"
              :border="true"
              style="width: 49%; display: inline-block"  
            >
              <el-table-column
                prop="date"
                label="能力"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="涉及题目"
                width="180">
              </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogPaperVisible = false" size="mini">关 闭</el-button>
            </span>
            </el-dialog>
          </div>
        </div>
    </el-main>
</template>

<script>
    export default {
        name: "UnauditExam",
        data() {
            return {
              knowledgeData: [],
              abilityData: [],
              dialogPaperVisible: false,
               searchForm: {
                subject: '',
                section: '',
                level: '',
                semester: '',
                province: '',
                city: '',
                area: '',
                type: '',
                year: '',
                school: '',
                name: ''
              },
              searchRules: {
                subject: [{required: true, message: '请选择学科'}],
                level: [{required: true, message: '请选择年级'}],
                semester: [{required: true, message: '请选择学期'}],
                province: [{required: true, message: '请选择省份'}],
                city: [{required: true, message: '请选择城市'}],
                area: [{required: true, message: '请选择区域'}],
                type: [{required: true, message: '请选择类型'}],
                year: [{required: true, message: '请选择年份'}],
                school: [{required: false, message: '请选择学校'}],
                name: [{required: true, message: '请填写试卷名称'}],
              },
              setForm: {
                subject: '',
                level: '',
                semester: '',
                province: '',
                city: '',
                area: '',
                type: '',
                year: '',
                school: '',
                name: ''
              },
              setRules: {
                subject: [{required: true, message: '请选择学科'}],
                section: [{required: true, message: '请选择学段'}],
                level: [{required: true, message: '请选择年级'}],
                semester: [{required: true, message: '请选择学期'}],
                province: [{required: true, message: '请选择省份'}],
                city: [{required: true, message: '请选择城市'}],
                area: [{required: true, message: '请选择区域'}],
                type: [{required: true, message: '请选择类型'}],
                year: [{required: true, message: '请选择年份'}],
                school: [{required: false, message: '请选择学校'}],
                name: [{required: true, message: '请填写试卷名称'}],
              },
              tableData: [{
                name: '王小虎',
              }, {
                name: '王小虎',
              }, {
                name: '王小虎',
              }, {
                name: '王小虎',
              }],
              currentPage: 1,
              dialogFormVisible: false
            }
        },
        created() {
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
          handleEdit(index, row) {
            this.$r.go('1-8')
          },
          handleAudit(index, row) {
            this.$alert('您确定要审批通过该试卷吗？', '审核提示', {
              confirmButtonText: '确定',
              callback: action => {
                if (action === 'confirm') {
                  this.$message.success('审核通过')
                } else {
                  this.$message.error('审核未通过')
                }
              }
            });
          },
          handleAnalysis(index, row) {
            this.dialogPaperVisible = true
          },
          handleView(index, row) {
            this.$r.go('1-6')
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false
          },
          handleSet(index, row) {
            this.dialogFormVisible = true
          },
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
        }
    }
</script>

<style lang="scss">
  .unaudit-exam {
    .header {
      font-size:25px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(51,51,51,1);
      padding: 20px 0;
    }
    .search {
      padding-bottom: 32px;
      .el-radio__input {
        display: none;
      }
      .el-radio__label, .el-form-item__label {
        font-size: 12px;
      }
      .school .el-form-item__label {
        text-indent: 10px;
      }
    }
    .modal {
      .school .el-form-item__label {
        text-indent: 10px;
      }
      .el-radio__input {
        display: none;
      }
    }
    .table {
      padding: 20px 10px;
      background: #fafafa;
      .el-table th, .el-table tr {
        background: #F5F5F5 !important;
      }
      .el-radio__label, .el-form-item__label {
        font-size: 12px;
      }
    }
    .page {
      margin-top: 20px;
    }
  }
</style>