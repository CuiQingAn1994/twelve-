// 正式环境
var  domain = 'http://m.zthuacai.com/h5';
// var  domain = 'https://m.zthuacai.com/h5test';

var _config = {
	appid:'wxaecd5cd15a009460',
	AppSecret:'f0f48a4c6c87482003c105165a1638da',
	server:"http://m.zthuacai.com",
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



