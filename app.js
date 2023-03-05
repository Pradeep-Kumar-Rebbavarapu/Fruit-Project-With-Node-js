import express from 'express'
import bodyParser from 'body-parser'
import https from 'https'
import mongoose from 'mongoose'
const url = "mongodb://0.0.0.0:27017/"
const dbName = "fruitDB"
mongoose.connect(url + dbName,{useNewUrlParser: true})

const fruitSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Check Your Data Entry No Name Specified"]
    },
    rating:{
        type:Number,
        min:1,
        max:10
    },
    review:String,
})


const Fruit = mongoose.model("Fruits",fruitSchema);

const fruit = new Fruit({
    name:"apple",
    rating :8,
    review:"Pretty solid as a fruit"
})
// fruit.save()
const banana = new Fruit({
    name:"banana",
    rating:7,
    review:"Its Just A banana"
})
const kiwi = new Fruit({
    name:"kiwi",
    rating:9,
    review:"Just a Kiwi"
})
// Fruit.insertMany([banana,kiwi])
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get('/',async (req,res)=>{
    try{
        const AllFruits = await Fruit.find({})
        res.render('index.ejs',{AllFruits:AllFruits})
    }
    catch(error){
        console.log(error)
        res.sendFile('Error occured')
    }
    
})


app.post('/DeleteFruits',async (req,res)=>{
    try{
        
        await Fruit.deleteOne({_id:req.body.DeleteId})
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
})

app.post('/UpdateFruits',async (req,res)=>{
    try{
        
        await Fruit.UpdateOne({_id:req.body.DeleteId})
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
})


app.post('/AddFruits',(req,res)=>{
    try{
        
        const fruit = new Fruit(req.body)
        fruit.save()
        res.redirect('/')
    }
    catch(err){

    }
})
app.listen(3000,()=>{
    console.log('server started')
})