const webpackPreprocessor = require('@cypress/webpack-preprocessor')
const defaults = webpackPreprocessor.defaultOptions
const webpackOptions = require('./webpack.config');


module.exports = (on, config) => {
    delete defaults.webpackOptions.module.rules[0].use[0].options.presets
    on('file:preprocessor', webpackPreprocessor(webpackOptions))
    require('@cypress/react/plugins/react-scripts')(on, config)
    return config;
}
