<template>
  <el-main>
    <div class="import-test">
      <div class="title">
        导入试卷
      </div>
      <div class="content">
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
          <el-form-item label="选择试卷" prop="upload" class="special">
            <el-upload
              v-model="ruleForm.upload"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :on-success="handleSuccess"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="mini" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="试卷名称" prop="name" class="special">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">返回</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" style="margin-left: 20px">导入</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'ImportTest',
  data () {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
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
        upload: '',
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
        upload: [{required: true, message: '请上传试卷'}],
        name: [{required: true, message: '请填写试卷名称'}],
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
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleSuccess(response, file, fileList) {
      console.log(this.ruleForm.upload)
      console.log(response, file, fileList)
    }
  }
}
</script>
<style lang="scss">
  .import-test {
    padding-top: 10px;
    .title {
      color: #333;
      font-size: 25px;
      padding-left: 6px;
      margin-bottom: 6px;
    }
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
</style>