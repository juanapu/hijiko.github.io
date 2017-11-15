
"use strict"

require('./layout.css');
//require('../css/style.css')

var commonJs={
	init: function(){
		FastClick.attach(document.body);  /****** mobile click event compatibility ******/
	}
};

$(function(){
	commonJs.init();
});



