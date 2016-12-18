module.exports = {
    // FORNECEDOR: {
    //     model: 'pessoa',
    //     validator: require('./../rest/validators/fornecedor'),
    //     route: '/rest/fornecedores'
    // },
    // CLIENTE: {
    //     model: 'pessoa',
    //     validator: require('./../rest/validators/cliente'),
    //     route: '/rest/clientes'
    // },
    FOLHA: {
        model: 'folha',
        route: '/rest/folhas',
        rest: './rest/folha.rest'
    },
    MOVIMENTO: {
        model: 'movimento',
        validator: require('./../rest/validators/movimento'),
        route: '/rest/movimentos'
    },
    USUARIO: {
        model: 'usuario',
        validator: require('./../rest/validators/usuario'),
        route: '/rest/usuarios',
        rest: './rest/usuario.rest'
    }
}