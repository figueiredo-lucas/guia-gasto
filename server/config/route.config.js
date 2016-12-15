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
    // MARCA: {
    //     model: 'marca',
    //     route: '/rest/marcas'
    // },
    // PRODUTO: {
    //     model: 'produto',
    //     validator: require('./../rest/validators/produto'),
    //     route: '/rest/produtos',
    //     rest: './rest/produto.rest'
    // },
    MOVIMENTO: {
        model: 'movimento',
        validator: require('./../rest/validators/movimento'),
        route: '/rest/movimentos'
    },
    USUARIO: {
        model: 'usuario',
        validator: require('./../rest/validators/usuario'),
        route: '/rest/usuarios'
    }
}