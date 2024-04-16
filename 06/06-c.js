let fs = require('fs');
let redis = require('redis')

const { argv } = require('process');
let command = process.argv[2];
let name = process.argv[3];
let arg4 = process.argv[4];

function unlinkCallback(err) {
    if(err){
        if(err.code === 'EPERM'){
            fs.rmdir(name, rmdirCallback); 
        }
        else{
            console.log('ERR: ', err)
        }
    }
    else{
        console.log("unlink  successfull.")
    }
}
function rmdirCallback(err){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('rmdir successfull')
    }
}
function fsCallback(err){
    let messages ={
        copy: 'copyFile successfull',
        append: 'append  successfull.',
        create: 'writeFile  successfull.',
        createRecord :'add data on databace was successfull ',
        readRecord : 'all info read successfull',
        updateRecord : 'update data on databace was successfull',
        deleteRecord : 'delete data on databace was successfull',
    
    
    }
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log(messages[command])
    }
}
function fsREADCallback(err , data){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log(data)
        }
}  
function name2Index(name , records){
    for (let index = 0; index < records.length; index++) {
        if (records[index].Name == name) {
            return index
        }
    }
    return -1
}
function deleteRecordController(){
    let index = process.argv[3]

    fs.readFile('databace.json' ,'UTF8' , function(err, newinfo) {

        if (err) {
            console.log ('ERR', err)
        }

        else
        {
            newinfo=JSON.parse(newinfo)
            newinfo.records.splice(index,1)
            newinfo=JSON.stringify(newinfo)

            fs.writeFile('databace.json', newinfo, fsCallback)
        }
    })

}
function printAllController(){
    fs.readFile('databace.json' ,'UTF8' , function(err, newinfo) {
        if (err) {
            console.log ('ERR', err)
        }
        else{
            newinfo=JSON.parse(newinfo)
            for (let index = 0; index < newinfo.records.length; index++) {
                console.log(newinfo.records[index])
                
            }
        }
    })
}
function updateRecordController(){
    let index = process.argv[3]
    let DATA = {
        Name : process.argv[4],
        family : process.argv[5],
        email : process.argv[6]
    }

    fs.readFile('databace.json' ,'UTF8' , function(err, newinfo) {

        if (err) { 
            console.log ('ERR', err)
        }

        else
        {
            newinfo=JSON.parse(newinfo)
            newinfo.records[index]=DATA
            newinfo=JSON.stringify(newinfo)

            fs.writeFile('databace.json', newinfo, fsCallback)
        }
    })
}
function readRecordController(){
    let index = process.argv[4]
    let option = process.argv[3]
    fs.readFile('databace.json' ,'UTF8' , function(err , data) {
        
        if (err) {
                console.log ('ERR' , err)
        }

        else 
        {
            dbData=JSON.parse(data)
            if (option == "nameSearch") {
                index = name2Index(index , dbData.records)
            }
            
            if (index == -1 || index > dbData.records.length || dbData.records[index] == undefined) {
                console.log("record not found")
                return null
            }
            console.log(dbData.records[index])
            
        }
    })
}
function createRecordController()
    {
        let DATA = {
            Name : process.argv[3],
            family : process.argv[4],
            email : process.argv[5]
        }
        fs.readFile('databace.json' ,'UTF8' , function(err , newinfo) {

            if (err) { console.log ('ERR' , err)}

            else 
            {
                newinfo=JSON.parse(newinfo)
                newinfo.records.push (DATA)
                newinfo=JSON.stringify(newinfo)

                fs.writeFile('databace.json',newinfo,fsCallback)
            }
        })
}
function readController(){
    fs.readFile(  name , '', fsREADCallback );
}
function copyController(){
    fs.copyFile(name, arg4, fsCallback);
}
function deleteController(){
    fs.unlink(name, unlinkCallback);
}
function appendConroller(){
    fs.appendFile(name, arg4, fsCallback); 
}
function createController(){
    fs.writeFile(name, arg4, fsCallback);
}
async function RedisAddRecord(){
    const client = await redis.createClient({
        url: 'redis://127.0.0.1:6379'
      })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
    
    const value = await client.get('textDB');
    
    let DATA = {
        Name : process.argv[3],
        family : process.argv[4],
        email : process.argv[5]
    }
 
    v = JSON.parse(value)
    v.records.push (DATA)
    v=JSON.stringify(v)
    
    console.log(v)
    await client.set('textDB', v); 
    await client.disconnect();
}
async function RedisDeleteRecord(){
    let index = process.argv[3]
    const client = await redis.createClient({
        url: 'redis://127.0.0.1:6379'
    })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
    
    const value = await client.get('textDB');
    
    v=JSON.parse(value)
    v.records.splice(index,1)
    v=JSON.stringify(v)
    
    console.log(v)
    await client.set('textDB', v); 
    await client.disconnect();
}
async function RedisUpdateRecord(){
    let index = process.argv[3]
    let DATA = {
        Name : process.argv[4],
        family : process.argv[5],
        email : process.argv[6]
    }
    const client = await redis.createClient({
        url: 'redis://127.0.0.1:6379'
    })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
    
    const value = await client.get('textDB');
    
    v=JSON.parse(value)
    v.records[index]=DATA
    v=JSON.stringify(v)
    
    console.log(v)
    await client.set('textDB', v); 
    await client.disconnect();
}

let commands = {
    create: createController ,
    append: appendConroller ,
    delete: deleteController ,
    copy: copyController  ,
    read: readController ,
    createRecord : createRecordController ,
    readRecord : readRecordController ,
    updateRecord : updateRecordController ,
    deleteRecord : deleteRecordController,
    printAll : printAllController,
    redisCreate : RedisAddRecord,
    redisDelete : RedisDeleteRecord,
    redisUpdate : RedisUpdateRecord,
}

commands[command]();