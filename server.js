
const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const db = require('./sqlite'); 

var isAvailable = false;

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
	res.render("index", {error:null, success:null});
})

app.post("/", (req, res)=>{
	let name = req.body.name;
	let color = req.body.color;
	let animal = req.body.animal;
	if (isAvailable == true){
		error = "Please provide another name. Name already exist";
		success = null
	}
	else{
		db.insertValue("pet1", "(name, color, pet)", `('${name}', '${color}', '${animal}')`);
		error = null
		success = "Value insertion successful"
	}
	res.render("index", {error:error, success:success});
})

app.post("/check", (req, res)=>{
	let name = req.body['message'];
	// console.log(name);
	db.selectValue("pet1", `name='${name}'`,(row)=>{
		if (row){
			isAvailable = true;
		}
		else{
			isAvailable = false;
		}
		console.log(isAvailable)
		res.send(isAvailable);
	});
})

app.listen(3000, ()=>{
	console.log("Running server in localhost:3000");
})