var gulp = require('gulp')
,		isTravis = process.env.TRAVIS || false
,		hint = require('gulp-jshint')
,		stylus = require('gulp-stylus')
,		rename = require('gulp-rename')
,		stylish = require('jshint-stylish')
,		ngDocs = require('gulp-ngdocs')
,		plato = require('gulp-plato')
,		uglify = require('gulp-uglify')
,		minifyCss = require('gulp-minify-css')
,		concat = require('gulp-concat')
,		sourcemaps = require('gulp-sourcemaps')
,		Server = require('karma').Server
,		ngAnnotate = require('gulp-ng-annotate')
,		sonar = require('gulp-sonar')
,   shell = require('gulp-shell')
,		paths = {
    src: ['./src/**/*.js','!**/*Spec.js'],
    stylus: ['./src/index.styl'],
    dist: ['./dist/']
  };

/**
* Minifica o CSS escrito com stylus, renomeia e coloca no dir. dist.
*/
gulp.task('minify-css',function(){
  return gulp.src(paths.stylus)
  .pipe(stylus())
  .pipe(rename('gumga.min.css'))
  .pipe(minifyCss())
  .pipe(gulp.dest('./dist'))
})

/**
* Minifica o JS, renomeia e coloca no dir. dist.
*/
gulp.task('minify-js',function(){
  return gulp.src(paths.src)
  .pipe(ngAnnotate({remove: true,add:true}))
  .pipe(sourcemaps.init())
  .pipe(concat('gumga.min.js'))
  .pipe(sourcemaps.write())
  .pipe(uglify())
  .pipe(gulp.dest('dist/'));
})

/**
* Executa o JSHint em cima dos arquivos Javascript.
*/
gulp.task('hint',function(){
  return gulp.src(paths.src)
  .pipe(hint())
  .pipe(hint.reporter(stylish))
})

/**
* Executa os testes unitários.
*/
gulp.task('tests',function(done){
  var config = {
    configFile: __dirname + '/karma.conf.js',
    singleRun: isTravis
  };
  var server = new Server(config,done);
  server.start();
})

/**
* Reporta a cobertura de testes.
*/
// gulp.task('sonar', function () {
//   var options = {
//     sonar: {
//       host: {
//         url: 'http://192.168.25.201:9000'
//       },
//       jdbc: {
//         url: 'jdbc:mysql://192.168.25.201:3306/sonar',
//         username: 'gumga',
//         password: 'senha'
//       },
//       projectKey: 'sonar:components:1.1.0',
//       projectName: 'Components',
//       projectVersion: '1.1.0',
//       sources: 'src/',
//       language: 'js',
//       sourceEncoding: 'UTF-8',
//       javascript: {
//         lcov: {
//           reportPath: 'test/sonar_report/lcov.info'
//         }
//       }
//     }
//   };
//
//   return gulp.src(paths.src, { read: false })
//     .pipe(sonar(options))
// });

/**
* Reporta complexidade do código.
*/
gulp.task('plato', function () {
  return gulp.src(paths.src)
  .pipe(plato('report', {
    jshint: {
      options: {
        strict: true
      }
    },
    complexity: {
      trycatch: true
    }
  }));
});

/**
* Gerador de documentação.
*/
gulp.task('docs',function(){
  var options = {
    scripts: [
      './dist/gumga.min.js'
    ],
    html5Mode: false,
    startPage: '/directives',
    title: 'Gumga Components',
  }
  return (ngDocs.sections({
    directives: {
      title: 'Directives',
      glob: ['./src/directives/**/*.js','!**/*Spec.js']
    },
    services: {
      title: 'Services',
      glob: ['./src/services/**/*.js','!**/*Spec.js']
    }
  }))
  .pipe(ngDocs.process(options))
  .pipe(gulp.dest('./docs'))
});

/**
* Usado para desenvolvimento,
* reexecuta as minificações CSS e JS a cada alteração.
*/
gulp.task('dev',['minify-js','minify-css'],function(){
  gulp.watch(paths.src,['minify-js']);
  gulp.watch(paths.stylus,['minify-css'])
});

/**
* Usado para desenvolvimento,
* reexecuta a minificação JS e os testes a cada alteração.
*/
gulp.task('tdd',function(){
  gulp.watch('./src/**/*.js',['minify-js','tests']);
});

/**
* Reporta cobertura de testes e complexidade do código.
*/
gulp.task('report',['plato']);

/**
* Valida qualidade do código com JSHint, executa os testes
* unitários e faz o report de cobertura e complexidade.
*/
gulp.task('ci-validate',['hint','tests']);

/**
* Executa as validações, minifica o CSS, JS e gera documentação.
*/
gulp.task('ci-build',['tests']);
