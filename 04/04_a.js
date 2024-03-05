//node .\03-f.js create x.txt salamSALAMsalam
//node .\03-f.js append x.txt salamSALAMsalam
//node .\03-f.js delete x.txt
//node .\03-f.js delete myDirName
//node .\03-f.js copy x.txt y.txt  


let fs = require('fs');
let command = process.argv[2];
let name = process.argv[3];
let arg4 = process.argv[4];

function writeFileCallback(err) {
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('writeFile  successfull.');
    }
}

function appendFileCallback(err) {
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('append  successfull.');
    }
}

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

function copyFileCallback(err){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('copyFile successfill')
    }
}

let messages ={
    copy: 'copyFile successfull',
    append: 'append  successfull.',
    create: 'writeFile  successfull.',
    

}

function fsCallback(err){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log(messages[command])
    }
}

// switch(command){
//     case 'create':
//         fs.writeFile(name, arg4, writeFileCallback); 
//         break;
//     case 'append':
//         fs.appendFile(name, arg4, appendFileCallback); 
//         break;
//     case 'delete':
//         fs.unlink(name, unlinkCallback);
//         break;
//     case 'copy':
//         fs.copyFile(name, arg4, copyFileCallback); 
//         break;
//     default:
//         console.log('Command not found');
// }

function fsREADCallback(err , data){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log(data)
    }}

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
        fs.readFile(  name , '', fsREADCallback )

    }
    
}

commands[command]();

