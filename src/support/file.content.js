const raw = (file, dirname)=>{
    var fs = require('fs')
    var path = require('path')
    var data = fs.readFileSync(path.join(dirname, file))

    return data
}

module.exports = raw
