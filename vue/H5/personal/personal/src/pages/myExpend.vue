<template>
	<section>
		<div :style="{display:display}">
			<div v-title>我的推广</div>
			<div class="header">
				<div class="title">推广收益</div>
				<div class="num">{{info.promotProfit | currency('¥',2)}}</div>
				<div class="footer">
					<div class="today bot">
						<p class="top">{{info.currDayCommission | currency('¥',2)}}</p>
						<p class="bottom">今日佣金</p>
					</div>
					<div class="percent bot">
						<p class="top">{{info.commissionRate}}%</p>
						<p class="bottom">佣金比例</p>
					</div>
					<div class="equ bot">
						<p class="top">{{info.promoteEquips}}</p>
						<p class="bottom">推广设备</p>
					</div>
				</div>
				<div class="withdraw" @click="close()">提现</div>
			</div>
			<div class="go_url">
				<!-- <router-link to="/myBankCard" tag="div"> -->
					<div class="my_bank">
						<span class="go_title">我的业绩</span>
						<!-- <img class="arrow" src="../../static/img/arrow.png"> -->
						<span class="bank_sta">本月业绩{{info.myAchievement | currency('¥',2)}}</span>
					</div>
				<!-- </router-link> -->
				<div class="line"></div>
				<div class="help">
					<span class="go_title">我的佣金</span>
						<!-- <img class="arrow" src="../../static/img/arrow.png"> -->
						<span class="bank_sta">本月未结算佣金{{info.myCommission | currency('¥',2)}}</span>
					
				</div>
				<div class="line"></div>
				<router-link :to="'/myequalist?promoterId='+promoterId" tag="div">
					<div class="about">
						<span class="go_title">我的设备</span>
						<img class="arrow" src="../../static/img/arrow.png">
						
					</div>
				</router-link>
				<div class="line"></div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';

	export default{
		created(){
			this.query();
			console.log(this.promoterId)
		},
		data(){
			return{
				promoterId:'',
				info:"",
				display:'none'
			}
			
		},
		methods:{
			query(){
				Indicator.open({ 
					text: '加载中...',
  					spinnerType: 'double-bounce'});
				this.promoterId = this.$route.query.promoterId
		        this.$http.get(_config.server+'/merApi/user/promoter/myMoneyInfo?token='+store.get('_person').token+'&type=2&promoterId='+this.promoterId).then((res)=>{
		        	setTimeout(()=>{
						Indicator.close();
						this.display="block"
					},300)
		          console.log("推广员",res);
		       
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
            	
		    },
		    close(){
				Toast({duration: 1000,
					message:'暂未开放！'});
				console.log(111111)
			}

		},
			
	}
	
</script>
<style type="text/css" scoped>
	.header{
		padding-top:15px;
		background: #EA705B;
		color:#fff;
		position: relative;
	}
	.title{
		text-align: left;
		padding-left:42px;
		font-size: 12px;
	}
	.num{
		font-size: 28px;
		font-weight: bold;
		padding-left:70px;
		text-align: left;
	}
	.footer{
		overflow: hidden;
		font-weight: bold;
	}
	.bot{
		float: left;
		width:33.33333333%;
		font-size: 16px;
		padding:10px 0;
	}
	.top{
		font-size: 16px;
		line-height: 40px;
	}
	.bottom{
		font-size: 12px;
		line-height: 20px;
	}
	.withdraw{
		width:85px;
		height:38px;
		border:2px solid #fff;
		line-height: 38px;
		border-radius: 38px;
		position: absolute;
		right:25px;
		top:35px;
		font-weight: bold;
	}


	.go_url{
		padding:25px 24px 0;
		color:#999;
		font-size: 14px;
		font-weight: bold;
	}
	.my_bank,.help,.about{
		height:50px;
		line-height: 50px;
	}
	.go_title{
		float: left;
	}
	.arrow{
		float: right;
		/*border:1px solid #333;*/
		width:7px;
		height:12px;
		margin-top:18px;
		margin-left:5px;
	}
	.bank_sta{
		float: right;
		font-size: 12px;
	}


	@media (max-width: 320px){
		.title{
			padding-left:20px;
		}
		.num{
			padding-left:40px;
		}
	}
</style>