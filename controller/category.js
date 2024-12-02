const category = require("../model/category")

exports.createcategory = async (req, res) => {
    try {
        const data = req.body
        const newcategory = new category(data);
        const response = await newcategory.save();
        console.log("data saved");
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getcategory = async (req, res) => {
    try {
        const data = await category.find();
        console.log('data Featch');
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

exports.updatecategory = async (req , res)=>{
    try{
        const categoryId = req.params.id;
        const updatecategory = req.body;

        const response = await category.findByIdAndUpdate(categoryId,updatecategory,{
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
exports.deletecategory = async (req ,res) =>{
    try{
        const categoryId = req.params.id;
        const response = await category.findByIdAndDelete(categoryId)

        if(!response){
            return res.status(404).json({error:"category not found"})
        }

        console.log("data deleted");
        res.status(200).json({massege:'Data successefully deleted'})
        
    }catch(err){
        console.log(err);

        res.status(500).json({error:"Internal Server error"})
        
    }
}
