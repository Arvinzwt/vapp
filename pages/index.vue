<template>
    <el-main class="wmm-demo">
        <div id="fId"></div>
    </el-main>
</template>

<script>

export default {
    head: {
        script: [
            {src: '/libs/ckeditor4/ckeditor.js'},
            {src: '/libs/ckeditor4/samples/js/sample.js'},
            {src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'},
        ]
    },
    data() {
        return {
            textarea: false
        }
    },
    mounted() {
        this.textarea = CKEDITOR.replace('fId');//保存富文本操作对象
        this.getTextarea();
        this.textarea.on('change', function (event) {
            localStorage.setItem('textarea', this.getData())
        });
    },
    methods: {
        getTextarea() {
            let textarea = localStorage.getItem('textarea');

            if (textarea) {
                this.textarea.setData(textarea)
            }
        },
    }
}
</script>

<style lang="scss">
.wmm-demo {
    padding-top: 0;
}
</style>
