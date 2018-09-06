<template>
	<section>
		<div v-title>商城订单</div>
		<div class="choose" >
			<select class="c_select" v-model="status">
				<option value="">全部</option>
				<option value="1">待领取</option>
				<option value="2">已完成</option>
			</select>
			<span class="down"><img class="arrow" src="../../static/img/arrow.png"></span>
		</div>
		<div class="all" v-if="info.length>0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20" >
			<div class="list" v-for="item in info" >
				<router-link :to="'/shopDetail?id='+item.id" >
					<div class="box">
						<div class="header">
							<span class="hl">订单号：{{item.code}}</span>
							<span class="nhr" v-if="item.status==3">充值失败</span>
							<span class="hr" v-if="item.status==2">已完成</span>
							<span class="nhr" v-if="item.status==1">待领取</span>
							<span class="nhr" v-if="item.status==5">充值中</span>

						</div>
						<div class="con_box">
							<div class="content">
								<div class="left"><img class="icon" :src="item.imgUrl"></div>
								<div class="center">
									<div class="top">
										<p class="name">{{item.name}}</p>
										<p class="price">{{item.total}} 金豆</p>
									</div>
									<div class="mid">
										x{{item.count}}
									</div>
									<div class="time">{{item.createTime}}</div>
									<div class="bottom">
										共{{item.count}}件，合计:<b>{{item.total*item.count}}</b>金豆
									</div>
								</div>
							</div>
						</div>
					</div>
				</router-link>
				<div class="line"></div>
			</div>
			<div class="out_box" v-if="info.length>0">
				<div class="boxload" v-if="load">
					<mt-spinner type="fading-circle"></mt-spinner>	
				</div>
				<div class="finish" v-if="!load">已经到底了,别拉了</div>
			</div>
		</div>
		<!-- 空页面 -->
		<div :style="{display:display}" class="empty" v-if="info.length==0">暂无商城订单</div>		
	</section>
</template>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default{
		mounted(){
			this.query();
		},
		data(){
			return{
				token:"",
				start:1,
				count:20,
				info:[],
				load:true,
				status:"",
				display:'none'
			}
		},
		methods:{
			query(){
				this.token = store.get('_person').token	
				this.order();
			},
			// 拉取列表
			order(){
				Indicator.open({ 
					text: '加载中...',
  					spinnerType: 'double-bounce'});
				this.$http.get(_config.server+'/merApi/user/mall/order?token='+this.token+'&start='+this.start+'&count='+this.count+'&status='+this.status).then(res=>{
					console.log(res)
					setTimeout(()=>{
						Indicator.close();
					},300)
					this.display = 'block'
					if(res.data.status==1){
						this.info = res.data.data;
						if(this.info.length==0){
		            		this.$router.replace('/blankPage?static=shop')
		            	}
					}
				})
			},
			loadMore() {
				this.start++;
				console.log(this.start)
				console.log('执行了',)
				this.$http.get(_config.server+'/merApi/user/mall/order?token='+this.token+'&start='+this.start+'&count='+this.count+'&status='+this.status).then((res)=>{
		          // console.log("流水",res);
		       
		          if(res.data.status == 1){
		            // _this.getData = res.data.data;
		           if(res.data.data.length<this.count){
		            	this.load = false;
		            }
		            this.info  = this.info.concat(res.data.data);
		           
		          }
		        },(err)=>{
		          console.log(err);

		        })
		    }
		},
		watch:{
			status(){
				this.start = 1;
				this.order();
				console.log(this.status)
			}
		}
	}
</script>
<style type="text/css" scoped>
	.boxload{
		width: 28px;
		height: 28px;
		margin:0 auto;
		padding:6px 0;
	}
	.finish{
		height:40px;
		line-height: 40px;
		color:#aaa;
		font-size: 12px;
		background:#f6f6f6;
	}
	section{
		color:#101010;
		background:#f6f6f6;
		height:100vh;
	}
	.empty{
		line-height: 300px;
	}
	.choose{
		width:100%;
		overflow: hidden;
		position: relative;
		background:#fff;
	}
	.c_select{
		float:right;
		border:none;
		outline: none;
		color:#666;
		height:30px;
		padding-right:10px;
		background:#fff;
	}
	.down{
		position: absolute;
		right:18px;
		top:5px;
		/*line-height: 30px;*/
		transform:rotate(90deg);
		color:#666;
	}
	.arrow{
		width:7px;

	}
	.icon{
		width:100%;
		height:100%;
	}
	.list{
		background:#fff;
	}
	.box{
		padding-bottom:0px;
		margin-bottom:4px;
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
		color:#fff;
		background: #BEC2C9;
	}
	.nhr{
		float: right;
		padding:0 5px;
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
	@media (max-width: 320px){
		.name{
			width:80px;
		}
	}
</style>