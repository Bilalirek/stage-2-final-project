const PDFDocument = require('pdfkit');
const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');
const sendGridTransport = require('nodemailer-sendgrid-transport');

// Ensure the directory exists
const ensureDirectoryExists = (filePath) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Generate PDF
const generatePDF = (order, orderDetails) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filePath = path.join(__dirname, 'orders', `${order.OrderID}.pdf`);

        // Ensure the directory exists
        ensureDirectoryExists(filePath);

        doc.pipe(fs.createWriteStream(filePath));
        doc.fontSize(20).text('Order Details', { align: 'center' });
        doc.moveDown();

        doc.fontSize(14).text(`Order ID: ${order.OrderID}`);
        doc.text(`Customer name: ${order.cusName}`);
        doc.text(`Order Date: ${order.OrderDate}`);
        doc.text(`Total Amount: $${Number(order.TotalAmount).toFixed(2)}`);
        doc.moveDown();

        orderDetails.forEach(detail => {
            // doc.fontSize(12).text(`Product ID: ${detail.ProductID}`);
            doc.text(`Product Name: ${detail.ProductName}`);
            doc.text(`Quantity: ${detail.Quantity}`);
            doc.text(`Price: $${detail.Price}`);
            doc.text(`Total: $${(Number(detail.Price) * detail.Quantity).toFixed(2)}`);
            doc.moveDown();
        });

        doc.end();

        doc.on('end', () => resolve(filePath));
        doc.on('error', (err) => reject(err));
    });
};

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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' // Replace with your SendGrid API key
    }
}));

// Send Email
const sendEmail = async (to, subject, text, attachmentPath) => {
    const mailOptions = {
        from: 'granddessertpalace@gmail.com',
        to: to,
        subject: subject,
        text: text,
        attachments: attachmentPath ? [
            {
                filename: 'order-details.pdf',
                path: attachmentPath
            }
        ] : []
    };

    try {
        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = { generatePDF, sendEmail };
