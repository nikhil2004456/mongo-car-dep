import { Schema,model } from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true,
        min:1,
        max:100
    },
    quantity: {
        type:Number,
        required: true
    },
    description:String,
    colour:String
})


export default model('Cars',userSchema)