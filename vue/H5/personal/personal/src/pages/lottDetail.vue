<template>
	<section>
		<div :style="{display:display}">
			
			<div v-title>购彩详情</div>
			<div class="top">
				<div class="row">
					<span class="label">订单号：</span>
					<span class="content">{{info.code}}</span>
				</div>
				<div class="row">
					<span class="label">购买时间：</span>
					<span class="content">{{info.createTime | formDate}}</span>
				</div>
				<div class="row">
					<span class="label">彩种：</span>
					<span class="content">{{info.ticketSortName}}</span>
				</div>
				<div class="row">
					<span class="label">所属区域：</span>
					<span class="content">{{info.prvcName}}</span>
				</div>
				<div class="row">
					<span class="label">面值：</span>
					<span class="content">¥{{info.ticketMoneyName}}</span>
				</div>
				<div class="row">
					<span class="label">数量：</span>
					<span class="content">{{info.amount}}<span v-if="info.isPack==0">张</span><span v-if="info.isPack==1">包</span></span>
				</div>
				<div class="row">
					<span class="label">已刮奖：</span>
					<span class="content">{{info.cashed}}</span>
				</div>
				<div class="row">
					<span class="label">合计：</span>
					<span class="content">¥{{info.price}}</span>
				</div>
				<div class="row">
					<span class="label">支付方式：</span>
					<span class="content">{{info.payType}}</span>
				</div>
			</div>
			<div class="bottom">
				<div class="b_row">
					<span class="b_label">终端所属区域：</span>
					<span class="b_content">{{info.merchantArea}}</span>
				</div>
				<div class="b_row">
					<span class="b_label">消费终端名称：</span>
					<span class="b_content">{{info.deviceName}}</span>
				</div>
				<div class="b_row">
					<span class="b_label">终端设备编号：</span>
					<span class="b_content">{{info.deviceNo}}</span>
				</div>
				<div class="b_row">
					<span class="b_label">设备所属商户：</span>
					<span class="b_content">{{info.merchantName}}</span>
				</div>
			</div>
			<div class="intro">
				备注说明：未刮奖的彩票,请到华彩宝终端机上进行开奖
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';

	export default{
		data(){
			return{
				code:"",
				info:"",
				display:'none'
			}
		},
		created(){
			this.query();
		},
		methods:{
			query(){
				Indicator.open({ 
					text: '加载中...',
  					spinnerType: 'double-bounce'});
				this.code = this.$route.query.code
				this.$http.get(_config.server+'//merApi/user/userBuyTickets/details?token='+store.get('_person').token+'&type=2&code='+this.code).then((res)=>{
		          console.log("推广员",res);
		       		setTimeout(()=>{
						Indicator.close();
						this.display = 'block'
					},300)
			          if(res.data.status == 1){
			            // _this.getData = res.data.data;

			            this.info  = res.data.data;
			           
			          }
		        },(err)=>{
		          console.log(err);
		          setTimeout(()=>{
						Indicator.close();
					},300)
		        })
			}
		}
	}
</script>
<style type="text/css" scoped>
	.top{
		/*border-top:22px solid #EAEDF1;*/
		text-align: left;
		border-bottom:1px dashed  #EAEDF1;
		padding:10px 0;
		color:#101010;
		font-size: 16px;

	}
	.row{
		padding: 8px 22px;

	}
	.label{
		width:81px;
		display: inline-block;
		text-align: right;
		margin-right:20px;
		color:#666;
	}
	.bottom{
		padding:25px 10px 45px;
		text-align: left;
	}
	.b_row{
		padding:8px 0;
	}
	.b_label{
		color:#666;
	}
	.intro{
		position: fixed;
		font-size: 12px;
		text-align:center;
		width:100%;
		height:45px;
		line-height: 45px;
		background: #EAEDF1;
		bottom:0;
	}
	@media (max-width: 320px){
		.label{
			margin-right:10px;
		}
		.top,.bottom{
			font-size: 14px;
		}
	}
</style>