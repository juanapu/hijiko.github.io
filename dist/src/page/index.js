webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
* @Author: Administrator
* @Date:   2017-11-17 23:21:00
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-19 15:02:12
*  how to use:
*    1) add 	<%= require('html-loader!./layout/loading.html') %>  to the target page
*    2) require  load->index.js
*    3) require  common->index.js->  _common.loading()/_common.unloading
*/
__webpack_require__(10);

var _loading={
	init: function(){
	}
};

$(function(){
	_loading.init();
});

module.exports=_loading;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/******index*****/



__webpack_require__(5);
__webpack_require__(13);
//require('../common/navsimple/index.js');
__webpack_require__(6);
__webpack_require__(0);
__webpack_require__(9);
var _headerIndex=__webpack_require__(20);
var _mm=__webpack_require__(0);
var _user=__webpack_require__(8);
var _commonJs=__webpack_require__(1);
__webpack_require__(22);
var loginHtml=__webpack_require__(23);  //get customized string module for login & register
var registerHtml=__webpack_require__(24);
var img; // insert image to html code

/****define page move*****/
var goTransaction="./transaction.html";
var goForgetPw='./forgetPw.html';


var index={
	init: function(){
		var _this=this;
		_this.checkTarget(); //check what's the purpose of user. 
	},
	checkTarget: function(){
		var _this=this;
		if(_mm.getUrlParam('target')==='register'){
			_this.userRegister();
			_this.insertHtml(registerHtml,$(".formWrap"));
			_this.bindUserLogic();
		}else{
			_this.userLogin();
			_this.insertHtml(loginHtml,$(".formWrap"));
		};
		_this.insertImg();
		_this.bindUserLogic(); // register,login,reset password etc page jumps
	},
	insertHtml: function(string,insertDomSelector){
		var insert=_mm.renderHtml(string,{});
		insertDomSelector.html(insert);
	},
	insertImg: function(){
		var innerDiv=$(".main>.wrap").children("div");

		for(var i=1;i<=innerDiv.length;i++){
			img=__webpack_require__(25)("./pg"+i+'.png');
			$(".main>.wrap>.pg"+i+">.content>.description>img").attr('src',img);
		};
	},
	bindUserLogic: function(){
/*		var _this=this;
		_this.userLogin();
		var callbackFun=function(){ // show register form
			_this.insertHtml(registerHtml,$(".formWrap"));
			_this.userRegister();
			 $("a.jsLogin").click(function(){
			 	_this.insertHtml(loginHtml,$(".formWrap"));
			 	_this.userLogin();
				 $("a.jsRegister").click(function(){
				 	_this.insertHtml(registerHtml,$(".formWrap"));
	 				_this.userRegister();
				 	callbackFun();
				 });
			 });
		};
		$("a.jsRegister").click(callbackFun);   */
		var _this=this;
		if(_mm.getUrlParam('target')==='register'){
			_this.registerAccessFunc();
		}else{
			_this.loginAccessFunc(); 
		};
	},
	registerAccessFunc: function(){
		var _this=this;
		_this.userRegister(); //
		var callbackFun=function(){ // show findPw form
			_this.insertHtml(loginHtml,$(".formWrap"));
			_this.userLogin();
			_this.AddResetPwEvent();
			 $("a.jsRegister").click(function(){
			 	_this.insertHtml(registerHtml,$(".formWrap"));
			 	_this.userRegister(); //
				 $("a.jsLogin").click(function(){
				 	_this.insertHtml(loginHtml,$(".formWrap"));
	 				_this.userLogin();
					_this.AddResetPwEvent();
				 	callbackFun();
				 });
			 });
		};
		$("a.jsLogin").click(callbackFun);
	},
	loginAccessFunc: function(){
		var _this=this;
		_this.userLogin();
		_this.AddResetPwEvent();
		var callbackFun=function(){ // show register form
			_this.insertHtml(registerHtml,$(".formWrap"));
			_this.userRegister();
			 $("a.jsLogin").click(function(){
			 	_this.insertHtml(loginHtml,$(".formWrap"));
			 	_this.userLogin();
	 			_this.AddResetPwEvent();
				 $("a.jsRegister").click(function(){
				 	_this.insertHtml(registerHtml,$(".formWrap"));
	 				_this.userRegister();
				 	callbackFun();
				 });
			 });
		};
		$("a.jsRegister").click(callbackFun); 
	},
	AddResetPwEvent: function(){
		 $("a.jsResetPw").click(function(){
		 	window.location.href=goForgetPw;
		 });
	},
	userRegister: function(){
		var _this=this;
		$(".registerForm>form").submit(function(e){
			var data={
 				email: $(".registerForm .email input").val()?$(".registerForm .email input").val():'',
 				nickname: $(".registerForm .userName input").val()?$(".registerForm .userName input").val():'',
 				password: $(".registerForm .passWord input").val()
			};
			_commonJs.loading();
			_user.register(data,function(res,txtStatus){
				_commonJs.unloading();
				_this.insertHtml(loginHtml,$(".formWrap"));
				$(".loginForm .resultPg").show('slow');
				_this.bindUserLogic();
			},function(err){
				_commonJs.unloading();
				$(".registerForm .resultPg>.resultWrap>p").text(err);
				$(".registerForm .resultPg").show('slow');
			});
			e.preventDefault();
		});
	},
	userLogin: function(){
		var _this=this;
		$(".loginForm.login>form").submit(function(e){
			var userInfo={
				nickname: $(".loginForm.login .userName input").val()?$(".loginForm.login .userName input").val():'',
 				password: $(".loginForm.login .passWord input").val(),
			};
			//释放 var url='/users/login?nickname='+userInfo.nickname+'&password='+userInfo.password;
			_commonJs.loading();
			_user.login(userInfo,function(res,txtStatus){
				_commonJs.unloading();
				/***********set cookies****************/
				var psWord=$.base64.encode(userInfo.password);
				_commonJs.setCookie('nickname',userInfo.nickname);
				_commonJs.setCookie('password',psWord);
				_commonJs.setCookie('user_id',res.user_id);
				var redirectPg=_mm.getUrlParam('redirectFrom');
				window.location.href=redirectPg?redirectPg:goTransaction;
			},function(err){
				_commonJs.unloading();
				$(".loginForm .resultPg>.resultWrap>p").text(err);
				$(".loginForm .resultPg").show('slow');
				_this.bindUserLogic();
			});
			e.preventDefault();
		});
	}

}

$(function(){
	index.init();
});


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* @Author: Administrator
* @Date:   2017-09-03 09:02:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-19 14:10:14
*/


__webpack_require__(21);
var _mm=__webpack_require__(0);
__webpack_require__(4);

var header={
	init: function(){
		var _this=this;
		_this.insertImg();
		_this.bindEvent();
		_this.pageMove();
		_this.checkInWechat();
	},
	insertImg: function(){
		var img=__webpack_require__(7);
		$(".headerWrap>nav.navbar>a.navbar-brand>img").attr('src',img);
	},
	bindEvent: function(){
		var _this=this;
				$(".header button.search-btn").click(function(){
			_this.searchSubmit();
		});
		$(".header .search-con input.search-input").focus(function(){
			var contVal=$(this).attr("placeholder");
			$(this).attr("placeholder","");
			$(this).blur(function(){
				$(this).attr("placeholder",contVal);
			});
		}).keyup(function(e){
			if(e.keyCode===13){
				_this.searchSubmit();
			}
		});
		/**********mobile version menu bar*************/
		$(".headerWrap .bar.mobile").click(function(e){
			$(".bar.mobile>ul.navbar-nav").toggle('slow').siblings('a').toggleClass('showUl');
			e.preventDefault(e);
		});
		$(".headerWrap .bar.pc ul li").click(function(){
			$(this).addClass('active').siblings().removeClass('active');
		});
		$(".headerWrap .bar.mobile ul li").click(function(e){
			e.stopPropagation(e);  
			$(this).addClass('active').siblings().removeClass('active');
		});
	},
	searchSubmit: function(){
		var textVal=$(".header .search-con input.search-input").val();
		if(textVal){
			console.log(textVal);
			window.location.href='./list.html?keyword='+textVal;
		}
	},
	pageMove: function(){
		$("a.navbar-brand").click(function(){
			window.location.href="./index.html";
		});
	},
	checkInWechat: function(){
		var ua=window.navigator.userAgent.toLowerCase();
		if((ua.match(/MicroMessenger/i))=="micromemessenger"){
			return true;
		}
		else{
			return false;
		}

	}
};

$(function(){
	header.init();
});

module.exports=header;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);
__webpack_require__(4);

var marginTop,hideTop;

var layout={
	init: function(){
			var _this=this;
			var documentWidth=$(document).width();
				if(documentWidth<=330){
					marginTop='126px';
					hideTop='-500px';
				}else{
					marginTop='136px';
					hideTop='-500px'; // set margin top value out of screen for previous page. 
				};
			_this.changeContentMargin(1,marginTop,1500); 
			_this.event();

	},
	changeContentMargin: function(num,margin,speed,display){  /*display the content of the first page, num=page num, margin=new margin style*/
		$(".main>.wrap>.pg"+num+">.content").show('fast').animate({
			marginTop: margin,
			opacity: 1,
			display: display,
		},speed);
	},
	event: function(){
		var _this=this;
		var innerDiv=$(".main>.wrap").children("div");
				$(".main button.js-nxt").click(function(){
					$("button.js-prev").show('slow');
					var show=$(".wrap").attr("data-show");
					var next=parseInt(show)+1;
					if(next<=innerDiv.length){
						_this.changeContentMargin(next,marginTop,1500,'block');
						$(".pg"+show).animate({
							height: 0
						},1000); 
						_this.changeContentMargin(show,hideTop,500,'none');
						$(".pg"+next).css({
							display: 'block'
						}).animate({
							height: '100%'
						},1000,function(){
							$(".wrap").attr("data-show",next);
						}); 
					};
					if(next===innerDiv.length){
						$(".main button.js-nxt").hide('slow');
					};
				});
				$("button.js-prev").click(function(){
					$("button.js-nxt").show('slow');
					var show=$(".wrap").attr("data-show");
					var prev=parseInt(show)-1;
					if(prev>0){
						_this.changeContentMargin(prev,marginTop,1500,'block');
						$(".pg"+show).animate({
							height: 0
						},1000);
						$(".pg"+prev).css({
							display: 'block'
						}).animate({
							height: '100%'
						},1000,function(){
							_this.changeContentMargin(show,'1300px',500,'none');
							$(".wrap").attr("data-show",prev);
						});
					};
					if(prev===1){
						$("button.js-prev").hide('slow');
					};
				});
	}

};


$(function(){
	layout.init();
});

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"loginForm login\">\n\t<form>\n\t\t<div class=\"formItem userName\">\n\t\t\t<label for=\"userName\"><i class=\"fa fa-user-o\" aria-hidden=\"true\"></i>\n</label>\n\t\t\t<input type=\"text\" placeholder=\"用户名\" name=\"userName\" autofocus></input>\n\t\t</div>\n\t\t<div class=\"formItem passWord\">\n\t\t\t<label for=\"passWord\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i>\n</label>\n\t\t\t<input type=\"password\" placeholder=\"密码\" name=\"passWord\" autofocus></input>\n\t\t</div>\n\t\t<input type=\"submit\" value=\"登录\"></input>\n\t</form>\n\t<div class=\"underLine\">\n\t\t<div class=\"register\">\n\t\t\t<span>还没有注册账号？</span><a class=\"jsRegister\" href=\"#\">注册</a>\n\t\t</div>\n\t\t<div class=\"resetPw\">\n\t\t\t<span>忘记密码？</span><a  class=\"jsResetPw\" href=\"#\">找回密码</a>\n\t\t</div>\n\t</div>\n\t<div class=\"resultPg\">\n\t\t<div class=\"resultWrap\">\n\t\t\t<p>注册了成功啦，快来登录吧！</p>\n\t\t</div>\n\t</div>\n</div>";

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = "<div class=\"registerForm loginForm\">\n\t<form>\n\t\t<div class=\"formItem email\">\n\t\t\t<label for=\"email\"><i class=\"fa fa-user-o\" aria-hidden=\"true\"></i>\n</label>\n\t\t\t<input type=\"email\" placeholder=\"注册邮箱\" name=\"email\" autofocus></input>\n\t\t</div>\n\t\t<div class=\"formItem userName\">\n\t\t\t<label for=\"userName\"><i class=\"fa fa-user-o\" aria-hidden=\"true\"></i>\n</label>\n\t\t\t<input type=\"text\" placeholder=\"用户名\" name=\"userName\" autofocus></input>\n\t\t</div>\n\t\t<div class=\"formItem passWord\">\n\t\t\t<label for=\"passWord\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i>\n</label>\n\t\t\t<input type=\"password\" placeholder=\"密码\" name=\"passWord\" autofocus></input>\n\t\t</div>\n\t\t<input type=\"submit\" value=\"注册\"></input>\n\t</form>\n\t<div class=\"underLine\">\n\t\t<div class=\"login\">\n\t\t\t<span>已有账号？</span><a class=\"jsLogin\" href=\"#\">登录</a>\n\t\t</div>\n\t</div>\n\t<div class=\"resultPg\">\n\t\t<div class=\"resultWrap\">\n\t\t\t<p>注册了成功啦，快来登录吧！</p>\n\t\t</div>\n\t</div>\n</div>";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./pg1.png": 26,
	"./pg2.png": 27,
	"./pg3.png": 28,
	"./pg4.png": 29
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 25;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "https://juanapu.github.io/hijiko.github.io/dist/resource/img/pg1.png";

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "https://juanapu.github.io/hijiko.github.io/dist/resource/img/pg2.png";

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "https://juanapu.github.io/hijiko.github.io/dist/resource/img/pg3.png";

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = "https://juanapu.github.io/hijiko.github.io/dist/resource/img/pg4.png";

/***/ })
],[15]);