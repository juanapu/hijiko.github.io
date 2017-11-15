webpackJsonp([3],{

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
* @Author: Administrator
* @Date:   2017-11-09 17:29:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-10 12:44:57
*/


__webpack_require__(1);
__webpack_require__(25);
//require('../common/navsimple/index.js');
__webpack_require__(2);
__webpack_require__(0);
__webpack_require__(3);
//require('./range-touch.min.js');
var _mm=__webpack_require__(0);


var transaction={
	init: function(){
		var _this=this;
		_this.bindEvent();
	},
	bindEvent: function(){
		$(".transaction form input[type=range]").change(function(){
			var amount=$(this).val();
			/****************************************but mark here, donot work in iphone device**********************************************/
			$(".transaction form>.form-item.range>label>span").html(amount);
		});
	}


}


$(function(){
	transaction.init();
});


/***/ }),

/***/ 25:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[24]);