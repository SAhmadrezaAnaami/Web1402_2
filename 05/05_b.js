

let fs = require('fs');
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
let commands = {
    create: function(){
        fs.writeFile(name, arg4, fsCallback);
    },
    append: function(){
        fs.appendFile(name, arg4, fsCallback); 
    },
    delete: function(){
        fs.unlink(name, unlinkCallback);
    },
    copy: function(){
        fs.copyFile(name, arg4, fsCallback);
    } ,
    read: function(){
        fs.readFile(  name , '', fsREADCallback );
    },
    createRecord :function()
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
    },
    readRecord : function(){

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
    },
    updateRecord : function(){
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
    },
    deleteRecord : function(){
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

    },
    printAll : function(){
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
}
commands[command]();