const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Añadir en la parte superior del archivo

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@context': path.resolve(__dirname, 'src/context/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@styles': path.resolve(__dirname, 'src/styles/')
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader, // Usar style-loader en desarrollo, MiniCssExtractPlugin en producción
          'css-loader', // Traduce CSS a CommonJS
          'sass-loader' // Compila SASS a CSS
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // Opciones de configuración para nombres de archivo en producción
      chunkFilename: '[id].css'
    })
  ]
};
