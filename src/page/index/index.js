"use strict";

require('../common/layout.css');
require('./index.css');
//require('../common/navsimple/index.js');
require('../common/footer/index.js');
require('../../util/mm.js');
require('../common/header/index.js');
var _mm=require('../../util/mm.js');
require('./layout.js');
var loginHtml=require('./login.string');  //get customized string module for login & register
var registerHtml=require('./register.string');
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
			img=require('../../resource/img/pg'+i+'.png');
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
