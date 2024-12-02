const express = require('express')
const app = express()
const mongoose = require('mongoose');

const User = require('./model/user');

const Product = require('./model/product');
const Coupon = require('./model/coupon');

const category = require('./model/category');

const order = require('./model/order');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})



const productRouter = require ('./router/productRouter');
app.use('/api', productRouter)


const userRouter = require ('./router/userRouter');
app.use('/api', userRouter)

// const subCategoryRouter = require ('./router/subCategoryRouter');
// app.use('/api', subCategoryRouter)



const categoryRouter = require ('./router/categoryRouter');
app.use('/api', categoryRouter)


const orderRouter = require ('./router/orderRouter');
app.use('/api', orderRouter)


const couponRouter = require ('./router/couponRouter');
app.use('/api', couponRouter)

const mongoURL = 'mongodb+srv://dassubhalaxmi090:manager@cluster0.9qt99.mongodb.net/'
mongoose.connect(mongoURL, {

}).then(() => console.log('connected!'))
  .catch(err => console.error(err));




app.listen(3003,
  () => {
    console.log("server is running on port 3003");

  }
)






