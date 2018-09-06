(function(){
	console.log('执行拦截')
	if(!store.get('_person')){
		var href = window.location.href;
		store.set("_reherf", href);
		// alert(href)
		window.location.href = _config.user_login;
		return true
	}
})()
