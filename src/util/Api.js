var rp = require('request-promise');

const api_host = 'http://10.70.0.125:5000/'

class API{
    static GET(point, callback, qs={}) {
        var options = {
            method: 'GET',
            uri: api_host + point,
            json: true,
            qs: qs
        };
        rp(options)
            .then(function (parsedBody) {
                callback(parsedBody);
            })
            .catch(function (err) {
                console.log(err);
                alert(err);
            });
    }

    static POST(point, callback, data) {
        var options = {
            method: 'POST',
            uri: api_host + point,
            form: data,
            json: true
        };
        rp(options)
            .then(function (parsedBody) {
                callback(parsedBody);
            })
            .catch(function (err) {
                console.log(err);
                alert(err);
            });
    }

    static PATCH(point, callback, data) {
        var options = {
            method: 'PATCH',
            uri: api_host + point,
            form: data,
            json: true
        };
        rp(options)
            .then(function (parsedBody) {
                callback(parsedBody);
            })
            .catch(function (err) {
                console.log(err);
                alert(err);
            });
    }

    static DELETE(point, callback, data) {
        var options = {
            method: 'DELETE',
            uri: api_host + point,
            form: data,
            json: true
        };
        rp(options)
            .then(function (parsedBody) {
                callback(parsedBody);
            })
            .catch(function (err) {
                console.log(err);
                alert(err);
            });
    }
}

export default API;