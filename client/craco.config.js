const CracoAlias = require("craco-alias");

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "options",
                baseUrl: "./",
                aliases: {
                    "@api": "./src/api",
                    "@layout": "./src/layout",
                    "@common": "./src/components/_common",
                    "@components": "./src/components",
                    "@hooks": "./src/hooks",
                    "@pages": "./src/pages",
                    "@style": "./src/style",
                    "@services": "./src/services",
                    "@reducer": "./src/reducer",
                    "@saga": "./src/saga",
                    "@util": "./src/util",
                    "@font": "./public/font",
                    "@img": "./public/img",
                },
            },
        },
    ],
};
