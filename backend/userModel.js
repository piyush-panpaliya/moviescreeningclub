import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:String,
    paymentId:String,
    Qr:String,
});

const User = mongoose.model('User',userSchema);
export default User