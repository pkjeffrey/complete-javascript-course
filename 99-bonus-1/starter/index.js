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
        renderOverview(response);

    } else if (pathname === '/laptop' && query.id >= 0 && query.id < laptopData.length) {
        renderLaptop(laptopData[query.id], response);

    } else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathname)) {
        serveImage(pathname, response);
        
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('not found');
    }
}

function serveImage(image, response) {
    fs.readFile(`./data/img${image}`, (err, data) => {
        response.writeHead(200, {'Content-Type': 'image/jpg'});
        response.end(data);
    });
}

function renderOverview(response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./templates/overview.html', 'utf-8', (err, data) => {
        let output = data;
        fs.readFile('./templates/cards.html', 'utf-8', (err, data) => {
            const cards = laptopData.map(el => replaceData(data, el)).join('');
            output = output.replace('{%CARDS%}', cards);
            response.end(output);
        });
    });
}

function renderLaptop(laptop, response) {
    fs.readFile('./templates/laptop.html', 'utf-8', (err, data) => {
        response.writeHead(200, {'Content-Type': 'text/html'});
        let output = replaceData(data, laptop);
        response.end(output);
    });
}

function replaceData(template, laptop) {
    return template.replace(/{%PRODUCTNAME%}/g, laptop.productName)
        .replace(/{%IMAGE%}/g, laptop.image)
        .replace(/{%PRICE%}/g, laptop.price)
        .replace(/{%SCREEN%}/g, laptop.screen)
        .replace(/{%CPU%}/g, laptop.cpu)
        .replace(/{%RAM%}/g, laptop.ram)
        .replace(/{%STORAGE%}/g, laptop.storage)
        .replace(/{%DESCRIPTION%}/g, laptop.description)
        .replace(/{%ID%}/g, laptop.id);
}