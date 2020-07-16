<template>
  <el-main>
    <div class="preview-test">
        <div v-for="item in data.questionList" :key="item.innerOrder">
            <div v-html="item.htmlContent">{{item.htmlContent}}</div>
            <div v-for="items in item.questionItems" :key="items.innerOrder">
                <div v-html="items.htmlContent"></div>
            </div>
            <div v-html="item.htmlAnswer">{{item.htmlAnswer}}</div>
        </div>
    </div>
  </el-main>
</template>

<script>
import paperapi from '@/config/module/paperManage'
export default {

  name: 'PreviewTest',
  // layout: 'blank',
  data() {
      return {
          query: {
             paperId: ''
          },
          data: {},
          question: []
      }
  },
  created() {
      this.query.paperId = this.$route.query.paperId;
      console.log(this.query)
      this.getQuestion()
  },
  mounted() {

  },
  methods: {
      /**
      *@desc 根据试卷Id获取试卷题目内容
      */
      getQuestion() {
          paperapi.getPaperQuestion({ paperId: this.query.paperId }).then(res => {
              this.data = res.data
              this.question = res.data.questionList.concat(res.data.testpaperTextList)
              this.question.sort((a,b) => {
                  return a.innerOrder -b.innerOrder
              })
              console.log('res', this.question)
          })
      }
  }
}
</script>

<style lang="scss" scoped>

</style>
