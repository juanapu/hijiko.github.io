webpackJsonp([1],{

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

/***/ 12:
/***/ (function(module, exports) {

module.exports = "https://juanapu.github.io/hijiko.github.io/dist/resource/img/qrcode.png";

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

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* @Author: Administrator
* @Date:   2017-11-10 15:15:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-20 17:00:50
*/


__webpack_require__(5);
__webpack_require__(33);
__webpack_require__(6);
__webpack_require__(2);
var _loading=__webpack_require__(9);  /***loadding page****/
var _mm=__webpack_require__(0);
var _trade=__webpack_require__(11);
var img=__webpack_require__(12);
var _commonJs=__webpack_require__(1); /**loading is writen here***/

/***define page url*****/
var goTransactionPg='./transaction.html';
var payUrl="http://pay2.youyunnet.com/pay";
var resultUrl=_mm.getFileHost('/result.html');
/****define public data******/
var hijikoSharing=0.001;
var transactionNum='';


var confirmPg={
	init: function(){
	 		var _this=this;
	 		$(".confirmPg .QRImg>img.img").attr('src',img);
	 		_this.checkTransactionNum(); //check transaction number, if no transaction number, go back to transaction page. 
	},
	checkTransactionNum: function(){
			var _this=this;
			var transactionNum=_mm.getUrlParam('transactionNum');
			if(transactionNum){
		 		_this.renderData(); //dynamically add text got from API
		 		_this.bindEvent();
		 		_this.tradeEditAPI(); 
		 	}else{
		 		window.location.href=goTransactionPg;
		 	};
	},
	bindEvent: function(){
		var _this=this;
/*		document.getElementById('copyButton').addEventListener('click',function(){
			$("button#copyButton~span").show('slow').delay(1000).hide('slow');
			$("input#copyTarget").select();
			_this.copyToClipboard(document.getElementById("copyTarget"));
		});  */
	},
	copyToClipboard: function(elem){
		  elem.focus();
	       elem.select();
		document.execCommand("copy",true);
	},
	renderData: function(){
		_commonJs.loading();
		var data={
			trade_sn: _mm.getUrlParam('transactionNum')
		};
		_trade.paymentsCreate(data,function(res,txtStatus){
			$(".confirmPg>.notice span.mount").text(res.hijiko_money);
			$(".confirmPg>.notice span.alipayAct").text(res.receive_user);
			$(".confirmPg>.notice span.dateExpire").text(res.days); 
			$(".confirmPg span#hijikoSharing").text(res.rate*100+'%');
			$(".confirmPg span.finalMount").text(res.total_fee);
			_commonJs.unloading();
			$(".confirmPg .confirm button.cmnBtn").click(function(){
				//window.location.href=payUrl+"?pid="+res.pid+"&money="+res.money+"&data="+res.data+"&url="+resultUrl+"?transactionNum="+data.trade_sn+"&lb="+res.bk;
				console.log(payUrl+"?pid="+res.pid+"&money="+res.money+"&data="+res.data+"&url="+resultUrl+"?transactionNum="+data.trade_sn+"&lb="+res.bk);
				console.log(resultUrl);
			});
		},function(err){
			_commonJs.unloading();
			_mm.errorTips(err);
		}); 
	},
	tradeEditAPI: function(){
		var data={
			trade_sn: _mm.getUrlParam('transactionNum')
		};
		$(".confirmPg>.notice a.goBack").click(function(){
			_commonJs.loading();
			_trade.editTrade(data,function(res,txtStatus){
					window.location.href=goTransactionPg+'?transactionNum='+res.trade_sn;
			},function(err){
				_commonJs.unloading();
				_mm.errorTips(err);
			});
		});

	}
};

$(function(){
	confirmPg.init();
});

/***/ }),

/***/ 33:
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

},[32]);