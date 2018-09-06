<template>
	<section>
		<div class="sky" :style="{display:display}"></div>
		<div >
			<div class="header">
				<div v-title>
					用户中心
				</div>
					<!-- 	<div class="title">用户中心</div> -->
				<div class="msg">
					<div  class="hLeft">
						<img class="headImg" :src="userInfo.headImg">
					</div>
					<div class="hCenter">
						<p class="name"><span class="hehe">{{userInfo.name}}</span><img class="sf" src="../../static/img/sf.png"></p>
						<p class="mobile">{{mobile}}</p>
					</div>

					
				</div>
			</div>
			<div class="notice">
				<router-link to="/notice" tag="span">
				<!-- <span class="nIcon">图标</span> -->
					<img class="nIcon" src="../../static/img/notice.png">
					<marquee class="marquee">
		            	<span>{{notice}}</span>
		          	</marquee>
	          	</router-link>
			</div>
			<div class="home">
				<router-link to="/lottery" tag="div">
					<div class="flex">
						<img class="icon" src="../../static/img/gcjl.png">
						<div class="h_title">购彩记录</div>
					</div>
				</router-link>
				<router-link to="/spendList" tag="div">
					<div class="flex">
						<img class="icon" src="../../static/img/xfjl.png">
						<div class="h_title">消费记录</div>
					</div>
				</router-link>
				<router-link to="/getlottery" tag="div">
					<div class="flex">
						<img class="icon" src="../../static/img/cpyj.png">
						<div class="h_title">彩票邮寄</div>
					</div>
				</router-link>
				<router-link :to="'/myExpend?promoterId='+generalInfo.promoterId" tag="div">
					<div class="flex" v-if="generalInfo.isPromoter">
						<img class="icon" src="../../static/img/wytx.png">
						<div class="h_title">我的推广</div>
					</div>
				</router-link>
				<router-link to="/beanRecord" tag="div">
					<div class="flex" >
						<img class="icon" src="../../static/img/jd.png">
						<div class="h_title">金豆记录</div>
					</div>
				</router-link>
				<router-link to="/shopOrder" tag="div">
					<div class="flex">
						<img class="icon" src="../../static/img/shangdd.png">
						<div class="h_title" @click="close()">商城订单</div>
					</div>
				</router-link>
					<!-- <div class="flex">
						<img class="icon" src="../../static/img/djdl.png">
						<div class="h_title" @click="close()">大奖代领</div>
					</div> -->
				<router-link to="/safe" tag="div">
					<div class="flex">
						<img class="icon" src="../../static/img/anquan.png">
						<div class="h_title">安全中心</div>
					</div>
				</router-link>
			</div>
			<div class="go_url">
				<!-- <router-link to="/myBankCard" tag="div"> -->
					<div class="my_bank" @click="close()" >
						<span class="go_title">我的银行卡</span>
						<img class="arrow" src="../../static/img/arrow.png">
						<span class="bank_sta">未绑定</span>
					</div>
				<!-- </router-link> -->
				<div class="line"></div>
				<router-link to="/help" tag="span">
					<div class="help" >
						<span class="go_title">帮助中心</span>
						<img class="arrow" src="../../static/img/arrow.png">
						
					</div>
				</router-link>
				<div class="line"></div>
				<router-link to="/concise" tag="span">
					<div class="about">
						<span class="go_title">关于中体华彩</span>
						<!-- <span class="arrow"></span> -->
						<img class="arrow" src="../../static/img/arrow.png">
						
					</div>
				</router-link>
				<div class="line"></div>
			</div>
		</div>
		<div class="footer">
			<a href="tel:4000081027">
			<img src="../../static/img/phone.png" alt="" class="icon_tel"><span class="tel">客服电话</span><span  class="tel_number">400-008-1027</span></a>
		</div>
		<div class="tui">
			<div @click="quit" class="btn_tui">退出登录</div>
		</div>

	</section>
</template>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				userInfo:'',
				generalInfo:'',
				mobile:store.get('_person').personal.mobile,
				notice:'今日多家银行发出公告,2018年6月16日至18日期间多家银行系统进行全国范围内维护升级！期间持系统升级相应的银行卡可能无法进行消费，相应结算银行卡的资金到账也将受到影响！',
				display:'block'
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
				this.$http.get(_config.server+'/merApi/user/home?token='+store.get('_person').token+'&type='+store.get('_person').type).then(res=>{
					setTimeout(()=>{
						Indicator.close();
					},300)
					if(res.data.status==1){
						this.display = 'none'
						this.userInfo = res.data.data.userInfo;
						this.generalInfo = res.data.data.generalInfo
					}
					console.log(res)
				},err=>{
					setTimeout(()=>{
						Indicator.close();
          				this.$router.push('/err')
					},1000)
				})
			},
			close(){
				console.log(1111111)
				Toast({duration: 1000,
					message:'暂未开放！'});
			},
			quit(){
				store.set('_person','')
				var href = window.location.href;
				store.set("_reherf", href);
				window.location.href=_config.user_login
			}
		}
	}
</script>
<style type="text/css" scoped>
	.sky{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		background:#fff;
	}
	.header{
		/*margin:0px 28px;*/
		background: #EA705B;
		height:100px;
		box-sizing: border-box;
		position: relative;
	}
	.quit{
		width:30px;
	}
	.title{
		height:30px;
		color:#fff;
		font-size: 18px;
		line-height: 30px;
		font-weight: bold;
		padding-top:10px;
	}
	.msg{
		/*width:100%;*/
		/*position: absolute;*/
		padding-top:15px;
		bottom:18px;
		margin:0 28px;
		overflow: hidden;
	}
	.hehe{
		float: left;
		width:100px;
		display: block;
   		text-overflow:ellipsis;
   		white-space: nowrap;
   		overflow: hidden;
	}
	.sf{
		float: left;
		width:30px;
		margin-left:10px;
	}
	.hLeft{
		width:65px;
		height:65px;
		float: left;
		/*border:1px solid #333;*/
	}
	.headImg{
		width:65px;
		height:65px;
		border-radius: 50%;
	}
	.hCenter{
		float: left;
		text-align: left;
		margin-left:15px;
	}
	.name,.mobile{
		height:32.5px;
		color:#fff;
		font-size: 18px;
	}
	.name{
		/*line-height: 40px;*/
		height:40px;
		box-sizing: border-box;
		padding-top:5px;
		overflow: hidden;
	}
	.mobile{
		font-size: 14px;
	}
	.hRight{
		float: right;
		line-height:55px;
		height:65px;
		color:#fff;
		font-size: 25px;
	}
	.notice{
		padding:15px 20px 5px 34px;
		position: relative;
		font-size: 12px;
		border-bottom:5px solid #EAEDF1;
	}
	.nIcon{
		position: absolute;
		left:20px;
		width:14px;
		height:17px;
	}
	.home{
		color:#101010;
		width:100%;
		height:170px;
		border-bottom:10px solid #EAEDF1;
		overflow: hidden;
		font-size: 12px;
	}
	.flex{
		float: left;
		width:25%;
		height:75px;
		padding-top:15px;
		box-sizing: border-box;
	}
	.icon{
		width:30px;
		height:30px;
		/*border:1px solid #333;*/
		margin:0 auto 5px;
		display: block;
	}
	.go_url{
		padding:0 24px;
		color:#999;
		font-size: 14px;
	}
	.my_bank,.help,.about{
		height:50px;
		line-height: 50px;
		width:100%;
		overflow: hidden;
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
	}
	.footer{
		margin-top: 17px;
		text-align: center;
		font-size: 12px;

	}
	.icon_tel{
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
		color:#E86036;
	}
	.tel{
		padding-left:10px;
		padding-right: 10px;
	}
	.tui{
		padding:16px;
	}
	.btn_tui{
		margin:0 auto;
		background:#EA705B;
		color:#fff;
		font-size: 12px;
		height:30px;
		line-height: 30px;
		border-radius: 15px;
		width:150px;
		font-weight: bold;
	}
</style>