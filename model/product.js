const mongoose = require ('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true

    },
    image:{
        type:String,
        default:''  
    }, 
    price:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    // subCategory:[{
    //     // type:mongoose.Schema.Types.ObjectId,
    //     // ref:'Category',
    //     type:String,
    //     required:true
    // }],
    rating:{
        type:Number,
        default:0
    },
    
})
// productSchema.virtual('id').get(function(){
//     return this._id.toHexString();
// });

// productSchema.set('toJSON',{
//     virtuals:true,

//create product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;