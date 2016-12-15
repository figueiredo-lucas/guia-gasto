var CryptoJS = require('crypto-js');

var generator = {
    generate: function (plength) {
        var length = plength ? plength : 8;
        var keylistalpha = "abcdefghijklmnopqrstuvwxyz";
        var keylistint = "123456789";
        var keylistspec = "!@#_";
        var temp = '';
        var len = length / 2;
        var len = len - 1;
        var lenspec = length - len - len;
        for (i = 0; i < len; i++)
            temp += keylistalpha.charAt(Math.floor(Math.random() * keylistalpha.length));
        for (i = 0; i < lenspec; i++)
            temp += keylistspec.charAt(Math.floor(Math.random() * keylistspec.length));
        for (i = 0; i < len; i++)
            temp += keylistint.charAt(Math.floor(Math.random() * keylistint.length));
        temp = temp.split('').sort(function () {
            return 0.5 - Math.random()
        }).join('');
        return temp;
    },
    generateEncrypted: function () {
        return CryptoJS.MD5(generator.generate()).toString(CryptoJS.enc.utf8);
    },
    encrypt: function (value) {
        return CryptoJS.MD5(value).toString(CryptoJS.enc.utf8);
    }
};

module.exports = generator;