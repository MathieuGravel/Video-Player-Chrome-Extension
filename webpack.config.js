const path = require("path");

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [{
    mode: "production",
    devtool: "inline-source-map",
    entry: {
        content_script: path.join(__dirname, "src", "content_script.ts"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: ""
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", "*"]
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: ["html-loader"]
            },
            {
                test: /\.svg$/,
                use: {
                    loader: "@svgr/webpack",
                }
            },
            {
                test: /\.png$/,
                use: {
                    loader: "url-loader"
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {from: "./manifest.json", to: "."},
                {from: "./icon*.png", to: "."}
            ]
        })
    ]
}];
