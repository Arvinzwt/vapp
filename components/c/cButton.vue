<template>
	<button class="border text-white rounded-circle font-md" hover-class="hover" :style="{'line-height':height+'rpx','background-color':bgColor,'border-color':borderColor}" @click="clickFun">
		<slot></slot>
	</button>
</template>

<script>
	export default{
		props:{
			height:{
				type:[Number,String],
				default:95
			},
			bgColor:{
				type:String,
				default:'#EB3200'
			},
			borderColor:{
				type:String,
				default:'#EB3200'
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			clickFun(e){
				this.$emit('click',e)
			}
		}
	}
</script>

<style>
	.hover{
		opacity: .5;
	}
</style>
