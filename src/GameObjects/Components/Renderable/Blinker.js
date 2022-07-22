const Blinker = function(duration, delay, paused) {

        this.blinker = this.scene.tweens.add({
            targets: this,
            alpha:0,
            duration: duration,
            ease: function (t) {
                return Math.round(t);
            },
            repeat: -1,
            delay: delay,
            paused: paused
        });
        
        return this;
}

export default Blinker;