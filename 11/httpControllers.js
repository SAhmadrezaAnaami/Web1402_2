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

function send(response, body, ext){
    let types = {
        'txt': 'text/plain',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'html': 'text/html'
    }

    if(! types[ext]){
        response.writeHead(200, { 'Content-Type': types['txt']});
        response.write('extention not found');
        response.end();
    }
    else{
        response.writeHead(200, { 'Content-Type': types[ext]});
        response.write(body);
        response.end();
    }
}

function copyFileController(request, response){
    let name1 = request.url.split('/')[2];
    let name2 = request.url.split('/')[3];

    fs.copyFile(name1, name2, function(error){
        if(error){
            // response.writeHead(200, { 'Content-Type': 'text/plain'});
            // response.write('copyFile error');
            // response.end();
            send(response, 'copyFile error', 'txt');
        }
        else{
            // response.writeHead(200, { 'Content-Type': 'text/plain'});
            // response.write('copyFile success');
            // response.end();
            send(response, 'copyFile success', 'txt');
        }
    });

}

function htmlFileController(request, response){
    let fileName = request.url.split('/')[2];

    fs.readFile(fileName, function(err, fileData){
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

function sumController(request, response){
    if(request.methode = "POST"){
        console.log(request.data)
        console.log(request.methode)
        send(response, (Number(JSON.parse(request.data).op1) + Number(JSON.parse(request.data).op2)).toString(), 'txt');
    }
    else{
        let operand1 = Number(request.url.split('/')[2]);
        let operand2 = Number(request.url.split('/')[3]);
        
        send(response, (operand1+operand2).toString(), 'txt');
    }
}

function multiplyController(request, response){

    if(request.methode = "POST"){
        console.log(request.methode)
        console.log(request.data)
        send(response, (Number(JSON.parse(request.data).op1) * Number(JSON.parse(request.data).op2)).toString(), 'txt');
    }
    else
    {
        let operand1 = Number(request.url.split('/')[2]);
        let operand2 = Number(request.url.split('/')[3]);
        send(response, (operand1*operand2).toString(), 'txt');
    }

    
    
}


exports.text = textController;
exports.textFile = textFileController;
exports.createFile = createFileController;
exports.copyFile = copyFileController;
exports.htmlFile = htmlFileController;
exports.sum = sumController;
exports.multiply = multiplyController;
