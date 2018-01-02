
const gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    babel = require('gulp-babel'),
    pump = require('pump'),
    render_chat_html = require('./helpers/pre_render_chat/render_chat_html');

const path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'public/build/',
        js: 'public/build/js/',
        css: 'public/build/css/',
        img: 'public/build/assets/images/',
        fonts: 'public/build/assets/fonts/',
    },
    src: { //Пути откуда брать исходники
        html: 'client/src/*.html', //Синтаксис client/src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'client/src/js/main.js', //В стилях и скриптах нам понадобятся только main файлы
        style: 'client/src/styles/main.scss',
        img: 'client/src/assets/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'client/src/assets/fonts/**/*.*',
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'client/src/**/*.html',
        js: 'client/src/js/**/*.js',
        style: 'client/src/styles/**/*.scss',
        img: 'client/src/assets/images/**/*.*',
        fonts: 'client/src/assets/fonts/**/*.*',
    },
    clean: 'public/build',
};

var config = {
    server: {
        baseDir: 'public/build',
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: 'helloVinci',
};

gulp.task('webserver', function() {
    browserSync(config);
});

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function() {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({ stream: true }));
});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
    .pipe(sourcemaps.init())
        .pipe(rigger())
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        
         .pipe(uglify())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
});

gulp.task('compress', function (cb) {
    pump([
          gulp.src(path.src.js),
          rigger(),
          babel({
                presets: ['es2015']
            }),
          uglify(),
          gulp.dest(path.build.js)
      ],
      cb
    );
  });

gulp.task('style:build', function() {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/styles/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true,
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({ stream: true }));
});

gulp.task('image:build', function() {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true,
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({ stream: true }));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'render_html'
]);


gulp.task('quick', [
    'render_html',
    'js:build',
    'style:build'

]);

gulp.task('render_html',function(){
    render_chat_html()
})


gulp.task('watch', function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'webserver', 'watch']);