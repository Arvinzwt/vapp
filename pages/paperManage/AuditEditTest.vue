<template>
    <el-main>
      <div class="edit-test">
        <div class="header">
          试卷编辑
        </div>
        <div class="test-name">
          <div class="title">
            2019年北京市石景山区中考物理二模试卷
          </div>
          <div class="type">
            单项选择题（2分×15=30分）（题号：1000674559）
          </div>
          <el-button plain size="mini" type="primary" @click="editTitle">编辑</el-button>
        </div>
        <div class="line"></div>
        <div class="content">
          <div class="title-input">
            <el-input v-model="input" placeholder="请输入内容" style="width: 280px" size="mini"></el-input>
            <el-button type="primary" size="mini" style="margin-left: 15px;">保存</el-button>
          </div>
          <div class="btns" style="margin-top: 20px;">
            <el-button type="primary" size="mini" plain @click="handleScore">批量添加分值</el-button>
            <el-button type="primary" size="mini" plain @click="handleKnowdge">批量修改知识点</el-button>
            <el-button type="primary" size="mini" plain @click="handleAbility">批量修改能力</el-button>
          </div>
          <div class="table" style="margin-top: 19px">
            <el-table
              size="mini"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%; background: #FAFAFA"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
              >
              </el-table-column>
              <el-table-column
                label="全选"
              >
                <template slot-scope="scope">
                  {{ scope.row.name }}
                  <div class="btns">
                    <el-button type="text" size="mini" @click="changeType">更换题型</el-button>
                    <el-button type="text" size="mini" @click="tagVisible = true">打标签</el-button>
                    <el-button type="text" size="mini" @click="editTopic">编辑</el-button>
                    <el-button type="text" size="mini" @click="handleBan">禁用</el-button>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="right">
                <template slot-scope="scope">
                  <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    content="未打知识点标签，未打能力标签">
                    <img src="@/static/images/sign.png" slot="reference" alt="" style="width: 20px; height: 18px; cursor: pointer;">
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
        <el-dialog title="填写批量题目分值" :visible.sync="scoreVisible" :before-close="done => resetForm(done, 'scoreForm')">
          <el-form :model="scoreForm" size="mini" :rules="scoreRules" ref="scoreForm">
            <el-form-item label="批量题目分值" :label-width="formLabelWidth" prop="score">
              <el-input v-model="scoreForm.score" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmScore('scoreForm')" size="mini">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="选择知识点" :visible.sync="knowdgeVisible">
          <el-form :model="knowdgeForm" :rules="knowdgeRules" ref="knowdgeForm" size="mini">
            <el-row>
              <el-col :span="12">
                <el-form-item prop="param">
                  <el-input placeholder="请输入搜索知识点内容" v-model="knowdgeForm.param"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-form-item>
                  <el-button type="primary" @click="handleSearch('knowdgeForm')">搜索</el-button>
                  <el-button type="primary" @click="handleReset('knowdgeForm')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            @check-change="handleCheckChange">
          </el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFormVisible = false" size="mini">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="批量能力标签"
          :visible.sync="abilityVisible"
          width="30%">
          <div class="word" style="float: left; font-size: 14px; line-height: 32px;">能力</div>
          <div class="icon" style="float: left; margin-left: 20px; width: 83.33%">
            <el-tag ref="tags" type="info" effect="dark" v-for="(item, index) in 7" :key="item" style="margin-left: 10px; margin-bottom: 5px; cursor: pointer" @click="handleTagClick(index)">标签三</el-tag>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="abilityVisible = false" size="mini">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="题型变更" :visible.sync="typeVisible">
          <div class="word">
            <p>学科：语文</p>
            <p>学段：高中</p>
          </div>
          <el-form :model="typeForm">
            <el-form-item label="题型">
              <el-radio-group v-model="typeForm.type">
                <el-radio label="选择题"></el-radio>
                <el-radio label="填空题"></el-radio>
                <el-radio label="成长题"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="typeVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="typeConfirm" size="mini">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="打标签" :visible.sync="tagVisible">
          <div class="word">
            <span>学科：语文</span>
            <span style="margin-left: 15px;">学段：高中</span>
          </div>
          <el-form :model="tagForm" size="mini" :rules="tagRules" ref="tagForm"  label-position="right">
            <el-row>
              <el-form-item label="所属知识点">
                <el-button type="primary" @click="handleType('同步')">同步</el-button>
                <!-- <br /> -->
                <el-button type="primary" style="display: block; margin-top: 5px; margin-left: 72px" @click="handleType('专题')">专题</el-button>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="年份" prop="year">
                  <el-select v-model="tagForm.year" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="来源" prop="source">
                  <el-select v-model="tagForm.source" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="省份" prop="province">
                <el-select v-model="tagForm.province" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="城市" prop="city">
                  <el-select v-model="tagForm.city" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类别" prop="type">
                  <el-select v-model="tagForm.type" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="难度" prop="difficulty">
                <el-select v-model="tagForm.difficulty" placeholder="请选择">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="排列" prop="rank">
                  <el-select v-model="tagForm.rank" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分值" class="score">
                  <el-input v-model="tagForm.score"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="tagVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="confirmTag('tagForm')" size="mini">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="编辑试卷文本"
          :visible.sync="titleVisible"
        >
            <div id="editor"></div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="titleVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="titleVisible = false" size="mini">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-main>
</template>

<script>
    export default {
        name: "AuditEditTest",
        data() {
            return {
              timer: null,
              input: '',
              scoreVisible: false,
              knowdgeVisible: false,
              abilityVisible: false,
              typeVisible: false,
              tagVisible: false,
              multipleSelection: [],
              formLabelWidth: '120px',
              props: {
                label: 'name',
                children: 'zones'
              },
              count: 1,
              typeForm: {
                type: ''
              },
              scoreForm: {
                score: '',
              },
              scoreRules: {
                score: [{required: true, message: '请填写分数', trigger: 'blur'}]
              },
              knowdgeForm: {
                param: '',
              },
              knowdgeRules: {
                param: [{required: true, message: '请输入知识点内容', trigger: 'blur'}],
              },
              tagRules: {
                year: [{required: true, message: '请选择年份', trigger: 'change'}],
                source: [{required: true, message: '请选择来源', trigger: 'change'}],
                province: [{required: true, message: '请选择省份', trigger: 'change'}],
                city: [{required: true, message: '请选择城市', trigger: 'change'}],
                type: [{required: true, message: '请选择类别', trigger: 'change'}],
                difficulty: [{required: true, message: '请选择难度', trigger: 'change'}],
                rank: [{required: true, message: '请选择排列', trigger: 'change'}],
              },
              tagForm: {

              },
              tableData: [
                {name: '王小虎'},
                {name: '王小虎'},
                {name: '王小虎'},
                {name: '王小虎'},
                {name: '王小虎'},
                {name: '王小虎'},
                {name: '王小虎'},
                {name: '王小虎'},
                {name: '王小虎'},
              ],
              abilityTags: [],
              currentPage: 1,
              titleVisible: false,
            }
        },
        
        computed: {
          otherShow () {
            return this.knowdgeForm.type === '专题'
          }
        },
        methods: {
          editTitle() {
            this.titleVisible = true
            this.timer = setTimeout(() => {
              ckeditorInit()
            })
          },
          handleSearch(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          handleReset(formName) {
            this.$refs[formName].resetFields();
          },
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
          },
          editTopic() {
            this.$r.go('1-9')
          },
          handleType(type) {
            this.knowdgeVisible = true
            this.knowdgeForm.type = type
          },
          confirmTag(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
                this.tagVisible = false
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          handleBan() {
            this.$alert('是否禁用本题', '', {
            confirmButtonText: '确定',
            callback: action => {
              if (action === 'confirm') {
                this.$message({
                  type: 'success',
                  message: `禁用成功`
                });
              }
            }
          });
          },
          typeConfirm() {
            this.typeVisible = false
          },
          changeType() {
            this.typeVisible = true
          },
          handleTagClick(i) {
            const target = this.$refs.tags[i]
            if (this.$refs.tags[i].type === 'info') {
              target.type = ''
            } else {
              target.type = 'info'
            }
          },
          handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
          },
          handleNodeClick(data) {
            console.log(data);
          },
          loadNode(node, resolve) {
            if (node.level === 0) {
              return resolve([{ name: 'region1' }, { name: 'region2' }]);
            }
            if (node.level > 3) return resolve([]);

            var hasChild;
            if (node.data.name === 'region1') {
              hasChild = true;
            } else if (node.data.name === 'region2') {
              hasChild = false;
            } else {
              hasChild = Math.random() > 0.5;
            }

            setTimeout(() => {
              var data;
              if (hasChild) {
                data = [{
                  name: 'zone' + this.count++
                }, {
                  name: 'zone' + this.count++
                }];
              } else {
                data = [];
              }
                resolve(data);
              }, 500);
          },
          handleAbility () {
            !this.multipleSelection.length ? this.$message.error('至少勾选一个题目') : this.abilityVisible = true
          },
          handleKnowdge () {
            !this.multipleSelection.length ? this.$message.error('至少勾选一个题目') : this.knowdgeVisible = true
          },
          confirmScore (formName) {
            console.log(this.scoreForm.score)
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
                this.$message.success('批量修改分值成功')
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(done, formName) {
            this.$refs[formName].resetFields();
            done()
          },
          handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val;
          },
          handleScore() {
            !this.multipleSelection.length ? this.$message.error('至少勾选一个题目') : this.scoreVisible = true
          }
        },
        created() {
        },
        beforeDestroy() {
          clearTimeout(this.timer)
        }
    }
</script>

<style lang="scss">
 .edit-test {
   padding-top: 10px;
   .test-name {
     text-align: center;
     background:rgba(250,250,250,1);
     padding-bottom: 16px;
     .title {
       font-size:25px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        padding-top: 22px;
     }
     .type {
       font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:40px;
        display: inline-block;
     }
   }
   .line {
     height: 1px;
     background:rgba(229,229,229,1);
   }
   .header {
     color: #333;
     font-size: 25px;
     padding-bottom: 20px;
   }
   .content {
     background-color: #FAFAFA;
     padding-left: 10px;
     .title-input {
       padding-top: 20px;
     }
   }
   .page {
      margin-top: 20px;
    }
   .el-table th, .el-table tr {
     background: #FAFAFA !important;
   }
   .el-radio__input {
      display: none;
    }
    .el-radio__label, .el-form-item__label {
      font-size: 12px;
    }
    .el-button+.el-button {
      margin-left: 0;
    }
    .score .el-form-item__content {
      display: inline-block;
    }
 }
</style>