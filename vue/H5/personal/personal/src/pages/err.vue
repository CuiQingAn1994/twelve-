<template>
	<section>
		<div v-title>
			错误！
		</div>
		<div class="box" @click="refresh()">
			<img class="err" src="../../static/img/err.png">
			<p class="warn">页面走丢了</p>
			<p class="re">点击页面刷新重试</p>
		</div>
	</section>
</template>
<script type="text/javascript">
	export default{
		methods:{
			refresh(){
				this.$router.go(-1)
			}
		}
	}
</script>
<style type="text/css" scoped>
	.box{
		padding-top:40px;
		height:100vh;
		text-align: center;
	}
	.err{
		width:60%;
	}
	.warn{
		padding-top:20px;
		font-size: 20px;
		line-height: 60px;
		color:#999;
	}
	.re{
		color:#666;
		font-size: 16px;
	}

</style>