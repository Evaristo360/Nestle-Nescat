require('dotenv').config();
const webpack = require('webpack');
const packageJson = require('./package.json');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const getReactAppEnvVariables = () => {
  const vars = process.env;
  const reactAppEnvVars = Object.keys(vars).reduce((envVars, key) => {
    if (key.includes('REACT_APP_')) {
      envVars.push(key);
    }
    return envVars;
  }, []);

  return reactAppEnvVars;
};

module.exports = {
  entry: './src/index.js',
  mode: process.env.MODE,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  output: {
    filename: process.env.BUNDLE_FILENAME,
    chunkFilename: process.env.CHUNK_FILENAME,
    path: path.resolve(__dirname, process.env.BUILD_DIR),
    publicPath: process.env.REACT_APP_PUBLIC_URL
  },
  resolve: {
    fallback: { buffer: false },
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      providers: path.resolve(__dirname, 'src/providers/'),
      routes: path.resolve(__dirname, 'src/routes/'),
      scss: path.resolve(__dirname, 'src/scss/'),
      translations: path.resolve(__dirname, 'src/translations/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      views: path.resolve(__dirname, 'src/views/'),
      layouts: path.resolve(__dirname, 'src/layouts/')
    }
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.EnvironmentPlugin(getReactAppEnvVariables()),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      minify: process.env.COMPRESS === 'true',
      env: process.env,
      inject: false
    }),
    new webpack.ProgressPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: process.env.PORT,
    static: {
      directory: path.join(__dirname, 'build'),
      publicPath: process.env.REACT_APP_PUBLIC_URL
    },
    hot: true,
    compress: false,
    open: [process.env.REACT_APP_PUBLIC_URL],
    watchFiles: [
      './src/**/*.js',
      './public/**/*',
      './src/**/*.jsx',
      './src/**/*.css',
      './src/**/*.scss'
    ]
  }
};
