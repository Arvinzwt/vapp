<template>
    <!--选择渠道-->
    <div class="jr-customer-selected-channel">
        <!--渠道大类-->
        <el-col :span="6">
            <el-form-item label="渠道大类">
                <el-select v-model="model.bigChannelId" placeholder="请选择" clearable>
                    <el-option
                            v-for="item in dic.bigclass"
                            :key="item.classid"
                            :label="item.classname"
                            :value="item.classid">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <!--渠道小类-->
        <el-col :span="6">
            <el-form-item label="渠道小类">
                <el-select v-model="model.smallChannelId" placeholder="请选择" clearable>
                    <el-option
                            v-for="(item,index) in smallChannelList"
                            :key="index"
                            :label="item.classname"
                            :value="item.classid">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
    </div>
</template>

<script>
export default {
    data() {
        return {
            smallChannelList: [],//渠道小类列表
        }
    },
    computed: {
        dic() {//字典
            return this.$store.state.dic;
        },
    },
    watch: {
        async 'model.bigChannelId'(val) {//监听渠道大类值，赋值渠道小类
            this.model.smallChannelId = '';
            let bigclass = this.dic.bigclass.find(item => {
                return item.classid === val
            })
            let bigclassname = bigclass ? bigclass.classname : '';
            this.smallChannelList = val ? await this.$api.common.smallclass({
                bigclassname,
                "deptids": ""
            }) : [];

            this.$emit('update', {
                ...this.model,
                bigChannelId: val,//渠道大类
                smallChannelId: '',//渠道小类
            })
        },
        async 'model.smallChannelId'(val) {//监听渠道大类值，赋值渠道小类
            this.$emit('update', {
                ...this.model,
                bigChannelId: this.model.bigChannelId,//渠道大类
                smallChannelId: val,//渠道小类
            })
        }
    },
    model: {
        prop: 'model',
        event: 'update'
    },
    props: {
        model: {//绑定值
            type: Object,
            default() {
                return {
                    bigChannelId: '',//渠道大类
                    smallChannelId: '',//渠道小类
                }
            }
        },
    },
}
</script>

<style lang="scss">

</style>