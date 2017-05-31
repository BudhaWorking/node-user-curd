var mongoose = require("mongoose");

var userSchema= mongoose.Schema({

	id:{
		type : Number,
		required: true
	},
	name:{
		fname:{
			type: String,
			required: true
		},
		lname:{
			type:String,
			required: true
		}
	},
	age: {
		type: Number,
		required: true
	},
	Address:{

		city:{
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		},
		country:{
			type: String,
			required: true
		}
	}

});

var User = module.exports= mongoose.model("userModel",userSchema, "user");

 module.exports.getUser=function(callback){
	return User.find(callback);
}

 module.exports.createUser=function(userObj, callback){
	return User.create(userObj,callback);
}
module.exports.getUserById = function(userId, callback){
	return User.findById({_id : userId},callback);
}

module.exports.editUser = function(userId, userObj, callback){
	return User.update({_id : userId},
						{$set:{
						  
						    id:userObj.id,
								name: {
									fname:userObj.fname,
									lname:userObj.lname
								},
							age: userObj.age,
							Address:{
								city:userObj.city,
								state:userObj.state,
								country:userObj.country
							}			
						}}, callback)
}