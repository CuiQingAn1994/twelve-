<template>
	<section>
		<div v-title>安全中心</div>
		<div class="check">
			<span class="label">
				检测当前账号状态：
			</span>
			<span class="sta" v-if="status">
				有设备未退出
			</span>
			<span class="stas" v-if="!status">
				没有正在登录的设备
			</span>
			<span class="btn" v-if="status" @click="query">注销</span>
		</div>
		<div class="line"></div>
		<!-- <div class="box">
			<div class="date">2018-05-31</div>
			<div class="list">
				<div class="inbox">
					<div class="center">
						<div class="name">河北省-廊坊市</div>
						<div class="time">设备：SN1001101010010010</div>
					</div>
					<div class="right">
						<div class="inOut">登入</div>
						<div class="r_time">12:00:00</div>
					</div>
				</div>
				<div class="line"></div>
			</div>
		</div> -->
 	</section>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';


	export default{
		data(){
			return{
				status:"",
			}
		},
		created(){
			this.islogin();
		},
		methods:{
			query(){
				Indicator.open({
				  spinnerType: 'double-bounce'
				});
				this.$http.get(_config.server+'/merApi/user/user/safeCenter?token='+store.get('_person').token+'&type=2').then((res)=>{
		          console.log("注销",res);
		       
		          if(res.data.status == 1){
		          	this.islogin();
		          	setTimeout(()=>{
		          	 	Indicator.close();
		          	 	Toast('设备注销成功')

		          	},300)
		          	
		            // _this.getData = res.data.data;
		           
		          }
		        },(err)=>{
		          console.log(err);
		        })
		       
			},
			islogin(){
				this.$http.get(_config.server+'/merApi/user/user/safeCenter/loginEquips?token='+store.get('_person').token+'&type=2').then((res)=>{
		          console.log("注销",res);
		       
		          if(res.data.status == 1){
		            // _this.getData = res.data.data;
		            this.status  = res.data.data;
		           
		          }
		        },(err)=>{
		          console.log(err);
		        })
			}
		}
	}
</script>
<style type="text/css" scoped >
	.check{
		height:62px;
		line-height: 62px;
		text-align: left;
		padding:0 16px;
		font-size: 14px;

	}
	.sta{
		margin-left:32px;
		color:#E51C23;
	}
	.btn{
		float: right;
		width:58px;
		height:28px;
		text-align: center;
		background: #108EE9;
		line-height: 28px;
		margin-top:17px;
		border-radius: 4px;
		font-size: 12px;
		color:#fff;
	}
	.box{
		font-size: 14px;
		width:100%;
		color:#101010;
		text-align: left;
	}
	.date{
		width:100%;
		height:28px;
		text-indent: 23px;
		line-height: 28px;
		background: #E5E5E5;
		text-align: left;
		font-size: 12px;
	}
	.list{
		padding:0 17px 0 23px;
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
		line-height: 20px;
		text-align: center;
	}
	@media (max-width: 320px){
		.sta{
			margin-left: 12px;
		}
	}
</style>