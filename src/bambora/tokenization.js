var request = require('request')

var tokenization = (data, callback)=>{
    var tokenization = {
        url: 'https://www.beanstream.com/scripts/tokenization/tokens',
        body: JSON.stringify(data)
    }
    request.post(tokenization, function(err, resp, body) {
        callback(JSON.parse(body).token)
    })
}

module.exports = tokenization
