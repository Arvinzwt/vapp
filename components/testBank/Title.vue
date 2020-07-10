<template>
    <!--标题-->
    <div class="jr-title">
        <h2 class="title">
            <slot></slot>
        </h2>
        <slot name="expand"></slot>
    </div>
</template>

<script>
    export default {
        name: "Title",
    }
</script>

<style lang="scss">
    .jr-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title{
            font-size: 25px;
        }
    }
</style>