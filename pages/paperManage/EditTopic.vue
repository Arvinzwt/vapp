<template>
  <el-main>
    <div class="edit-topic">
      <div class="header">
        题目编辑
      </div>
      <div class="tags" style="margin-bottom: 20px">
        <el-tag type="info" size="medium">高中</el-tag>
        <el-tag type="info" size="medium" style="margin-left: 10px">语文</el-tag>
      </div>
      <el-form :model="topicForm" size="mini" :rules="topicRules" ref="topicForm"  label-position="right">
        <el-row>
          <el-form-item label="所属知识点">
            <el-col :span="2">
              <el-button type="primary" disabled style="display: block">同步</el-button>
              <el-button type="primary" disabled style="margin-top: 5px; margin-left: 0">专题</el-button>
            </el-col>
            <el-col :span="4">
              <el-tag
                closable
                type="info">
                标签1111
              </el-tag>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="题型" prop="title">
            <el-radio-group v-model="topicForm.title">
              <el-radio label="选择题"></el-radio>
              <el-radio label="填空题"></el-radio>
              <el-radio label="成长题"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="年份" prop="year">
              <el-select v-model="topicForm.year" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="类别" prop="type">
              <el-select v-model="topicForm.type" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省份" prop="province">
            <el-select v-model="topicForm.province" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市" prop="city">
              <el-select v-model="topicForm.city" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="topicForm.difficulty" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="23">
            <el-form-item label="题干" required>
              <div id="editor"></div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="1">
            <el-form-item>
              <el-button type="primary" @click="submitForm('topicForm')">确认</el-button>
              <el-button @click="resetForm('topicForm')" style="margin-left: 50px">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'EditTopic',
  data () {
    return {
      topicForm: {
        year: '',
        type: '',
        province: '',
        city: '',
        difficulty: '',
        title: ''
      },
      topicRules: {
        year: [{required: true, message: '请选择年份', trigger: 'chenge'}],
        type: [{required: true, message: '请选择类别', trigger: 'chenge'}],
        city: [{required: true, message: '请选择城市', trigger: 'chenge'}],
        difficulty: [{required: true, message: '请选择年份', trigger: 'chenge'}],
        content: [{required: true, message: '请输入体感', trigger: 'chenge'}],
        title: [{required: true, message: '请选择题型', trigger: 'chenge'}],
      }
    }
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted () {
    ckeditorInit();
  }
}
</script>

<style lang="scss" scoped>
  .edit-topic /deep/ #cke_editor {
    margin-left: 48px;
  }
  .edit-topic {
    padding-top: 10px;
    .header {
      color: #333;
      font-size: 25px;
    }
    .tags {
      padding-top: 20px
    }
  }
</style>