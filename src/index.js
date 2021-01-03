import Phaser from 'Phaser'

import Demo from './Demo'

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    title: 'Phaser UI Toolkit',
    url: 'https://webtips.dev',
    scene: [
        Demo
    ]
};

new Phaser.Game(config);