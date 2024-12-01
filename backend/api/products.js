const handleProductAction = async ({ connection, action, method, body, response, url }) => {
    if (action === "all" && method === "GET") {
        try {
            const [rows] = await connection.promise().query('SELECT * FROM Products WHERE ProductID BETWEEN 1 AND 10');
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: true, products: rows }));
            response.end();
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, error: e }));
            response.end();
        }
    }
    else if (action === "ice-cream" && method === "GET") {
        try {
            const [rows] = await connection.promise().query('SELECT * FROM Products WHERE ProductID BETWEEN 11 AND 18');
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: true, products: rows }));
            response.end();
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, error: e }));
            response.end();
        }
    }
    else if (action === "food" && method === "GET") {
        try {
            const [rows] = await connection.promise().query('SELECT * FROM Products WHERE ProductID BETWEEN 19 AND 26');
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: true, products: rows }));
            response.end();
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, error: e }));
            response.end();
        }
    }

    else if (action === "searchcake" && method === "POST") {
        try {
            const requestBody = JSON.parse(body); // Parse the JSON body
            const searchTerm = requestBody.query;

            if (!searchTerm) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, error: "Search term is required" }));
                response.end();
                return;
            }


            const [rows] = await connection.promise().query(
                'SELECT * FROM Products WHERE ProductName LIKE ? AND ProductID BETWEEN 1 AND 10',
                [`%${searchTerm}%`]
            );

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: true, products: rows }));
            response.end();
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, error: e.message }));
            response.end();
        }
    }
    else if (action === "searchicecream" && method === "POST") {
        try {
            const requestBody = JSON.parse(body); // Parse the JSON body
            const searchTerm = requestBody.query;

            if (!searchTerm) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, error: "Search term is required" }));
                response.end();
                return;
            }


            const [rows] = await connection.promise().query(
                'SELECT * FROM Products WHERE ProductName LIKE ? AND ProductID BETWEEN 11 AND 18',
                [`%${searchTerm}%`]
            );

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: true, products: rows }));
            response.end();
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, error: e.message }));
            response.end();
        }
    }
    else if (action === "searchfood" && method === "POST") {
        try {
            const requestBody = JSON.parse(body); // Parse the JSON body
            const searchTerm = requestBody.query;

            if (!searchTerm) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, error: "Search term is required" }));
                response.end();
                return;
            }


            const [rows] = await connection.promise().query(
                'SELECT * FROM Products WHERE ProductName LIKE ? AND ProductID BETWEEN 19 AND 26',
                [`%${searchTerm}%`]
            );

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: true, products: rows }));
            response.end();
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, error: e.message }));
            response.end();
        }
    }
    else if (action == "add-to-cart" && method == "POST") {
        try {
            const { customerId, quantity, ProductID } = JSON.parse(body);

            await connection.promise().query('INSERT INTO cartDetails (CustomerID, ProductID, Quantity) VALUES (?, ?, ?)', [customerId, ProductID, quantity]);

            const getCartsRes = await connection.promise().query('SELECT SUM(Quantity) AS totalQuantity FROM CartDetails WHERE CustomerID = ?', customerId);

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                newNumberOfItems: getCartsRes[0][0].totalQuantity
            }));
            response.end();

        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e,
            }));
            response.end();
        }

    }
    else {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({ success: false, error: "Not Found" }));
        response.end();
    }



};

module.exports = {
    handleProductAction
};