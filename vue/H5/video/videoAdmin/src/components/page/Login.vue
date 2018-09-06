<template>
    <!--<div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm()"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>-->
    <div class="login-wrap">
        <div class="ms-title">验票直播后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="输入密码" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="verifycode">
                    <el-input placeholder="输入验证码" v-model="ruleForm.verifycode" @keyup.enter.native="submitForm('ruleForm')" style="width: 55%;"></el-input>
                    <img src="http://mtest.zthuacai.com/api/common/validate" alt="验证图片" class="code_img">
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: '',
                    verifycode: '',
                    imgCode:'',
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    verifycode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;

                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData = new FormData();
                        formData.append('username',self.ruleForm.username)
                        formData.append('password',self.ruleForm.password)
                        formData.append('code',self.ruleForm.verifycode)
                        self.$http.post('/liveApi/liveLogin',formData).then((res)=>{
                            console.log(res)
                            if(res.data.status==1){
                                localStorage.setItem('ms_username',self.ruleForm.username);
                                // localStorage.setItem('Permissions',res.data.data[0].permission);
                                self.$router.push('/recording');
                            }else if(res.data.message=='密码不正确'){
                                self.open6();
                            }else if(res.data.message=='用户名不存在'){
                                self.open7();
                            }else if(res.data.message=='验证码不正确'){
                                self.open8();
                            }
                        },(err)=>{
                            console.log(err);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //登录失败
            open6() {
                this.$message.error({
                    showClose: true,
                    message: '密码错误，请重新输入',
                });
            },
            open7() {
                this.$message.error({
                    showClose: true,
                    message: '用户名不存在，请重新输入',
                });
            },
            open8() {
                this.$message.error({
                    showClose: true,
                    message: '验证码错误，请重新输入',
                });
            },
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:200px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .code_img{
        float: right;
        vertical-align: top;
        width: 110px;
        height: 34px;
        border-radius: 4px;
    }
</style>
