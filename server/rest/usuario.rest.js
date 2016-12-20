'use strict';

var Usuario = require('./models/usuario.model');
var encrypt = require('./../components/encrypt')

module.exports = function(config) {

    var router = require('./')(config);

    router.post('/login', function(req, res) {
        var usrReq = req.body;
        Usuario.find({ login: usrReq.login }, function(err, usuarios) {
            if (usuarios.length > 0) {
                var usr = usuarios[0];
                if (usr.senha === encrypt(usrReq.senha)) {
                    usr.senha = undefined;
                    return res.status(200).json(usr);
                }
                return res.status(400).send('Senha inválida.');
            }
            return res.status(400).send('Usuário inválido.');
        });
    });

    return router;

};