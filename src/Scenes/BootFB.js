//fb build
import 'phaser';

import { FBScrollerPlugin } from 'phaser3-plugin-fbscroller';

import { UIPlugin } from 'phaser3-plugin-ui';

import SplashScreen from 'phaser3-plugin-splashscreen';

import MainGame from "./MainGame";
import Preloader from "./Preloader";

FBInstant.initializeAsync().then(function () {
    FBInstant.initializeAsync().then(function () {
        FBInstant.startGameAsync()
            .then(function () {
                FBInstant.setLoadingProgress(100);
                game.start();
            });
    });

    var config = {
        type: Phaser.AUTO,
        width: 1080,
        height: 1920,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1080,
            height: 1920
        },
        plugins: {
            global: [
                { key: 'FBScrollerPlugin', plugin: FBScrollerPlugin, start: true, mapping: "FBScrollerPlugin", data: [Preloader, SplashScreen, MainGame] },
                { key: 'UIPlugin', plugin: UIPlugin, start: true, mapping: "UIPlugin" }

            ]
        },
        backgroundColor: '#222448',
    };

    new Phaser.Game(config);
});
