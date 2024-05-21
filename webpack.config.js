const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Ensure this points to index.tsx
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure .tsx is included
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Handle both .ts and .tsx
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3000,
  },
};
