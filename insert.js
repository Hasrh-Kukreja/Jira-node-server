const  {MongoClient} = require('mongodb');
const url= 'mongodb://localhost:27017';
const database = 'Jira_Project'
const client = new MongoClient(url); 


async function dbconnect()
{
    let result = await client.connect();
    db = result.db(database);
   return db.collection('Jiratest');
}

 const insertdata=async (data)=>{
    try{
    let data = await dbconnect();
   let result =await data.insert(
        data
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
module.exports = insertdata;
// insertdata();