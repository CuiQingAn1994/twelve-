<template>
	<section :style="{background:info.length==0?'#fff':'#f6f6f6'}">
		<div v-title>索要实体票</div>
		<div class="header">
			<div class="first"  v-for="(item,index) in header" @click="back()">
				<span class="f1" :style="{background:index==hIdx?'#EA705B':'#BBBBBB'}" >{{item.num}}</span>
				<span class="f2" :style="{color:index==hIdx?'#EA705B':'#999999'}">{{item.name}}</span>
			</div>
			<!-- <div class="second">
				<span class="s1">2</span>
				<span class="s2">填写邮寄地址</span>

			</div>
			<div class="third">
				<span class="t1">3</span>
				<span class="t2">等待平台邮寄</span>
			</div> -->
		</div>
		<div class="all_box" v-if="sub" :style="{display: display}" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
            <div   @click="choose(item.code,index,item.price,item.amount,item)"  v-for="(item,index) in info" >
            	<div class="list">
            		<div class="circle">
	            		<img v-if="chooseLott.indexOf(item.code)==-1" src="../../static/img/wxz.png" class="wxz">
	            		<img v-if="chooseLott.indexOf(item.code)!=-1" src="../../static/img/xz.png" class="wxz">
	            	</div>
	            	<div class="icon">
	            		<img class="img_icon" :src="item.imgFront">
	            	</div>
	            	<div class="msg">
	            		<div class="mg m_top">
	            			<span class="m_title">{{item.ticketSortName}}</span> 
	            			<span class="time">{{item.createTime | formDate}}</span>
	            		</div>
	            		<div class="mg m_center"> 
	            			<span class="m_title">x{{item.amount}}</span> 
	            			<span class="time">合计  ¥<span style="font-size: 16px">{{item.price}}</span></span>
	            		</div>
	            		<div class="mg m_bottom">单号：{{item.code}}</div>
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
		<div class="empty" v-if="info.length==0" :style="{display: display}"><img src="../../static/img/empty/getLott.png" class="empty_icon"></div>
		<div class="footer">
			<span class="chooseNum">已选择<span style="color:#EA6F5A;font-weight: bold;"> {{num}} </span>张</span>
			<span class="choosePrice">面值合计 <span style="color:#EA6F5A;font-weight: bold;" > {{allprice | currency("¥",2)}} </span></span>
			<span class="btn_next" v-if="sub" @click="submit()">下一步</span>
			<span class="btn" v-if="!sub"@click="goSub()">确认提交</span>

		</div>
		<div class="subBox" v-if="!sub" >
			<div class="margin">
				<div class="type">
					<div class="label">真实姓名</div>
					<div class="print_box">
						<input class="print" v-model="name" placeholder="输入姓名" type="" name="">
					</div>
				</div>
				<div class="type">
					<div class="label">手机号</div>
					<div class="print_box">
						<input class="print" v-model="phone" placeholder="输入手机号" type="" name="">
					</div>
				</div>
				<!-- <div class="type">
					<div class="label">地址</div>
					<div class="print_box">
						<select class="print_select choose" v-model="sheng">
							<option value="">选择省</option>
							<option :value="item.id" v-for="item in province">{{item.name}}</option>
						</select>
						<select class="print_select choose" v-model="shi">
							<option value="">选择市</option>
							<option :value="item.id" v-for="item in city">{{item.name}}</option>
						</select>
						<select class="print_select choose" v-model="qu">
							<option value="">选择区</option>
							<option :value="item.id" v-for="item in county">{{item.name}}</option>
						</select>
					</div>
				</div> -->
				<div class="type">
					<div class="label">详细地址</div>
					<div class="print_box">
						<input class="print" v-model="address" placeholder="输入详细地址" type="" name="">
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
	import { Indicator } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				hIdx:0,
				header:[
					{
						num:1,
						name:"选择所购彩票"
					},
					{
						num:2,
						name:"填写邮寄地址"
					},
					{
						num:3,
						name:"等待平台邮寄"
					},
				],
				info:[],
				chooseLott:[],
				num:0,
				allprice:0,

		        sub:true,


				 //省市区
		        province: [],
		        city: [],
		        county: [],
		        sheng:'',
		        shi:'',
		        qu:'',
		        // 表单
		        name:"",
		        address:"",
		        phone:"",
		        idx:-1,

		        start:1,
		        count:15,

		        load:true,

		        display:'none'

			}
		},
		created(){
			this.query()
			// this.getProvince()
		},
		methods:{
			query(){
				Indicator.open({ 
					text: '加载中...',
  					spinnerType: 'double-bounce'});
				this.$http.get(_config.server+'/merApi/user/userPostTickets?token='+store.get('_person').token+'&type=2&start='+this.start+'&count='+this.count).then((res)=>{
		          console.log("邮寄",res);
		       		setTimeout(()=>{
						Indicator.close();
					},300)
		          if(res.data.status == 1){
		          	this.display='block'
		            if(res.data.data.length<this.count){
		            	this.load = false;
		            }
		            this.info  = res.data.data;
		           
		          }
		        },(err)=>{
		          console.log(err);
		          setTimeout(()=>{
						Indicator.close();
					},300)
		        })
			},
			loadMore(){
				this.start++;
				// console.log(this.start)
				this.$http.get(_config.server+'/merApi/user/userPostTickets?token='+store.get('_person').token+'&type=2&start='+this.start+'&count='+this.count).then((res)=>{
		          // console.log("邮寄",res);
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
			},
			choose(code,index,price,amount,item){
				console.log(index)
				console.log(code)
				console.log(item)
				console.log(1111111111111)
				this.idx = index;
				if(this.chooseLott.indexOf(code)==-1){
					this.chooseLott.push(code)
					this.num += amount;
					this.allprice+= price;
					console.log('添加',this.chooseLott)
				}else if(this.chooseLott.indexOf(code)!=-1){
					this.chooseLott.splice(this.chooseLott.indexOf(code),1)
					console.log('删除',this.chooseLott)
					this.num -= amount;
					this.allprice-= price;
				}
				console.log('全局',this.chooseLott)

			},
			
			// 获取省
			getProvince(){
				let _this = this;
				_this.$http.get(_config.server+'/merApi/dict/code/list',{
					params:{
						code: 'province',
					}
				}).then((res)=>{
					console.log(res.data);
					if(res.data.status == 200){
						_this.province = res.data.body;
					}
				},(err)=>{
					console.log(err);
				})
			},
			// 获取市
			getCity(){
				let _this = this;
				_this.$http.get(_config.server+'/merApi/dict/parId/list',{
					params:{
						parId: this.sheng,
					}
				}).then((res)=>{
					console.log(res.data);
					if(res.data.status == 200){
						_this.city = res.data.body;
					}
				},(err)=>{
					console.log(err);
				})
			},
			// 获取区
			getCounty(){
				let _this = this;
				_this.$http.get(_config.server+'/merApi/dict/parId/list',{
					params:{
						parId: this.shi,
					}
				}).then((res)=>{
					console.log(res.data);
					if(res.data.status == 200){
						_this.county = res.data.body;
					}
				},(err)=>{
					console.log(err);
				})
			},
			// 填写地址
			submit(){
				if(this.chooseLott.length==0){
					Toast({duration: 1000,
					message:'请选择要邮寄的即开彩！'});
					return
				}
				this.hIdx = 1;
				this.sub = false;
				console.log(this.sub)
				// /merApi/user/tickets/posts
			},
			// 提交
			goSub(){
					
				var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;

				if(this.name==""||this.name==""||this.address==""||this.phone==""){
					Toast({duration: 1000,
					message:'信息填写不完整！！！'});
					return
				}
				if(!reg.test(this.phone)){
					Toast({duration: 1000,
					message:'手机号格式不对！！！'});
					return;
				}
				let param = new FormData()
					param.append('token', store.get('_person').token)
					param.append('type', '2')
					param.append('postName', this.name)
					param.append('postMobile', this.phone)
					param.append('postAddress', this.address)
					param.append('selectCode', this.chooseLott.lenth==1?this.chooseLott.join(',')+',':this.chooseLott.join(','))
					// param.append('code', this)

					console.log(this.chooseLott.join(','))
					console.log(param)
					Indicator.open({ 
						text: '提交中...',
	  					spinnerType: 'double-bounce'});
					this.hIdx = 2;
				this.$http.post(_config.server+'/merApi/user/tickets/posts',param).then(res=>{
					console.log(res)
					let success;
					if(res.data.status==1){
					
						setTimeout(()=>{
						
							Indicator.close();
						},300)
						setTimeout(()=>{
							success=Toast({
							  message: '提交成功',
							  iconClass: 'icon icon-success'
							});
						},300)
						
						setTimeout(()=>{
							success.close();
							// this.sub = true;
							// this.num = 0;
							// this.allprice = 0;
							// this.chooseLott = [];
							this.$router.replace('/site');
						},2000)
					}
				},err=>{
					let fail=Toast({
					  message: '提交失败',
					  iconClass: 'icon icon-success'
					});

				})
			},
			back(){
				this.hIdx = 0;
				this.sub = true;
			}
		},
		watch:{
			sheng(){
				this.getCity();
				// console.log(this.sheng);
			},
			shi(){
				this.getCounty();
			}
		},
	}
</script>
<style type="text/css" scoped>
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
		padding-top: 70px;
	}
	.empty_icon{
		display: block;
		width:200px;
		height:200px;
		margin:0 auto;
	}
	section{
		padding-bottom:45px;
		padding-top:50px;
		height:100vh;
		background:#f6f6f6;
	}
	.header{
		width:100%;
		height:50px;
		background: #fff;
		line-height: 40px;
		position: fixed;
		top:0;
		left:0;
		/*padding-bottom:10px;*/
		border-bottom:10px solid #f6f6f6;
	}
	.first,.second,.third{
		width:33.33333333%;
		float: left;
		font-size: 12px;
	}
	.f1,.s1,.t1{
		font-size: 14px;
		display: inline-block;
		width:25px;
		height:25px;
		background: #BBBBBB;
		line-height: 25px;
		border-radius: 50%;
		font-weight: bold;
		font-style: oblique;
		color:#fff;
	}
	.all_box{
		padding:0 0 45px 0;
		color:#999;
	}
	.list{
		height:100px;
		overflow: hidden;
		font-size: 14px;
		/*padding-bottom:10px;*/
		padding:15px 15px 10px  15px;
		background:#fff;
	}
	.icon{
		float: left;
		width:70px;
		height:70px;
		/*border:1px solid #666;*/
		margin-right:10px;
		overflow: hidden;
	}
	.wxz{
		display: inline-block;
		width:18px;
		height:18px;
		
	}
	.circle{
		float: left;
		width:18px;
		height:70px;
		padding-top:26px;
		margin-right:10px;


	}
	.img_icon{
		height:70px;
	}
	.msg{
		padding-left:90px;
		text-align: left;
		z-index:1;
	}
	.mg{
		height:25px;
		line-height: 24px;
	}
	.m_top{

	}
	.m_bottom{
		display: block;
   		text-overflow:ellipsis;
   		white-space: nowrap;
   		overflow: hidden;
   		color:#999;
	}
	.time{
		float: right;
		font-size: 12px;
	}
	.footer{
		position: fixed;
		bottom:0;
		height:45px;
		width:100%;
		background: #fff;
		font-size: 14px;
		line-height: 45px;
		padding:0 16px 0 25px;
	}
	.chooseNum,.choosePrice{
		float: left;
	}
	.chooseNum{
		margin-right:10px;
	}
	.btn_next{
		float: right;
		width:70px;
		height:30px;
		background: #138DE9;
		margin-top:7.5px;
		line-height: 30px;
		border-radius: 4px;
		color:#fff;
		font-size: 12px;
	}
	.btn{
		float: right;
		width:70px;
		height:30px;
		background: #E86036;
		margin-top:7.5px;
		line-height: 30px;
		border-radius: 4px;
		color:#fff;
		font-size: 12px;
	}

.subBox{
	/*background: #999;*/
}
/*地址*/
	.margin{
	margin: 30px 15px 0 5px;
	}
	.type{
		width:100%;
		overflow: hidden;
		margin-bottom:20px;
	 }
	.label{
		float: left;
		width:80px;
		height:37px;
		line-height: 37px;
		text-align:right;
	}
	 .print_box{
	 	position: relative;
	  	padding-left:90px;
	 }
	 .print{
		border:1px solid #E5E5E5;
		outline: none;
		width:100%;
		height:37px;
		border-radius: 4px;
		padding-left:7px;
	 }

	 .print_select{
		border:1px solid #E5E5E5;
		outline: none;
		width:30%;
		height:37px;
		border-radius: 4px;
		padding-left:7px;
	 }
	 .print2{
		border:1px solid #E5E5E5;
		outline: none;
		width:50%;
		height:37px;
		border-radius: 4px;
		padding-left:7px;
	 }
	 .print_text{
		width:50%;
		height:37px;
		line-height: 37px;
		border-radius: 4px;
		padding-left:7px;
		font-size: 14px;
	 }




	@media (max-width: 320px){
		.list{
			font-size: 12px;
		}
		.time{
			float: right;
		}
		.m_title{
			float: left;
			margin-right:10px;
		}
	}
</style>