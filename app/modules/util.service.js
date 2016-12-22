angular.module('guiaGasto').factory('UtilService',
    function() {
        return {
            parseQueryString: function(obj) {
                var queryString = "";
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        queryString += key + "=" + obj[key] + "&";
                    }
                }
                return queryString;
            }
        }
    }
);