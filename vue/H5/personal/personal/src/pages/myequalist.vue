<template>
	<div class="me_device">
		<div v-title>我的设备</div>
		<div class="empty">暂无设备</div>
		<div class="margin">
			<ul>
				<li v-if="getData.length>0" class="list" v-for="item in getData" >
					<span class="yuan"></span>
					<div class="list_content">
						<p class="row1">未命名设备{{item.name}}</p>
						<p class="row3">SN:{{item.snCode}}</p>
					</div>
					<div class="btn1" >报修</div>
					<div class="btn2" >已报修</div>
					<p class="line"></p>
				</li>
				<!-- <li class="list">
					<span class="yuan"></span>
					<div class="list_content">
						<p class="row1">未命名设备1991920</p>
						<p class="row2">推广员：涂明明</p>
						<p class="row3">SN:120100101010101010</p>
					</div>
					<div class="btn2">已报修</div>
					<p class="line"></p>
				</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				getData:[
					
					

				],
			}
		},
		created(){
			this.initData();
		},
		methods:{
			initData(){
				let _this = this;
					_this.$http.get(_config.server+'/merApi/user/promoter/myEquips',{
						params:{
							type:store.get('_person').type,
							token:store.get('_person').token,
							promoterId:this.$route.query.promoterId
							// type:5,
							// token:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ6aG9uZ3RpaHVhY2FpIiwiaXNzIjoiaHR0cDovL3p0aGMuY29tIiwiZXhwIjoxNTI5MTM5ODk0LCJpYXQiOjE1Mjg1MzUwOTQsInVzZXJJZCI6IjMifQ.Jrv6F27oraTYsq8BXiGKotDYFSLMFvoYoYqxH75CnLM",
						}
					}).then((res)=>{
						console.log(res );
						if(res.data.status == 1){
							_this.getData = res.data.data;
						}
					},(err)=>{
					console.log(err);
				})
			}
		}

	}
</script>

<style scoped>

.me_device{
  width:100%;
  height:100vh;
  text-align: left;

}

.margin{
	margin: 0 20px;
}
	

.yuan{
	display: inline-block;
	vertical-align: top;
	margin-top: 24px;
	margin-right: 10px;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background-color: #00A9F4;
}
.list_content{
	display: inline-block;
	color: #AAAAAA;
	padding: 10px 0;
}
.row1,.row2,.row3{
	height: 24px;
	line-height: 24px;
}
.row1{
	color: #101010;
}
.btn1{
	float: right;
	width: 60px;
	height: 30px;
	line-height: 30px;
	margin-top: 31px;
	border-radius: 4px;
	color: #00A9F4;
	font-size: 12px;
	text-align: center;
	border: 1px solid rgb(187,187,187);
}
.btn2{
	float: right;
	width: 60px;
	height: 30px;
	line-height: 30px;
	margin-top: 31px;
	border-radius: 4px;
	color: rgb(187,187,187);
	font-size: 12px;
	text-align: center;
	text-decoration:line-through;
	border: 1px solid rgb(187,187,187);
}
.empty{
	line-height: 400px;
	text-align: center;
}
</style>













