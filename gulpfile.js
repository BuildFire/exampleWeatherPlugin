const gulp = require('gulp');
const del = require('del');
const minHTML = require('gulp-htmlmin');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const minify = require('gulp-minify');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
let babel = require('gulp-babel');

let version = new Date().getTime();
const destinationFolder= releaseFolder();

function releaseFolder() {
    var arr = __dirname.split("/");
    var fldr = arr.pop();
    arr.push(fldr + "_release");
    return arr.join("/");
}

console.log(">> Building to " , destinationFolder);


gulp.task('lint', () => {
	// ESLint ignores files with "node_modules" paths.
	// So, it's best to have gulp ignore the directory as well.
	// Also, Be sure to return the stream from the task;
	// Otherwise, the task may end before the stream has finished.
	return gulp.src(['widget/**/*.js','control/**/*.js'])
	// eslint() attaches the lint output to the "eslint" property
	// of the file object so it can be used by other modules.
		.pipe(eslint({
			"env": {
				"browser": true,
				"es6": true
			},
			"extends": "eslint:recommended",
			"parserOptions": {
				"sourceType": "module"
			},
			"rules": {
				"semi": [
					"error",
					"always"
				],
				"no-console":[
					"off"
				]
			}
		}))
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError());
});


const cssTasks=[
    {name:"widgetCSS",src:"widget/**/*.css",dest:"/widget"}
    ,{name:"controlContentCSS",src:"control/content/**/*.css",dest:"/control/content"}
    ,{name:"controlDesignCSS",src:"control/design/**/*.css",dest:"/control/design"}
    ,{name:"controlSettingsCSS",src:"control/settings/**/*.css",dest:"/control/settings"}
	,{name:"controlStringsCSS",src:"control/strings/**/*.css",dest:"/control/strings"}
];

cssTasks.forEach(function(task){
    /*
     Define a task called 'css' the recursively loops through
     the widget and control folders, processes each CSS file and puts
     a processes copy in the 'build' folder
     note if the order matters you can import each css separately in the array

     */
    gulp.task(task.name, function(){
        return gulp.src(task.src,{base: '.'})

        /// minify the CSS contents
            .pipe(minifyCSS())

            ///merge
            .pipe(concat('styles.min.css'))

            /// write result to the 'build' folder
            .pipe(gulp.dest(destinationFolder + task.dest))
    });
});


gulp.task("sharedJS", function() {
	return gulp.src(["widget/js/shared/**.js"],{base: '.'})

		.pipe(concat('scripts.shared.js'))
		.pipe(babel({
			presets: ['@babel/env'],
			plugins: ["@babel/plugin-proposal-class-properties"]
		}))
		.pipe(minify())
		.pipe(gulp.dest(destinationFolder + "/widget"));
});

const jsTasks=[
    {name:"widgetJS",src:"widget/js/*.js",dest:"/widget"}
   , {name:"controlContentJS",src:"control/content/js/*.js",dest:"/control/content"}
    ,{name:"controlDesignJS",src:"control/design/js/*.js",dest:"/control/design"}
    ,{name:"controlSettingsJS",src:"control/settings/js/*.js",dest:"/control/settings"}
	,{name:"controlStringsJS",src:"control/strings/js/*.js",dest:"/control/strings"}
	//data, data access, tests and analytics
	,{name:"dataJS",src:["data/*.js", "dataAccess/*.js"],dest:"/data"}
	,{name:"testsJS",src:["tests/*.js", "tests/basic/*.js", "test/screens/*.js"],dest:"/tests"}
];


jsTasks.forEach(function(task){
    gulp.task(task.name, function() {
        return gulp.src(task.src,{base: '.'})


            /// merge all the JS files together. If the
            /// order matters you can pass each file to the function
            /// in an array in the order you like
			.pipe(concat('scripts.js'))
			.pipe(babel({
				presets: ['@babel/env'],
				plugins: ["@babel/plugin-proposal-class-properties"]
			}))
			.pipe(minify())
            ///output here
            .pipe(gulp.dest(destinationFolder + task.dest));

    });

});

gulp.task('clean',function(){
    return del([destinationFolder],{force: true});
});

/*
 Define a task called 'html' the recursively loops through
 the widget and control folders, processes each html file and puts
 a processes copy in the 'build' folder
 */
gulp.task('controlHTML', function(){
    return gulp.src(['control/**/*.html'],{base: '.'})
        .pipe(htmlReplace({
			bundleSharedJSFiles:"../../widget/scripts.shared-min.js?v=" + version
            ,bundleJSFiles:"scripts-min.js?v=" + version
            ,bundleCSSFiles:"styles.min.css?v=" + version
			,bundleControlBFMinJS:"../../../../scripts/buildfire.min.js"
			,bundleWidgetBFMinJS:"../../../scripts/buildfire.min.js"
			//data, data access, tests and analytics
			,bundleDataJSFiles:"../../data/scripts-min.js?v=" + version
			,bundleTestsJSFiles:"../../tests/scripts-min.js?v=" + version
        }))
        .pipe(minHTML({removeComments:true,collapseWhitespace:true}))
        .pipe(gulp.dest(destinationFolder));
});

gulp.task('widgetHTML', function(){
	return gulp.src(['widget/*.html'],{base: '.'})
		.pipe(htmlReplace({
			bundleSharedJSFiles:"scripts.shared-min.js?v=" + version
			,bundleJSFiles:"scripts-min.js?v=" + version
			,bundleCSSFiles:"styles.min.css?v=" + version
			//data, data access and tests
			,bundleDataJSFiles:"../../data/scripts-min.js?v=" + version
			,bundleTestsJSFiles:"../../tests/scripts-min.js?v=" + version
		}))
		.pipe(minHTML({removeComments:true,collapseWhitespace:true}))
		.pipe(gulp.dest(destinationFolder));
});


gulp.task('resources', function(){
    return gulp.src(['resources/*','plugin.json'],{base: '.'})
        .pipe(gulp.dest(destinationFolder ));
});


gulp.task('images', function(){
    return gulp.src(['**/.images/**'],{base: '.'})
        .pipe(imagemin())
        .pipe(gulp.dest(destinationFolder ));
});


var buildTasksToRun=['controlHTML','widgetHTML','resources','images','sharedJS'];

cssTasks.forEach(function(task){  buildTasksToRun.push(task.name)});
jsTasks.forEach(function(task){  buildTasksToRun.push(task.name)});

gulp.task('build', gulp.series('lint','clean',...buildTasksToRun) );
