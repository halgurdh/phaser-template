const Translatable = function (dx, dy, duration) {

        if (dx || dy) {
            this.translation = this.scene.tweens.add({
                targets: this,
                x: dx,
                y: dy,
                duration: duration,
                ease: 'Linear',
                yoyo: true,
                repeat: -1,
                paused: false
            });
        }

        return this;
}
export default Translatable;