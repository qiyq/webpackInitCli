const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let currentEnv = (process.env.NODE_ENV === 'development');

// 使用 WEBPACK_SERVE 环境变量检测当前是否是在 webpack-server 启动的开发环境中
module.exports = {
    mode: 'development',//开发模式
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"), //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        compress: true,//启用gzip压缩
        inline: true,
        watchOptions: {
            aggregateTimeout: 100,//浏览器延迟多少秒更新
            poll: 100//每秒检查一次变动
        },
        overlay: true,//显示错误
        open: true,
        hot: true//启用 webpack 的模块热替换
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src/assets/style'),
                use: currentEnv ? [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')({
                                        browsers: ['last 15 versions']
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {sourceMap: true}
                        },
                    ] :
                    ExtractTextPlugin.extract({
                        use: [{
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')({
                                        browsers: ['last 15 versions']
                                    })
                                ]
                            }
                        }, {loader: 'less-loader'}],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
            },
            {
                test: /\.css$/,//加载css
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    browsers: ['last 15 versions']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /(\.js)$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
                use:
                    {
                        loader: "babel-loader"
                    }
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: 'none'
        }),
        new CleanWebpackPlugin(),
        new ExtractTextPlugin('style.[hash].css'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]

};
