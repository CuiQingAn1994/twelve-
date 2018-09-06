<template>
	<section>
		<div v-title>我的银行卡</div>
		<!-- 未绑定银行卡 -->
		<div v-if="static==1" class="notBind">
			<div class="addCard"><span class="add">＋</span><span class="card">添加银行卡</span></div>
		</div>
		<!-- 已绑定银行卡	 -->
		<div v-if="static==2" class="binded">
			<div class="bankCard">
				<!-- <div class="bankImg">银行icon</div> -->
				<div class="bankMsg">
					<p class="bankName">{{bankName}}</p>
					<p class="bankType">{{bankType}}</p>
					<p class="cardNum">{{cardNum}}</p>
				</div>
				<div class="company">中体＊＊公司</div>
			</div>
			<!-- <div class="unBind">
				解绑银行卡
				<span class="arrow"></span>
			</div> -->
		</div>
		<div class="warm_tips">
			<div class="warm_t">
				温馨提示
			</div>
			<div class="warm_1">
				1.为了减少账户风险,每个用户仅能绑定一张银行卡；
			</div>
			<div class="warm_2">
				2.客户端目前不支持银行卡的解绑或更换；
			</div>
		</div>
		<div class="warn">
			<span class="warn_img">图</span>
			如遇到问题，请联系客服
			<span class="phone">400-101-1234</span>
		</div>
	</section>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				static:2,
				bankName:'工商银行',
				bankType:'储蓄卡',
				cardNum:'**** **** **** 8888'
			}
		}
	}
</script>
<style type="text/css" scoped>
	.notBind,.binded{
		padding:10px;
	}
	.addCard{
		border:1px dotted #3BA5D7;
		height:123px;
		border-radius: 5px;
		position: relative;
	}
	.add,.card{
		position:absolute;
		
		height:24px;
		line-height: 24px;	
	}
	.add{
		width:24px;
		border-radius: 50%;
		border:2px solid #3BA5D7;
		left:55px;
		top:41px;
		color:#3BA5D7;
		font-weight: bold;
	}
	.card{
		left:95px;
		top:41px;
		height:26px;
		line-height: 26px;
		font-size: 18px;
		color:#999;
	}
	.bankCard{
		height:123px;
		border-radius: 5px;
		position: relative;
		background: #00A9F4;

	}
	.bankImg{
		position: absolute;
		width:50px;
		height:50px;
		border:1px solid #fff;
		left:15px;
		top:10px;
	}
	.bankMsg{
		position: absolute;
		left:25px;
		top:11px;
		color:#fff;
	}
	.bankName,.bankType{
		text-align: left;
		font-size: 18px;
	}
	.bankType{
		font-size: 14px;
		padding-top:5px;
	}
	.cardNum{
		padding-top:14px;
		font-size: 20px;
		font-weight: bold;
		text-indent: 18px;
	}
	.company{
		position: absolute;
		right:23px;
		top:14px;
		color:#fff;
		font-size: 14px;
	}
	.warm_tips{
		text-align: left;
		margin: 0 19px;
	}
	.warm_t{
		font-size: 16px;
		font-weight: bold;
		line-height: 56px;
	}
	.warm_1{
		font-size: 14px;
		margin-bottom:12px;
	}
	.warm_2{
		font-size: 14px;
	}
	.warn{
		position: fixed;
		bottom:23px;
		left:50%;
		transform:translateX(-50%);
		width:100%;
		font-size: 14px;
		font-weight: bold;

	}
	.phone{
		color:#3BA5D7;
	}
	/*.unBind{
		margin-top:21px;
		background: #E5E5E5;
		height:38px;
		line-height: 38px;
		padding-left:20px;
		text-align: left;
		color:#101010;
		position: relative;
	}
	.arrow{
		position: absolute;
		width: 24px;
		height: 24px;
		right:7px;
		top:50%;
		transform:translateY(-50%);
		border:1px solid #444;
	}*/
</style>