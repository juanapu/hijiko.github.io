webpackJsonp([3],{

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* @Author: Administrator
* @Date:   2017-11-10 15:15:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-16 12:48:43
*/


__webpack_require__(1);
__webpack_require__(27);
__webpack_require__(2);
__webpack_require__(3);
var _mm=__webpack_require__(0);
var img=__webpack_require__(5);
var confirmPg={
	init: function(){
	 		var _this=this;
	 		$(".confirmPg .QRImg>img.img").attr('src',img);
	 		_this.bindEvent();
	 		_this.pageMove();
	},
	bindEvent: function(){
		var _this=this;
		document.getElementById('copyButton').addEventListener('click',function(){
			_this.copyToClipboard(document.getElementById("copyTarget"));
			$("button#copyButton~span").show('slow').delay(1000).hide('slow');
			$("#copyTarget").select();
		});
	},
	copyToClipboard: function(elem){
		  elem.focus();
	       elem.select();
		document.execCommand("copy",true);
	},
	pageMove: function(){
		$(".confirmPg>.notice>div>a.link").click(function(){
			window.location.href='./transaction.html';
		});
	}
};

$(function(){
	confirmPg.init();
});

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = "https://juanapu.github.io/hijiko.github.io/dist/resource/img/qrcode.png";

/***/ })

},[26]);