
const fs             = require('fs-extra');
const del            = require('del');
const path           = require('path');
const gulp           = require('gulp');
const gulpif         = require('gulp-if');
const webpack        = require('webpack');
const runSequence    = require('run-sequence');
const browserSync    = require('browser-sync');
const prefix         = require('gulp-autoprefixer');
const less           = require('gulp-less');
const sass           = require('gulp-sass');
const csso           = require('gulp-csso');
const sourcemaps     = require('gulp-sourcemaps');
const env            = require('yargs').argv;
const config         = require('./gulp.config')();
const configToolkit  = require('./gulp.config')(true);
const nodemon        = require('nodemon');
const assembler      = require('atomic-reactor-toolkit-assembler');
const formatter      = require('json-stringify-pretty-compact');
const chalk          = require('chalk');
const moment         = require('moment');


// Update config from environment variables
config.port.browsersync = (env.hasOwnProperty('APP_PORT')) ? env.APP_PORT : config.port.browsersync;
config.env = (env.hasOwnProperty('environment')) ? env.environment : config.env;

const timestamp = () => {
    let now = moment().format('HH:mm:ss');
    return `[${chalk.gray(now)}]`;
};

// Set webpack config after environment variables
const webpackConfig  = require('./webpack.config')(config);
const webpackConfigToolkit = require('./webpack.config')(configToolkit);

// Compile js
gulp.task('scripts', (done) => {
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            console.log(err());
            done();
            return;
        }

        let result = stats.toJson();

        if (result.errors.length > 0) {
            result.errors.forEach((error) => {
                console.log(error);
            });
            done();
            return;
        }

        if (config.env === 'development') {
            setTimeout(browserSync.reload, 1000);
        }

        done();
    });
});

gulp.task('scripts:toolkit', (done) => {
    webpack(webpackConfigToolkit, (err, stats) => {
        if (err) {
            console.log(err());
            done();
            return;
        }

        let result = stats.toJson();

        if (result.errors.length > 0) {
            result.errors.forEach((error) => {
                console.log(error);
            });
            done();
            return;
        }

        if (config.env === 'development') {
            browserSync.reload();
        }

        done();
    });
});


// Sass styles
const styles = (src, dest) => {
    let isDev = (config.env === 'development');
    let isSass = (config.cssPreProcessor === 'sass');
    let isLess = (config.cssPreProcessor === 'less');

    return gulp.src(src)
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(gulpif(isSass, sass({includePaths: config.src.includes}).on('error', sass.logError)))
    .pipe(gulpif(isLess, less({paths: config.src.includes})))
    .pipe(prefix(config.browsers))
    .pipe(gulpif(!isDev, csso()))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(gulp.dest(dest))
    .pipe(gulpif(isDev, browserSync.stream()));
};

gulp.task('styles:app', () => {
    return styles(config.src.style, config.dest.style);
});
gulp.task('styles:toolkit', () => {
    return styles(config.src.toolkit.style, config.dest.toolkit.style);
});
gulp.task('styles', ['styles:app', 'styles:toolkit']);


// Copy assets
const assets = (src, dest) => {
    let isDev = (config.env === 'development');
    return gulp.src(src)
    .pipe(gulp.dest(dest))
    .pipe(gulpif(isDev, browserSync.stream()));
};

gulp.task('assets', ['assets:app', 'assets:toolkit']);
gulp.task('assets:app', () => {
    return assets(config.src.assets, config.dest.assets);
});
gulp.task('assets:toolkit', () => {
    return assets(config.src.toolkit.assets, config.dest.toolkit.assets);
});


// Copy markup
gulp.task('markup', () => {
    let isDev = (config.env === 'development');
    return gulp.src(config.src.markup)
    .pipe(gulp.dest(config.dest.markup))
    .pipe(gulpif(isDev, browserSync.stream()));
});


// Remove all distribution files
gulp.task('clean', (done) => {
    del.sync([config.dest.dist]);
    done();
});


// Manages changes for a single file instead of a directory
const newWatches = [];
const watcher = (e) => {
    let src     = path.relative(path.resolve(__dirname), e.path);
    let fpath    = `${config.dest.dist}/${path.relative(path.resolve(config.src.root), e.path)}`;
    let dest    = path.normalize(path.dirname(fpath));

    if (fs.existsSync(fpath)) {
        del.sync([fpath]);
    }

    if (e.type !== 'deleted') {
        gulp.src(src).pipe(gulp.dest(dest));
    }

    browserSync.reload();
    console.log(`${timestamp()} File '${chalk.cyan(e.type)}' ${src}`);
};

const watchUpdate = (e) => {
    let p = path.relative(__dirname, e.path);
    if (e.type === 'added' || e.type === 'deleted') {
        if (path.extname(p) === '') {
            console.log(`${timestamp()} Directory '${chalk.cyan(e.type)}' ${p}`);
            if (e.type === 'added') {
                console.log(`${timestamp()} Restart the gulp watch to track changes to new files.`);
            }
        }
    }
};

gulp.task('watching', (done) => {
    gulp.watch(config.watch.js, ['scripts']);
    gulp.watch(config.watch.toolkit.js, ['scripts:toolkit']);
    gulp.watch(config.watch.style, ['styles']);
    gulp.watch(config.assembler.watch, ['assemble']);
    gulp.watch(config.assembler.dest, browserSync.reload);
    gulp.watch([config.watch.markup, config.watch.assets], watcher);
    gulp.watch(config.watch.watcher, watchUpdate);
});

gulp.task('watcher:test', (done) => {
    watcher({type: 'changed', path: '/Users/ctullos/Development/Atomic Reactor/Toolkit 2.0/src/index.html'});
    done();
});

// assembler
gulp.task('assemble', (done) => {
    // Run assembler
    const toolkit = assembler({src: config.assembler});

    // Format results
    const registry = (config.env === 'development') ? formatter(toolkit) : JSON.stringify(toolkit);

    // Output results
    const outputFile = path.resolve(__dirname, config.assembler.dest);

    fs.ensureFileSync(outputFile);
    fs.writeFileSync(outputFile, registry, 'utf-8');

    done();
});


// nodemon -> start server and reload on change
gulp.task('nodemon', (done) => {
    if (config.env !== 'development') { done(); return; }

    let callbackCalled = false;
    nodemon({
        watch : config.dest.dist,
        env: {
            port: config.port.proxy
        },
        script: __dirname + '/index.js',
        ext: 'js ejs json jsx html css scss jpg png gif svg txt md'
    }).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            done();
        }
    }).on('quit', () => {
        process.exit();
    }).on('restart', function () {
        browserSync.reload();
    });
});


// Server locally
gulp.task('serve', (done) => {
    browserSync({
        notify: false,
        timestamps: true,
        logPrefix: '00:00:00',
        port: config.port.browsersync,
        ui: {port: config.port.browsersync + 1},
        proxy: `localhost:${config.port.proxy}`
    });

    done();
});


// Build
gulp.task('build', (done) => {
    runSequence(
        ['clean'],
        ['assets', 'markup', 'scripts', 'scripts:toolkit', 'styles'],
        ['assemble'],
        done
    );
});


// The default task
gulp.task('default', (done) => {
    if (config.env === 'development') {
        runSequence(['build'], ['nodemon'], ['serve'], () => {
            gulp.start('watching');
            done();
        });
    } else {
        runSequence(['build'], () => {
            done();
        });
    }
});
