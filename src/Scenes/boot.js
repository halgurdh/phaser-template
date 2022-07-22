//no fb
import 'phaser';

import SplashScreenPlugin from 'phaser3-plugin-splashscreen';

import {UIPlugin} from 'phaser3-plugin-ui';

import Preloader from './Preloader';

import MainGame from './MainGame';

    var config = {
        type: Phaser.AUTO,
        width: 1080,
        height: 1920,
        scale: {
            mode: Phaser.Scale.NONE,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1080,
            height: 1920
        },
        plugins: {
            global: [
                { key: 'UIPlugin', plugin: UIPlugin, start: true, mapping: "UIPlugin"}
            ],
        },
        backgroundColor: '#222448',
    };

new Phaser.Game(config);
