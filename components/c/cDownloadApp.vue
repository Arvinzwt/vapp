<template>
	<view class="cDownloadApp" v-if="is_show">
		<image src="../../static/img/logo2.png" mode=""></image>
		<view>我在精锐在线收获满满！推荐你一起来学习！</view>
		<button @click="$U.appDownLoad()">立即打开</button>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				is_show:false
			}
		},
		methods:{
			show(){
				this.is_show = true
			},
			hide(){
				this.is_show = false
			}
		}
	}
</script>

<style lang="scss">
	.cDownloadApp{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: rgba(0,0,0,.5);
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		image{
			width: 68rpx;
			height: 68rpx;
		}
		view{
			font-size: 26rpx;
			display: flex;
			flex: 1;
			margin-left: 30rpx;
			margin-right: 70rpx;
		}
		button{
			height: 50rpx;
			line-height: 50rpx;
			border-radius: 50rpx;
			background-color: #EB3200;
			font-size: 20rpx;
			color: white;
		}
	}
</style>
