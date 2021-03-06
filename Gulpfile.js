'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp                = require('gulp');
var sass                = require('gulp-sass');
var autoprefixer        = require('gulp-autoprefixer');
var sassdoc             = require('sassdoc');
var browserSync         = require('browser-sync').create();
var nunjucksRender      = require('gulp-nunjucks-render');
var data                = require('gulp-data');
var concat              = require('gulp-concat');
var imagemin            = require('gulp-imagemin');
var pngquant            = require('imagemin-pngquant');
// var jsonSass = require('gulp-json-sass')

const tap = require('gulp-tap');
const markdown = require('gulp-markdownit');
const grayMatter = require('gulp-gray-matter');
const path = require('path');
const fs = require('fs');




// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var siteOutput          = './docs';
var input               = './src/scss/**/*.scss';
var inputMain           = './src/scss/main.scss';
var output              = siteOutput + '/css';
var inputPages          = './src/njx-pages/*.html';
var inputData           = './src/data/data.json';
var inputTemplates      = './src/njx-templates';
var inputScripts        = './src/js/';
var sassOptions         = { outputStyle: 'expanded' };
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
var sassdocOptions      = { dest: siteOutput + '/sassdoc' };
var inputFonts          = './src/fonts/**/*.*';


// -----------------------------------------------------------------------------
// Markdown
// -----------------------------------------------------------------------------

const CONTENT = 'src/markdown/**/*.md';

// Moves content to {{ content }} and writes template to file
function useTemplate(file) {
  const { data } = file,
        template = fs.readFileSync(path.resolve(inputTemplates, data.template));
  
  data.contents = file.contents;
  file.contents = Buffer.from(template);
  return;
}

//// Generates static site from markdown 
gulp.task('markdown', () => {
  return gulp.src(CONTENT)
    .pipe(grayMatter())
    .pipe(markdown())
    .pipe(tap(useTemplate))
    .pipe(nunjucksRender({ path: inputTemplates }))
    .pipe(gulp.dest(siteOutput));
});


// -----------------------------------------------------------------------------
// Nunjucks
// -----------------------------------------------------------------------------

gulp.task('pages', () => {
  return gulp.src(inputPages)
    .pipe(data(function() {
      return require(inputData)
    }))
    .pipe(nunjucksRender({ path: inputTemplates }))
    .pipe(gulp.dest(siteOutput));
});


// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------

gulp.task('sass', function() {
  return gulp
    // .src(inputData, inputMain)
    // .pipe(jsonSass({sass: false}))
    // .pipe(concat('output.scss'))
    .src(inputMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});


// -----------------------------------------------------------------------------
// Javascript
// -----------------------------------------------------------------------------

gulp.task('scripts', function() {
  return gulp.src(inputScripts + '*.js')
    // .pipe(concat({ path: 'main.js'}))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(siteOutput + '/js/'));
});





// -----------------------------------------------------------------------------
// Imagemin
// -----------------------------------------------------------------------------

gulp.task('img', function() {
  return gulp.src('./img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(siteOutput + '/img'));
});


// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

gulp.task('fonts', function() {
  return gulp.src([inputFonts])
  .pipe(gulp.dest(siteOutput + '/fonts/'));
});


// -----------------------------------------------------------------------------
// Sass documentation generation
// -----------------------------------------------------------------------------

gulp.task('sassdoc', function() {
  return gulp
    .src(input)
    .pipe(sassdoc(sassdocOptions))
    .resume();
});


// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function() {
    // Watch the sass input folder for change,
    // and run `sass` task when something happens
    gulp.watch(input, ['sass']).on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    //  reload on js change
    gulp.watch(inputScripts + '/*', ['scripts']).on('change', browserSync.reload);
    
    //  reload on font change
    gulp.watch(inputFonts, ['fonts']).on('change', browserSync.reload);

    // reload on json data change
    // gulp.watch([inputData], ['nunjucks']).on('change', browserSync.reload); // NOT WORKING TO INJECT NEW DATA

    // Watch nunjuck templates and reload browser if change
    gulp.watch([inputPages,inputTemplates + '**/*.html'], ['pages']).on('change', browserSync.reload);

});


// -----------------------------------------------------------------------------
// Static server
// -----------------------------------------------------------------------------

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: siteOutput
    }
  });
});


// -----------------------------------------------------------------------------
// Default task
// -----------------------------------------------------------------------------

gulp.task('default', ['fonts','sass', 'markdown', 'pages', 'img', 'scripts', 'watch', 'browser-sync']);