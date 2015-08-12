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
,		paths = {
	src: ['./src/**/*.js','!**/*Spec.js','!./src/directives/List/**/*.js','!./src/directives/Query/**/*.js','!./src/directives/List/**/*.js',,'!./src/services/Notification/**/*.js'],
	stylus: ['./src/index.styl'],
	dist: ['./dist/']
};

gulp.task('hint',function(){
	return gulp.src(paths.src)
	.pipe(hint())
	.pipe(hint.reporter(stylish))
	})


gulp.task('build-css',function(){
	return gulp.src(paths.stylus)
	.pipe(stylus())
	.pipe(rename('gumga.min.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest('./dist'))
	})

gulp.task('sonar', function () {
    var options = {
        sonar: {
            host: {
                url: 'http://192.168.25.201:9000'
            },
            jdbc: {
                url: 'jdbc:mysql://192.168.25.201:3306/sonar',
                username: 'gumga',
                password: 'senha'
            },
            projectKey: 'sonar:components:1.1.0',
            projectName: 'Components',
            projectVersion: '1.1.0',
            sources: 'src/',
            language: 'js',
            sourceEncoding: 'UTF-8',
            javascript: {
                lcov: {
                    reportPath: 'test/sonar_report/lcov.info'
                }
            }
        }
    };


  return gulp.src(paths.src,{ read: false })
      .pipe(sonar(options))
});

gulp.task('build-dist',function(){
	return gulp.src(paths.src)
	.pipe(ngAnnotate({remove: true,add:true}))
	.pipe(sourcemaps.init())
	.pipe(concat('gumga.min.js'))
	.pipe(sourcemaps.write())
	.pipe(uglify())
	.pipe(gulp.dest('dist/'));
	})


gulp.task('karma-tdd',function(done){
	var config = {
		configFile: __dirname + '/karma.conf.js',
		singleRun: isTravis
	};
	var server = new Server(config,done);
	server.start();
	})

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

gulp.task('ngdocs',function(){
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
	})

gulp.task('ci',['karma-tdd','ngdocs']);
gulp.task('dev',['hint','karma-tdd']);
gulp.task('prod',['plato','build-dist','ngdocs','build-css'],function(){
	gulp.watch(paths.src,['build-dist','build-css']);
	});
gulp.task('generate-doc',function(){
	gulp.watch(paths.src,['build-dist','ngdocs'])
})
