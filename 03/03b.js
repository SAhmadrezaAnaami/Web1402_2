let arrayInput = []
arrayInput = process.argv

const fs = require("fs")


function callback(err) {
    if (err) {
        console.log(err)
        return null
    }
    console.log("Done")
} 

let data = ""

for (let index = 3; index < arrayInput.length; index++) {
    data += arrayInput[index] + " "  
}

fs.appendFile(arrayInput[2] , data , callback)