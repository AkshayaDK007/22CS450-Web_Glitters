const express=require('express')

const {createrecipe,getrecipes,getsinglerecipe,deleterecipe,updaterecipe, searchRecipeByName} =require("../controllers/recipecontroller")

const router=express.Router()

router.get('/',getrecipes)

router.get('/:id',getsinglerecipe)

router.get('/search/:name', searchRecipeByName);

router.post('/',createrecipe)

router.delete('/:id',deleterecipe)

router.put('/:id',updaterecipe)


module.exports=router