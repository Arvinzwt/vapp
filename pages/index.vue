<template>
  <div class="container">
    <el-button>
      <span class="iconfont icon-alipay"></span>
    </el-button>
  </div>
</template>

<script>
  export default {
    components: {},
    created() {
      this.$underscore.each([123,234],(key,value,list)=>console.log(key,value,list))}
  }
</script>

<style lang="scss">

</style>
