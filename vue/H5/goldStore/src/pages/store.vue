<template>
	<section class="bg" :style="{backgroundImage: 'url(' + bg + ')'}" >
		<!-- 首页 -->
		<div class="site">
			<!-- 关闭 --> 
			<img class="close" ref="quit" @touchstart="quitsmall" @touchend="closeAll" src="../../static/img/icon_gb.png" alt="">
			<!-- logo -->
			<div class="logo">
				<img src="../../static/img/logo.png" alt="">
			</div>
			<!-- 推送消息 -->
			<div class="notice" :style="{backgroundImage: 'url(' + noticeBg + ')'}">

				<marquee direction="up" scrolldelay= "4" scrollamount="3">
				<!-- <p>恭喜我的****哈哈哈哈小胡，获得50元话费</p> -->
				<p v-for="item in notification">{{item}}</p>

				<!-- <p>恭喜...，获得顶呱刮-点石成金1张</p>
				<p>恭喜哈哈哈，获得20元话费。</p>
				<p>恭喜daming，获得30元话费。</p>
				<p>恭喜吾皇万岁，获得20元话费。</p>
				<p>恭喜小猴子，获得30元话费。</p>
				<p>恭喜种花家种草，获得50元话费。</p>	 -->
			</marquee>
			</div>
			<!-- 金豆余额 -->
			<div class="bean_num":style="{backgroundImage: 'url(' + beanBg + ')'}" ref="bean" @touchstart="beanbig" @touchend="charge">
				{{goldNum}}
				<img src="../../static/img/chongzhi.png" class="add">
			</div>
			<!-- 推荐logo -->
			<div class="recommend">
				<img src="../../static/img/rmtj.png" alt="">
			</div>
			<!-- 商品 -->
			<div class="something">
				<div class="in_something" :style="{width:590+(590*Math.ceil(list.length/2))+'px'}">
					<div class="swiperha">
					    	<mt-swipe :height="590"	 :auto="4000">
			  					<mt-swipe-item :key="index" v-for="(itemImg,index) in bannerImg"><img style="width:590px;height:590px;" :src="itemImg.url"></mt-swipe-item>
							</mt-swipe>
		
					</div>
					<!-- <div class="right" > -->
					<div class="shop" ref="shop" style="height:595px;overflow: hidden;">
						<div class="right" :ref="index" @touchstart="scale(index)" @touchmove="normal(index)" v-for="(item,index) in list" @touchend="buy(index,item.name,item.coinCount,item.price,item.introduction,item.type,item.url,item.id)" :style="{marginBottom:(index+1)<=Math.ceil(list.length/2)?'50px':'0px'}" >
							<img v-if="item.recommend==1" src="../../static/img/tuijian.png" class="tuijian">
							<div class="r_icon"><img class="in_icon" :src="item.url"></div>
							<div class="r_r">
								<p class="r_msg1">{{item.coinCount}}金豆</p>
								<p class="r_msg2">参考价：{{item.price}}元</p>
								<p class="r_msg3">销量{{item.sales}}</p>
							</div>
							<div class="b_msg">{{item.name}}</div>
						</div>
					</div>
					
				</div>				
			</div>
			<div class="tips">中体华彩提示您：请按需选购，理性消费</div>
		</div>
		<!-- 购买窗口 -->
		<transition name="fade">
			<div class="window" v-if="popWindow">
				<div class="pop_up">
					<div class="pop_top">
						<div class="l_icon"><img class="in_icon" :src="url"></div>
						<div class="r_msg">
							<p class="title">{{name}}</p>
							<p class="price">
								<span class="bean">{{coinCount}}<span style="font-size: 22px">金豆</span></span>
								<span class="money">参考价:{{price}}元</span>
							</p>
							<p class="num">
								<span  v-if="type!=2">
									<span class="name">数量：</span>
									<span class="jian" @click="reduce" >－</span>
									<span class="shu">{{num}}</span>
									<span class="jia" @click="add" >＋</span>
								</span>
								
								<!-- <span class="sheng" @click="add">剩余（1000份）</span> -->
							</p>
							<p class="btn" @touchstart="sure">立即兑换</p>
							<p class="intro">奖品介绍：{{intro}}</p>
						</div>
					</div>
					<div class="pop_bottom">
						<h5 class="d_title">兑换说明</h5>
						<p class="d_intro">1、兑换成功后，请尽快填写领取信息，以保证商品收货无误；</p>
						<p class="d_intro">2、若应收件信息填写错误导致的损失，平台不予承担；</p>
						<p class="d_intro">3、顶呱刮类商品兑换成功后请到“个人中心-彩票订单”中进行刮奖兑奖；</p>
						<p class="d_intro">4、话费兑换需填写正确的手机号，以保证话费充值无误；</p>
						<p class="d_intro">5、若订单遇到问题或有疑问请及时联系客服：400-008-1027；</p>
					</div>
					<img src="../../static/img/icon_gb2.png" @click="closeW" class="sureGb">
				</div>
				
			</div>
		</transition>
		<!-- 确认购买 -->
		<transition name="fade">
			<div class="window" v-if="sureBuy" >
				<div class="sure">
					<div class="sure_title">确认支付</div>
					<div class="sure_msg">确认商品信息无误后请点击“确认”完成兑换！</div>
					<div class="sure_b">
						<div class="left_b"><img class="sure_img" :src="url"></div>
						<div class="rigth_b">
							<p class="s_name">商品：{{name}}</p>
							<p class="s_num">数量：{{num}}</p>
							<p class="s_bean">支付金豆：{{coinCount*num}}</p>
						</div>
					</div>
					<div class="btn_box">
						<div class="cancal"  @click="closeS">取消</div>
						<div class="go" @click="toBuy" >确认</div>
					</div>
		<!-- 			<img src="../../static/img/icon_gb2.png" @click="closeS" class="sureGb"> -->
				</div>
				
			</div>
		</transition>
		<!-- 兑换成功 -->
		<transition name="fade">
			<div class="window" v-if="lott_success">
				<div class="sure">
					<div class="sure_title">兑换成功</div>
					<div class="sure_msg success_msg">彩票兑换成功，请到“个人中心-彩票订单”中进行 刮奖、兑奖，祝好运连连~</div>
					<div class="sure_b">
						<div class="left_b"><img class="sure_img" :src="lott_url"></div>
						<div class="rigth_b">
							<p class="s_name">名称：{{lott_name}}</p>
							<p class="s_num">数量：{{lott_count}}</p>
							<p class="s_bean">面值：{{lott_price}}元</p>
						</div>
					</div>
					<img src="../../static/img/icon_gb2.png" @click="closeL" class="sureGb">
				</div>
				
			</div>
		</transition>
		<!-- 二维码 -->
		<!-- <transition name="fade"> -->
			<div class="window" v-if="qrWindow">
				<div class="sure">
					<div class="sure_title">兑换成功</div>
					<div class="sure_msg">兑换成功，请扫描下方二维码填写领取信息！</div>
					<div class="qr">
						<div id="qrcode"></div>
					</div>
					<img src="../../static/img/icon_gb2.png" @click="closeQr" class="sureGb">
				</div>
				
			</div>
		<!-- </transition> -->
		<!-- 失败 -->
		<transition name="fade">
			<div class="window" v-if="fail">
				<div class="sure">
					<p class="fail_msg">{{fail_msg}}</p>
					<div class="fail_btn" @click="failMsg">确定</div>
				</div>
			</div>
		</transition>
	</section>
</template>
<script>
	import Swiper from 'swiper';
	import Bg from '../../static/img/bg.png'
	import bBg from '../../static/img/bBg.png'
	import laba from '../../static/img/laba.png'


	import QRCode from 'qrcodejs2';
	import { Indicator } from 'mint-ui';

	export default{
		name: 'carrousel',
	    data() {
	      return {
	      	token:"",
	      	snNo:"",
	      	goldNum:0,	// 金豆
	      	list:[],// 商品列表
	      	name:"",//商品名称
	      	coinCount:0,//金豆价格
	      	price:0,//商品价格
	      	intro:"",//商品简介
	      	type:0,//商品类型 1是彩票 2是话费
	      	url:"",//商品图片
	      	bannerImg:[],//轮播图
	      	idx:-1,


	      	lott_name:"",
	      	lott_url:"",
	      	lott_count:1,
	      	lott_code:"",
	      	id:"",
	      	bg:Bg,
	      	beanBg:bBg,
	      	noticeBg:laba,
	      	popWindow:false,
	      	sureBuy:false,
	      	num:1,
	      	lott_success:false,
	      	qrWindow:false,
	      	fail:false,
	      	fail_msg:"",
	      	big:'big right',
	      	small:'small right',
	      	// xiaoxi:
	      	notification:['恭喜...，获得顶呱刮-点石成金1张']
	      }
	    },
	    mounted(){	    	
		   this.query();
		   this.stopTouchendPropagationAfterScroll();
		   // 生成二维码
		   // this.banner();
		   // this.$socket.emit('hcb_mall_exchange');

		},
		sockets:{
			connect: function(){  //这里是监听connect事件
				console.log('连接成功！')
    		},
		    hcb_mall_exchange(val){
		    	console.log(val)
		    	// this.xiaoxi = val;
		    	this.notification.unshift(val)
		    	
		    }
		},
		methods:{
			// touchmove 不触发touchend
			stopTouchendPropagationAfterScroll(){
			    var locked = false;
			    // console.log(this.$refs.shop)
			    this.$refs.shop.addEventListener('touchmove', function(ev){
			        locked || (locked = true, window.addEventListener('touchend', stopTouchendPropagation, true));
			    }, true);
			    function stopTouchendPropagation(ev){
			        ev.stopPropagation();
			        window.removeEventListener('touchend', stopTouchendPropagation, true);
			        locked = false;
			    }
			},
			query(){
				this.token = this.$route.query.token;
				this.snNo =  this.$route.query.deviceNo;
				this.swipers();
	    		this.banner();
				// console.log(this.token)
				this.userInfo();
				this.shopList();
		   		Indicator.open('加载中...');
			},
			// 轮播
			swipers(){
				new Swiper ('.swiper-container', {
				    loop: true,
				    autoplay:true,
				    pagination: {
		    			el: '.swiper-pagination',
		    			loop:true
		 			},
		 			navigation: {
					  nextEl: '.swiper-button-next',
					  prevEl: '.swiper-button-prev',
					},
				})
			},
			// 用户信息
			userInfo(){
				this.$http.get(_config.server+'/api/mbr/user/profile?token='+this.token).then(res=>{
					console.log('用户',res)
					if(res.data.status==1){
						this.goldNum = res.data.data.goldCoin
					}
				})
			},
			// 轮播图
			banner(){
				this.$http.get(_config.server+'/api/mall/posters?snNo='+this.snNo+'&token='+this.token).then(res=>{
					// console.log('轮播图',res)
					if(res.data.status==1){
						this.bannerImg = res.data.data;
					}
				})
			},
			// 商品列表
			shopList(){
				// console.log(this.snNo)
				this.$http.get(_config.server+'/api/mall/products?snNo='+this.snNo+'&token='+this.token).then(res=>{
					// console.log('列表',res)
					setTimeout(function(){
						Indicator.close()
					},300)
					if(res.data.status==1){
						this.list = res.data.data
						
					}
				})
			},
			quitsmall(){
				this.$refs.quit.style.transform='scale(0.9,0.9)';
			},
			closeAll(){
				// console.log('关闭')
				this.$refs.quit.style.transform='scale(1,1)';
				setTimeout(()=>{
					window.hcbWeb.close();
				},300)
			},
			// 按下动画
			scale(index){
				this.$refs[index][0].style.transform='scale(0.9,0.9)'
				// console.log(this.$refs[index][0].style)
			},
			// 移动
			normal(index){
				setTimeout(()=>{
					this.$refs[index][0].style.transform='scale(1,1)'
				},300)
				// console.log(index)
			},
			// 点击购买
			buy(index,name,coinCount,price,intro,type,url,id){
				this.$refs[index][0].style.transform='scale(1,1)'
				// return;

				this.popWindow = true;
				this.name = name;
				this.coinCount = coinCount;
				this.price = price;
				this.intro = intro;
				this.type = type;
				this.url = url;
				this.id = id;
			},
			closeW(){
				this.popWindow = false;
				this.num = 1;
			},
			reduce(){
				this.num--;
				if(this.num<=1){
					this.num=1
				}
			},
			add(){
				this.num++;
			},
			// 立即支付
			sure(){
				// 打开确认页
				this.sureBuy = true;
				// 关闭购买页
				this.popWindow = false;
			},
			// 关闭确认购买页
			closeS(){
				this.sureBuy = false;
				this.num = 1;
			},
			// 购买彩票成功
			toBuy(){
				this.sureBuy = false;
				Indicator.open('加载中...');
				let param = new FormData()
					param.append('token', this.token)
					param.append('id', this.id)
					param.append('count', this.num)
				this.$http.post(_config.server+'/api/mall/exchange',param).then(res=>{
					// console.log(res)
					setTimeout(()=>{
						if(res.data.status==1){
							if(res.data.data.type==3){
								this.lott_name = res.data.data.name;
								this.lott_price = res.data.data.price;
								this.lott_count = res.data.data.count;
								this.lott_url = res.data.data.imgUrl;
								this.lott_success = true;
							}else{
								
								this.qrWindow =  true;
			   					setTimeout(()=>{
			   						this.qrcode();
			   					},10)
							}
		   					
							this.num = 1;
							this.userInfo();
							this.shopList();

						}else {
							this.fail = true;
							this.fail_msg = res.data.message;
						}
						
						Indicator.close()
					},300)
					

					

				})
				// this.lott_success = true;
				
			},
			// 关闭购买彩票页
			closeL(){
				this.lott_success = false;
				this.num = 1;
			},
			// 关闭二维码
			closeQr(){
				this.qrWindow = false;
			},
			// 生成二维码
			qrcode () {
		      let qrcode = new QRCode('qrcode', {
		        width: 200,
		        height: 200, // 高度
		        text: _config.url+'/wx/personal/index.html#/shopOrder' // 二维码内容
		        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
		        // background: '#f0f'
		        // foreground: '#ff0'
		      })
		      // console.log(qrcode)
			},
			// 失败信息
			failMsg(){
				this.fail = false;
				this.num = 1;
			},
			charge(){
				this.$refs.bean.style.transform='scale(1,1)'
				console.log('吊起充值')
				var that = this;
				window.hcbWeb.openGameChargePage('ZTHV1JDSC231F9023DD8');
				window.chargeSuccess=function(){
					that.userInfo();
				}
			},
			beanbig(){
				// console.log(this.$refs.bean)
				this.$refs.bean.style.transform='scale(0.9,0.9)'
			}
		}   
	}
</script>
<style type="text/css" scoped>
	
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
	  opacity: 0
	}
	.bg{
		/*background-image: url('../../static/img/bg.png');*/
		height:1080px;
		position: relative;
	}
	/*首页*/
	.close{
		position: absolute;
		top:30px;
		right:60px;
	}
	.logo{
		position: absolute;
		left:60px;
		top:57px;
	}
	.notice{
		position: absolute;
		width:992px;
		height:74px;
		left:413px;
		top:124px;
		font-size: 24px;
		border-radius: 40px;
		/*box-shadow: 1px 2px 4px 0px #666666;*/
		background:#fff;
		line-height: 60px;
		color:#D73B39;
		box-sizing: border-box;
		padding-left:100px;
		padding-top:17px;
		/*font-weight: bold;*/
	}
	marquee{
		height:40px;
	}
	.tongzhi{
		position: absolute;
		left:20px;
		top:50%;
		transform: translateY(-50%);

	}
	.bean_num{
		position: absolute;
		width:312px;
		height:74px;
		top:124px;
		right:60px;
		font-size: 26px;
		color:#D73B39;
		line-height: 70px;
		border-radius: 40px;
		background: #fff;
		/*box-shadow: 1px 2px 4px 0px #666666;*/
		text-align: center;
		/*text-indent: 60px;*/
		/*font-weight: bold;*/
		
	}
	.add{
		position: absolute;
		top:0;
		right:0px;
		/*transform:translateY(-50%);*/
	}
	.recommend{
		position: absolute;
		width: 210px;
		height: 49px;
		top:215px;
		left:60px;
	}
	.something{
		position: absolute;
		width:1800px;
		height:596px;
		/*border:1px solid #666;*/
		left:60px;
		top:290px;
		background: #fff;
		overflow: auto;
	}

	/*轮播*/
	.swiperha {
        width: 590px;
        height: 590px;
        font-size: 50px;
        line-height: 590px;
        /*background: skyblue;*/
        float: left;
        border-radius: 10px;
        overflow: hidden;
    }
    /*分页*/
    .swiper-pagination{
    	position: absolute;
    	bottom:-240px;

    }
    @keyframes rotate {
			0%{
				transform:scale(1,1); 
			}
			50%{
				transform:scale(1.5,1.5);
			}
			100%{
				transform:scale(1,1); 
			}

	}

    .right{
		float: left;
		width:540px;
		height:270px;
		background: #F4F4F4;
		margin-left:36px;
		/*margin-bottom:50px;*/
		border-radius: 10px;
		position: relative;
		overflow: hidden;
		box-shadow: 2px 3px 6px 0px #888;
		
	}
/*	.big{
		animation: rotate 5s linear 0s ;

	}
	.small{
		transform: scale(1,1)
	}*/
	.b_msg{
		position: absolute;
		width:540px;
		height:53px;
		color:#fff;
		line-height: 53px;
		background: rgba(0,0,0,0.3);
		left:0;
		bottom:0;
		font-size: 24px;
		font-weight: bold;
		/*opacity: 0.5;*/
	}
	.r_icon{
		width:270px;
		height:270px;
		float: left;
	}
	.in_icon{
		width:270px;
		height:270px;
	}
	.r_r{
		width:270px;
		height:270px;
		float: left;
		box-sizing: border-box;
		padding:59px 0 99px 0;
	}
	.r_msg1{
		height:37px;
		font-size: 26px;
		color:#F78E3A;
		line-height: 37px;
		font-weight: bold;
	}
	.r_msg2,.r_msg3{
		height:28px;
		font-size:20px;
		color:#999; 
		margin-top:11px;
	}
	.tuijian{
		position: absolute;
		top:-3px;
		right:-2px;
	}
	.tips{
		position: absolute;
		bottom:60px;
		color:#D73B39;
		font-size: 24px;
		text-align: center;
		width:100%;
	}

	/*购买弹窗*/
	.window{
		position: fixed;
		top:0;
		left:0;
		right:0;
		height:0;
		height:100%;
		background: rgb(0,0,0,0.57);
		z-index:10;
	}
	.pop_up{
		position:absolute;
		width:1380px;
		height:830px;
		background: #F4F4F4;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%); 
		border-radius: 30px;
		box-sizing: border-box;
		padding:50px 47px;
	}
	.gb{
		position: absolute;
		right:17px;
		top:17px;
	} 
	.pop_top{
		height:386px;
		background: #fff;
		margin-bottom:24px;
		border-radius: 10px;
		box-sizing: border-box;
		padding:19px 0px 18px 50px;
		overflow: hidden;
		text-align: left;
	}
	.l_icon{
		float: left;
		width:350px;
		height:349px;
		background: lightgreen;
		margin-right:30px;
		box-shadow: 2px 3px 6px 0px #888;

	}
	.in_icon{
		width:100%;
		height:100%;
	}
	.r_msg{
		float: left;
		width:833px;
	}
	.title{
		height:48px;
		font-size: 34px;
		color:#FF5D3D;
		margin-bottom:20px;
	}
	.price{
		color:#FF5D3D;
		font-size: 32px;
	}
	.money{
		padding-left: 28px;
		color:#999;
		font-size: 24px;
	}
	.num{
		/*height:76px;*/
		margin-top:20px;
		margin-bottom:26px;
		overflow: hidden;
		font-size: 24px;
		color:#999;

	}
	.name,.sheng{
		float: left;
	}
	.jia,.jian,.shu{
		float: left;
		width:33px;
		height:30px;
		line-height: 30px;
		text-align: center;

	}
	.jian{
		border:1px solid #DDD;
		background: #DDD;
	}
	.shu{
		border-top:1px solid #DDD;
		border-bottom:1px solid #DDD;
		width:66px;
	}
	.jia{
		border:1px solid #DDD;
		margin-right:30px;
		background: #DDD;

	}
	.btn{
		width:180px;
		height:54px;
		line-height: 54px;
		color:#fff;
		background: #FF5D3D;
		text-align: center;
		font-size: 24px;
		border-radius: 27px;
		box-shadow: 1px 2px 4px 0px #AAA;
	}
	.intro{
		margin-top:22px;
		font-size: 20px;
		color:#999;
	}
	.pop_bottom{
		height:315px;
		background: #fff;
		border-radius: 10px;
		box-sizing: border-box;
		padding:40px 50px 0px;
		text-align: left;
	}
	.d_title{
		font-size: 26px;
		color:#999;
	}
	.d_intro{
		font-size: 24px;
		color:#999;
		line-height: 36px;
	}
	/*确认购买*/
	.sure{
		width:900px;
		height:540px;
		background: #fff;
		position: absolute;
		top:50%;
		left:50%;
		border-radius: 30px;
		box-sizing: border-box;
		padding:60px 110px 35px;
		transform:translate(-50%,-50%);
	}
	.sureGb{
		position: absolute;
		top:18px;
		right:18px;
	}
	.sure_title{
		font-size: 36px;
		color:#FF5D3D;
		margin-bottom:36px;
	}
	.sure_msg{
		color:#FF5D3D;
		font-size: 26px;
		margin-bottom:36px;
	}
	.sure_b{
		overflow: hidden;
	}
	.left_b{
		float: left;
		background: lightgreen;
		width:200px;
		height:200px;
	}
	.sure_img{
		width:100%;
		height:100%;
	}
	.rigth_b{
		float: left;
		height:200px;
		box-sizing: border-box;
		padding:30px 0px 30px 24px;
		color:#666;
	}
	.rigth_b p{
		height:44px;
		line-height: 44px;
		text-align: left;
		font-size: 24px;
	}
	.btn_box{
		overflow: hidden;
		box-sizing: border-box;
		padding-left:121px;
		margin-top:25px;
	}
	.cancal,.go{
		width:201px;
		height:60px;
		line-height: 60px;
		color:#fff;
		background: #FF5D3D;
		text-align: center;
		font-size: 24px;
		border-radius: 30px;
		box-shadow: 1px 2px 4px 0px #AAA;
		float: left;
	}
	.cancal{
		margin-right:36px;
		background: #ccc;
	}
	.success_msg{

	}
	.qr{
		width:200px;
		height:200px;
		/*border:1px solid #666;*/
		margin:0 auto;
	}
	.fail_msg{
		word-wrap:break-word;
		font-size: 34px;
		padding:120px 0;
		color:#FF5D3D;
	}
	.fail_btn{
		width:201px;
		height:60px;
		border-radius: 30px;
		background: #FF5D3D;
		color:#fff;
		line-height: 60px;
		font-size: 24px;
		box-shadow:0px 2px 4px 0px #999;
		margin:0 auto;
	}
	.s_name{
		display: block;
   		text-overflow:ellipsis;
   		white-space: nowrap;
   		overflow: hidden;
   		width:400px;
	}
	.s_bean{
		display: block;
		text-overflow:ellipsis;
   		white-space: nowrap;
   		overflow: hidden;
   		width:400px;
	}
</style>
<style type="text/css">
	.mint-swipe .mint-swipe-indicators{
    	bottom:-240px;
    }
    .mint-swipe .mint-swipe-indicators .mint-swipe-indicator{
    	width:16px;
    	height:16px;
    }
</style>

