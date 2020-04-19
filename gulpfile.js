let gulp = require("gulp"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    pug = require("gulp-pug"),
    livereload = require("gulp-livereload"),
    minify = require("gulp-minify");
    sourcemaps = require('gulp-sourcemaps');

gulp.task('html',function () {
    return gulp.src("dev/html/*.pug")
    .pipe(pug({
        pretty : true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload())
});

gulp.task('css',function () {  // seperate task for rtl_style.css

    return gulp.src(["dev/css/**/*.css","dev/css/**/*.scss",'!dev/libs/*.css',"!dev/css/sass/helper/rtl_styles.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle : "compressed"}).on("error",sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
});


gulp.task('rtl_css',function () {
    return gulp.src("dev/css/sass/helper/rtl_styles.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle : "compressed"}).on("error",sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('rtl_styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
});


gulp.task('js',function () {
    return gulp.src("dev/js/*.js")
    .pipe(concat("main.js"))
    .pipe(minify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload())
});


gulp.task('watch',function () {
    require("./server");
    livereload.listen();
    gulp.watch("dev/html/**/*.pug",["html"]);
    gulp.watch("dev/js/**/*.js",["js"]);
    gulp.watch(["dev/css/**/*.css","dev/css/**/*.scss"],["css"]);
    gulp.watch("dev/css/sass/helper/rtl_styles.scss",["rtl_css"]);

});


