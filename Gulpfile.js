'use strict';


// -----------------------------------------------------------------------------
// Dependencies
// -----------------------------------------------------------------------------

var gulp            = require('gulp');

// Nunjucks Templating
var data            = require('gulp-data');
// var nunjucks        = require('nunjucks');
// var markdown        = require('nunjucks-markdown');
// var marked          = require('marked');
// var gulpNunjucks    = require('gulp-nunjucks');
// var nunjucksRender  = require('gulp-nunjucks-render');

const tap = require('gulp-tap');
const nunjucks = require('gulp-nunjucks-render');
const markdown = require('gulp-markdownit');
const grayMatter = require('gulp-gray-matter');
const path = require('path');
const fs = require('fs');

// SCSS
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var sassdoc         = require('sassdoc');
// var jsonSass = require('gulp-json-sass')
var concat          = require('gulp-concat');

// BrowserSync
var browserSync     = require('browser-sync').create();

// images
var imagemin        = require('gulp-imagemin');
var pngquant        = require('imagemin-pngquant');




// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

var siteOutput      = './docs';

var inputData       = './src/data/data.json';

var inputNunjucks   = './src/nunjucks/**/*.html';
var inputPages      = './src/nunjucks/pages/*.html';
var inputTemplates  = './src/nunjucks/templates/**/*.html';

var inputScss       = './src/scss/**/*.scss';
var inputScssMain   = './src/scss/main.scss';
var sassOptions     = { outputStyle: 'expanded' };
var autoprefixArgs  = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
var sassdocOptions  = { dest: siteOutput + '/sassdoc' };
var outputCSS       = siteOutput + '/css';

var inputScripts    = './src/js/';

var inputFonts      = './src/fonts/**/*.*';

var CONTENT         = 'src/content/**/*.md';
var TEMPLATES       = 'src/nunjucks/templates/';


// Moves content to {{ content }} and writes template to file
function useTemplate(file) {
  const { data } = file,
        template = fs.readFileSync(path.resolve(TEMPLATES, data.template));
  
  data.contents = file.contents;
  file.contents = Buffer.from(template);
  return;
}


// -----------------------------------------------------------------------------
// Templating
// -----------------------------------------------------------------------------

gulp.task('nunjucks', function() {
  // Gets .html files. see file layout at bottom
  return gulp
    // .src([inputPages, inputTemplates])
    .src([inputNunjucks + '/templates/*.html', inputNunjucks + '/**/*.html'])
    .pipe(data(function() {
      return require(inputData)
    }))
    // Renders template with nunjucks and marked
    // .pipe(gulpNunjucks.compile("", {manageEnv: env}))
    .pipe(gulpNunjucks.compile("", {env: env}))
    // .pipe(nunjucksRender({manageEnv: env}))
    // .pipe(nunjucksRender({ path: inputNunjucks}))

    
    // .pipe(gulpNunjucks({manageEnv: env}))
    // Uncomment the following if your source pages are something other than *.html. 
    // .pipe(rename(function (path) { path.extname=".html" }))
    // output files in dist folder
    .pipe(gulp.dest(siteOutput))
});

gulp.task('nunjucks', () => {
  return gulp.src(CONTENT)
    .pipe(grayMatter())
    .pipe(markdown())
    .pipe(tap(useTemplate))
    .pipe(nunjucks({ path: TEMPLATES }))
    .pipe(gulp.dest(siteOutput));
});


// -----------------------------------------------------------------------------
// Sass compilation
// -----------------------------------------------------------------------------

gulp.task('sass', function() {
  return gulp
    // .src(inputData, inputScssMain)
    // .pipe(jsonSass({sass: false}))
    // .pconcat('output.scss'))
    .src(inputScssMain)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixArgs))
    .pipe(gulp.dest(outputCSS))
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
    .src(inputSass)
    .pipe(sassdoc(sassdocOptions))
    .resume();
});


// -----------------------------------------------------------------------------
// Watchers
// -----------------------------------------------------------------------------

gulp.task('watch', function() {
    // Watch the sass input folder for change,
    // and run `sass` task when something happens
    gulp.watch(inputScss, ['sass']).on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    //  reload on js change
    gulp.watch(inputScripts + '/*', ['scripts']).on('change', browserSync.reload);
    
    //  reload on font change
    gulp.watch(inputFonts, ['fonts']).on('change', browserSync.reload);

    // reload on json data change
    // gulp.watch([inputData], ['nunjucks']).on('change', browserSync.reload); // NOT WORKING TO INJECT NEW DATA

    // Watch nunjuck templates and reload browser if change
    gulp.watch([inputPages,inputTemplates + '**/*.html'], ['nunjucks']).on('change', browserSync.reload);

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

gulp.task('default', ['fonts','sass', 'nunjucks', 'img', 'scripts', 'watch', 'browser-sync']);
