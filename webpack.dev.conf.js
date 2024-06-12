const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
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
    productionSourceMap: false, // 设为false，既可以减少包大小，也可以加密源码
    chainWebpack(config) {
        //最小化代码
        config.optimization.minimize(true);
        //分割代码
        config.optimization.splitChunks({chunks: 'all'});
        //默认开启prefetch(预先加载模块)，提前获取用户未来可能会访问的内容 在首屏会把这十几个路由文件，都一口气下载了 所以我们要关闭这个功能模块
        config.plugins.delete('prefetch');
        if (isProdOrTest) {
            // 对超过10kb的文件gzip压缩
            config.plugin('compressionPlugin').use(
                new CompressionWebpackPlugin({
                    test: /\.(js|css|html)$/, // 匹配文件名
                    filename: '[path].gz[query]',　// 压缩后的文件名
                    algorithm: 'gzip',　// 使用gzip压缩
                    minRatio: 1,　// 压缩率小于1才会压缩
                    threshold: 10240,
                    deleteOriginalAssets: false //是否删除原文件
                })
            );
        };

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
        })
    ]
});

//View the merged webpack config:
// console.log(JSON.stringify(webpackConfig));

module.exports = webpackConfig;

