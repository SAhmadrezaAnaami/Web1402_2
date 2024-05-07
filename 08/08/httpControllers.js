let fs = require('fs');

function textController(request, response){
    response.writeHead(200, { 'Content-Type': 'text/plain'});
    response.write('this is a test');
    response.end();
}

function textFileController(request, response){
    fs.readFile('./textFile.txt', function(err, fileData){
        if(err){
            response.writeHead(200, { 'Content-Type': 'text/plain'});
            response.write('file not found');
            response.end();
        }
        else{
            response.writeHead(200, { 'Content-Type': 'text/html'});
            response.write(fileData);
            response.end();
        }
    });
}

function createFileController(request, response){
    let name = request.url.split('/')[2];
    let content = request.url.split('/')[3];

    fs.writeFile(name, content, function(error){
        if(error){
            response.writeHead(200, { 'Content-Type': 'text/plain'});
            response.write('writeFile error');
            response.end();
        }
        else{
            response.writeHead(200, { 'Content-Type': 'text/plain'});
            response.write('writeFile success');
            response.end();
        }
    });

}

exports.text = textController;
exports.textFile = textFileController;
exports.createFile = createFileController;