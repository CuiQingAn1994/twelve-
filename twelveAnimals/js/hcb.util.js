var hcb = {
    params: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    user: function() {
        return store.get("_user")
    },
    flush: function(fun) {
        axios.post(_config.golive + '/lottery/getPhoneUserInfo', {
                mobile: store.get("_user").mobile
            })
            .then(function(response) {
                store.set("_user", response.data);
                fun(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    //检查是否绑定过手机号
    check: function() {
        var user = store.get("_user");
        if (user && user.tel) {
            return true;
        }
        window.location.href = _config.tel_login;
    },
    setRole: function(num) {
        var user = store.get("_user");
        user.role = num;
        store.set("_user", user);
    }
}