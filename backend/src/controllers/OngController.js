// video 2 - 1:01:42
//Esses arquivos da pasta controllers deixam o arquivo routes mais limpo, as inserções, consultas e exclusões ficam a parte

//Pacote crypto que vem dentro do node video 2: 54:30
//Controller que implementa a criação de nova ong
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    }, 


    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });
        }
}