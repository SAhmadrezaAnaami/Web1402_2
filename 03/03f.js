const fs = require("fs")

let arrayInput = []
arrayInput = process.argv

function Writecallback(err) {
    if (err) {
        console.log(err)
        return null
    }
    console.log("<--- file create at " + arrayInput[3] + " ---> ")
} 
function CreateFile(){
    
    let data = ""
    
    for (let index = 4; index < arrayInput.length; index++) {
        data += arrayInput[index] + " "  
    }
    
    fs.writeFile(arrayInput[3] , data , Writecallback)
}

function appendCallback(err) {
    if (err) {
        console.log(err)
        return null
    }
    console.log("<--- file appended at " + arrayInput[3] + " ---> ")
} 
function appendFile(){
    
    let data = ""
    
    for (let index = 4; index < arrayInput.length; index++) {
        data += arrayInput[index] + " "  
    }
    
    fs.appendFile(arrayInput[3] , data , appendCallback)
}

function rmCallback(err) {
    if (err === null) {
        console.log("file deleted")
        return null
    }
    if (err.code === 'EPERM') {
        fs.rmdir(arrayInput[2] , callback)
        return null
    }
    if (err) {
        console.log(err)
        return null
    } 
} 
function rmFile(){
    
    fs.unlink(arrayInput[3] , rmCallback)
}

function CopyCallback(err) {
    if (err) {
        console.log(err)
        return null
    }
    console.log( "<--- file copied to " + arrayInput[3] + " ---> ")
} 
function copyFile(){
    
    fs.copyFile(arrayInput[3] , arrayInput[4] , CopyCallback)
}



function singleOPer(oper){
    switch (oper) {
        case "create":
            CreateFile()
            break;
        case "append":
            appendFile()
            break;
        case "delete":
            rmFile()
            break;
        case "copy":
            copyFile()
            break;
        default:
            console.log("not an operator")
            break;
    }
}

let oper = arrayInput[2]
singleOPer(oper)
