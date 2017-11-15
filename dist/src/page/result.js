webpackJsonp([1],{

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* @Author: Administrator
* @Date:   2017-11-10 15:15:50
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-10 17:07:18
*/


__webpack_require__(1);
__webpack_require__(29);
__webpack_require__(2);
__webpack_require__(3);
var _mm=__webpack_require__(0);
var img=__webpack_require__(4);
var confirmPg={
	init: function(){
	 		var _this=this;
	 		$(".confirmPg .QRImg>img.img").attr('src',img);
	 		_this.bindEvent();
	},
	bindEvent: function(){
		var _this=this;
		document.getElementById('copyButton').addEventListener('click',function(){
			_this.copyToClipboard(document.getElementById("copyTarget"));
		});
	},
	copyToClipboard: function(elem){
		  elem.focus();
	       elem.select();
		document.execCommand("copy",true);
	}
};

$(function(){
	confirmPg.init();
});

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = "C:/Users/Administrator/desktop/company/work/quickPayProject/dist/resource/img/qrcode.png";

/***/ })

},[28]);