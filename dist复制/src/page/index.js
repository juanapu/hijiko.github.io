webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);
__webpack_require__(6);
//require('../common/navsimple/index.js');
__webpack_require__(2);
__webpack_require__(0);
var _header=__webpack_require__(3);
var _mm=__webpack_require__(0);
__webpack_require__(16);
var loginHtml=__webpack_require__(17);  //get customized string module for login & register
var registerHtml=__webpack_require__(18);
var img; // insert image to html code


var index={
	init: function(){
		var _this=this;
		if($(".formWrap").children("div").length==0){
			_this.insertHtml(loginHtml,$(".formWrap"));
		};
		_this.insertImg();
		_this.bindUserLogic(); // register,login,reset password etc page jumps
	},
	insertHtml: function(string,insertDomSelector){
		var insert=_mm.renderHtml(string,{});
		insertDomSelector.html(insert);
		//return false;
	},
	insertImg: function(){
		var innerDiv=$(".main>.wrap").children("div");

		for(var i=1;i<=innerDiv.length;i++){
			img=__webpack_require__(19)("./pg"+i+'.png');
			$(".main>.wrap>.pg"+i+">.content>.description>img").attr('src',img);
		};
	},
	bindUserLogic: function(){
		var _this=this;
		var callbackFun=function(e){ // show register form
			_this.insertHtml(registerHtml,$(".formWrap"));
			 $("a.jsLogin").click(function(e){
			 	_this.insertHtml(loginHtml,$(".formWrap"));
				 $("a.jsRegister").click(function(e){
				 	_this.insertHtml(registerHtml,$(".formWrap"));
				 	callbackFun();
				 });
			 });
		};
		$("a.jsRegister").click(callbackFun);
	}
}

$(function(){
	index.init();
});


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(6);
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
/* 17 */
/***/ (function(module, exports) {

module.exports = "<div class=\"loginForm\">\n\t<form>\n\t\t<div class=\"formItem userName\">\n\t\t\t<label for=\"userName\"><i class=\"fa fa-user-o\" aria-hidden=\"true\"></i>\n</label>\n\t\t\t<input type=\"text\" placeholder=\"用户名\" name=\"userName\" autofocus></input>\n\t\t</div>\n\t\t<div class=\"formItem passWord\">\n\t\t\t<label for=\"passWord\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i>\n</label>\n\t\t\t<input type=\"password\" placeholder=\"密码\" name=\"passWord\" autofocus></input>\n\t\t</div>\n\t\t<input type=\"submit\" value=\"登录\"></input>\n\t</form>\n\t<div class=\"underLine\">\n\t\t<div class=\"register\">\n\t\t\t<span>还没有注册账号？</span><a class=\"jsRegister\" href=\"#\">注册</a>\n\t\t</div>\n\t\t<div class=\"resetPw\">\n\t\t\t<span>忘记密码？</span><a  class=\"jsResetPw\" href=\"#\">找回密码</a>\n\t\t</div>\n\t</div>\n</div>";

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "<div class=\"registerForm loginForm\">\n\t<form>\n\t\t<div class=\"formItem email\">\n\t\t\t<label for=\"email\"><i class=\"fa fa-user-o\" aria-hidden=\"true\"></i>\n</label>\n\t\t\t<input type=\"email\" placeholder=\"注册邮箱\" name=\"email\" autofocus></input>\n\t\t</div>\n\t\t<div class=\"formItem userName\">\n\t\t\t<label for=\"userName\"><i class=\"fa fa-user-o\" aria-hidden=\"true\"></i>\n</label>\n\t\t\t<input type=\"text\" placeholder=\"用户名\" name=\"userName\" autofocus></input>\n\t\t</div>\n\t\t<div class=\"formItem passWord\">\n\t\t\t<label for=\"passWord\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i>\n</label>\n\t\t\t<input type=\"password\" placeholder=\"密码\" name=\"passWord\" autofocus></input>\n\t\t</div>\n\t\t<input type=\"submit\" value=\"注册\"></input>\n\t</form>\n\t<div class=\"underLine\">\n\t\t<div class=\"login\">\n\t\t\t<span>已有账号？</span><a class=\"jsLogin\" href=\"#\">登录</a>\n\t\t</div>\n\t</div>\n</div>";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./pg1.png": 20,
	"./pg2.png": 21,
	"./pg3.png": 22,
	"./pg4.png": 23
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
webpackContext.id = 19;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "https://juanapu.github.io/hijiko.github.io/dist/resource/img/pg1.png";

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "https://juanapu.github.io/hijiko.github.io/dist/resource/img/pg2.png";

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = "https://juanapu.github.io/hijiko.github.io/dist/resource/img/pg3.png";

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "https://juanapu.github.io/hijiko.github.io/dist/resource/img/pg4.png";

/***/ })
],[9]);