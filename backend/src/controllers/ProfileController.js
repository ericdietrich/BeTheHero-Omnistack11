//Controller que mostra o profile da ongs, ou seja, todos os incidentes da ongs logada

const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents').where('ong_id', ong_id).select('*');
        
        return response.json(incidents);
    }
}