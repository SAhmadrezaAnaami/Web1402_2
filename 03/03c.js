let arrayInput = []
arrayInput = process.argv

const fs = require("fs")


function callback(err) {
    if (err) {
        console.log(err)
        return null
    }
    console.log("file deleted")
} 

fs.unlink(arrayInput[2] , callback)