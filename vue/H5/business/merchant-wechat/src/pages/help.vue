<template>
	<div class="info">
		<div v-title>帮助中心</div>
		<div class="margin">
			<p class="title">热门问题</p>
			<div class="content">
				<p class="row">
					<span class="text">提现到账时间？</span><span class="jiantou">></span>
				</p>
				<p class="line"></p>
				<p class="row">
					<span class="text">提现会产生费用吗？</span><span class="jiantou">></span>
				</p>
				<p class="line"></p>
				<p class="row">
					<span class="text">如何关联银行卡？</span><span class="jiantou">></span>
				</p>
				<p class="line"></p>
				<p class="row">
					<span class="text">怎么结算？</span><span class="jiantou">></span>
				</p>
				<p class="line"></p>
				<p class="row">
					<span class="text">提现到账时间？</span><span class="jiantou">></span>
				</p>
				<p class="line"></p>
				<p class="row">
					<span class="text">提现到账时间？</span><span class="jiantou">></span>
				</p>
				<p class="line"></p>
				<p class="row">
					<span class="text">提现到账时间？</span><span class="jiantou">></span>
				</p>
				<p class="line"></p>
				<p class="row">
					<span class="text">提现到账时间？</span><span class="jiantou">></span>
				</p>
				<p class="line"></p>
			</div>
			<div class="footer">
				<a style="text-decoration:none;color:#101010" href="tel:4000081027"><img src="../../static/images/phone@2x.png" alt="" class="icon"><span class="tel">客服电话</span><span class="tel_number">400-008-1027</span></a>
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
  height:100vh;
}

.margin{
  margin: 20px;
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
	width: 25px;
	height: 25px;
	vertical-align: top;
	margin-top: 2px;
}
.tel,.tel_number{
	display: inline-block;
	height: 31px;
	line-height: 31px;
}
.tel{
	margin: 0 10px;
}
	
</style>













