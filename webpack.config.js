module.exports = {
    output: {
        filename: 'bundle.js',
    },

    mode: "development",
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: [
                    ["@babel/preset-env", {
                        "targets": {
                            "node": "current"
                        }
                    }],
                ],
            },
        }, ],
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    }
}