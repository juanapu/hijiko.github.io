webpackJsonp([5],{

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* @Author: Administrator
* @Date:   2017-09-03 09:02:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-20 16:57:16
*  here is header
*/


__webpack_require__(3);
var _mm=__webpack_require__(0);
var _user=__webpack_require__(8);
var _commonJs=__webpack_require__(1);
__webpack_require__(4);
/****url define***/
var indexPg='./index.html';
var goTranList='./tranList.html';
/***define text****/
var loginPgTxt='宝贝儿，你还没登录哦';

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

		/**logout**/
		$(".jsLogout").click(function(){
			_user.logout(function(res,txtStatus){
				alert(txtStatus);
				window.location.href=indexPg;
				_commonJs.cleanCookie();
			},function(err){
				alert(err);
			});
		});
		/** go to transaction manage list page */
		$(".headerWrap .jsTranMg").click(function(){
			window.location.href=goTranList;
		});
	},
	pageMove: function(){
		$("a.navbar-brand").click(function(){
			window.location.href=indexPg;
		});
		var logInfo=_commonJs.checkLogin();
		if(!logInfo.login){
			var currentUrl=window.location.href;
			alert("宝贝儿，你还没登录哦~~先去登录哦！");
			window.location.href=indexPg+'?redirectFrom='+currentUrl;
		}else{
			$(".headerWrap .bar .nickName").text(logInfo.cookie.nickname);
		};
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

/***/ 3:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* @Author: Administrator
* @Date:   2017-11-10 15:15:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-14 17:27:30
*/


__webpack_require__(5);
__webpack_require__(37);
__webpack_require__(6);
__webpack_require__(2);
var _mm=__webpack_require__(0);
var tranList={
	init: function(){
		var _this=this;
		_this.addPOP();  /*** pop up message box when click button ****/
		_this.bindEvent();
	},
	bindEvent: function(){

	},
	addPOP: function(){
		$(".js-POP").click(function(){
			var popCnt='<div class="popWrap"><div class="desc"></div><form action=""><textarea rows="4" value="please input here"></textarea><div class="buttonWrap"><input class="cancel cmnBtn light" type="button" value="取消"/> <input type="submit" class="cmnBtn" value="确认" /></div></form></div>';
			var $this=$(this);
			$this.after(popCnt);
			/******description of each form*********/
			var dataTy=$(this).data('type'); //get data type
			 switch(dataTy){
			 	case 'pauseRlease': //pause release button click => html
			 			$this.siblings('.popWrap').find('.desc').html('请输入暂停放款的原因，例：与收款人协商一致暂停放款');
			 		break;
			 	case 'comment':  //comment button click => html
			 			$this.siblings('.popWrap').find('.desc').html('请输入留言内容。注意：此条留言将与收款方&HiJiko管理员共享');
			 		break;
			 };
			 $this.siblings('.popWrap').show('slow');
			$(".popWrap .cancel").click(function(e){
				var $inside=$(this);
				$inside.parents('.popWrap').hide('slow',function(){
					$(this).remove();
				});
				e.stopPropagation();  
			});
			$(".popWrap input[type='submit']").click(function(e){
				var $inside=$(this);
				$inside.parents('.popWrap').hide('slow',function(){
					$(this).remove();
				});
				e.stopPropagation();  
			});
			$(".popWrap form").bind('click keypress submit',function(e){
				e.stopPropagation();  
			})
		});
	}
};

$(function(){
	tranList.init();
});

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[36]);