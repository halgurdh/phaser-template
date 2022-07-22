const DynamicTween = function (duration) {
    this.dynamics = this.scene.tweens.add({
        targets: this,
        props: this.dynamicProperties,
        duration: duration,
        //yoyo: true,
        //paused: true
    });
    this.c = 0;

    return this;
}

export default DynamicTween;