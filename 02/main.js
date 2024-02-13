let ArgList
ArgList = process.argv

let array = []

function print(val , index){
    if (index >= 2) {
        array.push(val)
    }
    
}
ArgList.forEach(print);

console.log("forEach - array" , array)


let array2 = []
for (let index = 2; index < ArgList.length; index++) {
    array2.push(ArgList[index])
    
}

console.log("for - array" , array2)


