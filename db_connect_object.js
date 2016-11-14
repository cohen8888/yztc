var mongodb = require('mongodb');
var test = require('assert');
var MongoClient = mongodb.MongoClient;
//通过Client对象连接到MongoDB
//

//static MongoClient.connect(url, options, callback)
// url      string  连接URI字符串
// options  object  连接的而设置
// callback 		回调函数
//
MongoClient.connect("mongodb://@localhost:28008/newDB",{
	db:{w:1, native_parser:false},
	server:{
		poolSize:5,
		socketOptions:{connectTimeoutMS:500},
		auto_reconnect:true
	},
	replSet:{},
	mongos:{}
},function(err, db){
	if (err)
		console.log(err);
	db.db("newDB");
	db.createCollection("myCollection", {capped:true,size:10000, max:1000, w:1},function(err, collection){
		test.equal(null, err);
		collection.insertOne({a:1},{w:1}, function(err, result){
			test.equal(null, err);
			db.close();
		})
	});
	
});

//了解db对象，mongoDB驱动程序中的Db对象提供对数据库的访问