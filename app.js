const express=require("express");
const bodyParser=require("body-parser");
const https =require("https");

const app =express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/" , function(req,res){
    const firstName1=req.body.firstName;
    const lastName1=req.body.lastName;
    const mail=req.body.email;

    console.log(firstName1+" "+lastName1);
    console.log(mail);


    const data ={
        members: [
            {
            email_address: mail,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName1,
                LNAME: lastName1
            }
        }
    ]
    };

    const jsonData =JSON.stringify(data);
    




    const url ="https://us9.api.mailchimp.com/3.0/lists/b5e6633e5c";

    const options={
        method: "POST",
        auth: "aditya1:w9e38cf2ea3413eb0c24c60f190f507de-us9"
    }
    
const request = https.request(url,options,function(response){

if(response.statusCode === 200){
    res.sendFile(__dirname+"/success.html");
}
else{
    res.sendFile(__dirname+"/failure.html");
}

        response.on("data",function(data){
            console.log(JSON.parse(data));3
        })
    })
request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("server has started on port 3000");
});


//API KEY
//9e38cf2ea3413eb0c24c60f190f507de-us9

//API ID
//b5e6633e5c
//const mailchimp = require("@mailchimp/mailchimp_marketing");