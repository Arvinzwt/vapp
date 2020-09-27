<template>
	<view :style="{height:value+'rpx','background-color':color}"></view>
</template>

<script>
	export default {
		props:{
			value:{
				default:"20"
			},
			color:{
				default:"#F7F7F7"
			}
		}
	}
</script>

<style>
</style>
