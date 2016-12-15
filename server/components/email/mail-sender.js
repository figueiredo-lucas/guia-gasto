var _ = require('lodash');
var Mailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport')



var transporter = Mailer.createTransport(mg({
    auth: {
        api_key: 'key-17c7a105c8f16d6b808c3f12ac3873d0',
        domain: 'sandboxe2052da7cc8c4b87a4eed2b0c10ca9f8.mailgun.org'
    }
}));

var newRegistration = {
    from: '"cliniq" <postmaster@sandboxe2052da7cc8c4b87a4eed2b0c10ca9f8.mailgun.org>',
    subject: 'Envio de senha temporária de acesso',
    html: [
        'Prezado(a) <b>${nomeCompleto}</b>.<br>',
        'Seu cadastro foi realizado no sistema cliniq.<br>',
        'Suas informações de acesso são:<br><br>',
        'Login: <b>${login}</b><br>',
        'Senha: <b>${senha}</b><br><br>',
        'Esta senha é temporária e </b>deverá ser alterada no primeiro acesso.<br><br>',
        'Mensagem enviada automaticamente e não deve ser respondida.<br><br>',
        'Atenciosamente,<br>',
        'Equipe cliniq'
    ].join(' ')
};

var lostPassword = {
    from: '"cliniq" <postmaster@sandboxe2052da7cc8c4b87a4eed2b0c10ca9f8.mailgun.org>',
    subject: 'Envio de senha temporária de acesso',
    html: [
        'Prezado(a) <b>${nomeCompleto}</b>.<br>',
        'Foi solicitado uma nova senha.<br>',
        'Suas informações de acesso são:<br>',
        'Login: ${login}<br>',
        'Senha: ${senha}<br>',
        'Esta senha é temporária e deverá ser alterada no próximo acesso.<br><br>',
        'Mensagem enviada automaticamente e não deve ser respondida.<br><br>',
        'Atenciosamente,<br>',
        'Equipe cliniq'
    ].join(' ')
};

var send = function(config) {
    transporter.sendMail(config, function(error, info) {
        if (error) {
            return console.log(error);
        }
    });
};

var completeMailConfig = function(user, config) {
    config.to = user.email;
    config.html = config.html
        .replace('${nomeCompleto}', user.nomeCompleto)
        .replace('${login}', user.login)
        .replace('${senha}', user.senha);
};

var mailSender = {
    newUser: function(user) {
        completeMailConfig(user, newRegistration);
        return send(newRegistration);
    },
    lostPassword: function(user) {
        completeMailConfig(user, lostPassword);
        return send(lostPassword);
    },
    send: function(config) {
        send(config);
    }
};

module.exports = mailSender;