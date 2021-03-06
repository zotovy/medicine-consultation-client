module.exports = {
    node: {
        fs: 'empty'
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'ms',
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            plugins: [
                                ['@babel/plugin-proposal-decorators', { legacy: true }],
                                ['@babel/plugin-proposal-class-properties', { loose: true }],
                                ['@babel/plugin-proposal-optional-chaining', { loose: true }],
                                ['@babel/plugin-transform-classes', { loose: true }]
                            ]
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
