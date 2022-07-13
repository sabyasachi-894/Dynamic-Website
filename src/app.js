const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require("./db/conn");
const User = require('./models/usermessage');
const port = process.env.PORT || 8000;

const staticPath = path.join(__dirname,"../public/css");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
const imagePath = path.join(__dirname,"../templates/views/images")


// app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
// app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
// app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist/jquery.js")));

app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(staticPath)); 
// app.use(express.static('views/images'));


app.get("/",(req,res) => {
    res.render("index.hbs");
})

app.post("/contact",async(req,res) => {
    try{
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }catch(error){
        res.status(500).send(error);
    }
})

app.get("*", (req,res) => {
    res.render("404error", {
        errorMsg: "Oops wrong credentials in address bar :("
    });
})

app.listen(port, () => {
    console.log(`Listening at port number ${port}`);
})