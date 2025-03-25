import { connect } from "mongoose";

export const dbConnect = async () => {
    try {
        await connect('mongodb+srv://nik:123@cluster0.tipkz.mongodb.net/car?retryWrites=true&w=majority&appName=Cluster0')
        // await connect('mongodb://localhost:27017/car')
        console.log('db connected succ');
    } catch (error) {
        console.log(error.message);
    }
}