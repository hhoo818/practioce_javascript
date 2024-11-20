// https://qiita.com/nakashun1129/items/c4baadf498b09601db20
const path = require('path');

module.exports={
    mode:"development",
    entry:"./ex05/index.js",
    output:{
        filename:"bundle.js",
        path:path.join(__dirname,"dist")
    }
}