import State from "../State"; 

export default class Menu extends State
{
    constructor(gameObject){
        super(gameObject); 
        this.initial = true;
    }

    enter (oldState)
    {
        super.enter(oldState);
        this.gameObject.stateLabel.setText(this.constructor.name);
        console.log("menustatetest");

        //stop the music for the ads
        if (this.gameObject.hasads && this.gameObject.adsLoaded) {
            //this.gameObject.rope_menu.stop();
        } else {
            //this.gameObject.rope_menu.play();
        }
    }

    exit(newState)
    {
        super.exit(newState);
        console.log("lalalaalal");
    }

    update(){

    }

}

