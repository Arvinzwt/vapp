<template>
    <!--题目列表-->
    <el-main class="jr-topList">
        <!--操作栏-->
        <div class="operation-bar">
            <el-checkbox :label="0" size="mini">全选</el-checkbox>
            <el-button plain size="mini" type="primary">批量修改知识点</el-button>
            <el-button plain size="mini" type="primary">批量发布</el-button>
            <el-button plain size="mini" type="primary">批量删除</el-button>
        </div>

        <!--题目列表-->
        <div class="draft-main">
            <div class="draft-main-item" v-for="item in topicData" :key="item.questionId">

                <!--题目状态栏-->
                <div class="draft-main-head">
                    <div class="draft-main-head-item">
                        <el-checkbox>编号：{{item.questionId}}</el-checkbox>
                    </div>
                    <div class="draft-main-head-item">状态：{{item.status}}</div>
                    <div class="draft-main-head-item">上传时间：{{item.createdTime}}</div>
                    <div class="draft-main-head-item">所在城市：{{item.cityId}}</div>
                    <div class="draft-main-head-item">题型：{{item.typeStr}}</div>
                </div>
                <div class="draft-main-body">
                    <!-- {{item.htmlContent}}-->
                    <div v-html="item.htmlContent"></div>
                </div>
                <div class="draft-main-foot">
                    <el-link type="primary" class="draft-main-foot-item font-basic" @click="showTestResolve(item)">
                        <span>解析</span>
                        <span v-show="!item.showResolve" class="el-icon-arrow-down"></span>
                        <span v-show="item.showResolve" class="el-icon-arrow-up"></span>
                    </el-link>
                    <el-link @click="changeTitleType" type="primary" class="draft-main-foot-item font-basic">更换题型
                    </el-link>
                    <el-link @click="addTag" type="primary" class="draft-main-foot-item font-basic">打标签</el-link>
                    <el-link @click="editTitle" type="primary" class="draft-main-foot-item font-basic">编辑</el-link>
                    <el-link @click="releaseTitle" type="primary" class="draft-main-foot-item font-basic">发布
                    </el-link>
                    <el-link @click="deleteTitle" type="primary" class="draft-main-foot-item font-basic">删除
                    </el-link>
                </div>

                <div class="draft-main-other" v-show="item.showResolve">
                    <!--<div>该题目没有解析</div>-->
                    <!--解析-->
                    <div v-html="item.htmlAnalyse"></div>
                    <!--解答-->
                    <div v-html="item.htmlReply"></div>
                    <!--答案-->
                    <div v-html="item.htmlAnswer"></div>
                </div>
            </div>
        </div>

        <!--分页-->
        <pagination v-model="pagesInfo" @change="pageChange"></pagination>

        <!--更换题型弹窗-->
<!--        <el-dialog-->
<!--            :close-on-click-modal="false"-->
<!--            :close-on-press-escape="false"-->
<!--            :show-close="false"-->
<!--            modal-->
<!--            :title="dialog.type===1?'题型变更':'打标签'"-->
<!--            :visible.sync="dialog.show">-->

<!--            <el-form-->
<!--                class="jr-filter-form"-->
<!--                size="mini"-->
<!--                label-width="90px"-->
<!--                label-position="left">-->

<!--                <el-form-item label="学科">学科1</el-form-item>-->

<!--                <div v-if="dialog.type===1">-->
<!--                    <el-form-item label="学段">学段1</el-form-item>-->
<!--                    <el-form-item label="题型">-->
<!--                        <el-radio v-model="dialog.form.typeId" label="1">题型1</el-radio>-->
<!--                        <el-radio v-model="dialog.form.typeId" label="2">题型2</el-radio>-->
<!--                    </el-form-item>-->
<!--                </div>-->

<!--                <div v-if="dialog.type===2">-->
<!--                    <el-form-item label="题型">题型1</el-form-item>-->

<!--                    <el-form-item label="所属知识点">-->
<!--                        <div class="knowledge-wrap mar-l-15 mar-b-15">-->
<!--                            &lt;!&ndash;同步&ndash;&gt;-->
<!--                            <div class="knowledge-wrap-item">-->
<!--                                <div class="knowledge-wrap-left">-->
<!--                                    <KnowledgeTree v-model="dialog.form.knowledgeIds1">同步-->
<!--                                    </KnowledgeTree>-->
<!--                                </div>-->
<!--                                <div class="knowledge-wrap-right jr-tag">-->
<!--                                    <div class="jr-tag-item" v-for="item in dialog.form.knowledgeIds1"-->
<!--                                         :key="item.knowledgeId">-->
<!--                                        <span>{{item.name}}</span>-->
<!--                                        <span @click="removeKnowledge(item,1)" class="icon el-icon-close"></span>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->

<!--                            &lt;!&ndash;专题&ndash;&gt;-->
<!--                            <div class="knowledge-wrap-item">-->
<!--                                <div class="knowledge-wrap-left">-->
<!--                                    <KnowledgeTree v-model="dialog.form.knowledgeIds2" :type="2">专题-->
<!--                                    </KnowledgeTree>-->
<!--                                </div>-->
<!--                                <div class="knowledge-wrap-right jr-tag">-->
<!--                                    <div class="jr-tag-item" v-for="item in dialog.form.knowledgeIds2" :key="item.name">-->
<!--                                        <span>{{item.name}}</span>-->
<!--                                        <span @click="removeKnowledge(item,2)" class="icon el-icon-close"></span>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </el-form-item>-->

<!--                    <el-row :gutter="18">-->
<!--                        <el-col :span="12">-->
<!--                            <el-form-item label="年份">-->
<!--                                <el-input></el-input>-->
<!--                            </el-form-item>-->
<!--                        </el-col>-->
<!--                        <el-col :span="12">-->
<!--                            <el-form-item label="来源">-->
<!--                                <el-input></el-input>-->
<!--                            </el-form-item>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
<!--                    <el-row :gutter="18">-->
<!--                        <el-col :span="12">-->
<!--                            <el-form-item label="省份">-->
<!--                                <el-input></el-input>-->
<!--                            </el-form-item>-->
<!--                        </el-col>-->
<!--                        <el-col :span="12">-->
<!--                            <el-form-item label="城市">-->
<!--                                <el-input></el-input>-->
<!--                            </el-form-item>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
<!--                    <el-row :gutter="18">-->
<!--                        <el-col :span="12">-->
<!--                            <el-form-item label="类别">-->
<!--                                <el-input></el-input>-->
<!--                            </el-form-item>-->
<!--                        </el-col>-->
<!--                        <el-col :span="12">-->
<!--                            <el-form-item label="难度">-->
<!--                                <el-input></el-input>-->
<!--                            </el-form-item>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
<!--                    <el-row :gutter="18">-->
<!--                        <el-col :span="12">-->
<!--                            <el-form-item label="排列">-->
<!--                                <el-input></el-input>-->
<!--                            </el-form-item>-->
<!--                        </el-col>-->
<!--                        <el-col :span="12">-->
<!--                            <el-form-item label="分支">-->
<!--                                <el-input></el-input>-->
<!--                            </el-form-item>-->
<!--                        </el-col>-->
<!--                    </el-row>-->

<!--                    <el-form-item label="备注">-->
<!--                        <el-input type="textarea"></el-input>-->
<!--                    </el-form-item>-->

<!--                    <el-form-item label="能力">-->
<!--                        <div class="jr-tag hover">-->
<!--                            <div class="jr-tag-item mar-r-15 active">问题解决</div>-->
<!--                            <div class="jr-tag-item mar-r-15">空间观念</div>-->
<!--                            <div class="jr-tag-item mar-r-15">基本运算</div>-->
<!--                        </div>-->
<!--                    </el-form-item>-->
<!--                </div>-->

<!--            </el-form>-->
<!--            &lt;!&ndash;<div>注意！选择题或多选题更改为其他题型时，选项会被清空!!! 刷新页面后生效</div>&ndash;&gt;-->
<!--            <div slot="footer" class="dialog-footer">-->
<!--                <el-button size="mini" @click="closeDialog">取 消</el-button>-->
<!--                <el-button size="mini" @click="submitDialog" type="primary">提 交</el-button>-->
<!--            </div>-->

<!--        </el-dialog>-->

    </el-main>
</template>

<script>
    import Pagination from '~/components/testBank/Pagination.vue'
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import KnowledgeTree from '~/components/testBank/KnowledgeTree.vue'
    import api from '@/config/module/testBank'


    export default {
        name: "TopicList",
        components: {
            Pagination,
            linkGroup,
            KnowledgeTree
        },
        data() {
            return {
                // 分页信息
                pagesInfo: {
                    pageNum: 1,//页码
                    pageSize: 1,//页宽
                    totalNum: 0,//总条数
                },

                topicData: [
                    {
                        "questionId": 1000658580,
                        "questionUuid": "620e9175-657f-4a9c-9b2f-9459a757f93c",
                        "parentQuestionId": null,
                        "subjectId": 8,
                        "phaseId": 14,
                        "gradeId": 66,
                        "status": 2,
                        "typeId": 55,
                        "difficultyId": 152,
                        "categoryId": 101,
                        "yearId": 268,
                        "useTimes": null,
                        "provinceId": 9,
                        "cityId": 887,
                        "remark": null,
                        "createdBy": 3448,
                        "creator": "龚灿",
                        "createdTime": "2019-07-15 17:41:51",
                        "updatedBy": 3448,
                        "updatedTime": "2019-07-15 17:41:51",
                        "auditBy": null,
                        "auditTime": null,
                        "sourceId": 204,
                        "accuracy": null,
                        "itemRule": 3,
                        "score": 0,
                        "questionType": 2,
                        "rightTimes": null,
                        "wrongTimes": null,
                        "undoTimes": null,
                        "paperTimes": null,
                        "useCount": null,
                        "analyse": null,
                        "htmlAnalyse": `<div class="col-md-12 col-sm-12 col-xs-14" name="nowrap" style="margin-top:1%" id="analyse_20132638">【分析】<br><p style="text-align:jstuify"></p><p style="text-align:left"><span style="">此题考查虚词的使用，要清楚各个虚词的用法，所以课下要注意积累。从内容可以判断此处表示对前文的条件满足得出“有为”之意，所以应填写“乃”，答案为A。</span></p><p style="text-align:jstuify"><span style="">考查了对段落的内容理解，从“茂树恶木，嘉</span><span style="">葩</span><span style="">毒</span><span style="">卉</span><span style="">，乱杂而争植，号为秽</span><span style="">墟</span><span style="">。”可以看出是文章内容并没有说到永州城的树木花卉都是毒物。</span></p><p style="text-align:left"><span style="">本题考查句子的语言表现力，主要从遣词造句、语言风格、表现手法和修辞手法上分析，首先修辞手法上主要抓住明显的</span><span style="">拟人、比喻等修辞手法，然后结合上下文得出前后对比，写出了一处风光佳景焕然一新的气象</span><span style="">。其次从句式这块，主要是短句和整句的运用，短促有力。</span></p><p style="text-align:left"><span style="">本题主要考查文章句段的作用。针对此类题型，要明确从内容和结构两方面进行答题。题目</span><span style="">明确问</span><span style="">“关联全文”，即从结构上思考照应、对比等关系，“立意的点睛之笔”即要求从内容主旨上思考作者的写作目的。</span></p><p style="text-align:left"><span style="">译文：</span></p><p style="text-align:left"><span style="">&thinsp;&thinsp;&thinsp;&thinsp;如果打算在城邑营造幽谷、峭壁和深池，那就必须运载山石，开凿山涧沟壑，逾越险阻，耗尽人力，才可能办到。可是要想有那种天造地设的景致，则不能做到。而不必耗费民力，顺应地形，且能保持天然之美，这种在过去很难办到的事情，如今在这里出现了。</span><span style="">
　　永州在九嶷山麓，最初在这里测量规划的人，也曾环绕着山麓建起了城市。这里有山石，却被茂密的草丛遮蔽着；这里有清泉，却埋藏在污泥之下，成了毒蛇盘踞，</span><span style="">狸鼠出没</span><span style="">的地方。嘉树和</span><span style="">恶木</span><span style="">，鲜花与毒草，混杂一处，竞相疯长。因此被称为荒凉的地方。</span><span style="">
　　</span><span style="">韦公来到</span><span style="">永州，过了一个月，州政大治，没有多少事情。望着这块土地，感到它很不平常，才让人铲除荒草，挖去污泥。</span><span style="">铲</span><span style="">下来的草堆积如山，疏通后的泉水晶莹清澈。烧掉了杂草，疏通了清泉，奇特的景致层出不穷。清秀和污浊分开了，美景代替了荒凉。看那树木，则清秀挺拔，枝叶舒展；看那湖水，则微波荡漾，曲折萦回。怪石森然繁密，环绕四周。有的排列成行，有的如同跪拜，有的</span><span style="">站立，有的卧倒。石洞曲折幽深，石山突兀高耸。于是在此建造厅堂，作为观赏游玩的地方。所有的怪石无不适应地形地势，献技于堂</span><span style="">庑</span><span style="">之下。新堂的外边，高原和山连接，林木覆盖的山脚悬崖，穿插交错，或隐或现。绿色的原野从近处伸向远方，跟碧蓝的天空连成了一体。这一切，都汇集在门楼之内。</span><span style="">
　　新堂盖好后，使君便邀请客人前来参观，接着又设宴娱乐。有的边赞誉，边祝贺说：“看到您修建这新堂，便知道您的心志。您随着地势开辟出胜景，难道不就是想顺着当地的风俗来形成教化吗？您铲除恶木毒草而保留嘉树鲜花，难道不就是想铲除凶暴而保护仁者吗？您挖除污泥而使清泉流淌，难道不就是想除去贪污而提倡廉洁吗？您登临高处而纵目远望，难道不就是想让每个家庭都安定和富饶吗？既然这样，那么建这个新堂难道仅仅是为了草木土石清泉流水怡人心意，或是为了观赏山峦、原野和树林的景色吗？该是希望即使今后治理这个州的人，能够通过这件小事，懂得治民的大道理啊。”宗元请求把这篇记文镌刻在石板上，嵌在墙里，编入书中，作为刺史的楷模法式。</span></p><br>【答案】<br><p style="text-align:left"></p><p style="text-align:left"><span style="">21.（1分）A</span></p><p style="text-align:left"><span style="">22.（2分）C</span></p><p style="text-align:left"><span style="">23.(4分)答案示例：此段写景，恰当地运用拟人、比喻等修辞手法，由内及外、再由近及远，前后对比，写出了一处风光佳景焕然一新的气象。语言四字句为主，两两相对，整齐短促有力。</span></p><p style="text-align:left"><span style="">24.(5分)答案示例:&thinsp;第④段画线部分，句句与上文呼应，借“新堂”的“清浊美恶”“居高望远”等深刻变化，与上文①②段永州先前自然风貌形成对比，回扣</span><span style="">第③段新堂修建的过程及景色描写，也呼应开篇“逸其人，因其地，全其天，昔之所难，今于是乎在”的总领句，全文前后浑为一体，结构严密。</span></p><p style="text-align:left"><span style="">&thinsp;&thinsp;&thinsp;&thinsp;从立意上看，此处由“新堂”引出</span><span style="">对韦公善政</span><span style="">益民的吏治思想的赞颂，赞颂他居高望远、顺应民情、铲除残暴、废除贪污、保护贤良和施行富民政策，彰</span><span style="">显文章</span><span style="">以治理“新堂”设喻吏治理想的用意，表现了柳宗元的政治抱负和寄望，是全文立意的点晴之笔。</span></p></div>`,
                        "reply": null,
                        "htmlReply": null,
                        "appraise": null,
                        "htmlAppraise": null,
                        "answer": "",
                        "htmlAnswer": "",
                        "content": "",
                        "htmlContent": `<p style="text-align:left"><span style="">如图，在平面直角坐标系</span><span style=""><em>xOy</em></span><span
                                style="">中，函数</span><span class="math-tex">\\(&nbsp;&nbsp;y=\\frac{k}{x}\\left&nbsp;(k\\neq&nbsp;0\\right&nbsp;)&nbsp;\\)</span><span
                                style="">的</span><span style="">图象</span><span style="">与直线</span><span style=""><em>y</em></span><span
                                style="">＝</span><span style=""><em>x</em></span><span style="">+1</span><span style="">交于点</span><span
                                style=""><em>A</em></span><span style="">（</span><span style="">1</span><span style="">，</span><span
                                style=""><em>a</em></span><span style="">）．</span></p>
                            <p style="text-align:left"><span style="">（</span><span style="">1</span><span style="">）求</span><span
                                style=""><em>a</em></span><span style="">，</span><span style=""><em>k</em></span><span
                                style="">的值；</span></p>
                            <p style="text-align:left"><span style="">（</span><span style="">2</span><span style="">）连结</span><span
                                style=""><em>OA</em></span><span style="">，点</span><span style=""><em>P</em></span><span
                                style="">是函数</span><span class="math-tex">\\(&nbsp;&nbsp;y=\\frac{k}{x}\\left&nbsp;(k\\neq&nbsp;0\\right&nbsp;)&nbsp;\\)</span><span
                                style="">上一点，且满足</span><span style=""><em>OP</em></span><span style="">＝</span><span
                                style=""><em>OA</em></span><span style="">，直接写出点</span><span style=""><em>P</em></span><span style="">的坐标（点</span><span
                                style=""><em>A</em></span><span style="">除外）．</span></p>
                            <p style="text-align:left"><img
                                src="http://testbank-file.oss-cn-shanghai.aliyuncs.com/images/20190719112856_35261411.png"
                                style="width:124.49799416666666px;height:118.49809083333334px;"/></p>`,
                        "testPaperId": null,
                        "testPaperUuid": null,
                        "testPaperName": null,
                        "questionItems": null,
                        "knowledgeIdList": null,
                        "abilityIdList": null,
                        "subjectStr": "英语",
                        "phaseStr": "初中",
                        "gradeStr": "九年级",
                        "typeStr": "书面表达",
                        "difficultyStr": "一般",
                        "categoryStr": "学校精品题",
                        "yearStr": "2019",
                        "sourceStr": "月考",
                        "provinceStr": "上海",
                        "cityStr": "上海",
                        "baseTypeId": null,
                        "questionOrder": null,
                        "questionFlag": true,
                        showResolve: false,
                    }
                ],
                dialog: {
                    show: false,
                    type: 1,
                    form: {
                        subjectId: '',
                        typeId: '',

                        knowledgeIds1: [],
                        knowledgeIds2: [],
                    },
                    rules: {}
                },

                options: {
                    subjectList: [],
                    typeList: [],
                }
            }
        },
        async created() {
            //填充学科和学段
            this.options.phaseList = await api.getParameterInfo({paramCode: 'Phase', status: 1});
            this.options.subjectList = await api.getParameterInfo({paramCode: 'Subject', status: 1});
        },
        mounted() {
            MathJax.typesetPromise();
        },
        methods: {
            pageChange(val) {
                console.log(val)
            },
            showTestResolve(obj) {
                obj.showResolve = !obj.showResolve;
            },
            changeTitleType() {
                // this.$message('更换题型')
                this.dialog.type = 1;
                this.dialog.show = true;
            },
            addTag() {
                this.dialog.type = 2;
                this.dialog.show = true;
                // this.$message('添加标签?')
            },
            editTitle() {
                // 题目编辑页
                this.$r.go('0-6', {type: 1})
            },
            releaseTitle() {
                this.$confirm('确定发布吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res => {
                    this.$message.success('发布成功')
                }).catch(err => {

                })
            },
            deleteTitle() {
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res => {
                    this.$message.success('删除成功')
                }).catch(err => {

                })
            },
            submitDialog() {
                if (this.dialog.type === 1) {
                    // this.$confirm('注意！选择题或多选题更改为其他题型时，选项会被清空!!! 刷新页面后生效', '提示', {
                    //     confirmButtonText: '确定',
                    //     cancelButtonText: '取消',
                    //     type: 'warning'
                    // }).then(() => {
                    //     this.$message.success('修改成功');
                    //     this.dialog.show = false;
                    // }).catch(err => {
                    //
                    // })
                    this.$message.success('修改成功');
                    this.dialog.show = false;
                }else{
                    this.$message.success('修改成功');
                    this.dialog.show = false;
                }

            },
            closeDialog() {
                this.dialog.show = false;
            },
            removeKnowledge() {

            }
        }
    }
</script>

<style lang="scss">
    .jr-topList {
        margin: 0;
        padding: 0;

        .el-checkbox__label {
            font-size: 12px;
        }

        .wrap {
            padding: 20px 15px;
        }

        .operation-bar {
            .el-button {
                margin-left: 20px;
            }

            margin-bottom: 20px;
        }

        .draft-main {
            .draft-main-item {
                margin-bottom: 50px;
            }

            .draft-main-head {
                display: flex;
                margin-bottom: 10px;
            }

            .draft-main-head-item {
                font-weight: bolder;
                margin-right: 55px;
            }

            .draft-main-body {
                margin-bottom: 20px;
                padding: 0 15px;
            }

            .draft-main-foot {
                display: flex;
            }

            .draft-main-foot-item {
                margin-right: 55px;
            }
        }

        .draft-main-other {
            padding: 10px 15px 0;
        }
    }
</style>