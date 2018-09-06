hcb = {
    uid: function() {
        return hcb.q("uid")
    },
    deviceNo: function() {
        return hcb.q("deviceNo")
    },
    _payBack: null,
    _payError: null,
    pay: function(message, callback, error) {
        hcb._payBack = callback;
        hcb._payError = error;
        if (window.hcbWeb) {
            window.hcbWeb.openPayPage(message);
        } else {
            hcb._payBack(null);
        }
    },
    log: function(key, num, appId) {
        if (window.hcbWeb) {
            window.hcbWeb.saveLadderLog(key, num, appId);
        }
    },
    q:function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
}
window.goldHandleSuccess = function() {
    alert("goldHandleSuccess");
    if (hcb._payBack) {
        hcb._payBack(true);
    }
}
window.goldHandleError = function() {
    alert("goldHandleError");
    if (hcb._payBack) {
        hcb._payBack(false);
    }
}
window.callBackPay = function(id){
   if (hcb._payBack) {
        hcb._payBack(id);
    }
}