
const http = require("http");
const { URL } = require("url");
const mysql = require("mysql2");


const server = http.createServer((request, response) => {
    // Set response headers (do not change)
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'myshopdb'
    });
    connection.connect((err) => {
        if (err) throw err;
        // console.log('Connected to the MySQL database.');
    });

    // Parse the URL (do not change)
    const url = new URL(request.url, `http://${request.headers.host}`);

    // Get the pathname (do not change)
    const pathname = url.pathname;
    const [, type, action] = pathname.split("/");

    let body = '';
    request.on('data', chunk => {
        body += chunk.toString()
    });

    request.on('end', () => {
        if (type == "user") {
            const { handleUserAction } = require("./api/user");
            handleUserAction({ connection, action, method: request.method, body, response });
        } else if (type == "products") {
            const { handleProductAction } = require("./api/products");
            handleProductAction({ connection, action, method: request.method, body, response });
        } else if (type == "cart") {
            const { handleCartAction } = require("./api/cart");
            handleCartAction({ connection, action, method: request.method, body, response });
        };
    });
});

// Start the server  (do not change)
server.listen(3000);

// Output message to console (do not change)
console.log("Listening on port 3000...");