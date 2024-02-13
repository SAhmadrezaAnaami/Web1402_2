let arrayInput = []
arrayInput = process.argv
let personsArray =[]

for (let index = 2; index < arrayInput.length; index += 2) {
    person = {
        name : arrayInput[index],
        age : arrayInput[index + 1]
    }
    personsArray.push(person)
}
console.log(personsArray)