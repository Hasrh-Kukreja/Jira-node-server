const  {MongoClient} = require('mongodb');
const url= 'mongodb://localhost:27017';
const database = 'Jira_Project'
const client = new MongoClient(url); 

const express = require('express');
const mongoose = require('mongoose');
const axios = require("axios");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.header("Access-Control-Allow-Credentials", true);

    next();

});


let port = 2410;
app.listen(port, () => console.log("Node app listening on port $(port)!"));



app.post('/editIssue',async(req,res)=>{
    try{
    console.log('inside the app function');
    let ticketData = req.body;
    let ticketInDB = await checkTicketInDB(req.body.key);
    ticketInDB.Status = req.body.Status;
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
        let allPosts = await axios.get("https://demo-project-harsh.atlassian.net/rest/api/latest/search?project=DEMO&jql=order+by+key+ASC&startAt=0", {
            auth: {
              "username": "hunnykukreja05@gmail.com",
              "password": "9UHKIcEBNMV13asu3yOwB28A"
            }
          });
          let allIssues = allPosts.data.issues;
          let issuesArray = [];
          if(allIssues.length > 0){
            allIssues.forEach(async (issue)=>{
                let DataToBeSave = {
                    id : issue.data.key,
                    name :issue.data.fields.project.name,
                    Description: issue.data.fields.description ?? "",
                    Reporter: issue.data.fields.reporter.displayName,
                    Status: issue.data.fields.status.name,
                    Due_Dateif_any : ""};
                    let keyInDb = await checkTicketInDB(DataToBeSave.key);
                    if(!keyInDb){
                     issuesArray.push(DataToBeSave);
                    }
            })
          }
          let insert = await insertdata(issuesArray);
        console.log("DATAAAAAAAAA",allPosts.data.issues)
        res.send(allIssues)
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
     return true;

   } catch(error){
    console.log("Error while searching the data in DB");
    return error
   }
}