const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const del = require('del');

// OPTIMIZING TASKS

gulp.task('css', () => {
  return gulp.src('app/scss/global.scss')
    .pipe(sass())
    // css nano commented for debugging
    // .pipe(cssnano())
    .pipe(concat('styles.css'))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('script', () => {
  return gulp.src('app/js/**/*.js')
      .pipe(plumber())
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(concat('scripts.js'))
    // css uglify commented for debugging
      // .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream());
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      interlaced: true
    }))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

// PROCESSING TASKS

gulp.task('browserSync', cb => {
  browserSync.init({
    server: {
      baseDir: './'
    },
  });
  cb();
});

gulp.task('watch', cb => {
  gulp.watch('app/scss/**/*.scss', gulp.series('css')); 
  gulp.watch('app/js/**/*.js', gulp.series('script')); 
  gulp.watch('*.html', reload); 
  cb();
})

gulp.task('clean', cb => {
  del.sync('dist');
  cb();
})

function reload(cb) {
  browserSync.reload();
  cb();
}
// TRIGGERRING TASKS

gulp.task('dist', 
  gulp.series(
    'clean',
    gulp.parallel('css', 'script', 'fonts', 'images'),
  ));

gulp.task('default', 
  gulp.series(
    gulp.parallel('css', 'script', 'browserSync'),
    'watch',
  ));
