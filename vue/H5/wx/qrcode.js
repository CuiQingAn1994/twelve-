$(function() {
    var params = {
        snNo: hcb.params("snNo")
    }
    var user = hcb.user(); 
    var href = window.location.href;
    // 拦截器拦截403 401错误
    axios.interceptors.response.use(
      response => {
          return response;
      },
      error => {
          if (error.response) {
              switch (error.response.status) {
                  case 403:
                      // alert('403拦截')
                      store.set('_user',"")
                      console.log(href)
                      window.location.href = href;
                  case 401:
                      // alert('401拦截')
                      store.set('_user',"")
                      console.log(href)
                      window.location.href = href;                     
              }
          }
          return Promise.reject(error.response.data)  // 返回接口返回的错误信息
    });
    // function check(){
    //     axios.get(_config.server + '/api/common/token/status?token='+user.token).then(function(response) {
    //         console.log('检查状态',response)
    //         if(response.data.status==1){
    //             if(response.data.data==1){
    //                 console.log("token有效");
    //                 $('.container').css({display:'block'})
    //                 $("#loadingToast").hide();
    //             }else if(response.data.data==0){
    //                 console.log("token无效")
    //                 store.set('_user',"")
    //                 console.log(href)
    //                 window.location.href = href;
    //             }
    //         }
    //     })
    //     console.log(href)

    // }
    // check();

    console.log(params)
    // axios.defaults.headers.post['Content-Type'] = 'application/x_www-form-urlencoded';
    FastClick.attach(document.body);
    // 微信头像
    $("#avatar").html(`<img src="` + user.headimgurl + `"/>`);
    // 微信用户名
    $("#nickname").html(user.nickname);
    // 取消按钮
    $("#close").click(function() {
        wx.closeWindow();
    });
    // 点击授权登录
    $("#login").click(function() {
        // alert(1111111111)
        $("#loadingToast").show();
        console.log(111111)
        var timeout = 1;

        // window.setTimeout(function() {
            if (timeout == 1) {
                var user = hcb.user();
                console.log()
                let params1 = new FormData()
                    params1.append('token', user.token)
                    params1.append('snNo', params.snNo)
                // var params1= {
                //         token:user.token,
                //         snNo:params.snNo
                //     }

                console.log(params1)
                axios.post(_config.server + '/api/common/auth/login',params1).then(function(response) {

                        // console.log(response);
                        if(response.data.status==1){
                            console.log(response);
                            setTimeout(function(){
                                $("#loadingToast").hide();
                                wx.closeWindow(); 
                            },400)

                         }else{
                            $("#alert_all").show();
                            $("#loadingToast").hide();
                            $("#contnet").html(response.data.message)
                         }


                    },function(err){
                        // 报错重新登录
                        store.set('_user',"")
                        console.log(href)
                        window.location.href = href;
                    }).catch(function(error) {
                        console.log(error);
                        $("#loadingToast").hide();
                        store.set('_user',"")
                        window.location.href = href;
                    });
            }
    });
    // 错误弹窗
    $("#colseSure").click(function(){
        $("#alert_all").hide();
        wx.closeWindow();
    })
 
});