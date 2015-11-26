var gulp = require('gulp')
,		isTravis = process.env.TRAVIS || false
,		hint = require('gulp-jshint')
,		stylus = require('gulp-stylus')
,		rename = require('gulp-rename')
,		stylish = require('jshint-stylish')
,		plato = require('gulp-plato')
,		uglify = require('gulp-uglify')
,		minifyCss = require('gulp-minify-css')
,		concat = require('gulp-concat')
,		sourcemaps = require('gulp-sourcemaps')
,		Server = require('karma').Server
,   plumber = require('gulp-plumber')
,   babel = require('gulp-babel')
,   runSequence = require('run-sequence')
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
  .pipe(plumber())
  .pipe(babel())
  .pipe(concat('gumga.min.js'))
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
  gulp.watch('./src/**/*.js', runSequence('minify-js','tests'));
});

gulp.task('js-watch', ()=> {
  gulp.watch(['./src/**/*.js','./index.html'], ['minify-js'])
})

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
