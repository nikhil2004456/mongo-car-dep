import express from 'express'
import cors from 'cors'
import { dbConnect } from './lib/db.js'
import carsModel from './model/carsModel.js'

dbConnect()

const app = express()

app.use(cors({
    origin: "http://localhost:5173",  // React app ka origin yaha likho
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json())

app.get('/', async (req, res) => {
    const allCars = await carsModel.find({}); // ✅ Sare cars le raha
    res.json(allCars);  // ✅ Proper JSON response
});


app.post('/', async (req,res) => {
    const {name,price,quantity,description,colour} = req.body
    const carData = await carsModel.create(req.body)
//    const obj = req.body;
//     DataBase.push(obj)
//     fs.writeFileSync('db.js',`export const DataBase = ${JSON.stringify(DataBase,null,2)}`)
    res.send({msg: carData})
})

app.delete('/:id' , async(req,res) => {
    await carsModel.findByIdAndDelete(req.params.id)
    res.send({msg: "data deleted succ!"})
    // console.log(req.params.id)
    // DataBase.splice(Number(req.params.id),1)
    // console.log(DataBase)
    // fs.writeFileSync('db.js',`export const DataBase = ${JSON.stringify(DataBase,null,2)}`)
})

app.put('/:productId' , async(req,res) => {
    const { colour, description, quantity, price, name } = req.body
    await carsModel.findByIdAndUpdate(req.params.productId, { colour, description, quantity, price, name })    
    // console.log(req.params.id,req.body)
    // DataBase.splice(Number(req.params.id),1,req.body)
    // console.log(DataBase)
    // fs.writeFileSync('db.js',`export const DataBase = ${JSON.stringify(DataBase,null,2)}`)
    res.send({msg:"Data Updated"})
})


app.listen('8000',()=> {
    console.log("server is running")
})