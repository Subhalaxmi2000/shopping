const express = require('express')
const { createproduct, getproduct, updateproduct, deleteproduct} = require("../controller/product")
const Product = require ('../model/product');

const router = express.Router()

router.post('/product', createproduct)
router.get("/product",getproduct)
router.put("/product/:id",updateproduct)
router.delete('/product/:id', deleteproduct)



module.exports = router