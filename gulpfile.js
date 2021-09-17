const project_folder = require('path').basename(__dirname)
const source_folder = "#src"

let fs = require('fs')

const path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts"
    },
    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico}",
        fonts: source_folder + "/fonts/*.ttf"
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico}",
    },
    clean: "./" + project_folder + "/"
}

const { src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require('gulp-sass')(require('sass')),
    autoprefix = require("gulp-autoprefixer"),
    mediagroup = require("gulp-group-css-media-queries"),
    cleancss = require("gulp-clean-css"),
    rename = require("gulp-rename"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2")

function browserSync(props) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        notify: false,
        port: 3000
    })
}

const html = () => src(path.src.html).pipe(fileinclude()).pipe(dest(path.build.html)).pipe(browsersync.stream())

const css = () => src(path.src.css).pipe(scss({
    outputStyle: "expanded"
})).pipe(mediagroup()).pipe(autoprefix({
    overrideBrowserslist: ["last 5 version"],
    cascade: true
})).pipe(dest(path.build.css)).pipe(cleancss()).pipe(rename({
    extname: ".min.css"
})).pipe(dest(path.build.css)).pipe(browsersync.stream())

const images = () => src(path.src.img).pipe(dest(path.build.img)).pipe(browsersync.stream())

const js = () => src(path.src.js).pipe(fileinclude()).pipe(dest(path.build.js)).pipe(browsersync.stream())

function fonts() {
    src(path.src.fonts).pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
}

function fontsStyle(params) {
    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() { }


const watchFiles = () => {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.img], images)
    gulp.watch([path.watch.js], js)
}

const clean = () => del(path.clean)

let build = gulp.series(clean, gulp.parallel(css, html, images, js, fonts), fontsStyle)
let watch = gulp.parallel(build, watchFiles, browserSync)

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.js = js;
exports.images = images;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;