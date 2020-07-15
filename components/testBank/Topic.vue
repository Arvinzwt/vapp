<template>
    <!--单个题目编辑/修改-->
    <div class="jr-topic">
        <el-form
            :model="paramMap"
            :rules="rules"
            ref="ruleForm"
            class="jr-filter-form box"
            size="mini"
            label-width="70px"
            label-position="left">
            <el-form-item label="题型" prop="qType">
                <el-radio-group v-model="paramMap.qType.value" @change="selectTypeHandle">
                    <el-radio v-for="item in paramMap.qType.options" :key="item.typeId" :label="item.typeId">
                        {{item.typeName}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>

            <div v-for="(item,ind) in paramMap.itemList" :key="item.tagName">
                <el-form-item
                    :label="item.tagName"
                    :rules="getRule(item)"
                    :prop="`itemList[${ind}].value`">
                    <!--有限值-->
                    <div v-if="item.tagType===1">
                        <linkGroup v-model="item.value" :options="item.options"></linkGroup>
                    </div>

                    <!--普通文本-->
                    <div v-if="item.tagType===4" class="wid-300">
                        <el-input v-model="item.value" placeholder="请输入"
                                  :type="item.parameterCode === 'questionScore'?'number':''"></el-input>
                    </div>

                    <!--复杂文本-->
                    <div v-if="(item.tagType===2||item.tagType===3)">
                        <div :id="item.fId"></div>
                    </div>
                </el-form-item>
            </div>

            <el-form-item label="" v-if="paramMap.itemList.length>0">
                <el-button type="primary" @click="saveOnlineTest">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import api from '@/config/module/testBank'
    import linkGroup from '~/components/testBank/LinkGroup.vue'


    export default {
        name: "Topic",
        components: {
            linkGroup,
        },
        data() {
            return {
                paramMap: {
                    qType: {
                        value: '',
                        options: [],//题型
                    },
                    itemList: [],//题目列表
                },

                //校验规则
                rules: {
                    // rul: {
                    // required(val) {
                    //     console.log(val);
                    //     return true
                    // },
                    // validator: (rule, value, callback) => {
                    //     if (/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)) {
                    //         callback();
                    //     } else {
                    //         callback(new Error('请输入正确的满减条件'));
                    //     }
                    // },

                    // }
                    // rul: {
                    //     validator(rule, value, callback, source, options) {
                    //         // console.log(rule)
                    //         // console.log(value)
                    //         // console.log(callback)
                    //         // console.log(source)
                    //         console.log(options)
                    //
                    //         // test if email address already exists in a database
                    //         // and add a validation error to the errors array if it does
                    //         // return errors;
                    //     }
                    // }
                },
            }
        },
        props: {
            param: {
                type: Object,
                default: {
                    topicId: '',//id
                    subjectId: '',//学科
                    phaseId: '',//学段
                }
            }
        },
        mounted() {
            this.initHandle();
            this.getQuestionType();//拉取题型列表
        },

        methods: {
            /**
             *@desc 初始化处理
             */
            initHandle() {
                // ckeditorInit();
                // CKEDITOR.replace('editor2');
                // CKEDITOR.replace('editor3');
                // CKEDITOR.replace('editor4');
                // CKEDITOR.replace('editor5');
                // CKEDITOR.replace('editor6');
                // CKEDITOR.replace('editor7');
                // CKEDITOR.replace('editor8');
                // CKEDITOR.replace('editor9');
            },

            /**
             *@desc 拉取题型列表
             */
            async getQuestionType() {
                this.paramMap.qType.options = (await api.getQuestionType({
                    subjectId: this.param.subjectId,
                    phaseId: this.param.phaseId,
                })) || [];
            },

            /**
             *@desc 选择题型时-拉取题目内容
             */
            selectTypeHandle(val) {
                api.getItemByTypeId({
                    typeId: val
                }).then(res => {
                    res = res || {};//兼容处理
                    let itemList = [];//刷新后的题目内容
                    res.itemList = res.itemList || [];//兼容处理

                    //先去掉富文本框
                    // this.itemList.forEach((item, index) => {
                    //     if (item.tagType === 3 || item.tagType === 2) {
                    //         CKEDITOR.remove(item.fId);
                    //     }
                    // });

                    //循环请求到的数据，添加结构
                    res.itemList.map(async (item, index) => {
                        let obj = {
                            ...item,
                            value: '',//值
                            options: [],//选项
                            fId: `editor${index}`,//富文本id
                        };

                        if (item.tagType === 1) {//如果是selected 填充选项
                            obj.options = await (api.getParameterInfoByCode({
                                paramCode: item.parameterCode, status: 1
                            })) || [];
                        }

                        itemList.push(obj);
                    });

                    //赋值
                    this.paramMap.itemList = itemList;

                    //生成富文本
                    this.$nextTick(() => {
                        this.paramMap.itemList.forEach((item, index) => {
                            if (item.tagType === 3 || item.tagType === 2) {
                                if (!CKEDITOR.instances[item.fId]) {//如果之前未生成，生成一次
                                    CKEDITOR.replace(item.fId);
                                }
                            }
                        });
                    })
                })
            },

            /**
             *@desc 题目表单验证规则
             */
            getRule(item) {
                return {
                    required: item.mandatory,
                    message: `请输入${item.tagName}内容`,
                }
            },

            /**
             *@desc 提交数据时
             */
            saveOnlineTest() {
                // CKEDITOR.instances.editor.setData('<p>测试数据</p>');
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {//如果验证通过
                        api.insertOne({
                            // subjectId: this.paramMap.subjectId,
                            // phaseId: this.paramMap.phaseId,
                            // knowledgeIds: this.docParamMap.knowledgeIds.syncIds.concat(this.docParamMap.knowledgeIds.specIds),
                            // ...this.detectParam.questions,
                        }).then(res => {
                            this.$emit('change');
                            this.$message.success('导入成功');
                        })
                    } else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .jr-topic {
        .wid-300 {
            width: 300px;
        }
    }
</style>