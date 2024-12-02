const product= require("../model/product")

exports.createproduct= async (req, res) => {
    try {
        const data = req.body
        const newproduct= new product(data);
        const response = await newproduct.save();
        console.log("data saved");
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getproduct= async (req, res) => {
    try {
        const data = await product.find();
        console.log('data Featch');
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.updateproduct= async (req , res)=>{
    try{
        const productId = req.params.id;
        const updateproduct= req.body;

        const response = await product.findByIdAndUpdate(productId,updateproduct,{
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
exports.deleteproduct= async (req ,res) =>{
    try{
        const productId = req.params.id;
        const response = await product.findByIdAndDelete(productId)

        if(!response){
            return res.status(404).json({error:"productnot found"})
        }

        console.log("data deleted");
        res.status(200).json({massege:'Data successefully deleted'})
        
    }catch(err){
        console.log(err);

        res.status(500).json({error:"Internal Server error"})
        
    }
}
