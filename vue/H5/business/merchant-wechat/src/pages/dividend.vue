<template>
	<div class="dividend">
		<div v-title>分红明细</div>

		<!-- 头部 -->
		<!-- <div class="head">
			<span class="search">搜索</span>
		</div> -->

		<!-- <date></date> -->

		<!-- 账单 -->
		<!-- <div class="height40"></div> -->
		<div class="bill">
			<div class="bill_block">
				<div class="bill_left">
					<span>分红明细</span><img src="../../static/images/yiwen2.png" alt="" class="help">
				</div>
				<div class="bill_right">
					<p class="proportion">
						<!-- <span>彩票分润比例：7.5%</span> -->
					</p>
					<p class="proportion">
						<!-- <span>游戏分润比例：7.5%</span> -->
					</p>
				</div>
			</div>
			
	        <div class="income">
		        <div class="today">
		            <p class="price">¥{{profitGeneral.totalProfit}}</p>
		          	<p class="text">累计收益</p>
		        </div>
		        <div class="total">
		          	<p class="price">¥{{profitGeneral.count}}</p>
		          	<p class="text">已结算</p>
		        </div>
		        <div class="under">
		          	<p class="price">¥{{profitGeneral.unCount}}</p>
		          	<p class="text">待结算</p>
		        </div>
	        </div>
		</div>

		<!-- 详细区块 -->
		<ul>
			<!-- 每天的 -->
			<!-- <li class="everyday">
				<p class="date">2018-05-31</p>
				<ul>
					<li class="only">
						<div>
							<img src="../../static/images/tx@2x.png" alt="" class="name">
							<div class="detail">
								<div class="detail_left">
									<p class="detail_one">
										<span class="px14">商品彩种名称</span><span class="detail_date" style="margin-left: 10px;">2018-05-31</span>
									</p>
									<p class="detail_two">
										<span class="sn_number">SN:42343243424</span>
									</p>
								</div>
								<div class="detail_right">
									<p class="detail_one">
										<span class="detail_red">+¥3.00</span>
									</p>
									<p class="detail_two">
										<span class="px14">¥100.00</span>
									</p>
								</div>
							</div>
						</div>
        				<p class="line"></p>
					</li>
					<li class="only">
						<div>
							<img src="" alt="" class="name">
							<div class="detail">
								<div class="detail_left">
									<p class="detail_one">
										<span class="px14">商品彩种名称</span><span class="detail_date" style="margin-left: 10px;">2018-05-31</span>
									</p>
									<p class="detail_two">
										<span class="sn_number">SN:42343243424</span>
									</p>
								</div>
								<div class="detail_right">
									<p class="detail_one">
										<span class="detail_red">+¥3.00</span>
									</p>
									<p class="detail_two">
										<span class="px14">¥100.00</span>
									</p>
								</div>
							</div>
						</div>
        				<p class="line"></p>
					</li>
				</ul>
			</li> -->
		</ul>
		<div class="height45"></div>

		<!-- 底部 -->
		<div class="footer">
			<span class="footer_text">本月累计分红：<span class="footer_text_red">¥{{profitGeneral.totalProfit}}</span></span><span class="footer_btn">申请结算</span>
		</div>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';
	import date from "../components/date.vue"
	export default {
		components: {
			'date': date
		},
		data () {
			return {
            	profitGeneral:'',

			}
		},
	    created(){
		    this.getData();
		    Indicator.open({
		      text: '加载中...',
		      spinnerType: 'double-bounce'
		    });
	    },
		methods:{
		    getData(){
		      let _this = this;
		      _this.$http.get(_config.server+'/merApi/merchant/home',{
		        params:{
		          token:store.get('_shoper').token,
		          type:store.get('_shoper').type
		          // token:'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ6aG9uZ3RpaHVhY2FpIiwiaXNzIjoiaHR0cDovL3p0aGMuY29tIiwiZXhwIjoxNTI5Mzc1ODk1LCJpYXQiOjE1Mjg3NzEwOTUsInVzZXJJZCI6IjEifQ.wkU3hnoPatJCkUwq_g_OsDsZITT_Kfdwmho9BNDFvuM',
		          // type:"3"
		          // token:'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ6aG9uZ3RpaHVhY2FpIiwiaXNzIjoiaHR0cDovL3p0aGMuY29tIiwiZXhwIjoxNTI5MzI3NDc0LCJpYXQiOjE1Mjg3MjI2NzQsInVzZXJJZCI6IjMifQ.5ggcue7qRQYc_D6nOADIM5dvtJpCvbybd4QwYxS_MIo',
		          // type:"5"
		        }
		      }).then((res)=>{
		        setTimeout(function(){
		          Indicator.close();
		        },200)
		        console.log(res);
		        if(res.data.status == 1){
		          _this.profitGeneral = res.data.data.profitGeneral;
		        }
		      },(err)=>{
		        console.log(err);
		      })
		    },
		},
	}
</script>

<style scoped>
.dividend{
  width:100%;
  height:100vh;
}

/*头部*/
.head{
    width: 100%;
  	background-color: rgba(234, 112, 91, 1);
  	color: white;
  	text-align: right;

}
.search{
	display: inline-block;
	font-size: 14px;
	padding: 10px 20px;
}

/*账单*/
.bill{
	margin: 13px 10px;
	border-radius: 5px;
	background-color: #A38666;
  	color: white;
}

.bill_block{
	display: flex;
	margin: 0 20px;
}
.bill_left,.bill_right{
	flex: 1;
	margin: 10px 0;
}
.bill_left{
	text-align: left;
	font-size: 16px;
}
.bill_right{
	text-align: right;
	font-size: 12px;
}
.bill_left>span:first-child{
	display: inline-block;
	height: 20px;
	line-height: 20px;
	vertical-align: top;
	font-weight: 600;
}
.help{
	display: inline-block;
	width: 20px;
	height: 20px;
	margin-left: 10px;
}

.income{
    display: flex;
    padding-bottom: 10px;
  	text-align: center;
}
.today,.total,.under{
  	flex: 1;
}
.income .price{
  	font-size: 20px;
  	font-weight: 600;
}
.income .text{
	margin-top: 5px;
  	font-size: 14px;
}

/*每天的*/
.date{
	width: 100%;
	height: 28px;
	line-height: 28px;
	padding-left: 15px;
	background-color: #E5E5E5;
}
.only{
	position: relative;
	margin: 0 15px;
}
.name{
	position: absolute;
	top: 15px;
	left: 0;
	width: 40px;
	height: 40px;
	border-radius: 50px;
	border: 1px solid #999999;
}
.detail{
	display: flex;
	margin-left: 55px;
	padding: 15px 0;
}
.detail_left,.detail_right{
	flex: 1;
}
.detail_left{
	flex: 1;
	text-align: left;
}
.detail_right{
	flex: 0.5;
	text-align: right;
}
.px14{
	font-size: 14px;
}
.detail_red{
	font-size: 16px;
	color: #E51C23;
	font-weight: 600;
}
.detail_date,.sn_number{
	font-size: 12px;
	color: #999999;
}

/*底部*/
.height40{
	height: 40px;
}
.height45{
	height: 43px;
}
.footer{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	height: 44px;
	line-height: 44px;
	background-color: #f6f6f6;
	padding: 0 20px;
	box-shadow: 0 -2px 5px #e5e5e5;
}
.footer_text_red{
	color: #E51C23;
}
.footer_btn{
	float: right;
	width: 80px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	color: white;
	border-radius: 5px;
	background-color: #108EE9;
	margin-top: 7px;
}
</style>
















