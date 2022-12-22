const initModels = require("../models/init-models");
const db = require("../models/index");
const express = require('express')
// const route=express.Router()


const models = initModels(db.sequelize);

// image Upload
// const multer = require('multer')
// const path = require('path')






// 1. create produit

const addProduit = (req,res,next)=>{
    models.produit.create({
        //  id:req.body.id,
        nom:req.body.nom,
        famille: req.body.famille, 
        photo: req.body.photo,
        description	: req.body.description,
        is_active: req.body.is_active,

        
    }).then((response)=>res.status(200).send(response))
    .catch((err)=> res.status(400).send(err))
    // create(req.body)
}






// 2. get all produit

const getAllProduits = (req,res,next)=>{
    models.produit.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=> res.status(400).send(err))   
}







// 3. get single produit

const getOneProduit =  (req,res,next)=>{
    models.produit.findOne({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=> res.status(400).send(err))
}

// 4. update produit

const updateProduit =  (req,res,next)=>{
        models.produit.update({
            nom:req.body.nom,
            description	: req.body.description	,
            photo: req.body.photo,
            is_active: req.body.is_active,
            famille: req.body.famille,
        },{where:{id:req.params.id}})
        .then((response)=>res.status(200).send({'message': 'produit modifie '} ))
        .catch((err)=> res.status(400).send(err))
    }
    
   
// 5. delete produit by id

const deleteProduit = (req,res,next)=>{
    models.produit.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=> res.status(400).send(err))
}


// 8. Upload Image Controller

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: '1000000' },
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png|gif/
//         const mimeType = fileTypes.test(file.mimetype)  
//         const extname = fileTypes.test(path.extname(file.originalname))

//         if(mimeType && extname) {
//             return cb(null, true)
//         }
//         cb('Give proper files formate to upload')
//     }
// }).single('image')









module.exports = {
     addProduit,
     getAllProduits,
     getOneProduit,
     updateProduit,
     deleteProduit,
    
  
    
}