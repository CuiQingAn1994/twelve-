<template>
	<section :style="{display:display}">
		<div v-title>金豆记录</div>
		<div class="choose" >
			<select class="c_select" v-model="type">
				<option value="1">全部</option>
				<option value="2">充值</option>
				<option value="3">消耗</option>
			</select>
			<span class="down"><img class="arrow" src="../../static/img/arrow.png"></span>
		</div>
		<div class="empty" v-if="info.length==0">暂无金豆记录</div>
		<div class="box_list">
			<!-- <div class="date">2018-05-31</div> -->
			<div class="list" v-for="item in info" v-infinite-scroll="loadMore"
		  		infinite-scroll-disabled="loading"
		  		infinite-scroll-distance="20">
				<div class="inbox">
					<div class="left"><img  :src="item.url"></div>
					<div class="center">
						<div class="num"><span v-if="item.type==2">＋</span><span v-if="item.type!=2">-</span>{{item.count}}个</div>
						<div class="money">{{(item.price) | currency("¥",2)}}</div>
					</div>
					<div class="right">
						<div class="type">{{item.name}}</div>
						<div class="time">{{item.createTime | formDate}}</div>
					</div>
				</div>
				<div class="line"></div>
				
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
				start:1,
				count:20,
				info:[],
				display:'none',
				load:true,
				type:1
			}
		},
		created(){
			this.query();
		},
		methods:{
			query(){
				console.log(this.start,this.count)
				Indicator.open({ 
					text: '加载中...',
  					spinnerType: 'double-bounce'});
				this.$http.get(_config.server+'/api/mbr/user/lottery/gold/coin?token='+store.get('_person').token+'&type='+this.type+'&start='+this.start+'&count='+this.count).then((res)=>{
		          console.log("流水",res);
		       
		          if(res.data.status == 1){
		            this.info  = res.data.data;
		            if(this.info.length==0){
		            	this.$router.replace('/blankPage?static=bean')
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
				// console.log(this.start)
				// console.log('执行了')
				this.$http.get(_config.server+'/api/mbr/user/lottery/gold/coin?token='+store.get('_person').token+'&type='+this.type+'&start='+this.start+'&count='+this.count).then((res)=>{
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
			type(){
				this.start = 1;
				this.query();
			}
		}
	}
</script>
<style type="text/css" scoped> 
	section{
		background:#f6f6f6;
		height:100vh;
	}
	.choose{
		overflow: hidden;
		position: relative;
		width:100%;
		background:#fff;
	}
	.c_select{
		float:right;
		border:none;
		outline: none;
		background: #fff;
		color:#666;
		height:30px;
		padding-right:15px;
		text-align: center;
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



	.box{
		width: 28px;
		height: 28px;
		margin:0 auto;
		padding:6px 0;
	}
	.finish{
		height:40px;
		line-height: 40px;
		color:#999;
		font-size: 12px;

		background: #f6f6f6;
	}
	.empty{
		line-height: 400px;
	}  
	.box_list{
		font-size: 14px;
		width:100%;
		color:#101010;
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
		background:#fff;
	}
	.inbox{
		overflow: hidden;
		height:76px;
		box-sizing: border-box;
		padding-top:18px;

	}
	.left,.center{
		float: left;
		height:40px;
	}
	.left{
		width:40px;
		
		line-height: 40px;
		border-radius: 50%;
		background: #EA705B;
		color:#fff;
	}
	.left img{
		width:40px;
	}
	.center{
		margin-left:15px;
		font-weight: bold;
	}
	.num,.money{
		height:20px;
		line-height: 20px;
	}
	.num{
		font-size: 16px;
		color:#EAA55B;
	}
	.money{
		font-size: 12px;
		color:#999;
	}
	.right{
		float: right;
		line-height: 20px;
	}
	.time{
		font-size: 12px;
	}
</style>