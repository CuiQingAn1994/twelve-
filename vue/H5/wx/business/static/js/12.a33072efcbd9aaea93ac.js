webpackJsonp([12],{mYPW:function(e,t){},mvgj:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("wSez"),i={data:function(){return{getData:"",name:"",mobile:"",smsCode:"",profitRate:"",btn1:!0,btn2:!1,send:!1,second:60,codeText:"获取验证码"}},created:function(){a.Indicator.open({text:"加载中...",spinnerType:"double-bounce"}),setTimeout(function(){a.Indicator.close()},200)},methods:{getCode:function(){var e=this;if(this.toGetCode=!0,""!=this.mobile)if(/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(this.mobile)){if(!this.send&&!this.send){console.log("获取验证码"),this.inputCode="";var t=this;this.send=!0;var s=(new Date).getTime()+6e4;this.$http.get(_config.server+"/merApi/merchant/code",{params:{mobile:this.mobile,type:1}}).then(function(a){console.log(a),1==a.data.status&&(e.codeText="60s后重新获取",window.timer=setInterval(function(){t.second=Math.round((s-(new Date).getTime())/1e3),t.second<=0&&(t.second=0),t.codeText=t.second+"s后重新获取",0==t.second&&(clearInterval(window.timer),t.codeText="获取验证码",t.second=60,t.send=!1)},1e3))})}}else Object(a.Toast)("手机格式有误");else Object(a.Toast)("手机号为空")},initData:function(){var e=this,t=this,s=void 0,i=new FormData;i.append("token",store.get("_shoper").token),i.append("type",store.get("_shoper").type),i.append("name",this.name),i.append("mobile",this.mobile),i.append("smsCode",this.smsCode),i.append("profitRate",this.profitRate),console.log(i),""==this.name||""==this.mobile||""==this.smsCode||""==this.profitRate?Object(a.Toast)("信息填写不完整"):t.$http.post(_config.server+"/merApi/merchant/promoter/add",i).then(function(i){console.log(i.data),t.btn1=!1,t.btn2=!0,1==i.data.status?(s=Object(a.Toast)({message:"提交成功",iconClass:"icon icon-success"}),setTimeout(function(){s.close(),e.$router.replace("/index")},2e3)):(t.btn1=!0,t.btn2=!1,Object(a.Toast)(i.data.message))},function(e){console.log(e)})}}},o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("section",[s("div",{directives:[{name:"title",rawName:"v-title"}]},[e._v("添加推广员")]),e._v(" "),s("div",{staticClass:"form"},[s("div",{staticClass:"type"},[s("div",{staticClass:"label"},[e._v("真实姓名")]),e._v(" "),s("div",{staticClass:"print_box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],staticClass:"print",attrs:{placeholder:"输入推广员真实姓名",type:"",name:""},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})])]),e._v(" "),s("div",{staticClass:"type"},[s("div",{staticClass:"label"},[e._v("手机号")]),e._v(" "),s("div",{staticClass:"print_box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"}],staticClass:"print",attrs:{placeholder:"输入推广员手机号(用于登录)",type:"",name:""},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}})])]),e._v(" "),s("div",{staticClass:"type"},[s("div",{staticClass:"label"},[e._v("验证码")]),e._v(" "),s("div",{staticClass:"print_box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.smsCode,expression:"smsCode"}],staticClass:"print2",attrs:{placeholder:"验证码",type:"",name:""},domProps:{value:e.smsCode},on:{input:function(t){t.target.composing||(e.smsCode=t.target.value)}}}),s("span",{staticClass:"code_btn",style:{color:e.send?"#999":"#333"},on:{click:function(t){e.getCode()}}},[e._v(e._s(e.codeText))])])]),e._v(" "),s("div",{staticClass:"type"},[s("div",{staticClass:"label"},[e._v("抽成比例")]),e._v(" "),s("div",{staticClass:"print_box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.profitRate,expression:"profitRate"}],staticClass:"print2",attrs:{placeholder:"抽成比例",type:"",name:""},domProps:{value:e.profitRate},on:{input:function(t){t.target.composing||(e.profitRate=t.target.value)}}}),e._v(" "),s("span",{staticClass:"symbol"},[e._v("%")])])]),e._v(" "),s("div",{staticClass:"link"},[s("span",{directives:[{name:"show",rawName:"v-show",value:e.btn1,expression:"btn1"}],staticClass:"btn",on:{click:function(t){e.initData()}}},[e._v("添加推广员")]),e._v(" "),s("span",{directives:[{name:"show",rawName:"v-show",value:e.btn2,expression:"btn2"}],staticClass:"btn2"},[e._v("添加推广员")])])])])},staticRenderFns:[]};var n=s("vSla")(i,o,!1,function(e){s("mYPW")},"data-v-4331e9cc",null);t.default=n.exports}});
//# sourceMappingURL=12.a33072efcbd9aaea93ac.js.map