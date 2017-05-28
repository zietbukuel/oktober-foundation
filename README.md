# Oktober Foundation
Starter development template for building [Zurb Foundation 6](http://foundation.zurb.com/sites/docs/) themed [October CMS](//octobercms.com/) sites.

Includes:
- Latest Foundation Sites 6 [source from official repository](https://github.com/zurb/foundation-sites)
- Latest FontAwesome Icons
- Motion UI
- Yarn and Gulp build system for development and production


## Installation
Add the theme to existing project while logged into OctoberCMS account online,
or interactively by searching it inside Settings/System/Updates/Themes in backend,
or with the following command-line instructions inside *project root*:
```
php artisan theme:install zietbukuel.oktober-foundation
php artisan theme:use oktober-foundation
```
To be able to use Font Awesome we need to make a small change in our `.htaccess` file.

Look for:

`RewriteCond %{REQUEST_FILENAME} !/themes/.*/(assets|resources)/.*`

And change it to:

`RewriteCond %{REQUEST_FILENAME} !/themes/.*/(assets|resources|node_modules)/.*`

As you can see, we just added "node_modules" after "resources". This should allow us to access any asset inside the "node_modules" folder.

## One-time Development Environment Setup
Install [NodeJS and Node Package Manager](https://nodejs.org/en/) globally.
Run the following command-line instructions inside *theme root*:
```
npm install -g gulp yarn
yarn install
```

## Using and Editing
Custom styles should be in [src/scss/style.scss](https://github.com/zietbukuel/oktober-foundation/blob/master/src/scss/style.scss),
scripts in [src/js/theme.js](https://github.com/zietbukuel/oktober-foundation/blob/master/src/js/theme.js).
Development changes can be automated with command-line instruction inside *theme root*:
```
yarn run watch
```
Build optimized, minified, auto-prefixed assets with command-line instruction inside *theme root*:
```
yarn run build -- --production
```

## Yarn commands

- `yarn run build [-- --production]` - Compiles the SCSS and Javascript source code.
- `yarn run build-styles [-- --production]` - Compiles the SCSS source code.
- `yarn run build-scripts [-- --production]` - Compiles the Javascript source code.
- `yarn run clean` - Removes everything inside `assets/`.
- `yarn run watch` - Monitors changes inside `src/*`.

## Customizing Foundation
Global Foundation styling parameters should be modified in
[src/scss/_settings.scss](https://github.com/zietbukuel/oktober-foundation/blob/master/src/scss/_settings.scss)
Comment out unwanted styles and scripts for leaner and faster Foundation custom build:
[src/scss/_foundation6.scss](https://github.com/zietbukuel/oktober-foundation/blob/master/src/scss/_foundation6.scss)
[src/js/foundation.js](https://github.com/zietbukuel/oktober-foundation/blob/master/src/js/foundation.js)
