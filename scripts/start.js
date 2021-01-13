const fs = require('fs');
const buildFolder = './build';
const assetsSource = './src/assets';
const assetsDestination = './build/assets';

if (!fs.existsSync(buildFolder)) {
    fs.mkdirSync(buildFolder);
}

if (!fs.existsSync(assetsDestination)) {
    const assets = fs.readdirSync(assetsSource);
    console.log('🎨 Preparing assets');

    fs.mkdirSync(assetsDestination);

    for (const asset of assets) {
        fs.copyFileSync(`${assetsSource}/${asset}`, `${assetsDestination}/${asset}`);
    }
}

require('child_process').spawn('parcel', ['index.html', '--no-autoinstall', '--open', '--out-dir', 'build'], {
    stdio: ['ignore', 'inherit', 'inherit'],
    shell: true
});