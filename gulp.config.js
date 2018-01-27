'use strict';

const path         = require('path');
const globby       = require('globby');

// Create the webpack entries object.
const entries = pattern => globby.sync(pattern)
    .reduce((files, f) => {
        let file = path.basename(f, '.js');
        files[file] = path.resolve(f);
        return files;
    }, {});

const globDefineFiles = pattern => globby.sync(pattern)
    .reduce((files, f) => {
        let cmp = path.basename(path.parse(f).dir);
        files[cmp] = f.replace(/^src\/app/, '.').replace(/.js$/, '');
        return files;
    }, {});

module.exports = (toolkit = false) => {
    let ent = (toolkit === true)
        ? entries(["src/toolkit/assets/js/*.js"])
        : entries(["src/app/*.js"]);

    return {
        spa: true,
        env: "development",
        entries: ent,
        isToolkit: toolkit,
        defines: {
            "global": "window",
            restAPI: JSON.stringify(process.env.REST_API_URL || "http://demo3914762.mockable.io"),
            allInitialStates: JSON.stringify(globDefineFiles('src/app/components/**/state.js')),
            allRoutes: JSON.stringify(globDefineFiles('src/app/components/**/route.js')),
            allActions: JSON.stringify(globDefineFiles('src/app/components/**/actions.js')),
            allActionTypes: JSON.stringify(globDefineFiles('src/app/components/**/actionTypes.js')),
            allServices: JSON.stringify(globDefineFiles('src/app/components/**/services.js')),
            allReducers: JSON.stringify(globDefineFiles('src/app/components/**/reducers.js')),
        },
        browsers: "last 1 version",
        port: {
            browsersync: 3000,
            proxy: 3030,
        },
        cssPreProcessor: 'sass',
        watch: {
            watcher: [
              "src/**/*",
            ],
            nodemon: [
                "dist/**/*",
            ],
            js: [
                "src/app/**/*.js",
            ],
            markup: [
                "src/*.html",
                "src/{app,toolkit}/**/*.html",
                "src/{app,toolkit}/assets/styles/**/*.css"
            ],
            style: [
                "src/app/assets/styles/**/*.less",
                "src/app/assets/styles/**/*.scss",
                "src/app/assets/styles/**/*.sass",
            ],
            assets: [
                "src/{app,toolkit}/assets/**/*",
                "!{src/app/assets/style,src/app/assets/styles/**}",
                "!{src/app/assets/js,src/app/assets/js/**}",
                "!{src/toolkit/assets/style,src/app/assets/styles/**}",
                "!{src/toolkit/assets/js,src/app/assets/js/**}",
            ],
            toolkit: {
                js: [
                    "src/toolkit/assets/js/*.js",
                ],
                style: [
                    "src/toolkit/assets/styles/**/style.less",
                    "src/toolkit/assets/styles/**/style.scss",
                    "src/toolkit/assets/styles/**/style.sass",
                ],
                assets: [
                    "src/toolkit/assets/**/*",
                    "!{src/toolkit/assets/style,src/toolkit/assets/styles/**}",
                    "!{src/toolkit/assets/js,src/toolkit/assets/js/**}",
                ],
            }
        },
        src: {
            root: "src",
            includes: "./node_modules",
            appdir: path.resolve(__dirname, 'src/app'),
            rootdir: path.resolve(__dirname),
            js: [
                "src/app/**/*.js",
            ],
            markup: [
                "src/*.html",
                "src/toolkit/*.html"
            ],
            style: [
                "src/app/assets/styles/*.less",
                "src/app/assets/styles/*.scss",
                "src/app/assets/styles/*.sass",
            ],
            assets: [
                "src/app/assets/**/*",
                "!{src/app/assets/style,src/app/assets/styles/**}",
                "!{src/app/assets/js,src/app/assets/js/**}",
            ],
            toolkit: {
                js: [
                    "src/toolkit/**/*.js",
                ],
                style: [
                    "src/toolkit/assets/styles/**/style.less",
                    "src/toolkit/assets/styles/**/style.scss",
                    "src/toolkit/assets/styles/**/style.sass",
                ],
                assets: [
                    "src/toolkit/assets/**/*",
                    "!{src/toolkit/assets/style,src/toolkit/assets/styles/**}",
                    "!{src/toolkit/assets/js,src/toolkit/assets/js/**}",
                ],
            }
        },
        dest: {
            dist: 'dist',
            js: 'dist/app/assets/js',
            markup: 'dist',
            style: 'dist/app/assets/styles',
            assets: 'dist/app/assets',
            assemble: 'src/app/assets/data',
            toolkit: {
                dist: 'dist',
                js: 'dist/toolkit/assets/js',
                style: 'dist/toolkit/assets/styles',
                assets: 'dist/toolkit/assets',
            }
        },
        assembler: {
            root        : 'src/toolkit',
            cli         : 'cli/templates',
            data        : ['src/toolkit/data'],
            layouts     : ['src/toolkit/layouts'],
            catalyst    : ['src/toolkit/catalyst'],
            elements    : ['src/toolkit/elements'],
            templates   : ['src/toolkit/templates'],
            themes      : ['src/toolkit/assets/styles/themes'],
            dest        : 'src/app/assets/data/registry.json',
            watch       : [
                'src/toolkit/**/*',
                '!{src/toolkit/assets/js/**/*.js}',
                '!{src/toolkit/assets/styles/**/*.less}',
                '!{src/toolkit/assets/styles/**/*.scss}',
                '!{src/toolkit/assets/styles/**/*.sass}',
            ]
        },
    };
};
