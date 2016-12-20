module.exports = {
    // FORNECEDOR: {
    //     model: 'pessoa',
    //     validator: require('./../rest/validators/fornecedor'),
    //     route: '/rest/fornecedores'
    // },
    SALDO: {
        model: 'saldo',
        route: '/rest/saldos',
        rest: './rest/saldo.rest'
    },
    FOLHA: {
        model: 'folha',
        route: '/rest/folhas',
        rest: './rest/folha.rest'
    },
    MOVIMENTO: {
        model: 'movimento',
        validator: require('./../rest/validators/movimento'),
        route: '/rest/movimentos',
        rest: './rest/movimento.rest'
    },
    USUARIO: {
        model: 'usuario',
        validator: require('./../rest/validators/usuario'),
        route: '/rest/usuarios',
        rest: './rest/usuario.rest'
    }
}