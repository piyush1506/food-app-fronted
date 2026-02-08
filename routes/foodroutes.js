const express  = require('express');
const router = express.Router();
 
 const  {createFoodController,updateFoodByIdController, getAllFoodController,getFoodByrestIdController ,getFoodByIdController, deleteFoodByIdController, getResturantBydish} = require('../controller/foodcontroller')
const {authmiddleware} = require('../middlewares/authmiddleware');
const { getHomefoodController } = require('../controller/getHomefoodController');


 router.post('/create-food',authmiddleware,createFoodController)


 router.get('/get-food',authmiddleware,getAllFoodController)

 router.get('/get/:id',authmiddleware,getFoodByIdController)

 router.get('/resturant/:id',authmiddleware,getFoodByrestIdController)
router.put('/update/:id',authmiddleware,updateFoodByIdController)

router.delete('/delete/:id',authmiddleware,deleteFoodByIdController)

// order routes


router.get('/find',getResturantBydish)

router.get('/home',getHomefoodController)

 module.exports = router;