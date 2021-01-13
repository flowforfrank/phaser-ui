const Bundler = require('parcel-bundler');
const fs = require('fs');

const componentsPath = './src/components';
const indexFilePath = './dist/index.js';
const indexExports = [];
const options = {
    outDir: './dist',
    sourceMaps: false,
    autoInstall: false,
    minify: true,
    watch: false
};

const components = fs.readdirSync(componentsPath);

(async () => {
    for (const component of components) {
        const entry = `${componentsPath}/${component}`;

        if (fs.statSync(entry).isFile()) {
            indexExports.push(`export { default as ${component.split('.')[0]} } from './${component}'`);

            await new Bundler(entry, options).bundle();
        }
    }

    fs.writeFileSync(indexFilePath, indexExports.join('\n'));
})();