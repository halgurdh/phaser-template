const SwapFrame = function (duration, delay, repeat, frames) {

    this.swapframes = frames;
    this.omega = 0;
    this.swapper = this.scene.tweens.add({
        targets: this,
        omega: 1,
        duration: duration,
        delay: delay,
        repeat: repeat,
        paused:false,
        ease: 'Linear',
        onUpdate: function (t, c) {c.setTexture('characters', c.swapframes[Math.round(c.omega )]) }
    });
    
    return this;
}
export default SwapFrame;