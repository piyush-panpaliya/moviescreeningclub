const mongoose=require('mongoose');

const QRSchema = new mongoose.Schema({
    email:String,
    paymentId:String,
    validity: Number,
    registrationDate: {
        type: Date,
        default: function () {
          return new Date(Date.now() + this.validity * 24 * 60 * 60 * 1000);
        },
      },
    used:{
        type:Boolean,
        default:false,
    }
});

const QR = mongoose.model('QR',QRSchema);

module.exports = QR;