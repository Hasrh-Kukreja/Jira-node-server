const  {MongoClient} = require('mongodb');
const url= 'mongodb://localhost:27017';
const database = 'Jira_Project'
const client = new MongoClient(url); 


// async function dbconnect()
// {
//     let result = await client.connect();
//     db = result.db(database);
//    return db.collection('Jiratest');
// }

// dbconnect().then((resp)=>{
// resp.find().toArray().then((data)=>{
// console.log(data)
// })
// })

// const main=async ()=>{
// let data = await dbconnect();
// data = await data.find().toArray();
// console.log(data)

// }
// main()
// // getdata();/ 

const express = require('express');
const mongoose = require('mongoose');
const axios = require("axios");
// const insertdata = require('./insert');
let app = express();
app.use(express.json());
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.header("Access-Control-Allow-Credentials", true);

    next();

});

// const axios = require("axios");

let port = 2410;
app.listen(port, () => console.log("Node app listening on port $(port)!"));


// const insertdata = require("./insert")

// const sch ={
//      id:{
//         type:String,
//         required:true
//      },
//      Name:{
//         type:String,
//         required:true
//      },
//      Description:{
//         type:String,
//         required:true
//      },
//      Reporter:{
//         type:String,
//         required:true
//      },

//      Status:{
//         type:String,
//         required:true
//      },
//      Due_Dateif_any:{
//         type:Number,
//         required:true
//      },
// }
// const monmodel=mongoose.model('Jiratest',sch)

// //post
app.post('/editIssue',async(req,res)=>{
    try{
    console.log('inside the app function');
    let ticketData = req.body;
    //jira edit api writes here to change the status of the ticket;
    let ticketInDB = await checkTicketInDB(req.body.key);
    ticketInDB.Status = req.body.Status;
    //update data query for mongoDB\
    // const val = await data.save();
    res.json(val);
    } catch(error){
        console.log("Error while updating the data in the database")
        res.send(error)
    }
})
 

app.get("/test", function (req, res, next) {
    res.send("Hello World")
});



app.get("/getIssue", async function (req, res, next) {
    let data = await dbconnect();
    console.log("Hii")
    try {
        let headers = { "Accept-Encoding": "gzip,deflate,compress" }
        let allPosts = await axios.get("https://demo-project-harsh.atlassian.net/rest/api/2/issue/DEMO-1", {
            auth: {
              "username": "hunnykukreja05@gmail.com",
              "password": "Y8HwLx0drmTz9Hgb72kR8761"
            }
          });
     let DataToBeSave = {
           id : allPosts.data.key,
           name :allPosts.data.fields.project.name,
           Description: allPosts.data.fields.description ?? "",
           Reporter: allPosts.data.fields.reporter.displayName,
           Status: allPosts.data.fields.status.name,
           Due_Dateif_any : ""};
           console.log("######################",DataToBeSave);
           let keyInDb = await checkTicketInDB(DataToBeSave.key);
           if(!keyInDb){
            let insert = await insertdata(DataToBeSave);
           }
        
         console.log("Data Insert ",insert)
        // console.log("Response",allPosts.data)
        res.send(allPosts.data)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


async function dbconnect()
{
    let result = await client.connect();
    db = result.db(database);
   return db.collection('Jiratest');
}

 const insertdata=async (issueData)=>{
    try{
    let data = await dbconnect();
   let result =await data.insert(
        issueData
    )
    if (result.acknowledged)
    {
        console.warn('Data is inserted')
        return "Success"
    }
} catch(error){
    console.log("Error while inserting",error);
    return error;
}
}

const checkTicketInDB = async(key) => {
   try{


   } catch(error){
    console.log("Error while searching the data in DB");
    return error
   }
}