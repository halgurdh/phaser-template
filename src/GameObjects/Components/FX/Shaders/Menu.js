class MenuPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {

    constructor(game){
        super({
            game: game,
            renderer: game.renderer,
            fragShader: `
            precision lowp float;

            uniform sampler2D u_texture;
            uniform float time;
            uniform vec2 resolution;
            varying vec2 outTexCoord;
            varying vec4 outTint;
            void main() 
            {

                //this will be our RGBA sum
                vec4 sum = vec4(0.0);
    
                //our original texcoord for this fragment
                vec2 tc = outTexCoord;
    
                //the amount to blur, i.e. how far off center to sample from 
                vec2 strength = (4.0 / resolution.xy) ;
    
                //apply blurring, using a 9-tap filter with predefined gaussian weights
    
                sum += texture2D(u_texture, tc - 4.0 * strength) * 0.0162162162;
                sum += texture2D(u_texture, tc - 3.0 * strength) * 0.0540540541;
                sum += texture2D(u_texture, tc - 2.0 * strength) * 0.1216216216;
                sum += texture2D(u_texture, tc - 1.0 * strength) * 0.1945945946;
    
                sum += texture2D(u_texture, tc) * 0.2270270270;
    
                sum += texture2D(u_texture, tc + 1.0 * strength) * 0.1945945946;
                sum += texture2D(u_texture, tc + 2.0 * strength) * 0.1216216216;
                sum += texture2D(u_texture, tc + 3.0 * strength) * 0.0540540541;
                sum += texture2D(u_texture, tc + 4.0 * strength) * 0.0162162162;

                vec4 texel = texture2D(u_texture, outTexCoord);

                float gray = dot(texel.rgb, vec3(0.299, 0.587, 0.114));
                gl_FragColor = vec4(vec3(gray), texel.a)* vec4(0.9 ,0.3,0.1,1.0) + sum * (0.5 +0.15*sin(time)) ;
                    }
            `
        });
    }
}

export default MenuPipeline;