const mongoose=require('mongoose');
const moment = require('moment');

const QRSchema = new mongoose.Schema({
  email:String,
  paymentId:String,
  validity: Number,
  memtype:{
    type:String
    },
  /*validitydate: {
    type: Date,
    default: function () {
      return new Date(Date.now() + this.validity * 24 * 60 * 60 * 1000);
      },
    },
  registrationDate:{
    type: Date,
    default: Date.now()
    },
  used:{
    type:Boolean,
    default:false,
  }
}*/
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
used: {
  type: Boolean,
  default: false,
}
}

);

const QR = mongoose.model('QR',QRSchema);

module.exports=QR;