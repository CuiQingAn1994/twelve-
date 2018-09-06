(function() {
    var type = hcb.params("type")
    // alert(type)
    //检查本地是否有OPENID
    if (!hcb.user()&&hcb.params("type")==null) {
    
        //未授权情况下进行登录

        //保存当前地址至本地
        var href = window.location.href;
        store.set("_refer", href);
        // store.set("deviceNo",hcb.params("deviceNo"))
        // alert(store.get("deviceNo"))
        console.log("from:" + href);

        //确定协议
        var host = (href.indexOf("http://") > -1 ? "http://" : "https://") + href.replace("http://", "").replace("https://", "").split("/")[0];

        //拼接跳转路径
        var arr = [];
        arr.push("https://open.weixin.qq.com/connect/oauth2/authorize?appid=");
        arr.push(_config.appid);
        arr.push("&redirect_uri=");
        arr.push(encodeURIComponent(_config.login));
        arr.push("&response_type=code&scope=snsapi_userinfo&state=");
        arr.push(encodeURIComponent("hcb"));
        arr.push("#wechat_redirect");
        window.location.href = arr.join("");

    }

})();
