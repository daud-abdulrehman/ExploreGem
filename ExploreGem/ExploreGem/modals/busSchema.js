const mongoose = require("mongoose");
const { Schema } = mongoose;

const busSchema = new Schema({
 lisceneplate:{
    type:Number,
    required:true,
 },
 source:{
    type:String,
    required:true,
 },
 destination:{
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
 price:{
    type:Number,
    required:true,
 }
});

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;
