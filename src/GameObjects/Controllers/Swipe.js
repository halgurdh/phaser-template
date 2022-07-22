class Swipe {
    constructor(scene, target, swipeThreshold = 200, swipeDuration = 200) {
        //  The current Scene
        this.scene = scene;

        //  The Pointer we're monitoring for swipes
        this.pointer = scene.input.activePointer;
        //TEMP until Phaser 3.16 is released
        //  They must move this distance on a single axis during the swipe
        this.swipeThreshold = swipeThreshold;

        //  They cannot move more than 80% in the opposite axis during the swipe
        this.swipeAxisThreshold = this.swipeThreshold * 0.8;

        //  The swipe must complete within this ms value, or less
        this.swipeDuration = swipeDuration;

        this.scene.input.on('pointermove', this.onMove, this);
    }

    onMove(pointer) {
        if (pointer.isDown) {

            const distanceX = Math.abs(pointer.downX - pointer.x);
            const distanceY = pointer.downY - pointer.y;

            const horizontal = (distanceX > distanceY);

            if (horizontal && distanceX > this.swipeThreshold && distanceY < this.swipeAxisThreshold) {
                this.scene.input.emit('swipe', this.pointer);
                console.log("swipe");
            }
        }
    }

    update(target) {
    }

}

export default Swipe;