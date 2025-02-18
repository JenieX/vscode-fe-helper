import { resolve } from 'path';
import { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';

import FriendlyErrorsPlugin from '@nuxt/friendly-errors-webpack-plugin';

const projectRoot = resolve(__dirname, '../../');
const commonWebpackConfig: Configuration = {
    target: 'node',
    entry: resolve(projectRoot, 'src/extension.ts'),
    infrastructureLogging: {
        level: 'log', // enables logging required for problem matchers
    },
    output: {
        clean: true,
        library: {
            type: 'commonjs2',
        },
        path: resolve(projectRoot, 'dist'),
        filename: 'extension.js',
        devtoolModuleFilenameTemplate: '../[resource-path]',
    },
    resolve: { extensions: ['.ts', '.js', '.json'] },
    externals: {
        vscode: 'commonjs vscode',
        typescript: 'commonjs typescript',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    configFile: resolve(projectRoot, 'src/tsconfig.json'),
                },
            },
        ],
    },
    plugins: [
        new WebpackBar({
            name: 'Build VSCode Extension',
            color: '#0066B8',
        }) as any,
        new FriendlyErrorsPlugin(),
    ],
};

export default commonWebpackConfig;
