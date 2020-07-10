<template>
    <el-main>
      <div class="exam-draft">
        <div class="header clear">
          <div class="word">
            <div class="title">试卷草稿箱</div>
            <div 
              class="btn"
              @click="goUpload"
            >
              导入试卷
            </div>
          </div>
          <div class="icon">
            <img src="@/static/images/question.png" alt="">
            <span>查看学习管家操作指南</span>
          </div>
        </div>
        <div class="content">
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
                  @click="handleDelete(scope.$index, scope.row)"
                >
                  删除
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
               <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left" size="mini">
                <el-form-item label="学科" prop="subject">
                  <el-radio-group v-model="ruleForm.subject">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="学段" prop="section">
                  <el-radio-group v-model="ruleForm.section">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="年级" prop="level">
                  <el-radio-group v-model="ruleForm.level">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="学期" prop="semester">
                  <el-radio-group v-model="ruleForm.semester">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="省份" prop="province">
                  <el-radio-group v-model="ruleForm.province">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="城市" prop="city">
                  <el-radio-group v-model="ruleForm.city">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="区域" prop="area">
                  <el-radio-group v-model="ruleForm.area">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                  <el-radio-group v-model="ruleForm.type">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="年份" prop="year">
                  <el-radio-group v-model="ruleForm.year">
                    <el-radio label="线上品牌商赞助"></el-radio>
                    <el-radio label="线下场地免费"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="学校" prop="school" class="special school">
                  <el-select v-model="ruleForm.school" placeholder="请选择学校">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="试卷名称" prop="name" class="special">
                  <el-input v-model="ruleForm.name" style="width: 172px"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="resetForm('ruleForm')">取消</el-button>
                  <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left: 20px">保存</el-button>
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
        name: "ExamDraft",
        data() {
            return {
              dialogPaperVisible: false,
              dialogFormVisible: false,
              ruleForm: {
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
              rules: {
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
              knowledgeData: [],
              abilityData: [],
              currentPage: 1
            }
        },
        methods: {
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
                this.dialogFormVisible = true
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false
          },
          goUpload() {
            this.$r.go('1-4')
          },
          handleEdit(index, row) {
            this.$r.go('1-5')
          },
          handleDelete(index, row) {
            console.log(index, row);
            this.$alert('这是一段内容', '标题名称', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'success',
                  message: `删除成功`
                });
              }
            });
          },
          handleSet(index, row) {
            this.dialogFormVisible = true
          },
          handleView(index, row) {
            this.$r.go('1-6')
          },
          handleAnalysis(index, row) {
            this.dialogPaperVisible = true
          },
          handleRemove (index, row) {

          }
        },
        created() {
        },
        mounted() {
        },
        destroyed() {
        }
    }
</script>

<style lang="scss">
.clear::after {
  content: '';
  display: block;
  clear: both;
}
.exam-draft {
  padding-top: 10px;
  .school {
    .el-form-item__label {
      text-indent: 10px;
    }
  }
  .header {
    .word {
      float: left;
      padding-bottom: 20px;
      .title {
        color: #333;
        font-size: 25px;
        margin-bottom: 20px;
      }
      .btn {
        width: 78px;
        height: 22px;
        border:1px solid rgba(73,148,242,1);
        border-radius:2px;
        text-align: center;
        line-height: 22px;
        color: #4994F2;
        cursor: pointer;
      }
    }
    .icon {
      float: right;
      line-height: 40px;
      img {
        width: 18px;
        height: 18px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
        margin-left: 9px
      }
    }
  }
  .content {
    padding: 20px 10px;
    background: #fafafa;
    .el-table th, .el-table tr {
      background: #F5F5F5 !important;
    }
  }
  .page {
    margin-top: 20px;
  }
  .modal {
    padding-bottom: 32px;
      .el-radio__input {
      display: none;
    }
    .el-radio__label, .el-form-item__label {
      font-size: 12px;
    }
  }
}
</style>