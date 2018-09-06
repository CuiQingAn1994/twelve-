<template>
	<section>
		<div v-title>订单详情</div>
		<div class="phone_box" v-if="order.type==2">
			<div class="phone">
				<input class="input" v-if="order.status==1" autofocus="autofocus" v-model="mobile" placeholder="请输入充值手机号" type="" name="">
				<input class="input" v-if="order.status!=1" v-model="mobile" placeholder="请输入充值手机号" disabled type="" name="">
				<span class="help">i</span>
			</div>
		</div>
		<div class="box">
			<div class="header">
				<span class="hl">订单号：{{order.code}}</span> 
				<span class="hr" v-if="order.status==2">已完成</span>
				<span class="nhr" v-if="order.status==1">待领取</span>
				<span class="nhr" v-if="order.status==3">充值失败</span>
				<span class="nhr" v-if="order.status==5">充值中</span>


			</div>
			<div class="con_box">
				<div class="content">
					<div class="left"><img class="icon" :src="order.imgUrl"></div>
					<div class="center">
						<div class="top">
							<p class="name">{{order.name}}</p>
							<p class="price">{{order.total}} 金豆</p>
						</div>
						<div class="mid">
							x{{order.count}}
						</div>
						<div class="time">{{order.createTime}}</div>
						<div class="bottom">
							共{{order.count}}件，合计:<b>{{order.count*order.total}}</b> 金豆
						</div>
					</div>
				</div>
			</div>		
		</div>
		<div class="line"></div>
		<p class="warm" v-if="order.status==3">话费充值失败，金豆已返还至金豆账户！</p>
		<div class="warm" v-if="order.type==3">
			<p class="title">温馨提示：</p>
			<p class="con_text">商城兑换的彩票请到华彩宝终端设备登陆，在个人中心进行彩票刮奖兑奖</p>
		</div>
		<div class="btn_box" v-if="order.type==2&&order.status==1">
			<div class="btn" @click="submit">确认提交</div>
		</div>
		<div class="warn">
			<a href="tel:4000081027">如有疑问请拨打客服：4000-081-027</a>
		</div>
	</section>
</template>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				id:"",
				order:{},
				mobile:""
			}
		},
		mounted(){
			this.query();
		},
		methods:{
			query(){
				this.token = store.get('_person').token
				this.id = this.$route.query.id;
				Indicator.open({ 
					text: '加载中...',
  					spinnerType: 'double-bounce'});
				this.$http.get(_config.server+'/merApi/user/mall/order/detail?token='+this.token+'&id='+this.id).then(res=>{
					console.log(res)
					setTimeout(()=>{
						Indicator.close();
					},300)
					if(res.data.status==1){
						this.order = res.data.data;
						this.mobile = this.order.mobile;
					}
				})
			},
			submit(){
				var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(!reg.test(this.mobile)){
					Toast({duration: 1000,
					message:'手机号格式不对！！！'});
					return;
				}
				let param = new FormData()
					param.append('token', this.token)
					param.append('id', this.id)
					param.append('mobile', this.mobile)
					Indicator.open({ 
						text: '提交中...',
	  					spinnerType: 'double-bounce'});
				this.$http.post(_config.server+'/merApi/user/mall/recharge/exchange',param).then(res=>{
					console.log(res)
					let success;
					if(res.data.status==1){
						setTimeout(()=>{
						
							Indicator.close();
						},300)
						setTimeout(()=>{
							success=Toast({
							  message: '提交成功',
							  iconClass: 'icon icon-success'
							});
						},300)
						
						setTimeout(()=>{
							success.close();
							this.$router.replace('/shopOrder');
						},2000)
					}else{
						setTimeout(()=>{
							Indicator.close();
						},300)
						setTimeout(()=>{
							success=Toast({
							  message: res.data.message,
							  iconClass: 'icon icon-success'
							});
						},300)
						setTimeout(()=>{
							success.close();
						},2000)
					}
				})
			}
		}
	}
</script>
<style type="text/css" scoped>
	.icon{
		width:100%;
		height:100%;
	}
	.phone_box{
		padding:11px 15px 20px;
	}
	.phone{
		width:100%;
		height:94px;
		border:2px dotted #00A9F4;
		border-radius: 4px;
		box-sizing: border-box;
		padding:17px 60px 17px 16px;
		position: relative;
	}
	.input{
		width:100%;
		height:100%;
		font-size: 18px;
		text-indent: 10px;
		border:none;
		outline: none;
	}
	input::placeholder{
		color:#888;
	}
	.help{
		position: absolute;
		width:24px;
		height:24px;
		font-size: 20px;
		border-radius: 50%;
		background: #00A9F4;
		line-height: 24px;
		font-weight: bold;
		color:#fff;
		right:35px;
		top:50%;
		transform: translateY(-50%);
	}
	.box{
		margin-bottom:10px;
	}
	.header{
		font-size: 12px;
		padding:10px 15px 5px 8px;
		overflow: hidden;

	}
	.hl{
		float: left;
	}
	.hr{
		float: right;
		padding:0 5px;
		/*border:1px solid #EA705B;*/
		color:#fff;
		background: #BEC2C9;
	}
	.nhr{
		float: right;
		padding:0 5px;
		/*border:1px solid #EA705B;*/
		color:#fff;
		background: #EA705B;
	}
	.con_box{
		padding:0 8px;
	}
	.content{
		overflow: hidden;
		padding:5px 5px 5px 5px;
		text-align: left;
		position: relative;
		background: #E5E5E5;


	}
	.left{
		float: left;
		width:90px;
		height:90px;
		/*border:1px solid #666;*/
		margin-right:10px;
	}
	.center{
		/*float: left;*/
		width:100%;
		box-sizing: border-box;
		padding-left:100px;
		font-size: 14px;
		position: relative;
	}
	.top{
		font-size: 14px;
		overflow: hidden;
		color:#101010;
	}
	.name{
		/*float: left;*/
		position: absolute;
		width:100px;
		text-align: left;
		line-height: 24px;
	}
	.price{
		color:#E51C23;
		font-weight: bold;
		font-size: 12px;
	}
	.top,.mid,.bottom{
		line-height: 24px;
		text-align: right;
		font-size: 12px;
	}
	.bottom{
		color:#4A4C4F;
		/*font-weight: bold;*/
	}
	.right{
		float: right;
		line-height: 80px;
		font-weight: bold;
	}
	.time{
		/*position: absolute;*/
		font-size: 12px;
		color:#666;
		text-align: right;
	}
	.warm{
		padding:20px 10px;
		text-align: left;
		font-size: 14px;
	}
	.con_text{
		font-size: 12px;
	}
	.btn_box{
		/*position: absolute;*/
		bottom:100px;
		padding:0 20px;
		margin-top:100px;
		width:100%;
	}
	.btn{
		width:100%;
		height:45px;
		background: #108EE9;
		line-height: 45px;
		text-align: center;
		border-radius: 5px;
		color:#fff;
		font-size: 14px;
		font-weight: bold;
	}
	.warn{
		/*position: fixed;
		bottom:26px;*/
		text-align: center;
		color:#101010;
		font-size: 12px;
		width:100%;
		padding-top: 100px;

	}
	@media (max-width: 320px){
		.name{
			width:80px;
		}
	}

</style>
