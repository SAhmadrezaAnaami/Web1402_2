let arrayInput = []
arrayInput = process.argv

const fs = require("fs")

function callback(err) {
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

fs.unlink(arrayInput[2] , callback)