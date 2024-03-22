// Import the generateQRCode function
import generateQRCode from './generateQR';

// String to generate QR code for
const myString = "Hello, world!";

// Call the function to generate QR code
generateQRCode(myString)
    .then(qrCode => {
        // Display the QR code URL
        const QRCODE = qrCode;
        console.log(QRCODE);

        // Now you can transport this QR code URL to the first file or use it as needed
    })
    .catch(error => {
        console.error('Error:', error);
    });
