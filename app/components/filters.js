angular.module('guiaGasto').filter('telefone', function() {
    return function(input) {
        if (input) {
            return '(' + input.substring(0, 2) + ') ' + input.substring(2, 6) + '-' + input.substring(6);
        }
    };
}).filter('cpfcnpj', function() {
    return function(input) {
        if (input) {
            if (input.length === 11) {
                return 'CPF: ' + input.substring(0, 3) + '.' + input.substring(3, 6) + '.' + input.substring(6, 9) + '-' + input.substring(9);
            }
            return 'CNPJ: ' + input.substring(0, 3) + '.' + input.substring(3, 6) + '.' + input.substring(6, 9) + '/' + input.substring(9, 13) + '-' + input.substring(13);
        }
    };
});