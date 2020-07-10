const express = require('express');

//variavel que armazena a aplicação
const app = express();

const routes = require('./routes');

/**CORS: Define que pode ter acesso a aplicação do backend
 *  Em produção ficaria:
 *
 *      app.use(cors{
 *          origin: http://meuapp.com               //Diz respeito ao endereço que pode acesso o backend
 *      })
 * Como está em branco no código e estamos em desenvolvimento, todas as aplicações frontend terão acesso
 */

app.use(cors()); //video 2 - 1:33:30

//Usado para que o corpo de uma requisição passado no formato JSON possa ser enviada e entendida
//O express vai no corpo da requisição e converte o JSON em um objeto de javascript, que é entendível pela aplicação
app.use(express.json());

//Precisa estar abaixo do *app.use(express.json());* Determina o uso das rotas 
app.use(routes);



//roda a aplicação na porta 3333
app.listen(3333);