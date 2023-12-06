module.exports = {
    plugin: {
        overrideCracoConfig: ({ cracoConfig }) => {
            // TODO: modify CRACO config
            return cracoConfig;
        },
        overrideWebpackConfig: ({ webpackConfig }) => {
            // For development mode add preact debug library.
            // if (process.env.NODE_ENV === 'development') {
            //     const { entry } = webpackConfig;
            //     webpackConfig.entry = ['preact/debug'].concat(entry);
            // }

            if (!webpackConfig.resolve) {
                webpackConfig.resolve = {};
            }

            if (!webpackConfig.resolve.extensions) {
                webpackConfig.resolve.extensions = [];
            }

            webpackConfig.resolve.extensions = [
                ...webpackConfig.resolve.extensions,
                'mjs'
            ];

            if (!webpackConfig.module) {
                webpackConfig.module = {};
            }

            if (!webpackConfig.module.rules) {
                webpackConfig.module.rules = [];
            }

            webpackConfig.module.rules = [
                ...webpackConfig.module.rules,
                {
                    test: /\.mjs$/,
                    include: /node_modules/,
                    type: 'javascript/auto'
                }
            ];

            return webpackConfig;
        }
    }
};
