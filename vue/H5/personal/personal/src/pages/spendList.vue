<template>
	<section>
		<div :style="{display:display}">			
			<div v-title>消费记录</div>
			<div v-if="info.length==0" class="empty">暂无消费记录</div>
			<div  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
				<div v-if="info.length>0" class="box_list" v-for="item in info">
				<!-- <div class="date">{{}}</div> -->
				<div class="list">
					<div class="inbox">
						<div class="left" :style="{background:item.type=='彩票'?'#E86036':'#00A9F4'}">{{item.type}}</div>
						<div class="center">
							<div class="name">{{item.ticketSortName}}</div>
							<div class="time">{{item.createTime | formDate}}</div>
						</div>
						<div class="right" :style="{color:item.type=='彩票'?'#E86036':'#00A9F4'}">{{item.price | currency('¥',2)}}</div>
					</div>
					<div class="line"></div>
				</div>
			</div>
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

		data(){
			return{
				info:"",
				start:1,
				count:20,
				display:'none',
				load:true,
				lock:true

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
				 this.$http.get(_config.server+'/merApi/user/userConsumeRecord?token='+store.get('_person').token+'&type=2&start='+this.start+'&count='+this.count).then((res)=>{
		         console.log("消费记录",res);
		       
		          if(res.data.status == 1){
		            // _this.getData = res.data.data;
		            setTimeout(()=>{
						Indicator.close();
						this.display='block'
					},300)
		            this.info  = res.data.data;
		           	if(this.info.length==0){
		            	this.$router.replace('/blankPage?static=spend')
		            }
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
				// console.log('执行了')
				this.$http.get(_config.server+'//merApi/user/userConsumeRecord?token='+store.get('_person').token+'&type=2&start='+this.start+'&count='+this.count).then((res)=>{
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
		background:#f6f6f6;
	}
	.box{
		width: 28px;
		height: 28px;
		margin:0 auto;
		padding:6px 0;
		/*background: #f6f6f6;*/
	}
	.finish{
		height:40px;
		line-height: 40px;
		color:#999;
		background: #f6f6f6;
		font-size: 12px;
	}
	.box_list{
		font-size: 14px;
		width:100%;
		color:#101010;
		background:#fff;
	}
	.date{
		width:100%;
		height:28px;
		text-indent: 15px;
		line-height: 28px;
		background: #E5E5E5;
		text-align: left;
	}
	.list{
		padding:0 10px 0 20px;
	}
	.inbox{
		overflow: hidden;
		height:66px;
		box-sizing: border-box;
		padding-top:13px;

	}
	.left,.center{
		float: left;
		height:40px;
	}
	.left{
		width:40px;
		font-size: 14px;
		line-height: 40px;
		border-radius: 50%;
		background: #EA705B;
		color:#fff;
		font-weight: bold;
	}
	.center{
		margin-left:15px;
	}
	.name,.time{
		height:20px;
		line-height: 20px;
		text-align: left;
	}
	.time{
		font-size: 12px;
		color:#999;
	}
	.right{
		float: right;
		line-height: 40px;
		font-weight: bold;
		font-size: 14px;
	}
	.empty{
		line-height: 400px
	}
</style>