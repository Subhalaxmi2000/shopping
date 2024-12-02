const express = require('express')
const { createorder, getorder, updateorder, deleteorder} = require("../controller/order")
const order = require ('../model/order');

const router = express.Router()

router.post('/order', createorder)
router.get("/order",getorder)
router.put("/order/:id",updateorder)
router.delete('/order/:id', deleteorder)



module.exports = router

