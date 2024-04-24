const mongoose=require('mongoose');
const moment = require('moment');

const QRSchema = new mongoose.Schema({
  name:String,
  email:String,
  paymentId:String,
  validity: Number,
  memtype:{
    type:String
  },
  validitydate: {
    type: String, // Change type to String
    default: function () {
      const validityDate = moment(Date.now()).add(this.validity, 'days');
      return validityDate.format('DD-MM-YYYY'); // Format date as dd-mm-yyyy
    }
  },
  registrationDate: {
    type: String, // Change type to String
    default: () => moment().format('DD-MM-YYYY') // Format date as dd-mm-yyyy
  },
  OTP: {
    type: String
  },
  used: {
    type: Boolean,
    default: false,
  },
  seatnumber: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false,
  },
  expirationDate: {
    type: Date,
    default: new Date('2100-01-01T12:00:00Z') // Set default to 12:00 pm, January 1, 2100
  }
});

const QR = mongoose.model('QR',QRSchema);

module.exports=QR;