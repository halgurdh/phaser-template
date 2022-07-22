import "phaser";

import mocha from "mocha";
import chai from "chai";
import { resolve } from "url";
var expect = chai.expect;
var spy = chai.spy;
var game;
var scene;
var sprite;

describe('hooks', function () {
  before('create game', function (done) {
    game = new Phaser.Game({
      type: Phaser.HEADLESS,
      scene: {
        init: function () {
          scene = this;
        }
      },
      callbacks: {
        postBoot: function () {
          game.loop.stop();
        }
      }
    });
    done();
  });

  after('destroy game', function () {
    Phaser.Cameras.Scene2D.Camera.prototype.clearRenderToTexture = function () { return this; };
    game.destroy(true, true);
    game.runDestroy();
  });

  beforeEach('create sprite', function () {
    sprite = scene.add.sprite();
  });

  afterEach('destroy sprite', function () {
    sprite.destroy();
  });
});


describe('phaser object and version', function () {
  it('phaser object', function (done) {
    expect(Phaser).is.an('object');
    done();
  });

  it('phaser version', function (done) {
    expect(Phaser).has.property('VERSION', '3.19.0');
    done();
  });
});
