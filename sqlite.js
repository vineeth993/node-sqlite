'use strict'

var exports = module.exports = {};
var count = 1;

const sqlite3 = require('sqlite3').verbose();

const dbConn = new sqlite3.Database("pet.db");

exports.insertValue = function(tableName, column, Value){
	let query = `insert into ${tableName} ${column} values ${Value}`;
	dbConn.run(query, (err)=>{
		if(err){
			return console.log(err.message)
		}
		return
	});
	return
}

exports.selectValue = function(tableName, condition = 1, callback){
	let selectQuery = `select * from ${tableName} where ${condition}`;
	var val = null;
	dbConn.get(selectQuery, (err, row)=>{
		if (err){
			return console.log(err.message);
		}
		callback(row);
	});
}

exports.count = function(){
	count ++ ;
	console.log("in value");
	return count
}