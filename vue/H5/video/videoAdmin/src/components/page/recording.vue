<template>
	<div class="recording">
		<div v-title>录票管理</div>
		<div class="body">
			<!-- nav刷新返回条 -->
			<div class="orderlist_title">
				<i class="title_block"></i>
				<span>录票管理</span>
				<!-- <button>返回</button>
				<button>刷新</button> -->
			</div>

			<!-- 头部 -->
			<header>
				<div class="head_left">
					<p class="row">
						<!-- <span class="xing">*</span> -->
						<!-- <span class="row_title">选择区域</span> -->
						<!-- <select class="row_select" v-model="valueArea">
							<option value="">选择区域</option>
							<option :value="item" v-for="item in getArea">{{item.name}}</option>
						</select> -->
						<el-select v-model="valueArea" placeholder="选择区域">
							<el-option
								v-for="item in getArea"
								:key="item.valueArea"
								:label="item.name"
								:value="item">
							</el-option>
						</el-select>
					</p>
					<p class="row">
						<!-- <span class="xing">*</span>
						<span class="row_title">选择彩种</span>
						<select class="row_select" v-model="valueSpecies">
							<option value="">选择彩种</option>
							<option :value="item" v-for="item in getSpecies">{{item.name}}</option>
						</select> -->
						<el-select v-model="valueSpecies" placeholder="选择彩种">
							<el-option
								v-for="item in getSpecies"
								:key="item.valueSpecies"
								:label="item.name"
								:value="item">
							</el-option>
						</el-select>
					</p>
				</div>
				<div class="head_right">
					<div class="head_right_top">
						<span class="start_tips" v-if="redDian"></span>
						<span class="start_tips2" v-if="greedDian"></span>
						<div class="recording_box">
							<textarea type="text" @blur="focusState = false" v-focus="focusState" v-model="codeModel" class="recording_box_text2"></textarea>
						</div>
						<div class="end_btn click_active" v-if="startBtn" @click="startClick()">开始录制</div>
						<div class="end_btn click_active" v-if="endBtn" @click="endClick()">结束录制</div>
					</div>
					<p class="red_text">当前选择录票区域：<span class="value_area">{{valueArea.name}}</span>  彩种：{{valueSpecies.name}}</p>
				</div>
			</header>

			<!-- 结束录制弹窗 -->
			<div class="record_model" v-if="toast">
				<div class="record_bg_color">
					<div class="record_model_box">
						<p class="record_model_text">是否确定结束录制？</p>
						<p>
							<span class="btn_yes click_active2" @click="yesClick()">确定</span><span class="btn_no click_active" @click="noClick()">取消</span>
						</p>
					</div>
				</div>
			</div>

			<!-- 中间录制信息 -->
			<section>
				<div class="row_info">
					<p class="detail"><span class="detail_title">录票信息：&nbsp;&nbsp;&nbsp;</span>当前已录入票：<span class="color_red"> {{tableCount4}} </span>张&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打包成功：<span class="color_red"> {{tableBag4}} </span>包&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打包失败剩余单张：<span class="color_red"> -- </span>张&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
				</div>
				<ul>
					<li class="select click_active" v-for="(item,index) in liBtn" :style="{border:index==idex?'1px solid #108EE9':'1px solid #999999',color:index==idex?'#108EE9':'#999999'}" @click="liBtnClick(index)">{{item}}</li>
				</ul>
			</section>

			<!-- 录票信息表格 -->
            <div class="table1" v-if="tableHide1">
				<el-table
					:data="tableData4"
					style="width: 100%"
					max-height="300"
					border>
					<el-table-column
						fixed
						prop="code"
						label="票号"
						width="500"
						header-align="center"
						align="center">
					</el-table-column>
					<el-table-column
						prop="creatTmString"
						label="录票时间"
						width="400"
						header-align="center"
						align="center">
					</el-table-column>
					<el-table-column
						fixed="right"
						label="操作"
						header-align="center"
						align="center">
						<template slot-scope="scope">
							<el-button
								@click.native.prevent="deleteRow(scope.$index, tableData4)"
								type="text"
								size="small">
								移除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
            </div>

            <div class="table2" v-if="tableHide2">
				<el-table
					:data="tableData4"
					style="width: 100%"
					max-height="300"
					border>
					<el-table-column
						fixed
						prop="date"
						label="票号"
						width="350"
						header-align="center"
						align="center">
					</el-table-column>
					<el-table-column
						prop="name"
						label="所属彩种类型(名称x面值)"
						width="250"
						header-align="center"
						align="center">
					</el-table-column>
					<el-table-column
						prop="zip"
						label="所属区域"
						width="200"
						header-align="center"
						align="center">
					</el-table-column>
					<el-table-column
						prop="zip"
						label="录票时间"
						width="250"
						header-align="center"
						align="center">
					</el-table-column>
					<el-table-column
						fixed="right"
						label="操作"
						width="150"
						header-align="center"
						align="center">
						<template slot-scope="scope">
							<el-button
								@click.native.prevent="deleteRow(scope.$index, tableData4)"
								type="text"
								size="small">
								移除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
            </div>

            <div class="table3" v-if="tableHide3">
				<el-table
					:data="tableData4"
					style="width: 100%"
					max-height="300"
					border>
					<el-table-column
						fixed
						prop="date"
						label="票号"
						width="350"
						header-align="center"
						align="center">
					</el-table-column>
					<el-table-column
						prop="name"
						label="所属彩种类型(名称x面值)"
						width="250"
						header-align="center"
						align="center">
					</el-table-column>
					<el-table-column
						prop="zip"
						label="所属区域"
						width="200"
						header-align="center"
						align="center">
					</el-table-column>
					<el-table-column
						prop="zip"
						label="录票时间"
						width="250"
						header-align="center"
						align="center">
					</el-table-column>
					<el-table-column
						fixed="right"
						label="操作"
						width="150"
						header-align="center"
						align="center">
						<template slot-scope="scope">
							<el-button
								@click.native.prevent="deleteRow(scope.$index, tableData4)"
								type="text"
								size="small">
								移除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
            </div>

		</div>
		
	</div>
</template>

<script>
	export default {
		data(){
			return {
				startBtn: true,
				endBtn: false,
				codeHide: false,
				focusState: false,
				redDian: true,
				greedDian: false,
				toast: false,
				tableHide1: true,
				tableHide2: false,
				tableHide3: false,
				startModel: '',
				codeModel: '开始录制',
				tableData4: [],
				tableList4: [],
				tableCount4: 0,
				tableBag4: 0,
				liBtn:['录票信息','打包成功','剩余单张'],
				idex:0,
				getArea:[],
				getSpecies:[],
				valueArea:'',
				valueSpecies:'',
				apiUrl: 'http://bpmtest.zthuacai.com',
			}
		},
		created(){
			this.area()
		},
		watch:{
			valueArea(){
				this.species()
			},
			codeModel(){
				let _this = this;
				document.onkeyup = function (e) {//按键信息对象以函数参数的形式传递进来了，就是那个e  
				    var code = e.charCode || e.keyCode;  //取出按键信息中的按键代码(大部分浏览器通过keyCode属性获取按键代码，但少部分浏览器使用的却是charCode)  
				    if (code == 13) {  
				        //此处编写用户敲回车后的代码  
				        // console.log('回车了')
				        _this.enter();
				        _this.record();
					    _this.codeModel = '';
				    }  
				} 
			},
		},
		methods:{
			// 点击开始录制
			startClick(){
				this.startBtn = false;
				this.endBtn = true;
				this.redDian = false;
				this.greedDian = true;
				this.codeHide = true;
				this.focusState = true;
				this.codeModel = '';
			},
			// 去掉回车
			enter(){
				this.codeModel = this.codeModel.replace(/[\r\n]/g,"")
			},
			// 结束录制
			endClick(){
				this.toast = true;
			},
			// 弹窗确定结束录制
			yesClick(){
				this.toast = false;
				this.startBtn = true;
				this.endBtn = false;
				this.redDian = true;
				this.greedDian = false;
				this.codeModel = '开始录制';
			},
			// 弹窗取消结束录制
			noClick(){
				this.toast = false;
				this.startBtn = false;
				this.endBtn = true;
				this.focusState = true;
				this.codeModel = '';
			},

			// 获取区域
			area(){
				this.$http.get(this.apiUrl+'/record/provinces').then((res)=>{
					console.log(res)
					if(res.status==200){
						this.getArea = res.data;
					}
				},(err)=>{
					console.log(err)
				})
			},
			// 获取彩种
			species(){
				this.$http.get(this.apiUrl+'/record/province/'+this.valueArea.id).then((res)=>{
					console.log(res)
					if(res.status==200){
						this.getSpecies = res.data
					}
				},(err)=>{
					console.log(err)
				})
			},
			// recording扫码录入
			record(){
				var formData = new FormData();
				formData.append('sortId',this.valueSpecies.id)
				formData.append('code',this.codeModel);

				this.$http.post(this.apiUrl+'/record/add',formData).then((res)=>{
					console.log(res);
					if(res.status == 200){
						if(res.data.code == ''){
							console.log('打包完成')
							this.tableData4 = [];
							this.tableCount4 = 0;
							this.tableBag4 ++;
							return
						}
						// var  = Array.from(new Set(this.tableList4))
						console.log(this.tableList4.indexOf(res.data.code));
						if(this.tableList4.indexOf(res.data.code)==-1||this.tableList4.length==0){
							this.tableData4.unshift(res.data);
							this.tableCount4 = res.data.count;
							console.log('执行push')
						}else{
							console.log('没有执行push')
						}
						this.tableList4.push(res.data.code);
						// console.log(this.tableData4);
					}
				},(err)=>{
					console.log(err);
				})
			},

			// tab切换表格
			liBtnClick(index){
				this.idex = index;
				if(index == 0){
					this.tableHide1 = true;
					this.tableHide2 = false;
					this.tableHide3 = false;
				}
				if(index == 1){
					this.tableHide1 = false;
					this.tableHide2 = true;
					this.tableHide3 = false;
				}
				if(index == 2){
					this.tableHide1 = false;
					this.tableHide2 = false;
					this.tableHide3 = true;
				}
			},

			// table delete
			deleteRow(index, rows) {
				rows.splice(index, 1);
			}
		},
		directives: {
			focus: {
				update: function (el, {value}) {
					if (value) {
						el.focus()
					}
				}
			}
		},

	}
</script>

<style scoped>
.recording{
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

/*头部*/
header{
	display: flex;
}
.head_left{
	flex: 0.4;
	font-size:16px;
	padding-top: 10px;
	text-align: left;
}
.head_right{
	flex: 1;
	font-size:16px;
}
.xing{
	color: #E51C23;
}
.row{
	padding-top: 10px;
}
.row_select{
	width: 60%;
	height: 45px;
	line-height: 45px;
	font-size: 13px;
	outline: none;
	padding-left: 20px;
	border-radius: 5px;
}
.head_right{
	font-size: 0;	
}
.start_tips{
	display: inline-block;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #E51C23;
	vertical-align: top;
}
.start_tips2{
	display: inline-block;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: green;
	vertical-align: top;
}
.recording_box{
	display: inline-block;
	width: 65%;
	height: 50px;
	line-height: 50px;
	border-radius: 4px;
	background-color: #108EE9;
	border: 1px solid #BBBBBB;
	margin: 0 20px;
	padding-top: 30px;
}
.recording_box_text{
	/*display: inline-block;*/
	width: 100%;
	font-size: 16px;
	text-align: center;
	background-color: #108EE9;
	color: white;
}
.recording_box_text2{
	display: inline-block;
	width: 100%;
	height: 40px;
	/*line-height: 26px;*/
	font-size: 16px;
	text-align: center;
	background-color: #108EE9;
	/*background-color: white;*/
	color: white;
	/*padding: 0 10px;*/
	outline: none;
	border: none;
	resize : none;
	/*visibility: hidden;*/
}
.end_btn{
	float: right;
	width: 20%;
	height: 40px;
	line-height: 40px;
	border-radius: 4px;
	font-size: 13px;
	text-align: center;
	border: 1px solid #BBBBBB;
	vertical-align: top;
	margin-top: 20px;
}

/*中间录制信息*/
.red_text{
	font-size: 14px;
	color: #E51C23;
	margin: 10px 10%;
}
.value_area{
	display: inline-block;
	width: 110px;
	height: 16px;
	line-height: 16px;
	/*border: 1px solid red;*/
	vertical-align: top;
}
.row_info{
	margin: 10px 0;
}
.detail_title{
	font-size: 16px;
}
.detail{
	font-size: 14px;
}
.color_red{
	font-weight: 600;
	color: #E51C23;
}
.table1,.table2,.table3{
	margin-top: 20px;
	/*border: 1px solid #e5e5e5;*/
}

.select{
	display: inline-block;
	width: 120px;
	height: 42px;
	line-height: 42px;
	text-align: center;
	font-size: 14px;
	border: 1px solid #BBBBBB;
	color: #888888;
	border-radius: 4px;
	margin: 0 10px;
}
.tab_active{
	border: 1px solid #108EE9;
	color: #108EE9;
}

.row_2,.row_3{
	display: none;
}
.click_active:active{
	background-color: #e5e5e5;
}
.click_active2:active{
	background-color: #0481DB;
}

/*弹窗*/
.record_bg_color{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 20;
	background: rgba(0,0,0,0.6);
	text-align: center;
	font-size: 16px;
}
.record_model_box{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 30%;
	height: 200px;
	background-color: white;
	z-index: 200;
	margin: 200px auto 0;
}
.record_model_text{
	margin: 50px 0;
}
.btn_yes,.btn_no{
	display: inline-block;
	width: 60px;
	height: 26px;
	line-height: 26px;
	/*text-align: center;*/
	border: 1px solid #999999;
	margin: 0 30px;
	border-radius: 4px;
}
.btn_yes{
	background-color: #108EE9;
	color: white;
}
	
</style>













