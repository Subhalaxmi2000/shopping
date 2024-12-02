// const User = require('../model/user');
// const bcrypt = require('bcrypt')
// exports.createUser = async(req,res)=>{
    // const data = req.body        //Assuming  the  request body contains user data 
    // // Create  a new user document using the mongoose model 
    // const newUser  = new User(data);
    // // newUser.name = data.name;
    // // newUser.age = data.age;
    // // newUser.mobile = data.mobile;
    // // newUser.email = data.email;
    // // newUser.address = data.address
    // newUser.save((error,saveduser) => {
    //     if(error){
    //         console.log(error);
    //         res.status(500).json({error: 'Internal Serever Error'})
    //     }else{
    //         console.log('data saved succesfully');
    //         res.status(200).json(saveduser);
    //     }
    // })

//     try{
//          const data = req.body        //Assuming  the  request body contains user data 
//     // Create  a new user document using the mongoose model 
//     const saltRound = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(data.password , saltRound)

//     const newUser  = new User({
//         ...data,
//         password:hashedPassword,   // use hashed password
//     });
//   const response = await newUser.save()
//    console.log('data saved');
//    res.status(200).json(response)
//     }catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal Server Error'});
    
//     }

// }

const bcrypt = require('bcrypt');
const User = require('../model/user');  // Assuming User is your model
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const { password, ...data } = req.body;  // Extract password from request body

    // Ensure the password is provided and is a string
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Password must be a non-empty string' });
    }

    // Generate salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user with the hashed password
    const newUser = new User({
      ...data,  // Spread other data
      password: hashedPassword,  // Use hashed password
    });

    // Save the user to the database
    const response = await newUser.save();
    console.log('Data saved');
    res.status(200).json(response);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.login = async(req,res) =>{
  const {email,password} = req.body;
  try {
      const user = await User.findOne({email});
      if(!user){
          return res.status(404).json({error: 'User not found'})

      }
      const isMatch = await bcrypt.compare(password , user.password);
      if(!isMatch){
          return res.status(404).json({error: 'Password is wrong'});
      }
      const token = jwt.sign({userId: user._id,username:user.username,email:user.email},'test12345',{
          expiresIn:'24h'
      });
      res.status(200).json({message:'Login succesfull ',
          token,
          user
      })
  } catch (err) {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
}
exports.getUser = async(req,res)=>{
    try{
      const data = await  User.find();
      console.log('data fetched');
     res.status(200).json(data)
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  }

exports.getUserByWork = async(req,res)=>{
    try{
      const workType = req.params.workType;
      if(workType =='chef' || workType == 'manager' || workType == 'waiter'){
        const response = await User.find({work:workType});
        console.log('response fetched');
        res.status(200).json(response);
        
      }else{
        res.status(404).json({errors: 'Invalid work Type'})
      }
    }catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  }

  exports.updateUser = async(req,res)=>{
    try{
       const userId=  req.params.id;
       const updatedUser = req.body;

       const responses = await User.findByIdAndUpdate(userId , updatedUser)
       if(!responses){
        return res.status(404).json({error: 'User not found'});
       }
       console.log('data updated');
       res.status(200).json(responses);
       

    }catch(err){
        console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
    }
}

exports.deleteUser = async(req,res) => {
    try {
    const userId=  req.params.id;
    const responses  = await User.findByIdAndDelete(userId);
    if(!responses){
        return res.status(404).json({error: 'User not found'});
       }
       console.log('data deleted');
       res.status(200).json({message: 'User deleted succesfully'})
       
    } catch (error) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
};
