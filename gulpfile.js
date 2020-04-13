const { src, dest, series, watch, parallel } = require("gulp"),
  webpack = require("webpack"),
  webpackStream = require("webpack-stream"),
  webpackConfig = require("./webpack.config.js"),
  minifyCSS = require("gulp-clean-css"),
  minifyJS = require("gulp-minify"),
  imagemin = require("gulp-imagemin"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create(),
  cleaner = require("gulp-clean"),
  wait = require("gulp-wait");

sass.compiler = require("node-sass");
const time = 20;

function hello() {
  console.log("Hello!");
}
exports.hello = hello;

function copy() {
  console.log("COPY!!!");
  return src("./src/html/*.html").pipe(wait(time)).pipe(dest("./dist"));
}

function assets() {
  return src("./src/assets/**/*").pipe(wait(time)).pipe(dest("./dist/assets"));
}

function images() {
  return src("./src/images/*")
    .pipe(wait(time))
    .pipe(imagemin())
    .pipe(dest("dist/assets/images"));
}

function js() {
  return src("./src/js/*.js")
    .pipe(wait(time))
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(
      minifyJS({
        ext: {
          min: ".min.js",
        },
      })
    )
    .pipe(dest("./dist/assets/js"));
}

function css() {
  return src("./src/scss/*.scss")
    .pipe(wait(time))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      sass({
        includePaths: ["node_modules"],
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 1 versions"],
        cascade: false,
      })
    )
    .pipe(
      minifyCSS({
        compatibility: "ie8",
      })
    )
    .pipe(dest("./dist/assets/css/"));
}

function reload() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
  console.log("reload");
}

function log() {
  console.log("end");
}

function watcher() {
  // watch("./src/html/**/*.html").on(
  //   "change",
  //   series(copy, browserSync.reload, log)
  // );
  watch("./src/html/**/*.html").on("change", series(copy, browserSync.reload));
  watch("./src/js/**/*").on("change", series(js, browserSync.reload));
  watch("./src/scss/**/*.scss").on(
    "change",
    series(copy, css, browserSync.reload)
    // parallel(css, browserSync.reload)
  );
  watch("./src/assets/**/*").on("change", assets);
}

function clean() {
  return src("./dist", {
    read: false,
    allowEmpty: true,
  })
    .pipe(wait(10))
    .pipe(cleaner());
}

exports.js = js;
exports.copy = copy;
exports.css = css;
exports.reload = reload;
exports.build = series(clean, js, copy, css, images, assets);
exports.default = series(
  clean,
  js,
  copy,
  css,
  images,
  assets,
  parallel(reload, watcher)
);
