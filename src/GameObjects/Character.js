//import StateManager from "./Components/Systems/StateManager";
import State from "../States/State";

import {
    Composable
} from 'phaser3-plugin-gameobjects';

export default class Character extends Phaser.GameObjects.Container {

    constructor(...args) {
        super(...args);

        //component enabled
        this.addComponent = Composable.prototype.addComponent;

        this.initX = this.x;
        this.initY = this.y;

        return this;
    }

    addpart(partname, ...args) {
        let part = new partname(...args);

        //component enabled
        part.addComponent = Composable.prototype.addComponent;

        this.add(part);

        return part;
    }
    update() {
        super.update();
        this.updateState();
        this.updateController();
    }

    destroy(){
        this.removeAll(true);
        //super.destroy();
    }
}