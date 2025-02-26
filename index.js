const express = require('express');
const { resolve } = require('path');
const mongoose  = require("mongoose")
const Menu = require("./schema")
require("dotenv").config()

const app = express();
const port = 3010;
mongoose.connect(process.env.DB_URL).then(()=>{console.log("Connected database")}).catch(e=>console.log("Not Connected"))


app.use(express.static('static'));
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
  
});

app.put("/menu/:id",async (req,res)=>{
  const id = req.params.id
  const {name,description,price} = req.body
  try{
    const menuItem = await Menu.findByIdAndUpdate(id,{name:name,description:description,price:price});
    return res.status(201).json({"menuItem":menuItem})
  }catch(e){
    return res.status(400),json({"message":e})
  }

})

app.delete("/menu/:id",async (req,res)=>{
  const id = req.params.id
  const menuItem = await Menu.findByIdAndDelete(id);
  const data = await Menu.find()
  try{
    return res.status(201).json({"menuItem":data})
  }catch(e){
    return res.status(400),json({"message":e})

  }

  
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
