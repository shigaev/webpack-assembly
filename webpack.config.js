const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
    resolve: {
        extensions: ['.css', '.scss', '.sass', '.js', '.jpg', '.png', '.svg', '.ico', '.json'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models')
        }
    },
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        info: './info.js'
    },
    devServer: {
        port: 9000,
        hot: true,
        watchFiles: ['src/**/*.html', 'src/**/*.css', 'src/**/*.scss'],
    },
    output: {
        filename: './js/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    // devtool: 'inline-source-map',
    optimization: {
        runtimeChunk: 'single',
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: './index.html',
            template: './index.html',
            inject: 'body',
            favicon: 'assets/favicon.ico'
        }),
        new HTMLWebpackPlugin({
            filename: './about.html',
            template: './about.html',
            inject: 'body',
            favicon: 'assets/favicon.ico'
        }),
        /* new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/assets/favicon.ico'), to: path.resolve(__dirname, 'dist') },
            ],
        }), */
        new MiniCssExtractPlugin({
            filename: './css/[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader'
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash][ext][query]'
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                },
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.xlsx$/,
                use: "webpack-xlsx-loader"
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
};