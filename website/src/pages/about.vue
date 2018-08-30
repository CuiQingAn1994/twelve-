<template>
	<section>
		<div class="banner " ></div>
		<div class="content inner">
			<div class="left">
				<div class="title">公司概况</div>
				<div class="nav"  @click="tab(index)"  v-for="(item,index) in list" >
					<p class="name" :style="{borderLeftColor:idx==index?'#E86036':'#f6f6f6',color:idx==index?'#E86036':'#999'}"> {{item}}</p>
					<p class="bline"></p>
				</div>
			</div>
			<div class="right">
				<div class="r_title">首页／公司概况／<span class="l_title">{{list[idx]}}</span></div>
				<div class="page1" v-if="idx==0">
					<div class="p1_top">
						<div class="p1_left">
							<p class="p1_title">中体华彩</p>
							<p class="p1_in"> 中体华彩（北京）信息技术有限公司，位于北京望京SOHO高科技产业园区，注册资金2000万，是中瀚天成投资管理有限公司旗下的控股子公司，负责即开型彩票合作、硬件销售、彩票与游戏的运营、市场运营、客服售后，其他业务拓展等。提供专业的服务平台，安全、优质、高效的为中国彩民打造量身定制的个性化移动终端。   </p>
							<p class="p1_in">
								 定位：彩票购买方式的创新者 
							</p>
							<p class="p1_in">
								 信条：勇于创新、稳中求胜、实现共赢 
							</p>
							<p class="p1_in">
								 目标：国际化、品牌化、专业化 
							</p>
							<p class="p1_in">使命：成就客户、成就品牌、成就员工 前期已签约即开彩销售业务授权落地地区有：北京、天津、海南、山东、浙江、黑龙江、河北、重庆等11个省份与两个直辖市，后期针对全国市场剩余其他省份的签约，正在落地中……</p>
						</div>
						<div class="p1_right"></div>
					</div>
					<div class="p1_bot">
						<div class="l0 l1">
							<div class="b_text">
								<p class="b_title">企业使命</p>
								<p class="para"> 中体华彩（北京）信息技术有限公司，位于北京望京SOHO高科技产业园区，注册资金2000万，是中瀚天成投资管理有限公司旗下的控股子公司，负责即开型彩票合作、硬件销售、彩票与游戏的运营、市场运营、客服售后，</p>
							</div>
							<div class="img"></div>
						</div>
						<div class="l0 l2">
							<div class="img"></div>
							<div class="b_text">
								<p class="b_title">企业价值观</p>
								<p class="para"> 中体华彩（北京）信息技术有限公司，位于北京望京SOHO高科技产业园区，注册资金2000万，是中瀚天成投资管理有限公司旗下的控股子公司，负责即开型彩票合作、硬件销售、彩票与游戏的运营、市场运营、客服售后，</p>
							</div>
							
						</div>
						<div class="l0 l3">
							<div class="b_text">
								<p class="b_title">企业宗旨</p>
								<p class="para"> 中体华彩（北京）信息技术有限公司，位于北京望京SOHO高科技产业园区，注册资金2000万，是中瀚天成投资管理有限公司旗下的控股子公司，负责即开型彩票合作、硬件销售、彩票与游戏的运营、市场运营、客服售后，</p>
							</div>
							<div class="img"></div>
						</div>
						<div class="l0 l4">
							<div class="img"></div>
							<div class="b_text">
								<p class="b_title">企业行为规范</p>
								<p class="para"> 中体华彩（北京）信息技术有限公司，位于北京望京SOHO高科技产业园区，注册资金2000万，是中瀚天成投资管理有限公司旗下的控股子公司，负责即开型彩票合作、硬件销售、彩票与游戏的运营、市场运营、客服售后，</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
	export default {
		data(){
			return{
				list:["公司简介","企业资质","组织机构","我们的客户","大事件"],
				idx:0
			}
		},
		methods:{
			tab(index){
				this.idx = index;
			}
		}
	}
</script>
<style type="text/css" scoped>
	/*版心*/
	.inner{
	   	width:1088px;
	    margin:0 auto;
	}
	.banner{
		width:100%;
		height:350px;
		background: orange;
	}

	.content{
		padding-top:30px;
		overflow: hidden;
	}
	.left{
		width:100px;
		float: left;
	}
	.title{
		font-size: 20px;
		font-weight: bold;
	}

	.name{
		height:16px;
		font-size: 14px;
		line-height: 16px;
		border-left:2px solid #E86036;
		margin:15px 0;
	}
	.bline{
		width:60px;
		border-top:1px solid #D8D8D8;
		margin:0 auto;
	}
	.right{
		float: left;
		width:calc(100% - 100px);
		/*background: yellow;*/
		box-sizing: border-box;
		padding-left:20px;
		text-align: left;
	}
	.r_title{
		text-align: left;
		line-height: 66px;
		font-size: 14px;
		color:#999;
	}
	.l_title{
		/*font-size: 14*/
		color:#E86036;
	}
	.p1_top{
		overflow: hidden;
		margin-bottom: 50px;
	}
	.p1_left{
		float: left;
		width:calc(100% - 260px);
		margin-right:80px;
		/*background: blue;*/
	}
	.p1_right{
		width:180px;
		height:270px;
		background: #f60;
		float: left;
	}
	.p1_title{
		text-align: center;
		font-size: 20px;
		color:#333;
		line-height: 60px;
	}
	.p1_in{
		font-size: 14px;
		color:#333;
		text-indent: 2em;
	}
	.p1_bot{
		width:100%;
		height:310px;
		background: #fff;
		overflow: hidden;
	}
	.l0{
		width:calc(25% - 20px);
		float: left;
		/*background: lightblue;*/
		height:100%;
		margin:0 10px;
		box-sizing: border-box;
		padding-top:10px;
	}
	.img{
		width:220px;
		height:130px;
		background: lightgreen;
	}
	.b_title{
		font-size: 16px;
		font-weight: bold;
		line-height: 40px;
	}
	.para{
		font-size: 13px;
		text-indent: 2em;
		color:#666;
	}
</style>