const mongoose=require('mongoose')

const Schema=mongoose.Schema

const Attendanceschema=new Schema({
    Name:{
        type:String,
        required: true
    },
    Staff:{
        type:String,
        required: true
    },
    
    PresentStatus:{
        type:String,
        required: true
    },

    ClassHour:{
        type:Number,
        required: true
    }
},
{
    timestamps: true
}
)

module.exports=mongoose.model('Attendance',Attendanceschema) 

