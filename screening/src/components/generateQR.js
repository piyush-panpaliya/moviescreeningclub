// Import the qrcode library
const QRCode = require("qrcode");

// Function to generate QR code
async function generateQRCode(text) {
  let data = {
    id: text,
  };
  let stringdata = JSON.stringify(data);
  try {
    // Export the QR code URL
    return QRCode.toDataURL(stringdata, function (err, code) {
      if (err) return console.log("error occurred");

      // Printing the code
      console.log(code);
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
}

export default generateQRCode;
