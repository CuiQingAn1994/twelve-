console.log(_config.server + '/api/common/signature')
axios.get(_config.server + '/api/common/signature')
        .then(function(res) {
            console.log(res)
            console.log(res.data)
            if (res.status == 200&&res.data.status==1) {
                var data = res.data.data;
                wx.config({
                    debug: false,
                    appId: data.appid,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage",
                        "onMenuShareQQ",
                        "onMenuShareQZone",
                        "onMenuShareWeibo",
                        "chooseWXPay",
                        "openLocation",
                        "previewImage",
                        "getLocation",
                        "scanQRCode",
                        "hideMenuItems",
                        "closeWindow"
                    ]
                });
                wx.ready(function() {
                    wx.isReady = true;
                    console.log("wx-ready");
                    wx.hideMenuItems({
                        menuList: [
                            "menuItem:share:appMessage",
                            "menuItem:share:timeline",
                            "menuItem:share:qq",
                            "menuItem:share:weiboApp",
                            "menuItem:favorite",
                            "menuItem:share:facebook",
                            "menuItem:share:QZone",
                            "menuItem:editTag",
                            "menuItem:delete",
                            "menuItem:copyUrl",
                            "menuItem:originPage",
                            "menuItem:readMode",
                            "menuItem:openWithQQBrowser",
                            "menuItem:openWithSafari",
                            "menuItem:share:email",
                            "menuItem:share:brand"
                        ]
                    });
                });
                wx.error(function() {
                    wx.isReady = true;
                    console.log("wx-error");

                });
            }else{
                console.log(res.data.msg);
            }



        }).catch(function(error) {

            console.log(error);
        });
