export default class Part extends Phaser.GameObjects.Sprite {

    constructor (...args)
    {
        super(...args);

        //CONSIDER RESETABLE  COMPONENT
        this.initX = this.x;
        this.initY = this.y;

        //this.setPosition(x, y);
        return this;
    }
    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

    }

    reset(){
        this.x = this.initX;
        this.y = this.initY;
    }
   
}