module.exports = function(config){
	var isDev = !process.env.TRAVIS
	,		karmaConf = {
		basePath: './',
		frameworks: ['jasmine'],
		files: [
			'bower_components/angular/angular.min.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/angular-ui-router/release/angular-ui-router.min.js',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/remarkable-bootstrap-notify/dist/bootstrap-notify.min.js',
			'bower_components/mousetrap-latest/mousetrap.min.js',
			'src/index.js',
			'src/services/**/*.js',
			'src/directives/**/*.js',
			'src/components/**/*.js',
			{
				pattern: 'src/**/*Spec.js',
				included: false
			}
		],
		exclude: [],
		preprocessors: {
			'src/**/*.js': ['babel'],
			'src/**/*!Spec.js': ['coverage']
		},
		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-mocha-reporter',
			'karma-babel-preprocessor',
			'karma-coverage',
			'karma-phantomjs-launcher'
		],
		reporters: ['mocha', 'coverage'],
		port: 3001,
		colors: true,
		logLevel: config.LOG_INFO,
		customLaunchers: {
			Chrome_travis_ci: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		}
		,
		autoWatch: true,
		browsers: ['PhantomJS'],
		singleRun: false,
		coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
	}
	if (process.env.TRAVIS) {
		karmaConf.browsers = ['Chrome_travis_ci'];
	}
	config.set(karmaConf)
}
