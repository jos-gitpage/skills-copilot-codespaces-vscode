// Create web server 
// Create a web server that listens on port 3000 and serves the comments.html file.
// The comments.html file should be served with the following headers:
// Content-Type: text/html
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: GET, POST, PUT, DELETE
// Access-Control-Allow-Headers: Content-Type
// The comments.html file should contain a form that allows users to submit comments.
// The form should have the following fields:
// Name: A text field for the user to enter their name.
// Comment: A text area for the user to enter their comment.
// Submit: A submit button to submit the form.
// When the form is submitted, the server should store the comment in a file called comments.txt.
// Each comment should be stored on a new line.
// The server should then redirect the user back to the comments.html page.
// The server should also serve the comments.txt file when a GET request is made to /comments.
// The comments.txt file should be served with the following headers:
// Content-Type: text/plain
// Access-Control-Allow-Origin: *

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    if (req.method === 'GET' && pathname === '/comments') {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        fs.createReadStream(path.join(__dirname, 'comments.txt')).pipe(res);
    } else if (req.method === 'POST' && pathname === '/comments') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            const { name, comment } = JSON.parse(body);
            fs.appendFile(path.join(__dirname, 'comments.txt'), `${name}: ${comment}\n`, (err) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Error');
                } else {
                    res.writeHead(302, {
                        'Location': '/comments'
                    });
                    res.end();
                }
            });
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        fs.createReadStream(path.join(__dirname, 'comments.html')).pipe(res);
    }
}







