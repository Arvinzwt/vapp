<template>
    <div class="jr-paperManage-paperList">
        <div class="paper" v-for="item in paperInfo.list" :key="item.paperId">
            <p class="paper-top">
                <span class="paper-top-title">{{item.paperName}}</span>
                <span class="paper-top-set">删除</span>
                <span class="paper-top-set">试卷分析</span>
                <span class="paper-top-set">试卷预览</span>
                <span class="paper-top-set" @click="toPaperEdit">试卷编辑</span>
                <span class="paper-top-set" @click="bace">基础设置</span>
            </p>
            <p class="paper-middle">
                <span>分类：{{item.yearName}} > {{item.provinceName}}{{item.cityName}}{{item.districtName}} > {{item.gradeName}} > {{item.examTypeName}}</span>
            </p>
            <p class="paper-bottom">
                <span>试卷号：{{item.paperId}}</span>
                <span>浏览数：{{item.viewCount}}</span>
                <span>下载量：{{item.downloadCount}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    import Title from '~/components/testBank/Title.vue'

    export default {
        name: "paperList",
        components: {
            Title
        },
        data() {
            return {}
        },
        props: {
            paperInfo: {//数据
                type: Object,
                default: {
                    list: []
                },
            },
        },
        created() {
        },
        mounted() {

        },
        destroyed() {
        },
        methods: {
            bace() {
                console.log('来啦老弟',this.paperInfo)
            },
            toPaperEdit() {
                this.$r.go('1-5')
            },
        }
    }
</script>

<style lang="scss" scoped>
    .jr-paperManage-paperList {
        width: 100%;
        margin-top: 42px;
        box-sizing: border-box;
        padding-right: 18px;
        .paper {
            height: 104px;
            box-sizing: border-box;
            padding: 13px 17px;
            p {
                height: 26px;
                line-height: 26px;
                margin: 0;
                span {
                    line-height: 26px;
                }
                .paper-top-title {
                    font-weight: bold;
                }
                .paper-top-set {
                    float: right;
                    color: #4186EE;
                    margin-left: 20px;
                    cursor: pointer;
                }
            }
            .paper-bottom {
                span {
                    margin-right: 10px;
                }
            }
        }
        .paper:nth-child(2n+1) {
            background: #F5F5F5;
        }
    }
</style>
