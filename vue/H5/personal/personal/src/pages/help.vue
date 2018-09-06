<template>
	<div class="info">
		<div v-title>帮助中心</div>
		<div class="margin">
			<p class="title">热门问题</p>
			<div class="content">
				<router-link tag="span" to="/helpAnswer?question=0">
					<p class="row">
						<span class="text">如何获取金豆？</span><span class="jiantou">></span>
					</p>
				</router-link>
				<p class="line"></p>
				<router-link tag="span" to="/helpAnswer?question=1">
					<p class="row">
						<span class="text">如何购买顶呱刮彩票？</span><span class="jiantou">></span>
					</p>
				</router-link>
				<p class="line"></p>
				<router-link tag="span" to="/helpAnswer?question=2">
					<p class="row">
						<span class="text">如何进入个人中心？</span><span class="jiantou">></span>
					</p>
				</router-link>
				<p class="line"></p>
				<router-link tag="span" to="/helpAnswer?question=3">
					<p class="row">
						<span class="text">顶呱刮如何兑奖和领奖？</span><span class="jiantou">></span>
					</p>
				</router-link>
				<p class="line"></p>
				<router-link tag="span" to="/helpAnswer?question=4">
					<p class="row">
						<span class="text">彩票中了大奖怎么办？</span><span class="jiantou">></span>
					</p>
				</router-link>
				<p class="line"></p>
				<router-link tag="span" to="/helpAnswer?question=5">
					<p class="row">
						<span class="text">如何获取纸质彩票？</span><span class="jiantou">></span>
					</p>
				</router-link>
				<p class="line"></p>
			</div>
			<div class="footer">
				<a href="tel:4000081027">
				<img src="../../static/img/phone.png" alt="" class="icon"><span class="tel">客服电话</span><span  class="tel_number">400-008-1027</span></a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		}

	}
</script>

<style scoped>
.info{
  width:100%;
  /*height:100vh;*/
  text-align: left;
}

.margin{
  padding:10px;
}
.title{
	color: #999999;
	font-size: 14px;
	padding: 10px 0;
}
.content{
	margin: 0 10px;
}
.row{
	margin: 0 10px;
	height: 40px;
	line-height: 40px;
	font-size: 14px;
}
.jiantou{
	float: right;
}

.footer{
	margin-top: 30px;
	text-align: center;
}
.icon{
	display: inline-block;
	width: 16px;
	height: 16px;
	/*border: 1px solid red;*/
	vertical-align: top;
	margin-top: 6px;
}
.tel,.tel_number{
	display: inline-block;
	height: 31px;
	line-height: 31px;
	font-size: 12px;
	color:#E86036;
	
}
.tel{
	margin: 0 10px;
}
	
</style>













