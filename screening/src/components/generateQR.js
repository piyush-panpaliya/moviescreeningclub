// Import the qrcode library
import QRCode from "qrcode";

// Function to generate QR code
async function generateQRCode(text) {
  try {
    // Generate QR code
    const qrCode = await QRCode.toDataURL(text);
    // Export the QR code URL
    return qrCode;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
}

export default generateQRCode;
