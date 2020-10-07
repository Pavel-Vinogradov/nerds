' use strict';

let gulp = require('gulp');
let prodjectFolder = 'dist'; //add  folder  dist
let sourceFolder = 'app'; // add folder   app
let src = require('gulp');
let dest = require('gulp');
let browserSync = require('browser-sync').create(); //add live server
let sass = require('gulp-sass'); // add sass/scss 
let fileinclude = require('gulp-file-include'); // add plugin file -inclide
let del = require('del'); // add plugin delit
let autoprefixer = require('gulp-autoprefixer'); //add plugin gulp-autoprefixer
let gcmq = require('gulp-group-css-media-queries'); //add css-media-queries
let cleanCSS = require('gulp-clean-css'); //add clean-css
let rename = require('gulp-rename'); //add rename
let uglify = require('gulp-uglify-es').default; //add uglify
let concat = require('gulp-concat');
let imagemin = require('gulp-imagemin');
let webp = require('gulp-webp');
let ttf2woff = require('gulp-ttf2woff');
let ttf2woff2 = require('gulp-ttf2woff2');
let fonter = require('gulp-fonter');
let fs = require('fs');
let ghpages = require('gh-pages');

ghpages.publish('dist', {
  branch: 'master',
  repo: 'git+https://github.com/Pavel-Vinogradov/nerds.git'
}, callback);


/* init folder paths */

let path = {

  build: {

    html: prodjectFolder + '/',
    css: prodjectFolder + '/css/',
    js: prodjectFolder + '/js/',
    img: prodjectFolder + '/img/',
    fonts: prodjectFolder + '/fonts/',
  },

  src: {

    html: [sourceFolder + '/*.html', '!app/_*.html'],
    css: sourceFolder + '/scss/style.scss',
    js: sourceFolder + '/js/main.js',
    img: sourceFolder + '/img/**/*.{jpg, png, svg, gif, ico, webp} ',
    fonts: sourceFolder + '/fonts/*.ttf',
  },

  watch: {
    html: sourceFolder + '/**/*.html',
    css: sourceFolder + '/scss/**/*.scss',
    js: sourceFolder + '/js/**/*.js',
    img: sourceFolder + '/img/**.{jpg, png, svg, gif, ico, webp} ',
  },

  clean: './' + prodjectFolder + '/'

};


/* Init Browser-Sync */

function browser_Sync() {
  browserSync.init({
    server: {
      baseDir: './' + prodjectFolder + '/'
    },

    port: 3000,
    notify: false,
  });
}



/* Init HTML files */
/* Init File inclide*/
function html() {
  return gulp.src(path.src.html)
    // .pipe(fileinclude({ ////File include
    //   prefix: '@@',
    //   basepath: '@file'
    // }))
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());

}

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
/* init watch*/

function watchFiles() {

  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}


/*init delit*/
function clean() {
  return del(path.clean);

}
/* Init CSS libraries */


// function css_blbs() {
//   return gulp.src([
//       'node_modules/normalize.css/normalize.css',
//       'node_modules/animate.css/animate.css',
//     ])
//     .pipe(concat('_libs.scss'))
//     .pipe(gulp.dest('app/scss/'))
//     .pipe(browserSync.stream());
// }
/* init css file*/

function css() {
  return gulp.src(path.src.css)
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gcmq()) //group-css-media-queries
    .pipe(autoprefixer({ //autoprefixer
      overrideBrowserslist: [
        '> 1%',
        'ie >= 8',
        'edge >= 15',
        'ie_mob >= 10',
        'ff >= 45',
        'chrome >= 45',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4',
        'bb >= 10'
      ],
      cascade: true
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(cleanCSS())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(browserSync.stream());
}




/* Init JavaScript files */

function js() {
  return gulp.src(path.src.js)
    .pipe(fileinclude({ ////File include
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(path.build.js))
    .pipe(browserSync.stream());

}



/* init Images file*/

function images() {
  return gulp.src(path.src.img)


    // .pipe(webp({
    //   quality: 75
    // }))
    // .pipe(gulp.dest(path.build.img))
    // .pipe(gulp.src(path.src.img))
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      })
    ]))

    .pipe(gulp.dest(path.build.img))
    .pipe(gulp.src('app/img/*.{svg,png}'))
    .pipe(gulp.dest(path.build.img))
    .pipe(browserSync.stream());

}




/* Init Fons */



function fonts() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
  gulp.src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(gulp.dest(path.build.fonts));
  return gulp.src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.build.fonts));

}

gulp.task('otfFonts', function () {
  return gulp
    .src([sourceFolder + '/fonts/*.otf'])
    .pipe(fonter({
      subset: [66, 67, 68, 69, 70, 71],
      formats: ['ttf']
    }))
    .pipe(gulp.dest(sourceFolder + '/fonts/'));
});




/* init file system*/

function fontsStyle(params) {

  let file_content = fs.readFileSync(sourceFolder + '/scss/fonts.scss');
  if (file_content == '') {
    fs.writeFile(sourceFolder + '/scss/fonts.scss', '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (let i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(sourceFolder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    });
  }
}

function cb() {}


let build = gulp.series(clean, gulp.parallel(css, fonts, images, js, html), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browser_Sync);


// exports.css_blbs = css_blbs;

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;