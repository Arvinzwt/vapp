<template>
    <el-main>
        <div class="unaudit-exam">
          <div class="header">
            待审核试卷库
          </div>
            <div class="search">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left" size="mini">
                  <el-form-item label="学科" prop="subject">
                      <el-radio-group v-model="ruleForm.subject">
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
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="试卷名称" prop="name" class="special">
                        <el-input v-model="ruleForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-button type="primary" size="mini" @click="submitForm('ruleForm')" style="margin-left: 20px">搜索</el-button>
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
                      @click="handleDelete(scope.$index, scope.row)"
                    >
                      审核通过
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
        </div>
    </el-main>
</template>

<script>
    export default {
        name: "UnauditExam",
        data() {
            return {
              ruleForm: {
                subject: '',
                level: '',
                semester: '',
                province: '',
                city: '',
                area: '',
                type: '',
                year: '',
                school: '',
                upload: '',
                name: ''
              },
              rules: {
                subject: [{required: true, message: '请选择学科'}],
                level: [{required: true, message: '请选择年级'}],
                semester: [{required: true, message: '请选择学期'}],
                province: [{required: true, message: '请选择省份'}],
                city: [{required: true, message: '请选择城市'}],
                area: [{required: true, message: '请选择区域'}],
                type: [{required: true, message: '请选择类型'}],
                year: [{required: true, message: '请选择年份'}],
                school: [{required: false, message: '请选择学校'}],
                upload: [{required: true, message: '请上传试卷'}],
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
            }
        },
        created() {
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
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
    .table {
      padding: 20px 10px;
      background: #fafafa;
      .el-table th, .el-table tr {
        background: #F5F5F5 !important;
      }
    }
  }
</style>