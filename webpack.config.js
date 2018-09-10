const path = require('path');

module.exports = {
    entry: './graph.js',
    output: {
        filename: 'newchart.js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        net: "empty",
        fs: "empty",
        tls: "empty"
    }
};
