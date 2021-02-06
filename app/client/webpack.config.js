const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const clientExportDir = path.resolve(__dirname, 'dist');

function serverUrl(env) {
  switch (env) {
    case 'prod':
      return 'https://hoppier.herokuapp.com';
    case 'local':
    default:
      return 'http://localhost:8080';
  }
}

const config = env => {
  return {
    entry: [
      'react-hot-loader/patch',
      './src/index.tsx'
    ],
    output: {
      path: clientExportDir,
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: '/node_modules/',
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/transform-runtime'
            ]
          }
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                memo: true,
                replaceAttrValues: { currentColor: '{props.color}' }
              }
            }
          ],
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                mimetype: 'image/png'
              }
            }
          ]
        },
        {
          test: /\.less$/,
          exclude: /\.global\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            'less-loader',
          ],
        },
        {
          test: /\.global\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.global\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true
              }
            }
          ]
        },
        {
          test: /\.global\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: false
              }
            }
          ]
        }
      ]
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx'
      ],
      alias: {
        'react-dom': '@hot-loader/react-dom',
        '@shared': path.resolve(__dirname, '../shared/src')
      }
    },
    devServer: {
      contentBase: clientExportDir,
      port: 3000,
      historyApiFallback: {
        index: 'index.html'
      }
    },
    plugins: [
      new LodashModuleReplacementPlugin(),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        SERVER_URL: JSON.stringify(serverUrl(env)),
        NODE_ENV: JSON.stringify(env),
      }),
      // new webpack.SourceMapDevToolPlugin({
      //   filename: '[name].js.map',
      //   exclude: ['vendor.js']
      // })
    ],
    optimization: {
      usedExports: true,
      minimize: true
    },
  }
};

module.exports = config;
