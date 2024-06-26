const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',

    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        publicPath: '/'
    },

    devtool: 'inline-source-map',
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true,
        inline: true,//do not use iframe for the page, true is default
        //open: 'google chrome',//open browser after dev server starts
        openPage: '',
        port: 8088,//80 endpoint2
        proxy: {
            '/': {
                target: 'http://172.29.7.126:8080',
                bypass: function (req, res, proxyOptions) {
                   // console.log(req.headers.host);23
                    if (req.headers.host === 'console.local.mryqr.com:8088') {
                        console.log(req.headers.host);
                        return '/console-index.html';
                    }else if (req.headers.host === 'm.local.mryqr.com:8088') {
                        console.log(req.headers.host);
                        return '/client-index.html';
                    }else{
                        console.log(req.headers.host);
                    }

                },
            },
        },
        hot: true,
        host: '0.0.0.0'
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    'vue-style-loader',
                ]
            },

            {
                test: /\.(s*)css$/,
                oneOf: [
                    {
                        resourceQuery: /module/,
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    importLoaders: 2,
                                    modules: {
                                        localIdentName: "[name]---[local]---[hash:base64:5]",
                                    },
                                }
                            }]
                    }, {
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                    importLoaders: 2,
                                }
                            }]
                    }
                ]

            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require("autoprefixer")],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            prependData: '@import "./src/common/styles/_variables.scss";'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new ManifestPlugin(),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: 'bundle-analyzer-report.html'
        }),
        new CompressionPlugin(
            {
                algorithm: "gzip",
                test: /\.(js|css)$/, // 匹配文件名
                threshold: 10240, // 对超过10k的数据压缩
                deleteOriginalAssets: false, // 不删除源文件
                minRatio: 0.8, // 压缩比
            }
        )
    ]
});

//View the merged webpack config:
// console.log(JSON.stringify(webpackConfig));

module.exports = webpackConfig;

