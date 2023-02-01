const path = require('path'); // подключаем path к конфигу вебпак

module.exports = {
  // указали первое место, куда заглянет webpack, 
  //— файл index.js в папке src 
  entry: { main: './src/index.js' },

  // указали в какой файл будет собираться весь js и дали ему имя 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''
  }

} // module.exports — это синтаксис экспорта в Node.js