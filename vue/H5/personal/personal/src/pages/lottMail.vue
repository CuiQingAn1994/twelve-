<template>
	<section>
		<div v-title>彩票邮寄</div>
		<div  class="notBind">
			<div class="addCard">
				<span  v-if="static" class="add">＋</span>
				<span  v-if="static" class="card">邮寄地址</span>
				<div v-if="!static" class="top">涂明明 18210659987</div>
				<div v-if="!static" class="bottom">北京市朝阳区朝外北街蓝筹铭座A座2区8-10</div>
			</div>
		</div>
		<div class="choose">
			<div class="title">所选邮寄彩票：</div>
			<div class="lottery">
				<span class="title">翡翠绿</span>
				<span class="num">×1张</span>
			</div>
			<div class="all_lott">总计60张    总面值¥600</div>
		</div>
		<div class="warm_tips">
			<div class="warm_t">温馨提示：</div>
			<div class="warm_con">索要彩票总面值低于200元,邮费自付。我司不收取任何费用，邮寄费用由第三方快递公司收取。</div>
		</div>
		<div class="box">
			<div class="btn">确认提交</div>
		</div>
	</section>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				static:false,
			}
		}
	}
</script>
<style type="text/css" scoped>
	.notBind,.binded{
		padding:10px 10px 20px;
	}
	.addCard{
		border:2px dotted #00A9F4;
		height:94px;
		border-radius: 5px;
		position: relative;
	}
	.add,.card{
		position:absolute;
		height:40px;
		line-height: 40px;	
	}
	.add{
		width:40px;
		border-radius: 50%;
		border:2px solid #3BA5D7;
		left:55px;
		top:27px;
		background:#00A9F4;
		font-weight: bold;
		font-size: 30px;
		color:#fff;
	}
	.card{
		left:105px;
		top:27px;
		height:40px;
		line-height: 40px;
		font-size: 18px;
		color:#999;
	}
	.top,.bottom{
		height:47px;
		line-height: 57px;
		font-size: 14px;
		text-align: left;
		box-sizing: border-box;
		padding:0 15px;
	}
	.bottom{
		font-size: 12px;
		line-height: 37px;
	}
	.choose{
		font-size: 14px;
		text-align: left;
		padding:0 18px;
	}
	.lottery{
		padding:8px 18px;
		overflow: hidden;
	}

	.title{
		font-size: 16px;
		padding-bottom:20px;
	}
	.num{
		float: right;
	}
	.all_lott{
		text-align: right;
		padding:20px 0;
		font-weight: bold;
		font-size: 16px;
		border-bottom:0.5px dashed #999;
	}
	.warm_tips{
		padding:11px 18px;
		text-align: left;
		font-size: 14px;
	}
	.warm_con{
		padding:10px 0 20px;
	}
	.box{
		padding:0 40px;
	}
	.btn{
		width:100%;
		height:50px;
		background: #108EE9;
		line-height: 50px;
		color:#fff;
		font-size: 14px;
		border-radius: 5px;
	}
</style>