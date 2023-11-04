const path = require('path')

module.exports = {
 mode: 'production',
 entry: './src/index.js',
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: ['babel-loader'],
     },
     {
       test: /\.css$/,
       use: ["style-loader", "css-loader"]
     },
     {
       test: /\.(pdf|jpg|png|gif|svg|ico)$/,
       type: 'asset/resource',
       use: [
         {
           loader: 'url-loader'
         },
       ]
     },
     {  
       test: /\.(woff|woff2|eot|ttf|otf)$/,
       type: 'asset/resource',
       loader: "file-loader"
     }
   ]
 },
 resolve: {
   extensions: ['*', '.js', '.jsx']
 },
 output: {
   path: __dirname + '/dist',
   publicPath: '/',
   filename: 'bundle.js'
 },
 devServer: {
   static: {
     directory: path.join(__dirname, 'dist')
   }
 },
 performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};