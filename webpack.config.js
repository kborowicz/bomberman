
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const config = {
    mode: isProduction ? 'production' : 'development',
    entry: {
        main: path.resolve(__dirname, 'src/index.ts')
    },
    output: {
        path: path.resolve(__dirname, 'dest'),
        filename: `[name]${isProduction ? '.[contenthash]' : ''}.js`,
        pathinfo: false,
        publicPath: './'
    },
    target: ['web', 'es2020'],
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0
        }
    },
    devtool: isProduction ? false : 'source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-modules-typescript-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: isProduction ? '[hash:base64:5]' : '[name]_[local]__[hash:base64:5]'
                            }
                        }
                    },
                    { loader: 'sass-loader' },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader' },
                ]
            },
            {
                test: /\.(woff2?|otf|eot|png|jpg|gif|mp3)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: `${isProduction ? '[contenthash]' : '[name]'}.[ext]`
                }
            },
            {
                test: /\.svg$/,
                use: [
                    'babel-loader',
                    { loader: 'svg-inline-loader' }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            configFile: path.resolve(__dirname, 'tsconfig.json')
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(txt|sql|md|glsl)$/,
                use: 'raw-loader',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${isProduction ? '[contenthash]' : '[name]'}.css`,
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            },
            inject: 'body',
            isBrowser: false,
            env: process.env.NODE_ENV,
            isDevelopment: !isProduction,
        })
    ],
    resolve: {
        alias: require('./webpack.alias'),
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json', '.scss']
    }
};

module.exports = config;