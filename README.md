# Oktober Foundation
Starter development template for building [Zurb Foundation 6](http://foundation.zurb.com/sites/docs/) themed [October CMS](//octobercms.com/) sites.

This theme was initially based on [f5fresh](https://github.com/Eoler/oc-f5fresh-theme), the main reason I made this theme was because f5fresh is based on Foundation 5 and I needed Foundation 6 (and waiting was not an option).

Includes:
- Latest Foundation Sites 6 [source from official repository](https://github.com/zurb/foundation-sites)
- Latest FontAwesome Icons
- Motion UI
- Gulp-based build system for development and production


## Installation
Add the theme to existing project while logged into OctoberCMS account online,
or interactively by searching it inside Settings/System/Updates/Themes in backend,
or with the following command-line instructions inside *project root*:
```
php artisan theme:install zietbukuel.oktober-foundation
php artisan theme:use oktober-foundation
```

## One-time Development Environment Setup
Install [NodeJS and Node Package Manager](https://nodejs.org/en/) globally.
Run the following command-line instructions inside *theme root*:
```
npm install -g gulp bower
npm install && bower install
```

## Using and Editing
Custom styles should be in [assets/scss/app.scss](https://github.com/zietbukuel/oktober-foundation/blob/master/assets/scss/app.scss),
scripts in [assets/es6/app.js](https://github.com/zietbukuel/oktober-foundation/blob/master/assets/es6/app.js).
Development changes can be automated with command-line instruction inside *theme root*:
```
gulp watch
```
Build optimized, minified, autoprefixed assets with command-line instruction inside *theme root*:
```
gulp --production
```

## Gulp commands

* `gulp styles` - Compiles the SASS source code.
* `gulp scripts` - Compiles the Javascript source code.
* `gulp clean` - Removes the `assets/css` and `assets/js` folders.

## Customizing Foundation
Global Foundation styling parameters should be modified in
[assets/scss/_settings.scss](https://github.com/zietbukuel/oktober-foundation/blob/master/assets/scss/_settings.scss)
Comment out unwanted styles and scripts for leaner and faster Foundation custom build:
[assets/scss/_foundation6.scss](https://github.com/zietbukuel/oktober-foundation/blob/master/assets/scss/_foundation6.scss)
[assets/es6/app.js](https://github.com/zietbukuel/oktober-foundation/blob/master/assets/es6/app.js)

## TODO
* Include some demo code.
* Feature to optimize images.