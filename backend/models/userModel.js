import mongoose from 'mongoose';

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

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    usertype:{
        type:String,
        default:"standard",
    }
});
const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    poster: { type: String, required: true },
    description: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    genre: { type: String, required: true },
  });

const QR = mongoose.model('QR',QRSchema);
const User = mongoose.model('User',UserSchema);
const Movie = mongoose.model('Movie',MovieSchema);

export { User, Movie };
export default QR;
