const mongoose = require("mongoose");
const { Schema } = mongoose;

const busSchema = new Schema({
 lisceneplate:{
    type:Number,
    required:true,
 },
 departurecity:{
    type:String,
    required:true,
 },
 destinationcity:{
    type:String,
    required:true,
 },
 seats:{
    type:Number,
    required:true,
 },
 bookedseats:{
    type:Number,
    default:0,
 },
 catagory:{
    type:String,
    required:true,
    default:"silver",
 },
 ticketprice:{
    type:Number,
    required:true,
 },
 departuretime:{
   type:Number,
   required:true,
 },
 departuredate:{
   type:Date,
   required:true,
 },
 
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
