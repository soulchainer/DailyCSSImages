// Define plugins
const gulp = require('gulp');
const bs = require('browser-sync').create();
const $ = require('gulp-load-plugins')();

// Process pug files
gulp.task('views', () =>
  gulp.src('./src/views/*.pug')
    .pipe($.pug({}))
    .on('error', $.util.log)
    .pipe(gulp.dest('./dist')),
);

// Process SASS files
gulp.task('styles', () =>
  gulp.src('./src/sass/*.scss')
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sass({ outputStyle: 'compressed' }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe($.cleanCss({ compatibility: 'ie8' }))
    .on('error', $.util.log)
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css')),
);

// Serve and watch for changes in files
const appFiles = ['./dist/*', './dist/css/*'];
gulp.task('serve', () => {
  bs.init({
    server: './dist',
  });

  gulp.watch('./src/views/*.pug', ['views']);
  gulp.watch('./src/sass/*.scss', ['styles']);
  gulp.watch(appFiles).on('change', bs.reload);
});

gulp.task('default', ['views', 'styles', 'serve']);
