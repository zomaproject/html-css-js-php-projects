import pkg from 'gulp';
import sass0 from 'sass'
import gulp_sass from "gulp-sass";
import gulp_plumber from "gulp-plumber";
import gulp_webp from "gulp-webp";
// import gulp_cache from "gulp-cache";
import gulp_avif from "gulp-avif";
import gulp_imagemin from "gulp-imagemin";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";

import terser from "gulp-terser";


const {src, dest, watch, series} = pkg;
const sass = gulp_sass(sass0);

const options = {
    quality: 50
}

function css(done) {
    src('src/scss/**/*.scss')
        .pipe(gulp_plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css/'))
    done()
}

function js() {
    return src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js/'))
}

function dev(done) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', js)
    // webp('src/img/**/*.{jpg,png}', webp)
    done()

}

function webp() {
    return src('src/img/**/*.{jpg,png}')
        .pipe(gulp_webp(options))
        .pipe(dest('build/img/'))
}

function img() {
    return src('src/img/**/*.{jpg,png}')
        .pipe(gulp_imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(dest('build/img/'))
}

function avif() {
    return src('src/img/**/*.{jpg,png}')
        .pipe(gulp_avif(options))
        .pipe(dest('build/img/'))
}


export {dev}


export {css}
export {js}
export {img}

export default series(webp, avif, img, css, dev)