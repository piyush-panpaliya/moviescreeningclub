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
});

const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
});

const VolunteerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
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
const Volunteer = mongoose.model('Volunteer',VolunteerSchema);
const Admin = mongoose.model('Admin',AdminSchema);
const Movie = mongoose.model('Movie',MovieSchema);

<<<<<<< HEAD:backend/userModel.js
export { User, Volunteer, Admin, Movie };
export default QR;
=======

// export { User, Volunteer, Admin };
module.exports=User;
// module.exports=Volunteer;
// module.exports=Admin;
// module.exports=QR;
>>>>>>> 883805f4ffd36d77141cbb21334889398b68fc58:backend/models/userModel.js
