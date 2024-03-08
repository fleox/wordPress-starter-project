let Encore = require('@symfony/webpack-encore');

// You need to create an entry "Encore" like this for each theme
Encore
  .setOutputPath('./web/app/themes/starter-theme-2.x/static')
  .setPublicPath('/app/themes/starter-theme-2.x/static/') 

  .setManifestKeyPrefix('')
  .addEntry('main', './web/app/themes/starter-theme-2.x/assets/js/main.js')
  .addEntry('bootstrap', [
        './web/app/themes/starter-theme-2.x/assets/scss/bootstrap.scss',
    ])
  .enableSassLoader()
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableSourceMaps(true)
  .enableVersioning(Encore.isProduction())
;

module.exports = Encore.getWebpackConfig();