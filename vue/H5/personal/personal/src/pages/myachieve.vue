<template>
	<section>
		<div v-title>我的业绩</div>
		<div class="box">
			<div class="date">2018-05-31</div>
			<div class="list">
				<div class="inbox">
					<div class="left">彩票</div>
					<div class="center">
						<div class="name">金豆充值</div>
						<div class="time">17:00:08</div>
					</div>
					<div class="right">¥1000</div>
				</div>
				<div class="line"></div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{

			}
		},
		methods:{
			query(){
				this.promoterId = this.$route.query.promoterId
		        this.$http.get(_config.server+'/merApi/user/promoter/myEquips?token='+store.get('_person').token+'&type=2&promoterId='+this.promoterId).then((res)=>{
		          console.log("推广员",res);
		       
		          if(res.data.status == 1){
		            // _this.getData = res.data.data;
		            this.info  = res.data.data;
		           
		          }
		        },(err)=>{
		          console.log(err);
		        })
			}
		}
	}
</script>
<style type="text/css" scoped>   
	.box{
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
		
		line-height: 40px;
		border-radius: 50%;
		background: #EA705B;
		color:#fff;
	}
	.center{
		margin-left:15px;
	}
	.name,.time{
		height:20px;
		line-height: 20px;
	}
	.time{
		font-size: 12px;
		color:#999;
	}
	.right{
		float: right;
		line-height: 40px;
	}
</style>