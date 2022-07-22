//Custom modules
import { Game } from "../States";
import Character from "../GameObjects/Character";

//Standard GameObject plugin modules
import {
    Composable, StateManager, ScoreManager, InputManager,
    Translatable, Scalable, DynamicTween,
    Tap
} from 'phaser3-plugin-gameobjects';

var preloadedInterstitial = null;

export default class MainGame extends Phaser.Scene {

    constructor() {
        super('MainGame');

        this.hasads = true;
        this.adsLoaded = false;

        this.addComponent = Composable.prototype.addComponent;

        this.addComponent(StateManager, Game, 'Menu');
    }

    init() {
        Phaser.GameObjects.GameObjectFactory.register('character', function (x, y) {
            let chr = new Character(this.scene, x, y);
            this.displayList.add(chr);

            return chr;
        });

        console.log(this);

    }

    //FB ADS
    loadAd() {
        var scene = this;
        if (this.hasads) {
            //FB ADS
            FBInstant.getInterstitialAdAsync(
                '316450245800522_330061694439377', // Your Ad Placement Id
            ).then(function (interstitial) {
                // Load the Ad asynchronously
                preloadedInterstitial = interstitial;
                scene.adsLoaded = true;
                return preloadedInterstitial.loadAsync();
            }).then(function () {
                scene.adsLoaded = true;
                console.log('Interstitial preloaded')
            }).catch(function (err) {
                scene.adsLoaded = false;
                console.error('Interstitial failed to preload: ' + err.message);
            });
        }
    }

    showAd() {
        var scene = this;
        if (this.hasads) {
            //Show Ad
            if (preloadedInterstitial != null) {
                preloadedInterstitial.showAsync()
                    .then(function () {
                        // Perform post-ad success operation
                        console.log('Interstitial ad finished successfully');
                        //scene.rope_menu.play();
                    })
                    .catch(function (e) {
                        //scene.rope_menu.play();
                        console.error(e.message);
                    });
            }
        }
    }

    
    buyRemoveAds() {
        this.facebook.purchase("removeads");
        this.facebook.on('purchase', () => { this.checkforProducts(); /*this.buysound.play();*/ }, this);
        this.facebook.on('purchasefail', function () { 
            this.removeAdsbutton.setTint(0xff0000);
            this.time.delayedCall(1000, () => {this.removeAdsbutton.setTint(0xffffff)}, [], this);
        }, this);
    }

    checkforProducts() {
        let scene = this;

        if (scene.game.device.os.iOS || scene.game.device.os.iPhone || scene.game.device.os.iPad) {
            scene.removeAdsbutton.setVisible(false);

            return;
        }

        this.facebook.on('getpurchases', function (catalog) {
            catalog.forEach(function (item) {
                if (item.productID != null) {
                    if (item.productID == "removeads") {
                        scene.hasads = false;
                        scene.removeAdsbutton.setVisible(false);
                    }
                }
            }, this);
        });

        this.facebook.getPurchases();
    }


    preload() {
        //this.load.plugin('PathBuilder.min', "lib/PathBuilder.min.js",'PathBuilder');
    }

    create() {
        //keep this
        //this.removeAdsbutton = this.add.button(200, 800, "ui", "No-Ads.png", null, this.buyRemoveAds, [true], this).setScale(0.8);

        this.checkforProducts();

        //teacher setup
        var offset_y = 300;

        this.dude = this.add.character(540, 600);
        this.dude2 = this.add.character(540, 600);

        this.dude.body = this.dude.add(this.add.image(0, 0, 'dude'));
        this.dude2.body = this.dude2.add(this.add.image(0, 0, 'dude'));

        //COMPOSITION OVER INHERITANCE (Component, ..componentargs)
        //TODO: fix arguments

        this.dude.addComponent(InputManager, { Tap }, this, this.dude);

        this.dude.addComponent(Translatable, 600, "+=0", 1000);
        this.dude2.addComponent(Translatable, 300, "+=0", 1000);
        this.dude2.addComponent(DynamicTween, 1000);

        //UI
        this.menuUI = this.add.ui(540, 540);

        this.mutebutton = this.add.button(this.uiWidth, this.uiHeight, "characters", 'mute.png', null, this.mute, [true], this);
        this.unmutebutton = this.add.button(this.uiWidth, this.uiHeight, "characters", 'unmute.png', null, this.mute, [false], this).setVisible(false);

        this.menuUI.add(this.add.button(0, 0, "Play", null, this.play, [], this));

        this.scoreLabel = this.add.label(0, -300, "0");
        this.stateLabel = this.add.label(0, -400, "State");

        // this.characterSelectorUI = this.add.selector(300, 300 , ['dude','dude'], this.cindy);

        let right = this.cameras.main.width;
        let bottom = this.cameras.main.height * 0.7;
        let h = 300;
        let r = (window.innerWidth / window.innerHeight) / (bottom / right);

        this.scroller = this.add.scroller(0, bottom + 250, 1, this.game.applists.length, right, h, 300, this.game.applists, 0.05);

        this.menuUI.add([this.scoreLabel, this.stateLabel]);

        //camera setup
        this.setupCameras();

        this.play();
    }

    filterCameras() {
        this.cameras.main.ignore(this.menuUI);
        this.uiCam.ignore(this.children.list);
        this.staticUICam.ignore(this.children.list);

        this.scroller.cam.ignore(this.children.list);

        let l = (1 << this.cameras.cameras.length) - 1;

        //ignore UI layers
        this.menuUI.cameraFilter = l & ~this.uiCam.id;

        this.scroller.cameraFilter = l & ~this.scroller.cam.id;
        this.scroller.filterCameras(l);

        //static UI
        this.mutebutton.cameraFilter = l & ~this.staticUICam.id;
        this.unmutebutton.cameraFilter = l & ~this.staticUICam.id;
        this.scoreLabel.cameraFilter = l & ~this.staticUICam.id;
    }

    setupCameras() {


        this.uiCam = this.cameras.add();
        this.staticUICam = this.cameras.add();

        this.filterCameras();
    }

    setupComponents() {
    }

    play() {
        this.setState('Playing');

        //switch game state every 2s demo
        //this.time.addEvent({ delay: 2000, callback: this.switchState, callbackScope: this,   loop: false });
        //this.time.addEvent({ delay: 3000, callback: this.reusePool, callbackScope: this, loop: true });

    }

    seeInfo() {

    }

    switchState() {

        // if(Math.random()> 0.5){
        //     this.setState("Playing");
        // }else{
        //     this.setState("Menu");
        // }
    }
    gameOver() {
        this.setState('GameOver');

    }

    resetGame() {
        this.setState('Menu');
    }
    mute(value) {
        this.sound.mute = value;
        this.mutebutton.setVisible(!value);
        this.unmutebutton.setVisible(value);
    }
    update() {
        //this.dude.update();
    }
}