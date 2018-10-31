import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
//debug: true,
//noInfo: false,

export default {
  mode: 'production',
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'source-map',
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  // Webpack 4 removed the commonsChunkPlugin. Use optimization.splitChunks instead.
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    // Global loader configuration
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      noInfo: true // set to false to see a list of every file being bundled.
    }),

    // (separate css and js)
    // Generate an external css file with a hash in the filename
    //new ExtractTextPlugin('[name].[contenthash].css'),
    new ExtractTextPlugin('[name].[md5:contenthash:hex:20].css'),
    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    // No longer used for Webpack 4. See optimization.splitChunks above instead.
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor'
    // }),

    // Create HTML file that includes reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      // Properties you define here are available in index.html
      // using htmlWebpackPlugin.options.varName
      trackJSToken: 'INSERT YOUR TOKEN HERE'
    })

    // Eliminate duplicate packages when generating bundle
    //new webpack.optimize.DedupePlugin()

    // Code is automatically minified in prod mode as of Webpack 4, so removing this.
    // Minify JS
    //new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap')
      } // extra param is a hint to webpack
    ]
  }
};
