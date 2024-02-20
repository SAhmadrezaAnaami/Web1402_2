let arrayInput = []
arrayInput = process.argv

const fs = require("fs")


function CopyCallback(err) {
    if (err) {
        console.log(err)
        return null
    }
    console.log( "<--- file copied to " + arrayInput[3] + " ---> ")
} 

fs.copyFile(arrayInput[2] , arrayInput[3] , CopyCallback)
