class RecolorPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {

    constructor(game){
        super({
            game: game,
            renderer: game.renderer,
            fragShader: `
            precision lowp float;

            uniform sampler2D uMainSampler;
            uniform float time;
            varying vec2 outTexCoord;
            varying vec4 outTint;
            void main() 
            {
                vec4 texel = texture2D(uMainSampler, outTexCoord);
                float gray = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
                gl_FragColor = vec4(vec3(gray), texel.a)* vec4(1.9 ,1.0,1.0,1.0) ;
            }

            `
        });
    }
}

export default RecolorPipeline;