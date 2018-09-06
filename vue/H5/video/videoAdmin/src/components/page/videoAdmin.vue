<template>
	<div class="video_admin">
		<div v-title>直播管理</div>
		<div class="body">
			<!-- nav刷新返回条 -->
			<div class="orderlist_title">
				<i class="title_block"></i>
				<span>直播管理</span>
			</div>

			<el-table
				:data="videoResources"
				style="width: 100%"
				border>
				<el-table-column
					prop="id"
					label="直播ID"
					width="80px"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="name"
					label="名称"
					width="100px"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="param.dictName"
					label="所在区域"
					width="100px"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="pushUrl"
					label="直播地址"
					width="650px"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					prop="creatTmString"
					label="创建时间"
					width="200px"
					header-align="center"
					align="center">
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作"
					width="100px"
					header-align="center"
					align="center">
					<template slot-scope="scope">
						<el-button
							@click.native.prevent="deleteRow(scope.$index, videoResources)"
							type="text"
							size="small">
							移除
						</el-button>
					</template>
				</el-table-column>
			</el-table>

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
					console.log(res.data.data)
					if(res.data.status == 1){
						this.videoResources = res.data.data
					}
				},(err)=>{
					console.log(err)
				})
			},
			// table delete
			deleteRow(index, rows) {
				this.$http.get('/liveApi/deletePushAndPullStreamById',{
					params:{
						'resourceId': rows.id
					}
				}).then((res)=>{
					console.log(res)
					if(res.data.status == 1){
						// rows.splice(index, 1);
						this.getVideoList();
					}
				},(err)=>{
					console.log(err)
				})
			},
		},
	}
</script>

<style scoped>
.video_admin{
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

	
</style>













