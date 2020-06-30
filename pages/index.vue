<template>
    <div>
        登录
        {{brand}}
    </div>
</template>

<script>
    export default {
        methods: {},
        computed:{
            brand(){
                return this.$dic.gitDic('brand')
            }
        },

    }
</script>

<style>

</style>
