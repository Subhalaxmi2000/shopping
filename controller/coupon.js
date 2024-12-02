const coupon = require("../model/coupon")

exports.createcoupon = async (req, res) => {
    try {
        const data = req.body
        const newcoupon = new coupon(data);
        const response = await newcoupon.save();
        console.log("data saved");
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getcoupon = async (req, res) => {
    try {
        const data = await coupon.find();
        console.log('data Featch');
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.updatecoupon = async (req , res)=>{
    try{
        const couponId = req.params.id;
        const updatecoupon = req.body;

        const response = await coupon.findByIdAndUpdate(couponId,updatecoupon,{
            new:true,
            runValidators:true
        })
        if (!response){
            return res.status(404).json({error:'User not found'});
        }
        console.log('data updated');
        res.status(200).json(response)
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
}
exports.deletecoupon = async (req ,res) =>{
    try{
        const couponId = req.params.id;
        const response = await coupon.findByIdAndDelete(couponId)

        if(!response){
            return res.status(404).json({error:"coupon not found"})
        }

        console.log("data deleted");
        res.status(200).json({massege:'Data successefully deleted'})
        
    }catch(err){
        console.log(err);

        res.status(500).json({error:"Internal Server error"})
        
    }
}
