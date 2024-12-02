const order = require("../model/order")

exports.createorder = async (req, res) => {
    try {
        const data = req.body
        const neworder = new order(data);
        const response = await neworder.save();
        console.log("data saved");
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getorder = async (req, res) => {
    try {
        const data = await order.find();
        console.log('data Featch');
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.updateorder = async (req , res)=>{
    try{
        const orderId = req.params.id;
        const updateorder = req.body;

        const response = await order.findByIdAndUpdate(orderId,updateorder,{
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
exports.deleteorder = async (req ,res) =>{
    try{
        const orderId = req.params.id;
        const response = await order.findByIdAndDelete(orderId)

        if(!response){
            return res.status(404).json({error:"order not found"})
        }

        console.log("data deleted");
        res.status(200).json({massege:'Data successefully deleted'})
        
    }catch(err){
        console.log(err);

        res.status(500).json({error:"Internal Server error"})
        
    }
}
