const express = require('express')
const { createcoupon, getcoupon, updatecoupon, deletecoupon} = require("../controller/coupon")
const Coupon = require ('../model/coupon');

const router = express.Router()

router.post('/coupon', createcoupon)
router.get("/coupon",getcoupon)
router.put("/coupon/:id",updatecoupon)
router.delete('/coupon/:id', deletecoupon)



module.exports = router