// let arrayInput = []
// arrayInput = process.argv

// const fs = require("fs")

// function callback(err) {
//     if (err) {
//         console.log(err)
//         return null
//     }
//     console.log("Done")
// } 

// fs.writeFile(arrayInput[2] , arrayInput[3] , callback)

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

fs.writeFile(arrayInput[2] , data , callback)

