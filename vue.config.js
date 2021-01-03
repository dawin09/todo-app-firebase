module.exports = {
    lintOnSave: false,
    configureWebpack: {
        devtool: "source-map",
        resolve: {
            alias: {
                "@c": `${__dirname}/src/components`,
                "@v": `${__dirname}/src/views`,
                "@assets": `${__dirname}/src/assets`
            }
        }
    }
};
