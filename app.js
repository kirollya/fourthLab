const http = require('http');

const PORT = 8080;

const server = http.createServer((request, result) => {
    console.log('Request');
    console.log(request.url, request.method);

    result.setHeader('Content-Type', 'text/html');
    result.write('<h1>Hello!</h1><p>hi</p>');
    result.end();
});

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log('successful start');
});