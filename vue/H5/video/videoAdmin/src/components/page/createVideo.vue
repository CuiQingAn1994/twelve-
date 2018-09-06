<template>
	<div class="create_video">
		<div v-title>创建直播间</div>
		<div class="body">
			<!-- nav刷新返回条 -->
			<div class="orderlist_title">
				<i class="title_block"></i>
				<span>创建直播间</span>
				<!-- <button>返回</button>
				<button>刷新</button> -->
			</div>

			<!-- 创建直播间 -->
			<div class="create">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
				  <el-form-item label="直播室名称" prop="name">
				    <el-input v-model="ruleForm.name" placeholder="请输入直播室名称如：河北顶呱呱"></el-input>
				  </el-form-item>
				  <el-form-item label="选择所属区域" prop="region">
				    <el-select v-model="ruleForm.region" placeholder="请选择">
				      <el-option :label="item.name" :value="item.id.toString()" :key="item.id.toString()" v-for="item in addressData"></el-option>
				      <!-- <el-option label="区域二" value="beijing"></el-option> -->
				    </el-select>
				  </el-form-item>
				  <el-form-item
				    label="直播室队列閥值"
				    prop="threshold"
				    :rules="[
				      { required: true, message: '閥值不能为空'},
				      { type: 'number', message: '閥值必须为数字值'}
				    ]"
				  >
				    <el-input type="threshold" v-model.number="ruleForm.threshold" auto-complete="off" placeholder="输入验票队列允许的最大值,如100"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				    <el-button @click="resetForm('ruleForm')">重置</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		data() {
	      return {
	        ruleForm: {
	          name: '',
	          region: '',
	          threshold: '',
	        },
	        rules: {
	          name: [
	            { required: true, message: '请输入直播室名称', trigger: 'blur' },
	            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
	          ],
	          region: [
	            { required: true, message: '请选择直播室区域', trigger: 'change' }
	          ],
	        },
	        addressData: [],
	      };
	    },
	    created(){
	    	this.getAddress();
	    },
	    methods: {
	        //获取省份信息
	        getAddress(){
				this.$http.get('/liveApi/code/list').then((res)=>{
					console.log(res.data.data)
					if(res.data.status == 1){
						this.addressData = res.data.data
					}
				},(err)=>{
					console.log(err)
				})
			},

		    //提交	    	
	        submitForm(formName) {
	        	console.log(this.ruleForm)
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            this.$http.get('/liveApi/createPushAndPullStream',{
		            	params:{
		            		'dictId':this.ruleForm.region,
		            	}
		            }).then((res)=>{
		            	console.log(res)
		            	if(res.data.status == 1){
							setTimeout(function(){
								this.$router.replace({path:'/videoAdmin'})
							},300)
							this.$message('创建直播间成功');
		            	}
		            },(err)=>{
		            	console.log(err)
		            })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
	        },
	        resetForm(formName) {
	        	this.$refs[formName].resetFields();
	        }
	    }
	}
</script>

<style scoped>
.create_video{
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

/*创建直播间*/
.create{
	width: 40%;
	margin-top: 50px;
}
	
</style>













