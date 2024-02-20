const fs = require("fs")

let arrayInput = []
arrayInput = process.argv
let oper = arrayInput[2]

function Callback(err) {

    let text = {
        create : "file created",
        append : "file appended",
        delete : "file deleted",
        copy : "file copied"
    }

    if (err === null) {
        console.log(text[oper])
        return null
    }
    if (err.code === 'EPERM') {
        fs.rmdir(arrayInput[2] , Callback)
        return null
    }
    if (err) {
        console.log(err)
        return null
    } 
} 
function CreateFile(){
    
    let data = ""
    
    for (let index = 4; index < arrayInput.length; index++) {
        data += arrayInput[index] + " "  
    }
    
    fs.writeFile(arrayInput[3] , data , Callback)
}
function appendFile(){
    
    let data = ""
    
    for (let index = 4; index < arrayInput.length; index++) {
        data += arrayInput[index] + " "  
    }
    
    fs.appendFile(arrayInput[3] , data ,  Callback)
}
function rmFile(){
    
    fs.unlink(arrayInput[3] ,  Callback)
}
function copyFile(){
    
    fs.copyFile(arrayInput[3] , arrayInput[4] ,  Callback)
}
function singleOper(oper){
    let opers ={
        create : CreateFile,
        append : appendFile,
        delete : rmFile,
        copy : copyFile
    }
    opers[oper]()
}
singleOper(oper)
