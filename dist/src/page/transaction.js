webpackJsonp([2],{

/***/ 10:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* @Author: Administrator
* @Date:   2017-11-19 12:02:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-20 12:31:37
*/


var _mm = __webpack_require__(0);

var _trade={
	createTrade: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/trades/create'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	editTrade: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/trades/edit'),
			data : data,
			method : 'get',
			success : resolve,
			error   : reject
		})
	},
	editTradePost: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/trades/edit'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	},
	paymentsCreate: function(data,resolve,reject){
		_mm.request({
			url   :_mm.getServerUrl('/payments/create'),
			data : data,
			method : 'post',
			success : resolve,
			error   : reject
		})
	}
};

module.exports = _trade;

/***/ }),

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

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* @Author: Administrator
* @Date:   2017-11-09 17:29:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-20 16:26:06
*/


__webpack_require__(5);
__webpack_require__(31);
__webpack_require__(6);
__webpack_require__(0);
__webpack_require__(2);
var _loading=__webpack_require__(9);  /***loadding page****/
var _mm=__webpack_require__(0);
var _trade=__webpack_require__(11);
var _commonJs=__webpack_require__(1); /**loading is writen here***/

/****page url define***/
var confirmPg='./confirm.html';

var transaction={
	init: function(){
		var _this=this;
		_this.bindEvent();
		_this.checkTranNum();//check whether has transaction num, if has transaction num come from confirm page, edit info. or input info.
	},
	bindEvent: function(){
		$(".transaction form input[type=range]").change(function(){
			var amount=$(this).val();
			/****************************************but mark here, donot work in iphone device**********************************************/
			$(".transaction form>.form-item.range>label>span").html(amount);
		});
	},
	checkTranNum: function(){
		var _this=this;
		var data={
			trade_sn: _mm.getUrlParam('transactionNum')
		};
		if(data.trade_sn){ /***have transaction num come from confirm page,refill input**/
			_commonJs.loading();
			_trade.editTrade(data,function(res,txtStatus){
				   var editTradeData={
				   	 id: res.id,
				   	 title: res.title,
				   	 hijiko_money: res.hijiko_money,
				   	 receive_user: res.receive_user,
				   	 days: res.days
				   };
					_commonJs.unloading();
					/**refill input***/
					$(".transaction form.trade input[name='transName']").val(res.title);
					$(".transaction form.trade input[name='tranMont']").val(res.hijiko_money);
					$(".transaction form.trade input[name='tranReceiver']").val(res.receive_user);
					$(".transaction form.trade .range>label>span.dateExpire").text(res.days);
					/**check whether any update**/
					var inputItem=$(".transaction form.trade").find('input');
					for(var i=0;i<inputItem.length-1;i++){
						$(inputItem[i]).change(function(){
							var name=$(this).attr('name');
							switch(name) {
							    case 'transName':
							        data.title=$(this).val();
							        break;
							    case 'tranMont':
							        data.hijiko_money=$(this).val();
							        break;
							     case 'tranReceiver':
							        data.receive_user=$(this).val();
							        break;
							     case 'days':
							        data.days=$(this).val();
							        break;
							};
						});
					};
					//console.log(data);
					//console.log(inputItem);
					$(".transaction form.trade").submit(function(e){
						_commonJs.loading();
						_trade.editTradePost(editTradeData,function(res,txtStatus){
							_commonJs.unloading();
							window.location.href=confirmPg+'?transactionNum='+data.trade_sn;
						},function(err){
							_commonJs.unloading();
							_mm.errorTips(err);
						});
						e.preventDefault();
					});
			},function(err){
				_commonJs.unloading();
				_mm.errorTips(err);
			});
		}else{
			_this.tradeAPI();
		};
	},
	tradeAPI: function(){
		var _this=this;
		$(".transaction form.trade").submit(function(e){
			/***get keyWord***/
			var tradeName=$(".transaction form.trade input[name='transName']").val()?$(".transaction form.trade input[name='transName']").val():'';
			var tradeAmount=$(".transaction form.trade input[name='tranMont']").val();
			var receiver=$(".transaction form.trade input[name='tranReceiver']").val();
			var holdDays=$(".transaction form.trade .range>label>span.dateExpire").text();
			var userInfo=_commonJs.checkLogin();
			console.log(userInfo);
			var data={
				user_id:  userInfo.login?userInfo.cookie.user_id:0,
				title: tradeName,
				hijiko_money: tradeAmount,
				receive_user: receiver,
				days: holdDays
			};
			_commonJs.loading();
			_trade.createTrade(data,function(res,txtStatus){
				_commonJs.unloading();
				window.location.href=confirmPg+'?transactionNum='+res.trade_sn+'&user_id='+data.user_id+'&title='+data.title+'&hijiko_money='+data.hijiko_money+'&receive_user='+data.receive_user+'&days='+data.days;
			},function(err){
				_commonJs.unloading();
				_mm.errorTips(err);
			});
			e.preventDefault();
		});
	}

}


$(function(){
	transaction.init();
});

module.exports=transaction;

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 9:
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

/***/ })

},[30]);