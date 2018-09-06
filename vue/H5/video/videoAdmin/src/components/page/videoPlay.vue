<template>
	<div class="video_play">
		<div v-title>直播室</div>
		<div class="body">
			<!-- nav刷新返回条 -->
			<div class="orderlist_title">
				<i class="title_block"></i>
				<span>直播室</span>
			</div>

			<div class="play_left">
				<div ref="mybox" class="prism-player" id="J_prismPlayer"></div>
				<img :src="baseCode" alt="" width="100%" style="margin-top:10px;">
			</div>

			<div class="play_right">
				<div style="margin-bottom: 20px;" v-if="queueList.length!=0">
					<!-- <p class="verification_title">
						验票统计<span class="already">已验票: 100</span><span class="wait">待验票: 90</span>
					</p> -->
					<div class="verification">
						<p class="this">
							当前验票票号:
							<span class="this_address">{{firstList.dict}}</span>
						</p>
						<p class="verification_num">{{firstList.code | newCode}}</p>
						<p class="type">
							票种: {{firstList.sort}}
							<span class="price">面值: {{firstList.money}}元</span>
						</p>
					</div>
				</div>
				<div class="next_btn" @click="next()" v-show="nextBtn" v-if="queueList.length!=0">下一张</div>
				<div class="wait_list">
					<p class="list_title">验票队列:（{{queueList.length}}）</p>
					<p class="list2" v-if="queueList.length==0">暂无申请</p>
					<ul class="list" v-else>
						<li v-for="item in queueList">
							<span class="list_address" style="width: 10%">{{item.dict | newAddress}}</span>
							<span class="list_num" style="width: 50%">{{item.code | newCode}}</span>
							<span class="list_type" style="width: 20%">{{item.sort}}</span>
							<span class="list_price">{{item.money}}元</span>
							<!-- <span class="list_status">等待中...</span> -->
						</li>
					</ul>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				imgdata:'',
				queueList:[], //验票队列
				firstList:{},
				url:'',
				id: '',
				baseCode: '',
				nextBtn: false,
			}
		},
		created(){
			this.id = this.$route.query.id;
			this.getVideoPath();
			this.getQueueList();
		},
		mounted(){
		},
		methods:{
			//根据ID获取播放地址
			getVideoPath(){
				this.$http.get('/liveApi/getPushAndPullStreamById',{
					params:{
						'id': this.id,
						'type': '1'
					}
				}).then((res)=>{
					console.log(res)
					if(res.data.status == 1){
						this.url = res.data.data.pullM3u8;
						this.createdVideo();
					}
				},(err)=>{
					console.log(err)
				})
			},

			// 创建播放器
			createdVideo(){
				console.log(this.url)
				let _this = this
				let player = new Aliplayer({
		    	id: "J_prismPlayer",
				autoplay: true,
				isLive:true,
				playsinline:true,
				width:"100%",
				controlBarVisibility:"always",
				useH5Prism:true,
				useFlashPrism:false,
				snapshot:true,
		        source: this.url,
		        cover:"",
		        skinLayout:[{"name":"controlBar","align":"blabs","x":0,"y":0,"children":[{"name":"fullScreenButton","align":"tr","x":10,"y":12},
	                {"name":"snapshot","align":"tr","x":10,"y":10},
	                {"name":"playButton","align":"tl","x":15,"y":12}]},
	                {"name":"bigPlayButton","align":"blabs","x":30,"y":80}]
		        },function(player){
		            // console.log(player);
		            player.on('snapshoted',function(data){
						console.log(data.paramData)
						_this.baseCode = data.paramData.base64
						if(_this.baseCode != ''){
							_this.nextBtn = true
							_this.subImg()
						}
					});
		    	});
			},

			//获取全部验票队列
			getQueueList(){
				let params = {}
				this.$http.post('/liveApi/getExamineTicketList',params).then((res)=>{
					console.log(res.data.data)
					if(res.data.status == 1){
						this.queueList = res.data.data.ticketList
						if(this.queueList.length == 0){
							return
						}else{
							this.firstList = res.data.data.ticketList[0]
						}
						// console.log(this.queueList)
					}
				},(err)=>{
					console.log(err)
				})
			},

			// 提交截图
			subImg(){
				console.log('执行图片提交了')
				let formData = new FormData();
				formData.append('ticketNo', this.firstList.code);
				formData.append('image', this.baseCode);

				this.$http.post('/liveApi/ticketScreenImage',formData).then((res)=>{
					console.log(res.data)
					if(res.data.status == 1){
						// this.queueList = res.data.data.ticketList
						// if(this.queueList.length == 0){
						// 	return
						// }else{
						// 	this.firstList = res.data.data.ticketList[0]
						// }
						// console.log(this.queueList)
					}
				},(err)=>{
					console.log(err)
				})
			},

			// 下一张
			next(){
				this.baseCode = '';
				let formData = new FormData();
				formData.append('code',this.firstList.code)
				this.$http.post('/liveApi/getExamineTicketList',formData).then((res)=>{
					// console.log(res)
					if(res.data.status == 1){
						this.nextBtn = false
						this.queueList = res.data.data.ticketList
						if(this.queueList.length == 0){
							this.firstList = {}
							return
						}else{
							this.firstList = res.data.data.ticketList[0]
						}
						// console.log(this.queueList)
					}
				},(err)=>{
					console.log(err)
				})
			},
		},
	}
</script>

<style scoped>
.video_play{
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

.play_left,.play_right{
	display: inline-block;
}
.play_left{
	width: 50%;
}
.play_right{
	width: 47%;
	vertical-align: top;
	padding: 0 0 0 2%;
}
.verification_title{
	font-size: 16px;
	margin-bottom: 10px;
}
.already{
	display: inline-block;
	width: 100px;
	margin: 0 20px;
}
.verification{
	height: 100px;
	border: 2px solid red;
	border-radius: 4px;
	padding: 10px;
}
.this_address{
	float: right;
}
.verification_num{
	text-align: center;
	color: #FF9800;
	font-size: 26px;
	margin: 10px 0;
	height: 43px;
}
.price{
	float: right;
}
.next_btn{
	text-align: center;
	width: 100px;
	height: 40px;
	line-height: 40px;
	border-radius: 4px;
	background-color: red;
	color: white;
	margin: 0 auto 20px;
}
.list_title{
	margin-bottom: 10px;
}
.list{
	border: 1px solid green;
	border-radius: 4px;
	font-size: 0;
	width: 100%;
	height: 356px;
	overflow-x: hidden;
	overflow-y: auto;
}
.list2{
	border: 1px solid green;
	border-radius: 4px;
	font-size: 16px;
	width: 100%;
	text-align: center;
	padding: 10px 0;
}
.list>li{
	height: 50px;
	line-height: 50px;
	text-align: center;
	border-bottom: 1px dashed green;
}
.list_address{
	display: inline-block;
	vertical-align: top;
	font-size: 13px;
}
.list_num{
	display: inline-block;
	vertical-align: top;
	font-size: 20px;
	color: #FF9800;
	margin: 0 10px;
}
.list_price,.list_type,.list_status{
	display: inline-block;
	vertical-align: top;
	font-size: 16px;
	margin: 0 2%;
}
.list_status{
	color: red;
}

	
</style>













