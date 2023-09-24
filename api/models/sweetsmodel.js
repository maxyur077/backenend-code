const mongoose=require('mongoose')


const sweetsSchema=new mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
name:String,
Price:Number,

CompanyName:String,
ManfactureDate:String

},{timestamps:true})


module.exports=mongoose.model('sweets',sweetsSchema)