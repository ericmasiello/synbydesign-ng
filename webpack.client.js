require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = (env, { mode }) => {
  const includeServiceWorker =
    mode === 'production' || env.serviceWorker === 'true';

  const envPlugin = new webpack.DefinePlugin({
    'process.env.SW_ID': JSON.stringify(new Date().toISOString()),
    'process.env.INCLUDE_SW': JSON.stringify(includeServiceWorker),
    'process.env.MIXPANEL_TOKEN': JSON.stringify(process.env.MIXPANEL_TOKEN),
  });

  const indexPage = new HtmlWebpackPlugin({
    template: `!!raw-loader!${path.join(
      process.cwd(),
      'src/index.template.ejs',
    )}`,
    filename: path.resolve(__dirname, 'views/index.ejs'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
    },
  });

  const errorPage = new HtmlWebpackPlugin({
    template: `!!raw-loader!${path.join(
      process.cwd(),
      'src/error.template.ejs',
    )}`,
    filename: path.resolve(__dirname, 'views/error.ejs'),
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
    },
  });

  const serviceWorker = new ServiceWorkerWebpackPlugin({
    entry: path.join(__dirname, 'src/client/sw.ts'),
  });

  const copyWebpackPlugin = new CopyWebpackPlugin([
    {
      from: 'src/client/images',
      to: '',
    },
    {
      from: 'src/client/favicon/',
      to: '',
    },
  ]);

  const imageMinPlugin = new ImageminPlugin({
    test: /\.(jpe?g|png|gif|svg)$/i,
  });

  const config = {
    // Tell webpack the root file of our
    // server application
    entry: {
      bundle: './src/client/client.tsx',
    },

    // Tell webpack where to put the output file
    // that is generated
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    plugins: [
      indexPage,
      errorPage,
      serviceWorker,
      copyWebpackPlugin,
      imageMinPlugin,
      envPlugin,
    ],
  };

  const prodConfig = {
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
    },
  };

  if (mode === 'production') {
    return merge(baseConfig, config, prodConfig);
  }
  return merge(baseConfig, config);
};
