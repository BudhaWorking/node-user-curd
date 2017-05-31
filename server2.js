var express = require("express");
var app  =  express();
var mongoose = require("mongoose");
var User = require("./model/user");

var bodyParser= require("body-parser");
var router = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/techminds", function(){
    console.log("Successfully connected to databsae")
})


router.get('/getUser', function(request, response){

    User.getUser(function(err, data){
    		if(err){
    			throw err;
    		}
    		response.json(data);
    })
})


router.post('/createUser', function(request, response){
   var userObj = request.body;
    User.createUser(userObj,function(err, data){
    		if(err){
    			throw err;
    		}
    		response.json(data);
    })
})

router.put('/editUserById/:id', function(request, response){
    var userID = request.params.id;
    var dataFromUi = request.body;

        User.getUserById(userID,function(err, Dbdata){
            if(err){
                throw err
            }
                    
        // response.json(Dbdata)   // dont witre here because after gatting its direct give response
        var userObj={
                id:dataFromUi.id||Dbdata.id,
               /* name:{  // this code for sending RAW data as json object from postMAN
                    fname: dataFromUi.fname||Dbdata.name.fname,
                   lname: dataFromUi.lname||Dbdata.name.lname
                },*/   


                fname: dataFromUi.fname||Dbdata.name.fname,
                lname: dataFromUi.lname||Dbdata.name.lname,
                age  : dataFromUi.age||Dbdata.age,
                state: dataFromUi.state||Dbdata.Address.state,
                city : dataFromUi.city||Dbdata.Address.city,
                country: dataFromUi.country||Dbdata.Address.country
            }
        User.editUser(userID, userObj, function(err, data){
            if(err){
                throw err
            }
            response.json(data);
        })
   });
});

app.use("/api", router);

var PORT =process.env.PORT || 8003;
app.listen(PORT, function(){
	console.log("Server Listening to PORT:-"+PORT)
})

