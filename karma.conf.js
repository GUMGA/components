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
		    'src/controllers/**/*.js',
		    'src/directives/**/*.js',
				{
					pattern: 'src/**/*Spec.js',
					included: false
				}
		    ],
		    exclude: [],
		    preprocessors: {},
		    plugins: [
		    'karma-jasmine',
		    'karma-chrome-launcher',
		    'karma-firefox-launcher',
		    'karma-phantomjs-launcher',
				'karma-mocha-reporter'
		    ],
		    reporters: ['mocha'],
		    port: 3001,
		    colors: true,
		    logLevel: config.LOG_INFO,
		    autoWatch: true,
		    browsers: ['Chrome'],
		    singleRun: false
			}
	process.env.TRAVIS ? karmaConf.browsers = ['PhantomJS'] : function(){};
	config.set(karmaConf)
}
