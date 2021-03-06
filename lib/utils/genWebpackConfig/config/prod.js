const merge = require('webpack-merge');

const baseWebpackConfig = require('./base');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(
  baseWebpackConfig,
  {
    devtool: false,
    optimization: {
      moduleIds:'natural',
      chunkIds:'natural',
      minimize: /*process.env.BROWSER==='firefox'?false:true*/true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              warnings: false,
              reduce_vars: false,
              reduce_funcs: false
            }
          },
          sourceMap: false,
          parallel: true
        }),
        new OptimizeCSSPlugin({
          cssProcessorPluginOptions: {
            preset: [
              'default',
              {
                normalizeUrl: false
              }
            ]
          }
        })
      ],
      runtimeChunk: {
        name: 'runtime'
      },
      flagIncludedChunks: true,
      //occurrenceOrder: true,
      providedExports: true,
      usedExports: true,
      concatenateModules: true
    },
    plugins: [
      // new BundleAnalyzerPlugin(),
      new MiniCssExtractPlugin({
        filename: 'static/css/[id].css'
      })
    ]
  }
);