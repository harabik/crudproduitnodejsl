// import controllers produit
const produitController = require('../controllers/produitControllers.js')

// router
const express = require('express')
const route=express.Router()





// produit router
    
route.post('/createProduit' , produitController.addProduit)

route.get('/', produitController.getAllProduits )

route.get('/:id', produitController.getOneProduit )

route.put('/updateproduit/:id', produitController.updateProduit)

route.delete('/deleteproduit/:id', produitController.deleteProduit)










module.exports=route; 