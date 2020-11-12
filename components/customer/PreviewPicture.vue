<template>
    <!--预览图片-->
    <el-dialog class="jr-customer-preview-picture" :visible.sync="dialog.show" :close-on-click-modal="false"
               :append-to-body="true" :title="dialog.name" custom-class="jr-dialog" width="500px">
        <!--弹窗内容-->
        <div class="dialog-body">
            <img :src="dialog.src" alt="" class="w-100">
        </div>
        <!--弹窗尾部-->
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="dialog.show=false" type="primary">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "PreviewPicture",
    data() {
        return {
            dialog: {
                show: false,
                name: '',
                src: ''
            }
        }
    },
    methods: {
        open(obj) {
            this.dialog.name = obj.name||'';
            this.dialog.src = obj.url;
            this.dialog.show = true;
        }
    }
}
</script>

<style lang="scss">

</style>