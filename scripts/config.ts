import { resolve as resolvePath } from "path";
import { Configuration, EnvironmentPlugin } from "webpack";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import CSSExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import merge from "webpack-merge";

export default function config(config?: Configuration): Configuration {
    return merge({
        mode: "production",
        devtool: "source-map",
        entry: ["./src/_root.tsx"],
        output: {
            clean: true,
            filename: "js/[name].js",
            path: resolvePath(process.cwd(), "./dist"),
            publicPath: process.env.PUBLIC_PATH || "/",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        },
        module: {
            rules: [
                {
                    test: /\.[jt]sx?$/i,
                    use: [{
                        loader: "swc-loader",
                        options: {
                            env: {
                                mode: "usage",
                                coreJs: 3,
                            },
                            jsc: {
                                target: "es5",
                                parser: {
                                    syntax: "typescript",
                                    dynamicImport: true,
                                    tsx: true,
                                },
                                transform: {
                                    react: {
                                        runtime: "automatic",
                                        useBuiltins: true,
                                    },
                                },
                            },
                        },
                    }],
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [
                        { loader: config?.mode === "development" ? "style-loader" : CSSExtractPlugin.loader },
                        { loader: "css-loader" },
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        { loader: config?.mode === "development" ? "style-loader" : CSSExtractPlugin.loader },
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader", options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env"
                                        ],
                                    ],
                                },
                            }
                        },
                        { loader: "sass-loader" },
                    ],
                    exclude: /\.module\.s[ac]ss$/,
                },
                {
                    test: /\.module\.s[ac]ss$/i,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "css-loader", options: {
                                modules: true
                            },
                        },
                        {
                            loader: "postcss-loader", options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env"
                                        ],
                                    ],
                                },
                            }
                        },
                        { loader: "sass-loader" },
                    ],
                },
                {
                    test: /\.less$/i,
                    use: [
                        { loader: config?.mode === "development" ? "style-loader" : CSSExtractPlugin.loader },
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader", options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env"
                                        ],
                                    ],
                                },
                            }
                        },
                        {
                            loader: "less-loader", options: {
                                lessOptions: {
                                    javascriptEnabled: true,
                                },
                            }
                        },
                    ],
                    exclude: /\.module\.less$/,
                },
                {
                    test: /\.module\.less$/i,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "css-loader", options: {
                                modules: true
                            },
                        },
                        {
                            loader: "postcss-loader", options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env"
                                        ],
                                    ],
                                },
                            }
                        },
                        {
                            loader: "less-loader", options: {
                                lessOptions: {
                                    javascriptEnabled: true,
                                },
                            }
                        },
                    ],
                },
                {
                    test: /\.svg$/i,
                    type: "asset/inline",
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                    generator: {
                        filename: "img/[hash][ext]",
                    },
                },
            ],
        },
        plugins: [
            new EnvironmentPlugin({
                "BXG_API_URL": "http://localhost:5000",
            }),
            new HtmlWebpackPlugin({
                hash: true,
                favicon: "./assets/favicon.ico",
                template: "./assets/index.html",
                filename: "index.html",
            }),
            new CSSExtractPlugin({
                "filename": "css/[name].css",
            }),
            new WebpackManifestPlugin({}),
        ],
        optimization: {
            minimize: config?.mode !== "development",
        },
    }, config || {});
}
