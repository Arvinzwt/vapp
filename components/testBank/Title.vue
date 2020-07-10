<template>
    <!--标题-->
    <div class="jr-title">
        <h2>
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

<style>
    .jr-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>