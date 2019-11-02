const webpack = require('webpack');

let path = require('path');
let glob = require('glob');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: getEntries(),
    output: {
        path: path.resolve(__dirname, "./deploy"),
        filename: '[name]/bundle.js',
        chunkFilename: '[name]/bundle.js'
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "vue"),
        ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: {
                    test: path.resolve(__dirname, 'node_modules')
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: getHtmlWebpackPlugin(),
    devServer: {
        port: 9090
    }
};

function getEntries() {
    let entryPathList = glob.sync('./vue/**/entry.js');
    let entry = {};

    for (let index in entryPathList) {
        let configPath = entryPathList[index];
        let parentPath = configPath.substring(0, configPath.lastIndexOf("/"));

        entry[parentPath] = configPath;
    }

    return entry;
}

function getHtmlWebpackPlugin() {
    let entryPathList = glob.sync('./vue/**/entry.js');
    let plugins = [];

    for (let index in entryPathList) {
        let configPath = entryPathList[index];
        let parentPath = configPath.substring(0, configPath.lastIndexOf("/"));

        plugins.push(new HtmlWebpackPlugin({
            filename: parentPath + '/index.html',
            template: './index.html',
            templateParameters: {
                'bundlePath': ''
            },
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunks: [parentPath]
        }));
    }

    return plugins;
}