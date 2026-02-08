const express = require('express');
const router = express.Router();

const {authmiddleware} = require('../middlewares/authmiddleware');
const {adminmiddleware} = require('../middlewares/adminmiddlware')
const { getCartdetails,updateOrederStausConroller,createorderController } = require('../controller/ordercontroller');



router.put('/updatestatus/:id',authmiddleware,adminmiddleware,updateOrederStausConroller)
router.get('/cartdetails',authmiddleware,getCartdetails)
router.post('/createorder',authmiddleware,createorderController)

module.exports = router