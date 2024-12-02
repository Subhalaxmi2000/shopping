 const express = require('express')
 const { createcategory, getcategory, updatecategory, deletecategory} = require("../controller/category")
const category = require ('../model/category');

const router = express.Router()

router.post('/category', createcategory)
router.get("/category",getcategory)
router.put("/category/:id",updatecategory)
router.delete('/category/:id', deletecategory)



module.exports = router


