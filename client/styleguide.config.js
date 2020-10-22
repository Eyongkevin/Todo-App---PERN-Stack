const path = require('path');
 
module.exports = {
  title: 'Todo Planner',
  sections:[{
    name: 'Todo Planner', content: './src/docs/heading.md'
  },{
    name: 'Components', content: './src/docs/components.md', components: function(){
      return [
        './src/components/TodoBoard.js', './src/components/ListTodos.js',
        './src/components/TodoCard.js', './src/components/Status.js',
        './src/components/TodoCheckList.js'
      ]
    }
  }],
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