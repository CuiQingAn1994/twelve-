$(function() {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' 
    FastClick.attach(document.body);
    var lock = true;
    var type = hcb.params("type")
    store.set('type',type)
    console.log(type)
    $("#tel").focus(function() {
        $("#topLine").addClass("change")
    });
    $("#tel").blur(function() {
        $("#topLine").removeClass("change")
    });
     $("#code").focus(function() {
        $("#btoLine").addClass("change")
    });
    $("#code").blur(function() {
        $("#btoLine").removeClass("change")
    });
    $("#code_txt").click(function() {
        if(lock){ 
            lock = false;
            setTimeout(function(){
                lock = true;
                $("#warnTips").html('')
            }, 3000)
            if (!$("#tel").val() || $("#tel").val().length != 11) {
                // toastr.error('请确认手机号码')
                $("#warnTips").html('请确认手机号码')
                return;
            }
            if ($("#code_txt").hasClass("disable")) {
                // toastr.error('请稍后再试')
                return;
            }
            if (!$("#code_txt").hasClass("disable")) {
                var inter = null;
                var time = 60;
                var timeNum = new Date().getTime()+60000;
                $("#code_txt").text(time + "s后重发");
                $("#code_txt").addClass("disable");
                time--;
                inter = window.setInterval(function() {
                    $("#code_txt").text(time + "s后重发");
                    time = Math.round((timeNum - new Date().getTime())/1000);
                    if (time < 0) {
                        time = 60;
                        $("#code_txt").removeClass("disable")
                        window.clearInterval(inter);
                        $("#code_txt").text("获取验证码");
                    }
                }, 1000);
               console.log($("#tel").val())
                axios.get(_config.server + '/api/common/code?mobile='+$("#tel").val()+'&type=1').then(function(response) {
                     console.log(response)
                    if(response.data.status==1){
                        console.log('正确',response)
                    }else{  
                        console.log('错误',response)
                        $("#warnTips").html(response.data.message)              
                        setTimeout(function(){
                            $("#warnTips").html('')
                        },3000)
                    }
                })
            }
        }
    });
    $("#sub").click(function() {
        console.log('click login')
        if(lock){
            lock = false;
            setTimeout(function(){
                lock = true;
                $("#warnTips").html('')
            }, 3000)   
            if (!$("#tel").val() || $("#tel").val().length != 11) {
                // toastr.error('请确认手机号码')
                $("#warnTips").html('请确认手机号码')
                return;
            }

            if (!$("#code").val()) {
                // toastr.error('请确认验证码')
                // 验证码没有输入的提示
                $("#warnTips").html('请确认验证码')
                return;
            }
            $("#loadingToast").show();
    
            //根据CODE查询信息
            console.log({
                    mobile: $("#tel").val(),
                    smsCode: $("#code").val(),
                    // wxcode: hcb.params("code"),
                    code:'021bfFtK0DVTF72UjarK0LvztK0bfFt1'

                })
            var params = {
                    'mobile': $("#tel").val(),
                    'smsCode': $("#code").val(),
                    // wxcode:
                    // 'code':'081SXVbb0rY9Yv1uYrab0YgHbb0SXVbd',
                    'type':type,
                    'code':hcb.params("code"),

                }
                console.log(params)
            if(type==1){
                // alert('商家登录')
                axios.post(_config.server+'/merApi/merchant/login',params).then(function(response){
                    if(response.data.status==1){
                        console.log('商家',response,_config.shop)
                        store.set("_shoper",response.data.data)
                        window.location.href= _config.shop_url
                    }else{
                        $("#warnTips").html(response.data.message)
                        setTimeout(function(){
                            $("#warnTips").html('')

                        },3000)
                    }
                    $("#loadingToast").hide();

                }).catch(function(error) {
                        $("#warnTips").html('服务器错误')
                        setTimeout(function(){
                            $("#warnTips").html('')
                        }, 3000)
                        console.log(error);
                        $("#loadingToast").hide();
                    });
            }else if(type==2){
                // alert('用户登录')
                axios.post(_config.server+'/merApi/merchant/login',params).then(function(response){
                    console.log(response)
                    if(response.data.status==1){
                        console.log('用户',response,_config.shop)
                        store.set("_person",response.data.data)
                        var _reherf = store.get("_reherf");
                        if(_reherf){
                            store.set("_reherf","");
                            window.location.href= _reherf  
                        }else{
                            store.set("_reherf","");
                            window.location.href= _config.user_url 
                        }
                        
                    }else{
                        $("#warnTips").html(response.data.message)
                        setTimeout(function(){
                            $("#warnTips").html('')

                        },3000)
                    }
                    $("#loadingToast").hide();

                }).catch(function(error) {
                        $("#warnTips").html('服务器错误')
                        setTimeout(function(){
                            $("#warnTips").html('')
                        }, 3000)
                        console.log(error);
                        $("#loadingToast").hide();
                    });
            }else{
                // alert("微信授权登录")
                axios.post(_config.server + '/api/common/wechat/login',params)
                    .then(function(response) {
                        console.log(response)
                        if(response.data.status == 1){
                            console.log(response.data.data.token)
                            store.set("_user",response.data.data);
                            var _refer = store.get("_refer");
                            store.remove("_refer");
                            console.log("to:" + _refer);
                            // 跳转首页／授权页
                            window.location.href = _refer;
                        }else{
                            // toastr.error(response.data.msg);
                            // 验证码错误提示
                            
                            $("#warnTips").html(response.data.message)
                            setTimeout(function(){
                                $("#warnTips").html('')
                            }, 3000)
                        }
                         $("#loadingToast").hide();
                    })
                    .catch(function(error) {
                        $("#warnTips").html('服务器错误')
                        setTimeout(function(){
                            $("#warnTips").html('')
                        }, 3000)
                        console.log(error);
                        $("#loadingToast").hide();
                    });
                }
            }
    });
});
