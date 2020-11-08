const express = require("express") 
const router = express.Router() 

router.get("/", function (request, response){
    response.status(200).send({ 
        titulo: "Projeto To-Do",
        versao: "1.0.0",
        mensagem: "Deu certo"
    })
})

module.exports = router 

