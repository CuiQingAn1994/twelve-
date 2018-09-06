<template>
	<div class="video_list">
		<div v-title>直播监控</div>
		<div class="body">
			<!-- nav刷新返回条 -->
			<div class="orderlist_title">
				<i class="title_block"></i>
				<span>直播监控</span>
			</div>

			<div class="list">
				<ul>
					<li class="video_item" v-for="(item,index) in videoResources">
						<p>
							<span class="address">所在区域：{{item.param.dictName}}</span>
							<span class="status">直播中</span>
						</p>
						<div class="play">
							<router-link :to="'/videoPlay'+item.id+'?id='+item.id">
								<img src="../../../static/img/live.png" alt="播放区域">
							</router-link>
						</div>
						<p>
							<span class="video_id">直播ID：{{item.id}}</span>
							<!-- <span class="times">开播时长：02:29:20</span> -->
						</p>
					</li>
				</ul>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				videoResources:[],
			}
		},
		created(){
			this.getVideoList();
		},
		methods:{
			getVideoList(){
				this.$http.get('/liveApi/getPushAndPullStreamList').then((res)=>{
					console.log(res)
					if(res.data.status == 1){
						this.videoResources = res.data.data
					}
				},(err)=>{
					console.log(err)
				})
			},
			detail(item){
				this.$router.push({name:'/videoPlay',params:{id:item.id}})
			},
		},
	}
</script>

<style scoped>
.video_list{
  width:100%;
  height:100vh;
}

.body{
	/*background:#eaedf1;*/
	background: white;
	height: 100vh;
	padding: 0 20px;
}

.orderlist_title{
	margin: 10px 0;
	height: 30px;
	line-height: 30px;
	padding: 0 10px;
	background: #ccc;
	font-size: 0;
}
.title_block{
	display: inline-block;
	width: 10px;
	height: 20px;
	margin: 5px 5px 0 0;
	background: blue;
}
.orderlist_title span{
	vertical-align: top;
	font-size: 14px;
}
.orderlist_title button{
	vertical-align: top;
	float: right;
	width: 50px;
	height: 20px;
	margin: 5px 0 0 10px;
	outline: none;
}

.list{
	display: inline-block;
	margin-top: 50px;
	font-size: 0;
	padding-left: 2.5%;
}
.list>ul{
	margin: 0 auto;
}
.video_item{
	display: inline-block;
	width: 280px;
	height: 250px;
	border: 1px solid #cccccc;
	border-radius: 4px;
	margin: 0 20px 30px 0;
	padding: 20px;
}
.address,.status,.video_id,.times{
	font-size: 14px;
}
.status,.times{
	float: right;
}
.play{
	width: 100%;
	height: 160px;
	margin: 25px 0;
}
.play img{
	display: block;
	width: 100%;
	height: 100%;
}
	
</style>













