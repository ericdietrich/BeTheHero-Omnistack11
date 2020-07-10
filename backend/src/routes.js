//Esse arquivo contém todas as rotas da aplicação
//Foi tirado do arquivo index.js, para que os rotas fiquem organizadas em um arquivo destinado apenas para rotas

const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

//O método de rotas está sendo desacoplado do express e colocado em um nova variável:
const routes = express.Router();



routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

//Session: o método post é usado pq uma sessão está sendo criada, mesmo que nenhum dado esteja sendo armazenado como geralmente é usado o post
routes.post('/sessions', SessionController.create);

//Forma usada para exportar uma variável de um arquivo para outro
//No outro arquivo utilizo um require ('./routes')
module.exports = routes;