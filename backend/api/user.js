const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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' // Replace with your SendGrid API key
    }
}));


const handleUserAction = async ({
    connection, action, method, body, response,
}) => {
    if (action === "signup" && method === "POST") {
        try {
            const { userName, email, pw } = JSON.parse(body);
            const userRes = await connection.promise().query(
                'INSERT INTO Customers (Username, Email, Password) VALUES (?, ?, ?)',
                [userName, email, pw]
            );

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                customerId: userRes[0]?.insertId,
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

    } else if (action === "signin" && method === "POST") {
        try {
            const { userName, pw } = JSON.parse(body);
            const [rows] = await connection.promise().query(
                'SELECT * FROM Customers WHERE Username = ? AND Password = ?',
                [userName, pw]
            );

            if (rows.length > 0) {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: true,
                    customerId: rows[0].CustomerID, //  ID is the primary key for the Customers table
                }));
                response.end();
            } else {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({
                    success: false,
                }));
                response.end();
            }
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: false,
                e,
            }));
            response.end();
        }

    } else if (action === "update" && method === "POST") {
        try {
            const { customerId, userName, email, pw } = JSON.parse(body);
            const updateRes = await connection.promise().query(
                'UPDATE Customers SET Username = ?, Email = ?, Password = ? WHERE customerId= ?',
                [userName, email, pw, customerId]
            );

            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify({
                success: updateRes[0].affectedRows > 0,
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
    else if (action === "forgotpassword" && method === "POST") {
        try {
            const { email } = JSON.parse(body);
            if (!email) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, message: "Email is required" }));
                response.end();
                return;
            }

            // Generate a unique token
            const token = crypto.randomBytes(20).toString('hex');

            const [results] = await connection.promise().query('SELECT CustomerID FROM Customers WHERE Email = ?', [email]);

            if (results.length > 0) {
                const customerID = results[0].CustomerID;

                // Store the token with an expiration time 
                await connection.promise().query('INSERT INTO PasswordResetTokens (Token, CustomerID, CreatedAt) VALUES (?, ?, NOW())', [token, customerID]);

                const mailOptions = {
                    from: 'granddessertpalace@gmail.com',
                    to: email,
                    subject: 'Password Reset Token',
                    text: `You requested a password reset. Your token is: ${token}`
                };

                await transporter.sendMail(mailOptions);
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: true, message: "Reset token sent to your email " }));
                response.end();
            } else {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, message: "No user found with that email" }));
                response.end();
            }
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, e }));
            response.end();
        }

    } else if (action === "resetpassword" && method === "POST") {
        try {
            const { token, newPassword } = JSON.parse(body);
            if (!token || !newPassword) {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, message: "Token and new password are required" }));
                response.end();
                return;
            }

            const [results] = await connection.promise().query('SELECT CustomerID FROM PasswordResetTokens WHERE Token = ? AND CreatedAt > NOW() - INTERVAL 1 HOUR', [token]);

            if (results.length > 0) {
                const customerID = results[0].CustomerID;
                await connection.promise().query('UPDATE Customers SET Password = ? WHERE CustomerID = ?', [newPassword, customerID]);
                await connection.promise().query('DELETE FROM PasswordResetTokens WHERE Token = ?', [token]);

                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: true, message: "Password successfully reset please log in with your new password" }));
                response.end();
            } else {
                response.writeHead(400, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ success: false, message: "Invalid or expired token" }));
                response.end();
            }
        } catch (e) {
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write(JSON.stringify({ success: false, e }));
            response.end();
        }

    }
    else {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify({}));
        response.end();
    }
};

module.exports = {
    handleUserAction,
};




