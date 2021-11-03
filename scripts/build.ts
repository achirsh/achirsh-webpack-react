import webpack from "webpack";
import config from "./config";

const compiler = webpack(config({
    mode: "production",
    plugins: [
        new webpack.ProgressPlugin(),
    ],
}));

compiler.run((err?: Error, stats?: webpack.Stats) => {
    if (err) {
        throw err;
    }
    if (stats) {
        process.stdout.write(stats.toString({
            colors: true,
        }));
        process.stdout.write("\n");
    }
});
