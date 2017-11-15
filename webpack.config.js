var webpack = require('webpack');
var htmlWebpackPlugin= require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var localPath='https://juanapu.github.io/hijiko.github.io/dist' ;


var getHtmlConfig = function(name){
	return{
		template : './src/view/'+name+'.html',
		filename : 'view/'+name+'.html',
		inject   : true,
		hash     : true,
		chunks   : ['common', name]
	};
};
var getHtmlLayoutConfig = function(name){
	return{
		template : './src/view/layout/'+name+'.html',
		filename : 'view/'+name+'.html',
		inject   : true,
		hash     : true,
		chunks   : ['common','navsimple'] 
	}
};

var config ={
	entry:{
		'common': ['./src/page/common/index.js'],
		'index': "./src/page/index/index.js",
		'transaction': "./src/page/transaction/index.js",
		'confirm': "./src/page/confirm/index.js",
		'result': "./src/page/result/index.js",
		'tranList': "./src/page/tranList/index.js",
		'tranDetail': "./src/page/tranDetail/index.js"
	},
	output: {
		path: __dirname+'/dist',
	//	path: '/dist',
		//publicPath: '/dist',
		filename: 'src/page/[name].js'
	}, 
	module: {  
	    rules: [
	      {
	        test: /\.css$/,
	        use: ExtractTextPlugin.extract({
	          fallback: "style-loader",
	          use: "css-loader"
	        })
	      },
	      {
	      	test: /\.(gif|png|jpg|jpeg)\??.*$/,
	      	loader: 'url-loader',
	      	options: {
	      		limit: 100,
	      		publicPath: localPath,
	      		name:'/resource/img/[name].[ext]'
	      	}
	      },
	      {
	      	test: /\.(woff|eot|svg|ttf|woff2)\??.*$/,
	      	loader: 'url-loader',
	      	options: {
	      		limit: 100,
	      		publicPath: __dirname+'/dist',
	      		name: '/resource/font/[name].[ext]'
		      }
		  },
		  {
		  	test: /\.string$/,
		  	loader: 'html-loader'
		  }
	    ]
	  },
	plugins: [
		new htmlWebpackPlugin(getHtmlConfig('index')),
		new htmlWebpackPlugin(getHtmlConfig('transaction')),
		new htmlWebpackPlugin(getHtmlConfig('confirm')),
		new htmlWebpackPlugin(getHtmlConfig('result')),
		new htmlWebpackPlugin(getHtmlConfig('tranList')),
		new htmlWebpackPlugin(getHtmlConfig('tranDetail')),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'page/common/index.js'
		}),
		new ExtractTextPlugin("page/[name]/[name].css")
	],
	resolve: {
            alias: {
                util: __dirname+'/src/util',
                service : __dirname+'/src/service',
                resource: __dirname+'/src/resource'
            }
       }
};

module.exports=	config;