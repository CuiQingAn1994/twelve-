<template>
	<section>
		<div class="header">
			<div class="h_box">
				<div class="logo">
				
				</div>
				<ul class="tab_box">
					<router-link v-for="(item,index) in list" :key="index" :to="item.route+'?page='+index" tag="span">
						<li :style="{background:idx==index?'#fff':'#555',color:idx==index?'#E86036':'#fff'}" class="tab" @click="choose(index)">{{item.name}}</li>
					</router-link>
				</ul>
			</div>
			
		</div>
		 <router-view/>
	</section>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				list:[
					{name:'首页',route:'/home'},
					{name:'华彩宝',route:'/home'},
					{name:'公益事业',route:'/home'},
					{name:'关于中体华彩',route:'/about'},
					{name:'加盟商入口',route:'/home'},

				],
				idx:0
			}
		},
		mounted(){
			this.idx = this.$route.query.page==undefined?0:this.$route.query.page;
		},
		methods:{
			choose(index){
				this.idx = index;
			}
		}
	}
</script>
<style scoped>
	section{
		/*width:100%;*/
		width:1280px;
	}
	.header{
		height:80px;
		background: #555;
		color:#fff;
		width:100%;
	}
	.h_box{
		width:1240px;
		height:80px;
		overflow: hidden;
		line-height: 80px;
		margin:0 auto;
	}
	.logo,.tab_box{
		float: left;
	}
	.logo{
		width:200px;
		height:80px;
		box-sizing: border-box;
		padding:20px;
		background:skyblue;
		margin-right:50px;
	}
	.tab_box{
		width:980px;
		font-size: 18px;
		font-weight: bold;
	}
	.tab{
		float: left;
		width:20%;
		/*text-align: right;*/
	}
	@media screen and (max-width: 1279px)  {
		.header{
			height:60px;
			background: #555;
		}
		.h_box{
			width:960px;
			height:70px;
			line-height: 60px;
		}

		.logo{
			width:230px;
			height:60px;
			padding:5px;
			background:skyblue;
			margin-right:30px;
		}
		.tab_box{
			width:700px;
			font-size: 16px;
			font-weight: bold;
		}
		.tab{
			float: left;
			width:20%;
			/*text-align: right;*/
		}
	}
</style>