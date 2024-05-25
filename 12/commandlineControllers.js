let fs = require('fs');


function textController(){
    console.log('this is a test, from commandline module');
}

function createFileController(name, content){

    fs.writeFile(name, content, function(error){
        if(error){
            console.log('writeFile fail')
        }
        else{
            console.log('writeFile success')
        }
    });

}

exports.text = textController;
exports.create = createFileController;
