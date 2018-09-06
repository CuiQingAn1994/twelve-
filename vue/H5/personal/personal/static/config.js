// 正式环境
var  domain = 'https://m.zthuacai.com/h5';
// 测试环境
// var  domain = 'http://m.zthuacai.com/h5test';


var _config = {	
	appid:'wxaecd5cd15a009460',
	AppSecret:'f0f48a4c6c87482003c105165a1638da',
	// 正式
	server:"https://m.zthuacai.com",
	// 测试
	// server:"http://mtest.zthuacai.com",
	// 授权登录
	login: domain+"/wx/account.html",
	// 商户登录
	shop_login:domain+"/wx/account.html?type=1",
	// 用户登录
	user_login:domain+"/wx/account.html?type=2",
	// 商家首页
	shop_url:domain+"/wx/business/index.html",
	// 用户首页
	user_url:domain+"/wx/personal/index.html"
};
// 测试环境
// var _config = {	
// 	appid:'wxaecd5cd15a009460',
// 	AppSecret:'f0f48a4c6c87482003c105165a1638da',
// 	server:"http://m.jinshw.cn",
// 	// 授权登录
// 	login:"http://m.jinshw.cn/h5/wx/account.html",
// 	// 商户登录
// 	shop_login:"http://m.jinshw.cn/h5/wx/account.html?type=1",
// 	// 用户登录
// 	user_login:"http://m.jinshw.cn/h5/wx/account.html?type=2",
// 	// 商家首页
// 	shop_url:"http://m.jinshw.cn/h5/wx/business/index.html",
// 	// 用户首页
// 	user_url:"http://m.jinshw.cn/h5/wx/personal/index.html"
// };

// if(localStorage.getItem("env") == "test"){
// 	_config = {
// 		appid:'wxaecd5cd15a009460',
// 		// server:"http://m.jinshw.cn",
// 		server:"http://192.168.0.192:8080",
// 		login:"http://dev.hcb66.com/account.html",
// 		shop:"http://localhost:8081",
// 		shop_login:"http://m.jinshw.cn/h5/wx/account.html?type=1",
// 		// 用户登录
// 		user_login:"http://m.jinshw.cn/h5/wx/account.html?type=2",
// 		// 商家首页
// 		shop_url:"http://m.jinshw.cn/h5/wx/business/index.html",
// 		// 用户首页
// 		user_url:"http://m.jinshw.cn/h5/wx/personal/index.html"
// 	};
// }


