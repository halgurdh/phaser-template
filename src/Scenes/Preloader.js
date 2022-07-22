export default class Preloader extends Phaser.Scene {

    constructor() {
        super('Preloader');
    }

    preload() {
        this.load.image('dude','assets/sprites/phaser-dude.png');
    }
}