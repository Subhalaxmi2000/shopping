const mongoose = require ('mongoose');
const orderSchema = mongoose.Schema({
      name:{
        type:String,
        required:true,
      },
      address:{
        type:String,
        required:true,
      },
      phone_no:{
        type:Number,
        required:true
      },
      price:{
        type:Number,
        required:true
      },
      product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
      },
       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
      },
      orderdate:{
        type:Number,
        required:true,
        default:Date.now
      }
      
       

})
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;