<template>
    <el-main>
        编码器1
        <div id="editor">
        </div>
        编码器2
        <div id="editor2"></div>

        拿值
        <el-button @click="fn">11</el-button>

        函数解析
        <div>
            <p style="text-align:left"><span style="">如图，在平面直角坐标系</span><span style=""><em>xOy</em></span><span
                style="">中，函数</span><span class="math-tex">\(&nbsp;&nbsp;y=\frac{k}{x}\left&nbsp;(k\neq&nbsp;0\right&nbsp;)&nbsp;\)</span><span
                style="">的</span><span style="">图象</span><span style="">与直线</span><span style=""><em>y</em></span><span
                style="">＝</span><span style=""><em>x</em></span><span style="">+1</span><span style="">交于点</span><span
                style=""><em>A</em></span><span style="">（</span><span style="">1</span><span style="">，</span><span
                style=""><em>a</em></span><span style="">）．</span></p>
            <p style="text-align:left"><span style="">（</span><span style="">1</span><span style="">）求</span><span
                style=""><em>a</em></span><span style="">，</span><span style=""><em>k</em></span><span
                style="">的值；</span></p>
            <p style="text-align:left"><span style="">（</span><span style="">2</span><span style="">）连结</span><span
                style=""><em>OA</em></span><span style="">，点</span><span style=""><em>P</em></span><span
                style="">是函数</span><span class="math-tex">\(&nbsp;&nbsp;y=\frac{k}{x}\left&nbsp;(k\neq&nbsp;0\right&nbsp;)&nbsp;\)</span><span
                style="">上一点，且满足</span><span style=""><em>OP</em></span><span style="">＝</span><span
                style=""><em>OA</em></span><span style="">，直接写出点</span><span style=""><em>P</em></span><span style="">的坐标（点</span><span
                style=""><em>A</em></span><span style="">除外）．</span></p>
            <p style="text-align:left"><img
                src="http://testbank-file.oss-cn-shanghai.aliyuncs.com/images/20190719112856_35261411.png"
                style="width:124.49799416666666px;height:118.49809083333334px;"/></p>
        </div>
    </el-main>
</template>

<script>
    import api from '@/config/module/common'

    export default {
        name: "demo",
        data() {
            return {}
        },
        computed: {
            userInfo() {
                return this.$store.getters['userInfo/getUserInfo']
            },
            menuInfo() {
                return this.$store.getters['menuInfo/getMenuInfo']
            },
        },
        created() {
            // console.log(this)
        },
        mounted() {
            ckeditorInit();
            CKEDITOR.replace('editor2');
            MathJax.typesetPromise();
        },
        methods: {
            fn() {
                console.log(CKEDITOR.instances.editor2.getData())
                console.log(CKEDITOR.instances.editor.getData())
            }
        },

    }
</script>

<style scoped>

</style>