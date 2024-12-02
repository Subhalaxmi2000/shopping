const mongoose = require ('mongoose');
const couponSchema = mongoose.Schema({
    coupon_code:{
        type:String,
        unique:true,
        required:true

    },
    description:{
        type:String,
        required:true
    },
    discountType:{
       type:String,
       enum:['percentage', 'fixed'],
       required:true
    },
    discountValue:{
        type:Number,
        required:true
        
    },
    min_purchase:{
        type:Number,
        default:0
        
    },
    applicableCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
      }],
      applicableProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
      }],
    validFrom:{
        type:Date,
        default:0,
        required:true
    },
    validUntil:{
        type:Date,
        default:0,
        required:true
    },
    usage_limit:{
        type:Number,
        required:true
    },
    used_limit:{
        type:Number,
        required:true
    },
    user_limit:{
        type:Number,
        required:true
    },
    is_active:{
        type:Boolean,
        required:true
    }
    

    
},{ timestamps: true });

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;