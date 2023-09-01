const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  description:{
    type:String,
    required:true,
  },
  imageUrl:{
    type: String,
    default: "",
  },
  bedtype:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    reuired:true,
  }
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
