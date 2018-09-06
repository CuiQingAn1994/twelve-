<template>
	<section>
		<div  class="box">
			<div v-title>帮助中心</div>
			<div v-if="question==index" v-for="(item,index) in info">
				<!-- <div v-title>{{item.question}}</div> -->
				<h1 style="font-size: 16px;font-weight: bold;">{{item.question}}</h1>
				<p v-for="item1 in item.answer">{{item1}}</p>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				info:[
					{
						question:'如何获取金豆？',
						answer:['方式一：可在“个人中心”或“金豆商城”界面，点击【充值金豆】进行充值。','方式二：您可以在“休闲娱乐”版块，玩游戏赢金豆。']
					},
					{
						question:'如何购买顶呱刮彩票？',
						answer:['在首页的“体彩顶呱刮”版块，选择彩种，在详情页中进行购买。']
					},				
					{
						question:'如何进入个人中心？',
						answer:['登录终端后，点击首页右上角的头像，进入“个人中心”。在“个人中心”版块，可充值金豆、查看彩票订单和金豆记录等功能。']
					},				
					{
						question:'顶呱刮如何兑奖和领奖？',
						answer:['兑奖：使用“微信”或者“支付宝”的【扫一扫】，扫描彩票的兑奖二维码，进行兑奖。','领奖：扫码兑奖后，在微信零钱或支付宝账户查看奖金。奖金到账可能会有延迟，请耐心等待一会儿。']
					},				
					{
						question:'彩票中了大奖怎么办？',
						answer:['当您兑奖时，如果提示您中了大奖并需要去体彩中心兑奖时，请先联系我司客服人员400-008-1027，获取您的纸质彩票。']
					},				{
						question:'如何获取金豆？',
						answer:['方式一：在终端设备的“个人中心”界面，点击【索要彩票】按钮，根据提示进行操作。','方式二：在华彩宝公众号的”个人中心“界面，点击【索要彩票】按钮，根据提示进行操作。']
					},
				],
				question:'haha'
			}
		},
		mounted(){
			this.question = this.$route.query.question;
		}
	}
</script>
<style type="text/css" scoped>
	section{
		background: #f6f6f6;
		height:100vh;
	}
	.box{
		font-size: 14px;
		text-align: left;
		padding:15px;
		line-height: 25px;
		padding-top:20px;
		background: #fff;
		box-sizing: border-box;
	}
</style>
