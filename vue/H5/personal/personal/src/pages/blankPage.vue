<template>
	<section>
		<div class="img">
			<!-- 金豆记录 -->
			<img v-if="static=='bean'" class="empty" src="../../static/img/empty/bean.png">
			<!-- 购彩纪录 -->
			<img v-if="static=='lott'" class="empty" src="../../static/img/empty/lott.png">
			<!-- 商城订单 -->
			<img v-if="static=='shop'"  class="empty" src="../../static/img/empty/shop.png">
			<!-- 消费记录 -->
			<img v-if="static=='spend'" class="empty" src="../../static/img/empty/spend.png">
		</div>

	</section>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				static:""
			}
		},
		created(){
			console.log()
			this.query();
		},
		methods:{
			query(){
				this.static = this.$route.query.static
			}
		}
	}
</script>
<style type="text/css" scoped>
	.img{
		padding-top:70px;
	}
	.empty{
		width:200px;
	}
</style>