const path = require('path');
 
module.exports = {
  require: [
    path.join(__dirname,"src","App.css"),
    path.join(__dirname,"src","index.css"),
  ],
  template: {
    head: {
    links: [
    {
    rel: 'stylesheet',
    href: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    },
    ],
    scripts:[
      {
        src: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
      }
    ]
    }
    }
}
//"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
/* 
module.exports = {
webpackConfig: function () {
  const dir = path.join(__dirname, 'src');

  return {
      module: {
          rules: [{
              test: /\.js?$/,
              include: dir,
              use: {
                  loader: 'babel-loader'
              }
          }]
      },
      resolve: {
          alias: {
              'kevin-todo': path.resolve(dir, 'index.js')
          }
      }
  };
}
} */