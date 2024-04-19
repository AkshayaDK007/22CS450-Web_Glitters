const mongoose=require('mongoose')

const Schema=mongoose.Schema

const recipeSchema=new Schema({
    Name:{
        type:String,
        required: true
    },
    Author:{
        type:String,
        required: true
    },
    Description:{
        type:String,
        required: true
    },
    Rating:{
        type:Number,
        required: false
    },
    MaxTime:{
        type:String,
        required: true
    },
},
{
    timestamps: true
}
)

module.exports=mongoose.model('Recipe',recipeSchema) //recipe is the name of the model

