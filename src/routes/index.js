const express = require("express") // chama o express
const router = express.Router() // executa funcao router

router.get("/", function(request, response) { // usa o verbo get como rota
    response.status(200).send ({ //manda 200 e envia um objeto
        titulo: "Projeto ToDo turma ON-9",
        versao: "1.0.0",
        desc: "dudinha eh linda"
    })

})

module.exports = router // exporta as rotas criadas 