'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: './src/nofb.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'project.bundle.js'
    },

    module: {
        rules: [
            {
                test: [/\.vert$/, /\.frag$/],
                use: 'raw-loader',
                include: path.resolve(__dirname, 'src')
            },
            {
                test: [/\.(png|svg|jpg|txt|mp3|m4a|ogg)$/],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'assets/',
                        outputPath: 'assets/'
                    },
                }
            }
        ]
    },
    optimization: {
        // We no not want to minimize our code.
        minimize: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ]


};
