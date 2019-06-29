var rp = require('request-promise');

const api_host = 'http://127.0.0.1:5000/'

class API{
    static GET(point, callback) {
        var options = {
            method: 'GET',
            uri: api_host + point,
            body: {},
            json: true
        };
        rp(options)
            .then(function (parsedBody) {
                callback(parsedBody);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
}

export default API;