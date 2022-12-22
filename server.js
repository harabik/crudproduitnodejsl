
const express = require ("express")
const app = express()
const db=require("./models/index")


var cors = require('cors');
app.use(cors());

const path = require('path');
const cookieParser = require('cookie-parser');
const myParser = require("body-parser");






const hbs = require('hbs');
hbs.registerHelper("equal", require("handlebars-helper-equal"));
app.set('view engine', 'hbs');

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
//Parse url encoded bodies like sent by html form
app.use(myParser.urlencoded({extended: false}));
// Cookie parser
app.use(cookieParser());
//Parse json bodies like sent by api request
app.use(myParser.json({extended: true}));


const produitsRoutes = require ('./routes/produitrouter')





/******** routes **********/

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/produits',produitsRoutes)


db.sequelize.sync().then(()=>{
   app.listen(3000,()=>console.log("server listening in port 3000 "))
})




