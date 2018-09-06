<template>
	<section>
		<div v-title>购彩记录</div>
		<div :style="{display:display}" v-if="info.length==0" class="impty">暂无购彩记录</div>
		<div v-if="info.length>0"	v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20" >	
			<div v-if="info.length>0" class="list" v-for="item in info" >
				<router-link :to="'/lottDetail?code='+item.code" tag="div">
					<div class="left">
						<img class="l_icon" :src="item.imgFront">
						<span class="pack" v-if="item.isPack==1" >包</span>
					</div>
					<div class="center">
						<div class="l_title top">
							{{item.ticketSortName}}
						</div>
						<div class="l_price mid">
							{{item.prvcName}}
						</div>
						<div class="l_date bottom">
							{{item.createTime | formDate}}
						</div>
					</div>
					<div class="right">
						<div class="l_pro top">
							¥{{item.ticketMoneyName}}
						</div>
						<div class="l_num mid">
							x{{item.amount}}
						</div>
						<div class="l_money bottom">
							合计：<span style="font-size: 16px;">¥{{item.price}}</span>
						</div>
					</div>
				</router-link>
			</div>
			<div class="out_box" v-if="info.length>0" >
				<div class="box" v-if="load">
					<mt-spinner type="fading-circle"></mt-spinner>	
				</div>
				<div class="finish" v-if="!load">已经到底了,别拉了</div>
			</div>
		</div>	
	</section>
</template>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';
	export default{
		// components:{Spinner},
		data(){
			return{
				info:"",
				display:'none',
				start:1,
				count:15,

				load:true
			}
		},
		created(){
			this.query()
		},
		methods:{
			query(){
				console.log(this.start,this.count)
				Indicator.open({ 
					text: '加载中...',
  					spinnerType: 'double-bounce'});
				this.$http.get(_config.server+'/merApi/user/userBuyTickets?token='+store.get('_person').token+'&type=2&start='+this.start+'&count='+this.count).then((res)=>{
		          console.log("流水",res);
		       
		          if(res.data.status == 1){
		            if(res.data.data.length<this.count){
		            	this.load = false;
		            }
		            this.info  = res.data.data;
		            if(this.info.length==0){
		            	this.$router.replace('/blankPage?static=lott')
		            }
		            this.display = 'block';
		            setTimeout(()=>{
						Indicator.close();
					},300)
		           
		          }
		        },(err)=>{
		          console.log(err);
		          setTimeout(()=>{
						Indicator.close();
					},300)
		        })
			},
			loadMore() {
				this.start++;
				console.log(this.start)
				console.log('执行了')
				this.$http.get(_config.server+'/merApi/user/userBuyTickets?token='+store.get('_person').token+'&type=2&start='+this.start+'&count='+this.count).then((res)=>{
		          console.log("流水",res);
		       
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
		}
	}
</script>

<style type="text/css" scoped>
	section{
		height:100vh;
		background: #f6f6f6;
	}
	.box{
		width: 28px;
		height: 28px;
		margin:0 auto;
		padding:6px 0;
		/*background: #f6f6f6;*/
	}
	.finish{
		height:30px;
		line-height: 20px;
		color:#999;
		background: #f6f6f6;
		font-size: 12px;
	}
	.list{
		overflow: hidden;
		padding:10px 14px 10px 7px;
		color:#101010;
		background: #fff;
		border-bottom:10px solid #f6f6f6;
	}
	.left{
		float: left;
		width: 96px;
		height: 96px;
		/*border:1px solid #999;*/
		margin-right:15px;
		overflow: hidden;
		position: relative;

	}
	.pack{
		position: absolute;
		width:20px;
		height:20px;
		background:#EA705B;
		right:0;
		top:0;
		font-size: 12px;
		line-height: 20px;
		border-radius: 50%;
		color:#fff;
	}
	.l_icon{
		/*width:100%;*/
		height:100%;
	}
	.center{
		float: left;
		text-align: left;
	}
	.top,.mid,.bottom{
		height:32px;
		line-height: 32px;
	}
	.l_title{
		font-size: 16px;
	}
	.l_price{
		font-size: 14px;
		color:#999;
	}
	.l_date{
		font-size: 12px;
		color:#999;
	}
	.right{
		float: right;
		text-align: right;
	}
	.l_pro{
		font-size: 16px;
		font-weight: bold;
		color:#666;
	}
	.l_num,.l_money{
		font-size: 14px;
	}
	.l_num{
		color:#999;
	}
	.l_money{
		/*color:#999;*/
	}
	.impty{
		line-height: 400px;
	}

@media (max-width:320px) {
	.l_money{
		font-size: 12px;
	}
	.left{
		width:96px;
	}
	
}
</style>