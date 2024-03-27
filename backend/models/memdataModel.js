const mongoose=require('mongoose');

const MemdataSchema = new mongoose.Schema({
    email:String,
    memtype:String,
    validity: Number,
    purchasedate:{
        type: Date,
        default: Date.now()},
    validitydate: {
        type: Date,
        default: function () {
          return new Date(Date.now() + this.validity * 24 * 60 * 60 * 1000);
          },
        }
});

const Memdata = mongoose.model('Memdata',MemdataSchema);

module.exports=Memdata;