const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync('./data/data.json', 'utf-8');
const laptopData = JSON.parse(json);

const server = http.createServer(requestHandler);
server.listen(1337, 'localhost', () => {
    console.log('Server listening now.');
});

function requestHandler(request, response) {
    const requestURL = url.parse(request.url, true);
    const pathname = requestURL.pathname;
    const query = requestURL.query;

    if (pathname === '/' || pathname === '/products') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('products page');

    } else if (pathname === '/laptop' && query.id >= 0 && query.id < laptopData.length) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(`laptop page for ${query.id}`);

    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('not found');
    }
}